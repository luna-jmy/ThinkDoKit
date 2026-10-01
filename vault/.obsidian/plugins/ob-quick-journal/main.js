/* Quick Journal — bundled 2026-09-25T03:03:24.197Z */
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => QuickJournalPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian8 = require("obsidian");

// src/types.ts
var BOOL_YES = "\u2714\uFE0F";
var BOOL_NO = "\u274C";
var DEFAULT_REGISTRY = {
  daily: [
    {
      id: "checkin",
      heading: "### \u6BCF\u65E5\u6253\u5361",
      kind: "bool",
      fields: [
        { key: "\u{1F48A}medicine", label: "\u5403\u836F" },
        { key: "\u{1F9E0}flashcard", label: "\u5361\u7247\u590D\u4E60" },
        { key: "\u{1F9D8}\u200D\u2642\uFE0Fmeditation", label: "\u51A5\u60F3" },
        { key: "\u{1F37D}\uFE0Ffasting", label: "\u8F7B\u65AD\u98DF" }
      ]
    },
    {
      id: "data",
      heading: "### \u6570\u636E\u8BB0\u5F55",
      kind: "number",
      fields: [
        { key: "weight\u2696\uFE0F", label: "\u4F53\u91CD", unit: "kg" },
        { key: "exercise\u{1F553}", label: "\u8FD0\u52A8", unit: "\u5206\u949F" },
        { key: "reading\u{1F553}", label: "\u9605\u8BFB", unit: "\u5206\u949F" },
        { key: "saving\u{1F4B0}", label: "\u5B58\u5165", unit: "\u5143" },
        { key: "spent\u{1F4B0}", label: "\u652F\u51FA", unit: "\u5143" }
      ]
    },
    {
      id: "daily-review",
      heading: "## \u270D\uFE0F \u4ECA\u65E5\u5C0F\u7ED3\u4E0E\u56DE\u987E",
      kind: "text",
      fields: [
        { key: "\u4ECA\u5929\u6700\u6EE1\u610F\u7684\u4E8B", label: "\u6700\u6EE1\u610F" },
        { key: "\u4ECA\u5929\u9047\u5230\u7684\u969C\u788D\u6216\u56F0\u96BE", label: "\u969C\u788D\u56F0\u96BE" },
        { key: "\u4ECA\u5929\u5370\u8C61\u6700\u6DF1\u523B\u7684\u4E8B", label: "\u5370\u8C61\u6700\u6DF1" },
        { key: "\u660E\u5929\u60F3\u6539\u8FDB\u7684\u4E8B", label: "\u660E\u5929\u6539\u8FDB" }
      ]
    }
  ],
  weekly: [
    {
      id: "weekly-review",
      heading: "## \u{1F914} \u5468\u672B\u56DE\u987E\u4E0E\u603B\u7ED3",
      kind: "text",
      fields: [
        { key: "\u672C\u5468\u6210\u5C31/\u4EAE\u70B9", label: "\u6210\u5C31\u4EAE\u70B9" },
        { key: "\u672C\u5468\u5173\u952E\u9879\u76EE/\u8BA1\u5212\u8FDB\u5C55", label: "\u9879\u76EE\u8FDB\u5C55" },
        { key: "\u672C\u5468\u9047\u5230\u7684\u6311\u6218/\u95EE\u9898", label: "\u6311\u6218\u95EE\u9898" },
        { key: "\u4E0B\u5468\u9700\u8981\u8C03\u6574\u7684\u5730\u65B9", label: "\u9700\u8981\u8C03\u6574" },
        { key: "\u4E0B\u5468\u5C55\u671B", label: "\u4E0B\u5468\u5C55\u671B" }
      ]
    }
  ],
  monthly: [
    {
      id: "monthly-review",
      heading: "## \u{1F914} \u6708\u5EA6\u56DE\u987E\u4E0E\u603B\u7ED3",
      kind: "text",
      fields: [
        { key: "\u672C\u6708\u6700\u5927\u7684\u6210\u5C31/\u4EAE\u70B9", label: "\u6210\u5C31\u4EAE\u70B9" },
        { key: "\u672C\u6708\u5173\u952E\u9879\u76EE\u8FDB\u5C55", label: "\u9879\u76EE\u8FDB\u5C55" },
        { key: "\u672C\u6708\u9047\u5230\u7684\u6311\u6218/\u95EE\u9898", label: "\u6311\u6218\u95EE\u9898" },
        { key: "\u4E0B\u6708\u9700\u8981\u8C03\u6574\u7684\u5730\u65B9", label: "\u9700\u8981\u8C03\u6574" },
        { key: "\u4E0B\u6708\u5C55\u671B", label: "\u4E0B\u6708\u5C55\u671B" }
      ]
    }
  ],
  annual: []
};
var DEFAULT_ACTIONS = [
  {
    id: "daily-checkin",
    nameKey: "\u6BCF\u65E5\u6253\u5361",
    icon: "check-circle",
    kind: "fill",
    period: "day",
    sectionId: "checkin"
  },
  {
    id: "daily-data",
    nameKey: "\u6570\u636E\u8BB0\u5F55",
    icon: "line-chart",
    kind: "fill",
    period: "day",
    sectionId: "data"
  },
  {
    id: "daily-review",
    nameKey: "\u4ECA\u65E5\u5C0F\u7ED3",
    icon: "feather",
    kind: "fill",
    period: "day",
    sectionId: "daily-review"
  },
  {
    id: "weekly-review",
    nameKey: "\u672C\u5468\u590D\u76D8",
    icon: "calendar-check",
    kind: "fill",
    period: "week",
    sectionId: "weekly-review"
  },
  {
    id: "add-task",
    nameKey: "\u52A0\u4E00\u6761\u4EFB\u52A1",
    icon: "square-check",
    kind: "append",
    period: "day",
    heading: "## \u{1F440} GTD\u4EFB\u52A1\u770B\u677F",
    lineTemplate: "- [ ] {{value}}",
    fields: [{ key: "value", label: "\u4EFB\u52A1\u63CF\u8FF0", type: "text", required: true }]
  },
  {
    id: "add-note",
    nameKey: "\u8BB0\u4E00\u6761\u7075\u611F",
    icon: "lightbulb",
    kind: "append",
    period: "day",
    heading: "## \u{1F4A1} \u7075\u611F\u4E0E\u601D\u8003",
    lineTemplate: "- {{value}}",
    fields: [{ key: "value", label: "\u5185\u5BB9", type: "text", required: true }]
  }
];
var DEFAULT_CONFIG = {
  language: "auto",
  dailyDir: "500 Journal/540 Daily",
  weeklyDir: "500 Journal/530 Weekly",
  monthlyDir: "500 Journal/520 Monthly",
  annualDir: "500 Journal/510 Annual",
  registry: DEFAULT_REGISTRY,
  actions: DEFAULT_ACTIONS
};
function isRecord(v) {
  return typeof v === "object" && v !== null;
}
function mergeConfig(saved) {
  const base = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  if (!isRecord(saved)) return base;
  if (saved.language === "zh" || saved.language === "en" || saved.language === "auto") {
    base.language = saved.language;
  }
  for (const key of ["dailyDir", "weeklyDir", "monthlyDir", "annualDir"]) {
    if (typeof saved[key] === "string" && saved[key].trim() !== "") {
      base[key] = saved[key];
    }
  }
  if (isRecord(saved.registry)) {
    for (const scope of ["daily", "weekly", "monthly", "annual"]) {
      const savedScope = saved.registry[scope];
      if (Array.isArray(savedScope)) {
        base.registry[scope] = mergeSections(savedScope, base.registry[scope]);
      }
    }
  }
  if (Array.isArray(saved.actions)) {
    base.actions = saved.actions.filter(
      (a) => isRecord(a) && typeof a.id === "string" && typeof a.nameKey === "string"
    );
  }
  return base;
}
function mergeSections(saved, fallback) {
  const out = [];
  for (const raw of saved) {
    if (!isRecord(raw) || typeof raw.id !== "string" || typeof raw.heading !== "string") continue;
    if (raw.kind !== "bool" && raw.kind !== "number" && raw.kind !== "text") continue;
    const fields = Array.isArray(raw.fields) ? raw.fields.filter(
      (f) => isRecord(f) && typeof f.key === "string" && typeof f.label === "string"
    ) : [];
    out.push({ id: raw.id, heading: raw.heading, kind: raw.kind, fields });
  }
  if (out.length === 0) return fallback;
  return out;
}
function findSection(registry, scope, sectionId) {
  return registry[scope].find((s) => s.id === sectionId);
}

