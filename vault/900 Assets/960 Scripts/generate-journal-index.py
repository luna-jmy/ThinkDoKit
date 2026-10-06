# -*- coding: utf-8 -*-
"""
generate-journal-index.py — 年度日志索引生成器

扫描 500 Journal（及归档目录 400 Archive/450 Journal），为每个年度日志 YYYY.md
生成/刷新该年全部 季度/月/周/日 日志的 wikilink 索引块。

- 索引块由 <!-- journal-index:start --> / <!-- journal-index:end --> 标记包裹，
  重跑脚本只刷新标记内的内容，不影响年度日志其余正文
- 只链接实际存在的文件，不生成死链；未来月份的日志创建后再重跑脚本即可
- 若年度日志中有 ```journals-home 块，索引节插入其之前；否则追加到文末

用法:  python "900 Assets/960 Scripts/generate-journal-index.py" [年份]
       年份参数可选（如 2026，只处理该年）
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
JOURNAL_DIRS = [ROOT / "500 Journal", ROOT / "400 Archive" / "450 Journal"]

START = "<!-- journal-index:start -->"
END = "<!-- journal-index:end -->"

RE_DAILY = re.compile(r"^(\d{4})-(\d{2})-(\d{2})$")
RE_WEEKLY = re.compile(r"^(\d{4})-W(\d{1,2})$", re.IGNORECASE)
RE_MONTHLY = re.compile(r"^(\d{4})-(\d{2})$")
RE_QUARTERLY = re.compile(r"^(\d{4})-Q([1-4])$", re.IGNORECASE)
RE_YEARLY = re.compile(r"^(\d{4})$")


def collect():
    """按年份归类所有日志文件，返回 {year: {...}}"""
    years = {}
    for jdir in JOURNAL_DIRS:
        if not jdir.is_dir():
            continue
        for f in sorted(jdir.iterdir()):
            if f.suffix.lower() != ".md":
                continue
            stem = f.stem
            info = None
            m = RE_DAILY.match(stem)
            if m:
                info = ("dailies", stem, int(m.group(1)))
            else:
                m = RE_WEEKLY.match(stem)
                if m:
                    info = ("weeks", stem, int(m.group(1)))
                else:
                    m = RE_MONTHLY.match(stem)
                    if m:
                        info = ("months", stem, int(m.group(1)))
                    else:
                        m = RE_QUARTERLY.match(stem)
                        if m:
                            info = ("quarters", stem, int(m.group(1)))
            if info:
                bucket, name, y = info
                years.setdefault(y, {"quarters": [], "months": [], "weeks": [],
                                     "dailies": [], "extras": [], "yearly": None})
                years[y][bucket].append(name)
                continue
            if RE_YEARLY.match(stem):
                y = int(stem)
                years.setdefault(y, {"quarters": [], "months": [], "weeks": [],
                                     "dailies": [], "extras": [], "yearly": None})
                years[y]["yearly"] = f
                continue
            elif re.match(r"^\d{4}\b", stem) or re.match(r"^\d{4}", stem):
                # 年份前缀的附属文件，如「2025-09 工作总结」「2024日常记录(Feb & Mar)」
                y = int(stem[:4])
                years.setdefault(y, {"quarters": [], "months": [], "weeks": [],
                                     "dailies": [], "extras": [], "yearly": None})
                years[y]["extras"].append(stem)
    return years


def build_body(data):
    """生成索引块正文（标记之间的部分）"""
    parts = []
    if data["quarters"]:
        parts.append("**季度**：" + " · ".join(f"[[{s}]]" for s in natsort(data["quarters"])))
    if data["months"]:
        parts.append("**月度**：" + " · ".join(f"[[{s}]]" for s in natsort(data["months"])))
    if data["weeks"]:
        parts.append("**周度**：" + " · ".join(f"[[{s}]]" for s in natsort(data["weeks"])))
    if data["dailies"]:
        by_month = {}
        for s in natsort(data["dailies"]):
            by_month.setdefault(s[:7], []).append(s)
        day_lines = ["**日志**："]
        for mk in sorted(by_month):
            day_lines.append("- {}月：{}".format(int(mk[5:7]), " · ".join(f"[[{s}]]" for s in by_month[mk])))
        parts.append("\n".join(day_lines))
    if data["extras"]:
        parts.append("**其他**：" + " · ".join(f"[[{s}]]" for s in natsort(data["extras"])))
    return "\n\n".join(parts)


def natsort(names):
    """按名称中的数字自然排序"""
    def key(s):
        return [int(t) if t.isdigit() else t for t in re.split(r"(\d+)", s)]
    return sorted(names, key=key)


def render_section(body):
    return ("## 📇 年度日志索引\n\n"
            "> 本节由 `900 Assets/960 Scripts/generate-journal-index.py` 自动生成，请勿手动编辑；"
            "新增日志后重跑脚本刷新。\n\n"
            + START + "\n" + body + "\n" + END + "\n")


def update_yearly(path, body):
    raw = path.read_bytes()
    bom = raw.startswith(b"\xef\xbb\xbf")
    text = raw.decode("utf-8-sig")
    block = START + "\n" + body + "\n" + END
    if START in text and END in text:
        text = re.sub(re.escape(START) + r".*?" + re.escape(END),
                      lambda _: block, text, flags=re.DOTALL)
        mode = "replaced"
    elif "```journals-home" in text:
        idx = text.index("```journals-home")
        text = text[:idx] + render_section(body) + "\n" + text[idx:]
        mode = "inserted-before-journals-home"
    else:
        if not text.endswith("\n"):
            text += "\n"
        text += "\n" + render_section(body)
        mode = "appended"
    out = ("﻿" if bom else "") + text
    path.write_bytes(out.encode("utf-8"))
    return mode


def main():
    only_year = sys.argv[1] if len(sys.argv) > 1 else None
    years = collect()
    report = []
    for y in sorted(years):
        if only_year and str(y) != only_year:
            continue
        data = years[y]
        if not data["yearly"]:
            report.append(f"{y}: yearly file NOT found, skipped "
                          f"(Q{len(data['quarters'])} M{len(data['months'])} "
                          f"W{len(data['weeks'])} D{len(data['dailies'])} X{len(data['extras'])})")
            continue
        body = build_body(data)
        mode = update_yearly(data["yearly"], body)
        report.append(f"{y}: {mode} | Q={len(data['quarters'])} M={len(data['months'])} "
                      f"W={len(data['weeks'])} D={len(data['dailies'])} X={len(data['extras'])}")
    print("\n".join(report) if report else "no yearly journal files found")


if __name__ == "__main__":
    main()