// src/i18n/en.ts
var EN = {
  // ── 动作名（出厂预设）──
  "\u6BCF\u65E5\u6253\u5361": "Daily check-in",
  "\u6570\u636E\u8BB0\u5F55": "Data log",
  "\u4ECA\u65E5\u5C0F\u7ED3": "Daily review",
  "\u672C\u5468\u590D\u76D8": "Weekly review",
  "\u52A0\u4E00\u6761\u4EFB\u52A1": "Add a task",
  "\u8BB0\u4E00\u6761\u7075\u611F": "Jot a note",
  // ── 注册表字段标签（dynamic：t(field.label)）──
  "\u5403\u836F": "Medicine",
  "\u5361\u7247\u590D\u4E60": "Flashcards",
  "\u51A5\u60F3": "Meditation",
  "\u8F7B\u65AD\u98DF": "Fasting",
  "\u4F53\u91CD": "Weight",
  "\u8FD0\u52A8": "Exercise",
  "\u9605\u8BFB": "Reading",
  "\u5B58\u5165": "Saved",
  "\u652F\u51FA": "Spent",
  "\u6700\u6EE1\u610F": "Best thing",
  "\u969C\u788D\u56F0\u96BE": "Obstacle",
  "\u5370\u8C61\u6700\u6DF1": "Most memorable",
  "\u660E\u5929\u6539\u8FDB": "Improve tomorrow",
  "\u6210\u5C31\u4EAE\u70B9": "Highlights",
  "\u9879\u76EE\u8FDB\u5C55": "Progress",
  "\u6311\u6218\u95EE\u9898": "Challenges",
  "\u9700\u8981\u8C03\u6574": "To adjust",
  "\u4E0B\u5468\u5C55\u671B": "Next week outlook",
  "\u4E0B\u6708\u5C55\u671B": "Next month outlook",
  // ── 表单 ──
  "\u4EFB\u52A1\u63CF\u8FF0": "Task description",
  "\u5185\u5BB9": "Content",
  "\u63D0\u4EA4": "Submit",
  "\u53D6\u6D88": "Cancel",
  "\u8DF3\u8FC7\uFF08\u7559\u7A7A\u4E0D\u5199\uFF09": "Skip (empty = not written)",
  "\u9009\u62E9\u52A8\u4F5C": "Choose an action",
  "\u5FEB\u901F\u5F55\u5165": "Quick capture",
  // ── 写入结果 ──
  "\u5DF2\u5199\u5165": "Written to",
  "\u521B\u5EFA\u7B14\u8BB0": "Created note",
  "\u5199\u5165\u5931\u8D25": "Write failed",
  "\u4EE5\u4E0B\u5B57\u6BB5\u5DF2\u6709\u503C\uFF0C\u8986\u76D6\u5199\u5165\uFF1F": "These fields already have values. Overwrite?",
  "\u8986\u76D6": "Overwrite",
  "\u5B9A\u4F4D\u5931\u8D25": "Could not locate the target section",
  // ── 命令 / 视图 ──
  "\u6253\u5F00\u65E5\u5FD7\u6C47\u603B": "Open journal summary",
  "\u65E5\u5FD7\u6C47\u603B": "Journal summary",
  "\u5468": "Week",
  "\u6708": "Month",
  "\u5E74": "Year",
  "\u4E0A\u4E00\u671F": "Previous",
  "\u4E0B\u4E00\u671F": "Next",
  "\u56DE\u5230\u672C\u671F": "Current",
  "\u5237\u65B0": "Refresh",
  "\u4EFB\u52A1": "Tasks",
  "\u5B8C\u6210": "Done",
  "\u65B0\u5EFA": "Created",
  "\u6253\u5361": "Check-in",
  "\u8BB0\u5F55": "recorded",
  "\u7F3A": "missing",
  "\u590D\u76D8": "Review",
  "\u6253\u5F00\u590D\u76D8\u7B14\u8BB0": "Open review note",
  "\u521B\u5EFA\u590D\u76D8\u7B14\u8BB0": "Create review note",
  "\u672C\u5468\u8FD8\u6CA1\u6709\u65E5\u5FD7\uFF0C\u5148\u53BB\u8BB0\u4E00\u6761": "No journal notes this week yet \u2014 capture something first",
  "\u6761\u65E5\u5FD7": "journal notes",
  "\u5929\u7528 mtime \u515C\u5E95": "dated by file mtime (fallback)",
  // ── 设置 ──
  "\u8BBE\u7F6E": "Settings",
  "\u754C\u9762\u8BED\u8A00": "Interface language",
  "\u8DDF\u968F Obsidian": "Follow Obsidian",
  "\u4E2D\u6587": "Chinese",
  "\u82F1\u6587": "English",
  "\u65E5\u5FD7\u76EE\u5F55": "Journal folders",
  "\u65E5\u65E5\u5FD7\u76EE\u5F55": "Daily notes folder",
  "\u5468\u65E5\u5FD7\u76EE\u5F55": "Weekly notes folder",
  "\u6708\u65E5\u5FD7\u76EE\u5F55": "Monthly notes folder",
  "\u5E74\u65E5\u5FD7\u76EE\u5F55": "Annual notes folder",
  "\u6355\u83B7\u52A8\u4F5C\u4E0E\u5B57\u6BB5\u6CE8\u518C\u8868\u7684\u7F16\u8F91\u5668\u5728\u540E\u7EED\u7248\u672C\u63D0\u4F9B\uFF1B\u5F53\u524D\u4F7F\u7528\u51FA\u5382\u9884\u8BBE\u3002": "Editors for capture actions and the field registry ship in a later version; factory presets are used for now.",
  "\u793A\u4F8B\uFF1A500 Journal/540 Daily": "e.g. 500 Journal/540 Daily"
};

// src/i18n/translate.ts
var currentSetting = "auto";
var localeProvider = () => void 0;
function setLanguage(setting, provider) {
  currentSetting = setting;
  if (provider) localeProvider = provider;
}
function effectiveLanguage() {
  if (currentSetting === "zh" || currentSetting === "en") return currentSetting;
  const locale = localeProvider();
  if (locale && locale.toLowerCase().startsWith("zh")) return "zh";
  return locale ? "en" : "zh";
}
function t(key) {
  var _a;
  if (effectiveLanguage() === "en") {
    return (_a = EN[key]) != null ? _a : key;
  }
  return key;
}

// src/parse/field-lines.ts
var BRACKET_RE = /^\s*[-*]\s*\[([^\][]+?)::\s*(.*?)\]\s*$/;
var BARE_RE = /^\s*(?:[-*]\s+)?([^\s:#[^]][^:\n]*?)::\s*(.*)$/;
function parseFieldLines(lines) {
  const out = [];
  let inFence = false;
  let inFrontmatter = false;
  let frontmatterDone = false;
  lines.forEach((line, i) => {
    if (i === 0 && line.trim() === "---") {
      inFrontmatter = true;
      return;
    }
    if (inFrontmatter) {
      if (line.trim() === "---") {
        inFrontmatter = false;
        frontmatterDone = true;
      }
      return;
    }
    if (line.trimStart().startsWith("```")) {
      inFence = !inFence;
      return;
    }
    if (inFence) return;
    if (line.trimStart().startsWith("%%")) return;
    const m = BRACKET_RE.exec(line);
    if (m) {
      out.push({ lineIndex: i, key: m[1].trim(), value: m[2].trim(), raw: line });
      return;
    }
    const b = BARE_RE.exec(line);
    if (b) {
      const key = b[1].trim();
      if (key.length > 0) {
        out.push({ lineIndex: i, key, value: b[2].trim(), raw: line });
      }
    }
  });
  void frontmatterDone;
  return out;
}
function renderFieldLine(key, value) {
  return value === "" ? `- [${key}::]` : `- [${key}:: ${value}]`;
}
function findHeadingIndex(lines, heading) {
  const target = heading.trim();
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === target) return i;
  }
  return -1;
}
function sectionRange(lines, headingIndex) {
  let end = lines.length;
  for (let i = headingIndex + 1; i < lines.length; i++) {
    if (/^#{1,6}\s/.test(lines[i])) {
      end = i;
      break;
    }
  }
  return { start: headingIndex + 1, end };
}

// src/capture/plan.ts
function planFieldFill(lines, opts) {
  const headingIndex = findHeadingIndex(lines, opts.heading);
  if (headingIndex < 0) {
    if (!opts.headingMissingCreates) {
      return { status: "error", reason: "heading-not-found", heading: opts.heading };
    }
    let anchor = lines.length - 1;
    while (anchor >= 0 && lines[anchor].trim() === "") anchor--;
    const creates2 = [];
    let after = anchor;
    for (const v of opts.values) {
      creates2.push({ afterLineIndex: after, line: renderFieldLine(v.key, v.value) });
      after++;
    }
    return {
      status: "ok",
      createHeading: { heading: opts.heading, afterLineIndex: anchor },
      edits: [],
      creates: creates2
    };
  }
  const range = sectionRange(lines, headingIndex);
  const sectionLines = lines.slice(range.start, range.end);
  const byKey = /* @__PURE__ */ new Map();
  for (let i = 0; i < sectionLines.length; i++) {
    const m = /^\s*[-*]\s*\[([^\][]+?)::\s*(.*?)\]\s*$/.exec(sectionLines[i]);
    if (m && !byKey.has(m[1].trim())) {
      byKey.set(m[1].trim(), { relIndex: i, value: m[2].trim() });
    }
  }
  const edits = [];
  const creates = [];
  let lastFieldAbs = range.start - 1;
  for (let i = range.start; i < range.end; i++) {
    if (/^\s*[-*]\s*\[[^\][]+?::/.test(lines[i])) lastFieldAbs = i;
  }
  for (const v of opts.values) {
    const existing = byKey.get(v.key);
    if (existing) {
      const abs = range.start + existing.relIndex;
      edits.push({
        lineIndex: abs,
        key: v.key,
        newLine: renderFieldLine(v.key, v.value),
        previousValue: existing.value
      });
    } else {
      creates.push({ afterLineIndex: lastFieldAbs, line: renderFieldLine(v.key, v.value) });
      lastFieldAbs++;
    }
  }
  return { status: "ok", edits, creates };
}
function planAppend(lines, opts) {
  const headingIndex = findHeadingIndex(lines, opts.heading);
  if (headingIndex < 0) {
    if (!opts.headingMissingCreates) {
      return { status: "error", reason: "heading-not-found", heading: opts.heading };
    }
    let anchor = lines.length - 1;
    while (anchor >= 0 && lines[anchor].trim() === "") anchor--;
    return {
      status: "ok",
      createHeading: { heading: opts.heading, afterLineIndex: anchor },
      edits: [],
      creates: [{ afterLineIndex: anchor + 1, line: opts.line }]
    };
  }
  const range = sectionRange(lines, headingIndex);
  let insertAfter = headingIndex;
  for (let i = range.end - 1; i >= range.start; i--) {
    if (lines[i].trim() !== "") {
      insertAfter = i;
      break;
    }
  }
  return { status: "ok", edits: [], creates: [{ afterLineIndex: insertAfter, line: opts.line }] };
}
function applyPlan(text, plan) {
  const lines = text.split(/\r?\n/);
  for (const e of plan.edits) {
    if (e.lineIndex < lines.length) lines[e.lineIndex] = e.newLine;
  }
  const inserts = [...plan.creates];
  if (plan.createHeading) {
    inserts.unshift({ afterLineIndex: plan.createHeading.afterLineIndex, line: plan.createHeading.heading });
  }
  inserts.sort((a, b) => b.afterLineIndex - a.afterLineIndex);
  let lastAnchor = -1;
  let pending = [];
  const flush = () => {
    for (let i = pending.length - 1; i >= 0; i--) {
      lines.splice(pending[i].afterLineIndex + 1, 0, pending[i].line);
    }
    pending = [];
  };
  for (const item of inserts) {
    if (item.afterLineIndex !== lastAnchor && pending.length > 0) flush();
    lastAnchor = item.afterLineIndex;
    pending.push(item);
  }
  flush();
  return lines.join("\n");
}

// src/periods/period.ts
function dateKey(d) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}
function isoWeekOf(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = Date.UTC(date.getUTCFullYear(), 0, 1);
  const week = Math.ceil(((date.getTime() - yearStart) / 864e5 + 1) / 7);
  return { year: date.getUTCFullYear(), week };
}
function mondayOfIsoWeek(year, week) {
  const jan4 = new Date(year, 0, 4);
  const jan4Day = (jan4.getDay() + 6) % 7;
  const week1Monday = new Date(year, 0, 4 - jan4Day);
  const monday = new Date(week1Monday);
  monday.setDate(monday.getDate() + (week - 1) * 7);
  return monday;
}
function addDays(d, n) {
  const out = new Date(d);
  out.setDate(out.getDate() + n);
  return out;
}
function daysInMonth(year, month1) {
  return new Date(year, month1 + 1, 0).getDate();
}
function weekKey(d) {
  const { year, week } = isoWeekOf(d);
  return `${year}-W${String(week).padStart(2, "0")}`;
}
function monthKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
function yearKey(d) {
  return String(d.getFullYear());
}
function periodOf(kind, d) {
  if (kind === "week") {
    const { year, week } = isoWeekOf(d);
    const start2 = mondayOfIsoWeek(year, week);
    const days2 = Array.from({ length: 7 }, (_, i) => addDays(start2, i));
    return { kind, key: `${year}-W${String(week).padStart(2, "0")}`, start: start2, days: days2 };
  }
  if (kind === "month") {
    const start2 = new Date(d.getFullYear(), d.getMonth(), 1);
    const n = daysInMonth(d.getFullYear(), d.getMonth());
    const days2 = Array.from({ length: n }, (_, i) => addDays(start2, i));
    return { kind, key: monthKey(d), start: start2, days: days2 };
  }
  const start = new Date(d.getFullYear(), 0, 1);
  const end = new Date(d.getFullYear(), 11, 31);
  const days = [];
  for (let cur = start; cur <= end; cur = addDays(cur, 1)) days.push(new Date(cur));
  return { kind, key: yearKey(d), start, days };
}
function shiftPeriod(period, step) {
  if (period.kind === "week") {
    return periodOf("week", addDays(period.start, step * 7));
  }
  if (period.kind === "month") {
    const d = new Date(period.start.getFullYear(), period.start.getMonth() + step, 1);
    return periodOf("month", d);
  }
  return periodOf("year", new Date(period.start.getFullYear() + step, 0, 1));
}
function parseNoteDateKind(name) {
  const base = name.replace(/\.md$/i, "");
  if (/^\d{4}-\d{2}-\d{2}$/.test(base)) return { kind: "day", key: base };
  if (/^\d{4}-W\d{2}$/.test(base)) return { kind: "week", key: base };
  if (/^\d{4}-\d{2}$/.test(base)) return { kind: "month", key: base };
  if (/^\d{4}$/.test(base)) return { kind: "year", key: base };
  return null;
}

// src/capture/variables.ts
function formatDate(d, format) {
  return format.replaceAll("YYYY", String(d.getFullYear())).replaceAll("YY", String(d.getFullYear()).slice(2)).replaceAll("MM", String(d.getMonth() + 1).padStart(2, "0")).replaceAll("DD", String(d.getDate()).padStart(2, "0"));
}
function renderTemplate(template, now) {
  const { year, week } = isoWeekOf(now);
  return template.replaceAll("{{date:YYYY-MM-DD}}", dateKey(now)).replaceAll("{{week}}", `${year}-W${String(week).padStart(2, "0")}`).replaceAll("{{month}}", monthKey(now)).replaceAll("{{year}}", yearKey(now)).replaceAll("{{weekKey}}", weekKey(now)).replace(/\{\{date:([^}]+)\}\}/g, (_all, fmt) => formatDate(now, fmt)).replaceAll("{{date}}", dateKey(now));
}
function targetNotePath(dir, fileTemplate, now) {
  const name = renderTemplate(fileTemplate, now);
  return `${dir.replace(/\/+$/, "")}/${name}.md`;
}

// src/capture/skeleton.ts
function sectionBlock(section) {
  const lines = [section.heading, ""];
  for (const f of section.fields) lines.push(renderFieldLine(f.key, ""));
  lines.push("");
  return lines;
}
function dailySkeleton(date, registry) {
  const day = dateKey(date);
  const lines = [
    "---",
    "journal: Daily",
    `journal-date: ${day}`,
    "type: daily_log",
    `created: ${day}`,
    "tags:",
    "  - journal/daily",
    "---",
    "",
    `# ${day} \u65E5\u5FD7`,
    ""
  ];
  for (const s of registry.daily) lines.push(...sectionBlock(s));
  lines.push("## \u{1F4A1} \u7075\u611F\u4E0E\u601D\u8003", "");
  return lines.join("\n");
}
function weeklySkeleton(date, registry) {
  const { year, week } = isoWeekOf(date);
  const key = `${year}-W${String(week).padStart(2, "0")}`;
  const monday = dateKey(mondayOfIso(year, week));
  const lines = [
    "---",
    "journal: Weekly",
    `journal-date: ${monday}`,
    "type: weekly_review",
    `year: ${year}`,
    `month: ${String(date.getMonth() + 1).padStart(2, "0")}`,
    `week: W${String(week).padStart(2, "0")}`,
    `created: ${dateKey(date)}`,
    "tags:",
    "  - journal/weekly",
    "---",
    "",
    `# ${key} \u5468\u65E5\u5FD7`,
    ""
  ];
  for (const s of registry.weekly) lines.push(...sectionBlock(s));
  return lines.join("\n");
}
function mondayOfIso(year, week) {
  const jan4 = new Date(year, 0, 4);
  const jan4Day = (jan4.getDay() + 6) % 7;
  const monday = new Date(year, 0, 4 - jan4Day);
  monday.setDate(monday.getDate() + (week - 1) * 7);
  return monday;
}

// src/services/file-writer.ts
var import_obsidian = require("obsidian");
async function ensureNote(app, path, skeleton) {
  const existing = app.vault.getAbstractFileByPath(path);
  if (existing instanceof import_obsidian.TFile) return existing;
  const dir = path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : "";
  if (dir && !app.vault.getAbstractFileByPath(dir)) {
    try {
      await app.vault.createFolder(dir);
    } catch (e) {
    }
  }
  return app.vault.create(path, skeleton);
}
async function readNoteText(app, path) {
  const file = app.vault.getAbstractFileByPath(path);
  if (!(file instanceof import_obsidian.TFile)) throw new Error(`note not found: ${path}`);
  return app.vault.cachedRead(file);
}
async function applyPlanToFile(app, path, plan) {
  if (plan.status !== "ok") throw new Error(`plan error: ${plan.reason}`);
  const file = app.vault.getAbstractFileByPath(path);
  if (!(file instanceof import_obsidian.TFile)) throw new Error(`note not found: ${path}`);
  await app.vault.process(file, (text) => applyPlan(text, plan));
}

// src/services/capture-service.ts
var CaptureService = class {
  constructor(app, getConfig) {
    this.app = app;
    this.getConfig = getConfig;
  }
  targetPath(action, now) {
    const config = this.getConfig();
    if (action.period === "week") {
      return targetNotePath(config.weeklyDir, "{{week}}", now);
    }
    return targetNotePath(config.dailyDir, "{{date}}", now);
  }
  weeklyPath(now) {
    return targetNotePath(this.getConfig().weeklyDir, "{{week}}", now);
  }
  async perform(action, values, opts) {
    var _a, _b, _c, _d, _e;
    const config = this.getConfig();
    const now = (_a = opts.now) != null ? _a : /* @__PURE__ */ new Date();
    const path = this.targetPath(action, now);
    let plan;
    if (action.kind === "fill") {
      const scope = action.period === "week" ? "weekly" : "daily";
      const section = findSection(config.registry, scope, (_b = action.sectionId) != null ? _b : "");
      if (!section) {
        return { ok: false, reason: "error", message: `unknown section: ${action.sectionId}` };
      }
      const fillValues = section.fields.filter((f) => values[f.key] !== void 0 && values[f.key] !== "").map((f) => ({ key: f.key, value: values[f.key] }));
      if (fillValues.length === 0) {
        return { ok: false, reason: "error", message: "no values to write" };
      }
      let text2;
      let created2 = false;
      try {
        text2 = await readNoteText(this.app, path);
      } catch (e) {
        const skeleton = action.period === "week" ? weeklySkeleton(now, config.registry) : dailySkeleton(now, config.registry);
        await ensureNote(this.app, path, skeleton);
        created2 = true;
        text2 = skeleton;
      }
      plan = planFieldFill(text2.split(/\r?\n/), {
        heading: section.heading,
        headingMissingCreates: true,
        values: fillValues
      });
      if (plan.status === "error") {
        return { ok: false, reason: "error", message: `${plan.reason}: ${plan.heading}` };
      }
      const overwrites = plan.edits.filter((e) => e.previousValue !== "").map((e) => e.key);
      if (overwrites.length > 0 && !opts.overwrite) {
        return { ok: false, reason: "overwrite", keys: overwrites, path };
      }
      await applyPlanToFile(this.app, path, plan);
      return {
        ok: true,
        path,
        created: created2,
        writtenLines: plan.edits.length + plan.creates.length
      };
    }
    const line = ((_c = action.lineTemplate) != null ? _c : "- {{value}}").replaceAll("{{value}}", (_d = values.value) != null ? _d : "");
    if (line.trim() === "-" || line.includes("{{")) {
      return { ok: false, reason: "error", message: "empty value" };
    }
    let text;
    let created = false;
    try {
      text = await readNoteText(this.app, path);
    } catch (e) {
      const skeleton = dailySkeleton(now, config.registry);
      await ensureNote(this.app, path, skeleton);
      created = true;
      text = skeleton;
    }
    plan = planAppend(text.split(/\r?\n/), {
      heading: (_e = action.heading) != null ? _e : "",
      headingMissingCreates: true,
      line
    });
    if (plan.status === "error") {
      return { ok: false, reason: "error", message: `${plan.reason}: ${plan.heading}` };
    }
    await applyPlanToFile(this.app, path, plan);
    return { ok: true, path, created, writtenLines: 1 };
  }
};

// src/ui/capture-modal.ts
var import_obsidian2 = require("obsidian");
var CaptureModal = class extends import_obsidian2.Modal {
  constructor(app, action, fields, onSubmit) {
    super(app);
    this.action = action;
    this.fields = fields;
    this.onSubmit = onSubmit;
    this.values = {};
    this.boolState = {};
  }
  onOpen() {
    this.titleEl.setText(t(this.action.nameKey));
    const form = this.contentEl.createDiv({ cls: "qj-form" });
    for (const field of this.fields) {
      const row = form.createDiv({ cls: "qj-field" });
      row.createEl("label", { cls: "qj-field-label", text: t(field.label) });
      if (field.type === "bool") {
        this.boolState[field.key] = "";
        const seg = row.createDiv({ cls: "qj-boolseg" });
        const options = [
          { id: "yes", label: BOOL_YES, cls: "qj-bool-yes" },
          { id: "no", label: BOOL_NO, cls: "qj-bool-no" },
          { id: "", label: t("\u8DF3\u8FC7\uFF08\u7559\u7A7A\u4E0D\u5199\uFF09"), cls: "qj-bool-skip" }
        ];
        for (const opt of options) {
          const btn = seg.createEl("button", {
            cls: `qj-boolseg-btn ${opt.cls}`,
            text: opt.label
          });
          btn.type = "button";
          btn.onclick = () => {
            this.boolState[field.key] = opt.id;
            seg.querySelectorAll(".qj-boolseg-btn").forEach((b) => b.removeClass("is-active"));
            btn.addClass("is-active");
          };
        }
      } else if (field.type === "number") {
        const input = row.createEl("input", { cls: "qj-input", type: "number" });
        input.inputMode = "decimal";
        input.placeholder = t("\u8DF3\u8FC7\uFF08\u7559\u7A7A\u4E0D\u5199\uFF09");
        input.onchange = () => this.values[field.key] = input.value;
      } else if (field.type === "multiline") {
        const input = row.createEl("textarea", { cls: "qj-input qj-textarea" });
        input.placeholder = t("\u8DF3\u8FC7\uFF08\u7559\u7A7A\u4E0D\u5199\uFF09");
        input.onchange = () => this.values[field.key] = input.value;
      } else {
        const input = row.createEl("input", { cls: "qj-input", type: "text" });
        input.placeholder = t("\u8DF3\u8FC7\uFF08\u7559\u7A7A\u4E0D\u5199\uFF09");
        input.onchange = () => this.values[field.key] = input.value;
      }
    }
    const footer = form.createDiv({ cls: "qj-form-footer" });
    const cancel = footer.createEl("button", { cls: "qj-btn", text: t("\u53D6\u6D88") });
    cancel.type = "button";
    cancel.onclick = () => this.close();
    const submit = footer.createEl("button", {
      cls: "qj-btn qj-btn-primary",
      text: t("\u63D0\u4EA4")
    });
    submit.type = "button";
    submit.onclick = () => {
      for (const [key, state] of Object.entries(this.boolState)) {
        if (state === "yes") this.values[key] = BOOL_YES;
        else if (state === "no") this.values[key] = BOOL_NO;
        else delete this.values[key];
      }
      this.onSubmit({ ...this.values });
      this.close();
    };
    (0, import_obsidian2.setIcon)(submit.createSpan({ cls: "qj-btn-icon" }), "check");
  }
};

// src/ui/confirm-modal.ts
var import_obsidian3 = require("obsidian");
var ConfirmModal = class extends import_obsidian3.Modal {
  constructor(app, title, body, onAccept) {
    super(app);
    this.title = title;
    this.body = body;
    this.onAccept = onAccept;
  }
  onOpen() {
    this.titleEl.setText(this.title);
    this.contentEl.createEl("p", { cls: "qj-confirm-body", text: this.body });
    const footer = this.contentEl.createDiv({ cls: "qj-form-footer" });
    const cancel = footer.createEl("button", { cls: "qj-btn", text: t("\u53D6\u6D88") });
    cancel.type = "button";
    cancel.onclick = () => this.close();
    const accept = footer.createEl("button", {
      cls: "qj-btn qj-btn-primary",
      text: t("\u8986\u76D6")
    });
    accept.type = "button";
    accept.onclick = () => {
      this.close();
      this.onAccept();
    };
  }
};

// src/ui/action-picker-modal.ts
var import_obsidian4 = require("obsidian");
var ActionPickerModal = class extends import_obsidian4.Modal {
  constructor(app, actions, onPick) {
    super(app);
    this.actions = actions;
    this.onPick = onPick;
  }
  onOpen() {
    this.titleEl.setText(t("\u9009\u62E9\u52A8\u4F5C"));
    const list = this.contentEl.createDiv({ cls: "qj-action-list" });
    for (const action of this.actions) {
      const row = list.createDiv({ cls: "qj-action-row" });
      (0, import_obsidian4.setIcon)(row.createSpan({ cls: "qj-action-icon" }), action.icon);
      row.createSpan({ cls: "qj-action-name", text: t(action.nameKey) });
      row.onclick = () => {
        this.close();
        this.onPick(action);
      };
    }
  }
};

// src/views/summary-view.ts
var import_obsidian6 = require("obsidian");

// src/parse/task-lines.ts
var TASK_RE = /^\s*[-*]\s+\[([ xX/-])\]\s*(.*)$/;
function extractDate(mark, body) {
  const re = new RegExp(`${mark}\\s*(\\d{4}-\\d{2}-\\d{2})`);
  const m = re.exec(body);
  return m ? m[1] : void 0;
}
function parseTaskLine(line) {
  const m = TASK_RE.exec(line);
  if (!m) return null;
  const status = m[1];
  const body = m[2];
  return {
    line,
    done: status === "x" || status === "X",
    doneDate: extractDate("\u2705", body),
    createdDate: extractDate("\u2795", body)
  };
}
function parseTaskLines(lines) {
  return lines.map((l) => parseTaskLine(l)).filter((t2) => t2 !== null);
}

// src/metrics/aggregate.ts
function boolStats(section, days, records) {
  return section.fields.map((f) => {
    let yes = 0;
    let no = 0;
    let missingDays = 0;
    for (const day of days) {
      const rec = records.get(day);
      const value = rec == null ? void 0 : rec.fieldValues[f.key];
      if (value === void 0 || value === "") {
        missingDays++;
      } else if (value === BOOL_YES) {
        yes++;
      } else if (value === BOOL_NO) {
        no++;
      } else {
        missingDays++;
      }
    }
    return { key: f.key, label: f.label, yes, no, missingDays };
  });
}
function numberStats(section, days, records) {
  return section.fields.map((f) => {
    var _a;
    const samples = [];
    for (const day of days) {
      const raw = (_a = records.get(day)) == null ? void 0 : _a.fieldValues[f.key];
      if (raw === void 0 || raw === "") continue;
      const n = Number(raw);
      if (Number.isFinite(n)) samples.push({ date: day, value: n });
    }
    if (samples.length === 0) {
      return { key: f.key, label: f.label, unit: f.unit, count: 0, min: 0, max: 0, mean: 0, sum: 0 };
    }
    const values = samples.map((s) => s.value);
    const sum = values.reduce((a, b) => a + b, 0);
    const latest = samples[samples.length - 1];
    return {
      key: f.key,
      label: f.label,
      unit: f.unit,
      count: samples.length,
      min: Math.min(...values),
      max: Math.max(...values),
      mean: sum / samples.length,
      sum,
      latest: latest.value,
      latestDate: latest.date
    };
  });
}
function taskStats(days, records) {
  const daySet = new Set(days);
  let total = 0;
  let done = 0;
  let doneInPeriod = 0;
  let createdInPeriod = 0;
  for (const rec of records.values()) {
    for (const task of parseTaskLines(rec.taskLines)) {
      total++;
      if (task.done) {
        done++;
        if (!task.doneDate || daySet.has(task.doneDate)) doneInPeriod++;
      }
      if (task.createdDate && daySet.has(task.createdDate)) createdInPeriod++;
    }
  }
  return { total, done, doneInPeriod, createdInPeriod };
}

// src/services/vault-index.ts
var import_obsidian5 = require("obsidian");
var VaultIndex = class {
  constructor(app, dailyDir, weeklyDir) {
    this.app = app;
    this.dailyDir = dailyDir;
    this.weeklyDir = weeklyDir;
  }
  filesUnder(dir) {
    const prefix = dir.replace(/\/+$/, "") + "/";
    return this.app.vault.getMarkdownFiles().filter((f) => f.path.startsWith(prefix));
  }
  /** 采集期间内逐日的记录（只读，走 cachedRead）。 */
  async collectDayRecords(days) {
    const records = /* @__PURE__ */ new Map();
    let mtimeFallback = 0;
    const daySet = new Set(days.map(dateKey));
    const byDate = /* @__PURE__ */ new Map();
    for (const file of this.filesUnder(this.dailyDir)) {
      const date = this.resolveDate(file);
      if (date) byDate.set(date, file);
    }
    for (const day of days) {
      const key = dateKey(day);
      const file = byDate.get(key);
      if (!file || !daySet.has(key)) continue;
      const text = await this.app.vault.cachedRead(file);
      const fields = {};
      for (const fl of parseFieldLines(text.split(/\r?\n/))) {
        if (!(fl.key in fields)) fields[fl.key] = fl.value;
      }
      const taskLines = text.split(/\r?\n/).filter((l) => /^\s*[-*]\s+\[([ xX/-])\]/.test(l));
      records.set(key, { date: key, fieldValues: fields, taskLines });
    }
    return { records, mtimeFallback };
  }
  /** 周复盘笔记文件（按文件名 YYYY-Www 找）。 */
  weeklyFile(weekKey2) {
    const target = `${this.weeklyDir.replace(/\/+$/, "")}/${weekKey2}.md`;
    const file = this.app.vault.getAbstractFileByPath(target);
    return file instanceof import_obsidian5.TFile ? file : null;
  }
  resolveDate(file) {
    var _a;
    const cache = this.app.metadataCache.getFileCache(file);
    const fmDate = (_a = cache == null ? void 0 : cache.frontmatter) == null ? void 0 : _a["journal-date"];
    if (typeof fmDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(fmDate)) return fmDate;
    const name = parseNoteDateKind(file.name);
    if ((name == null ? void 0 : name.kind) === "day") return name.key;
    return null;
  }
};

// src/views/summary-view.ts
var VIEW_TYPE_QJ_SUMMARY = "qj-summary";
var KIND_LABEL = {
  week: "\u5468",
  month: "\u6708",
  year: "\u5E74"
};
var SummaryView = class extends import_obsidian6.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.kind = "week";
    this.period = periodOf("week", /* @__PURE__ */ new Date());
  }
  getViewType() {
    return VIEW_TYPE_QJ_SUMMARY;
  }
  getDisplayText() {
    return t("\u65E5\u5FD7\u6C47\u603B");
  }
  getIcon() {
    return "notebook-pen";
  }
  getViewData() {
    return this.kind;
  }
  setViewData(data) {
    if (data === "month" || data === "year" || data === "week") this.kind = data;
  }
  async onOpen() {
    await this.render();
  }
  async render() {
    const root = this.contentEl;
    root.empty();
    root.addClass("qj-summary-root");
    this.renderToolbar(root.createDiv({ cls: "qj-toolbar" }));
    await this.renderBody(root.createDiv({ cls: "qj-body" }));
  }
  renderToolbar(toolbar) {
    const kinds = ["week", "month", "year"];
    for (const kind of kinds) {
      const btn = toolbar.createEl("button", {
        cls: `qj-btn qj-kind-btn${kind === this.kind ? " is-active" : ""}`,
        text: t(KIND_LABEL[kind])
      });
      btn.type = "button";
      btn.onclick = () => {
        this.kind = kind;
        this.period = periodOf(kind, /* @__PURE__ */ new Date());
        void this.render();
      };
    }
    const nav = toolbar.createDiv({ cls: "qj-toolbar-nav" });
    const prev = nav.createEl("button", { cls: "qj-btn", text: `\u2039 ${t("\u4E0A\u4E00\u671F")}` });
    prev.type = "button";
    prev.onclick = () => {
      this.period = shiftPeriod(this.period, -1);
      void this.render();
    };
    nav.createSpan({ cls: "qj-toolbar-key", text: this.period.key });
    const next = nav.createEl("button", { cls: "qj-btn", text: `${t("\u4E0B\u4E00\u671F")} \u203A` });
    next.type = "button";
    next.onclick = () => {
      this.period = shiftPeriod(this.period, 1);
      void this.render();
    };
    const current = nav.createEl("button", { cls: "qj-btn", text: t("\u56DE\u5230\u672C\u671F") });
    current.type = "button";
    current.onclick = () => {
      this.period = periodOf(this.kind, /* @__PURE__ */ new Date());
      void this.render();
    };
    const refresh = nav.createEl("button", { cls: "qj-btn qj-icon-btn" });
    refresh.type = "button";
    (0, import_obsidian6.setIcon)(refresh, "refresh-cw");
    refresh.onclick = () => void this.render();
  }
  async renderBody(body) {
    const config = this.plugin.config;
    const index = new VaultIndex(this.app, config.dailyDir, config.weeklyDir);
    const days = this.period.days.map(dateKey);
    const { records } = await index.collectDayRecords(this.period.days);
    const header = body.createDiv({ cls: "qj-period-header" });
    header.createSpan({
      cls: "qj-period-count",
      text: `${records.size} ${t("\u6761\u65E5\u5FD7")}`
    });
    if (records.size === 0) {
      body.createDiv({ cls: "qj-empty", text: t("\u672C\u5468\u8FD8\u6CA1\u6709\u65E5\u5FD7\uFF0C\u5148\u53BB\u8BB0\u4E00\u6761") });
      return;
    }
    const cards = body.createDiv({ cls: "qj-cards" });
    const tasks = taskStats(days, records);
    this.statCard(cards, t("\u4EFB\u52A1"), [
      { label: t("\u5B8C\u6210"), value: String(tasks.doneInPeriod) },
      { label: t("\u65B0\u5EFA"), value: String(tasks.createdInPeriod) },
      { label: t("\u8BB0\u5F55"), value: `${tasks.done}/${tasks.total}` }
    ]);
    for (const section of config.registry.daily) {
      if (section.kind === "bool") {
        const stats = boolStats(section, days, records);
        const card = this.cardShell(cards, t("\u6253\u5361"));
        for (const s of stats) {
          const row = card.createDiv({ cls: "qj-checkin-row" });
          row.createSpan({ cls: "qj-checkin-label", text: t(s.label) });
          const bar = row.createDiv({ cls: "qj-bar" });
          const recorded = s.yes + s.no;
          if (recorded > 0) {
            bar.createSpan({
              cls: "qj-bar-yes",
              attr: { style: `flex-grow:${s.yes}` }
            });
            bar.createSpan({
              cls: "qj-bar-no",
              attr: { style: `flex-grow:${s.no}` }
            });
          }
          row.createSpan({
            cls: "qj-checkin-count",
            text: recorded > 0 ? `${s.yes} / ${recorded} ${t("\u8BB0\u5F55")} \xB7 ${t("\u7F3A")} ${s.missingDays}` : `${t("\u7F3A")} ${s.missingDays}`
          });
        }
      } else if (section.kind === "number") {
        const stats = numberStats(section, days, records);
        const card = this.cardShell(cards, t("\u6570\u636E\u8BB0\u5F55"));
        for (const s of stats) {
          const row = card.createDiv({ cls: "qj-data-row" });
          row.createSpan({ cls: "qj-checkin-label", text: t(s.label) });
          const unit = s.unit ? ` ${s.unit}` : "";
          row.createSpan({
            cls: "qj-data-value",
            text: s.count > 0 ? `\u5747\u503C ${s.mean.toFixed(1)}${unit}\uFF08${s.min}~${s.max}\uFF09` : "\u2014"
          });
        }
      } else {
        const card = this.cardShell(cards, t("\u4ECA\u65E5\u5C0F\u7ED3"));
        card.createDiv({
          cls: "qj-muted",
          text: `${section.fields.length} \xD7 ${t("\u8BB0\u5F55")}`
        });
      }
    }
    if (this.kind === "week") {
      const card = this.cardShell(cards, t("\u590D\u76D8"));
      const weekly = index.weeklyFile(weekKey(this.weekStartOfCurrentView()));
      const btn = card.createEl("button", {
        cls: "qj-btn",
        text: weekly ? t("\u6253\u5F00\u590D\u76D8\u7B14\u8BB0") : t("\u521B\u5EFA\u590D\u76D8\u7B14\u8BB0")
      });
      btn.type = "button";
      btn.onclick = async () => {
        let file = weekly;
        if (!file) {
          file = await this.plugin.ensureWeeklyReview(this.period.start);
        }
        if (file) await this.app.workspace.getLeaf(false).openFile(file);
      };
    }
  }
  weekStartOfCurrentView() {
    return this.kind === "week" ? this.period.start : /* @__PURE__ */ new Date();
  }
  cardShell(cards, title) {
    const card = cards.createDiv({ cls: "qj-card" });
    card.createDiv({ cls: "qj-card-title", text: title });
    return card;
  }
  statCard(cards, title, metrics) {
    const card = this.cardShell(cards, title);
    const grid = card.createDiv({ cls: "qj-metric-grid" });
    for (const m of metrics) {
      const cell = grid.createDiv({ cls: "qj-metric" });
      cell.createSpan({ cls: "qj-metric-value", text: m.value });
      cell.createSpan({ cls: "qj-metric-label", text: m.label });
    }
  }
};

// src/settings.ts
var import_obsidian7 = require("obsidian");
var QJSettingTab = class extends import_obsidian7.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    this.containerEl.empty();
    new import_obsidian7.Setting(this.containerEl).setName(t("\u754C\u9762\u8BED\u8A00")).addDropdown((drop) => {
      drop.addOption("auto", t("\u8DDF\u968F Obsidian"));
      drop.addOption("zh", t("\u4E2D\u6587"));
      drop.addOption("en", t("\u82F1\u6587"));
      drop.setValue(this.plugin.config.language);
      drop.onChange(async (value) => {
        this.plugin.config.language = value;
        setLanguage(
          this.plugin.config.language,
          () => {
            var _a;
            return (_a = this.app) == null ? void 0 : _a.locale;
          }
        );
        await this.plugin.saveConfig();
        this.display();
      });
    });
    new import_obsidian7.Setting(this.containerEl).setName(t("\u65E5\u5FD7\u76EE\u5F55")).setHeading();
    this.dirSetting(t("\u65E5\u65E5\u5FD7\u76EE\u5F55"), "dailyDir");
    this.dirSetting(t("\u5468\u65E5\u5FD7\u76EE\u5F55"), "weeklyDir");
    this.dirSetting(t("\u6708\u65E5\u5FD7\u76EE\u5F55"), "monthlyDir");
    this.dirSetting(t("\u5E74\u65E5\u5FD7\u76EE\u5F55"), "annualDir");
    this.containerEl.createEl("p", {
      cls: "qj-setting-note",
      text: t("\u6355\u83B7\u52A8\u4F5C\u4E0E\u5B57\u6BB5\u6CE8\u518C\u8868\u7684\u7F16\u8F91\u5668\u5728\u540E\u7EED\u7248\u672C\u63D0\u4F9B\uFF1B\u5F53\u524D\u4F7F\u7528\u51FA\u5382\u9884\u8BBE\u3002")
    });
  }
  dirSetting(name, key) {
    new import_obsidian7.Setting(this.containerEl).setName(name).addText((text) => {
      text.setPlaceholder(t("\u793A\u4F8B\uFF1A500 Journal/540 Daily"));
      text.setValue(this.plugin.config[key]);
      text.onChange(async (value) => {
        this.plugin.config[key] = value.trim();
        await this.plugin.saveConfig();
      });
    });
  }
};

// src/main.ts
var QuickJournalPlugin = class extends import_obsidian8.Plugin {
  /** obsidian.d.ts 1.8.7 未声明 App.locale（运行时存在），收口在这一个转换里 */
  localeOf(app) {
    return app == null ? void 0 : app.locale;
  }
  async onload() {
    this.config = mergeConfig(await this.loadData());
    setLanguage(this.config.language, () => this.localeOf(this.app));
    this.capture = new CaptureService(this.app, () => this.config);
    this.registerView(VIEW_TYPE_QJ_SUMMARY, (leaf) => new SummaryView(leaf, this));
    this.addCommand({
      id: "open-summary",
      name: t("\u6253\u5F00\u65E5\u5FD7\u6C47\u603B"),
      callback: () => void this.activateSummary()
    });
    for (const action of this.config.actions) {
      this.addCommand({
        id: `capture-${action.id}`,
        name: t(action.nameKey),
        callback: () => this.openCapture(action)
      });
    }
    this.addRibbonIcon("notebook-pen", t("\u5FEB\u901F\u5F55\u5165"), () => {
      new ActionPickerModal(this.app, this.config.actions, (action) => this.openCapture(action)).open();
    });
    this.addSettingTab(new QJSettingTab(this.app, this));
  }
  async saveConfig() {
    await this.saveData(this.config);
  }
  /** 表单字段来源：fill 动作取注册表 section，append 动作用自带字段。 */
  resolveFields(action) {
    var _a, _b;
    if (action.kind === "fill") {
      const scope = action.period === "week" ? "weekly" : "daily";
      const section = findSection(this.config.registry, scope, (_a = action.sectionId) != null ? _a : "");
      if (!section) return [];
      return section.fields.map((f) => ({
        key: f.key,
        label: f.label,
        type: section.kind
      }));
    }
    return (_b = action.fields) != null ? _b : [];
  }
  openCapture(action) {
    const fields = this.resolveFields(action);
    if (fields.length === 0) {
      new import_obsidian8.Notice(`${t("\u5B9A\u4F4D\u5931\u8D25")}: ${action.id}`);
      return;
    }
    new CaptureModal(this.app, action, fields, (values) => {
      void this.performCapture(action, values, false);
    }).open();
  }
  async performCapture(action, values, overwrite) {
    const result = await this.capture.perform(action, values, { overwrite });
    if (result.ok) {
      const note = result.created ? `${t("\u521B\u5EFA\u7B14\u8BB0")} \xB7 ` : "";
      new import_obsidian8.Notice(`${note}${t("\u5DF2\u5199\u5165")} ${result.path} (${result.writtenLines})`);
      return;
    }
    if (result.reason === "overwrite") {
      new ConfirmModal(
        this.app,
        t("\u4EE5\u4E0B\u5B57\u6BB5\u5DF2\u6709\u503C\uFF0C\u8986\u76D6\u5199\u5165\uFF1F"),
        result.keys.join("\n"),
        () => void this.performCapture(action, values, true)
      ).open();
      return;
    }
    new import_obsidian8.Notice(`${t("\u5199\u5165\u5931\u8D25")}: ${result.message}`);
  }
  /** 确保本周复盘笔记存在（骨架），返回文件。 */
  async ensureWeeklyReview(date) {
    const path = this.capture.weeklyPath(date);
    try {
      await readNoteText(this.app, path);
      const file = this.app.vault.getAbstractFileByPath(path);
      return file instanceof import_obsidian8.TFile ? file : null;
    } catch (e) {
      const skeleton = weeklySkeleton(date, this.config.registry);
      return ensureNote(this.app, path, skeleton);
    }
  }
  async activateSummary() {
    const { workspace } = this.app;
    const existing = workspace.getLeavesOfType(VIEW_TYPE_QJ_SUMMARY);
    const leaf = existing.length > 0 ? existing[0] : workspace.getLeaf("tab");
    await leaf.setViewState({ type: VIEW_TYPE_QJ_SUMMARY, active: true });
    await workspace.revealLeaf(leaf);
  }
};
