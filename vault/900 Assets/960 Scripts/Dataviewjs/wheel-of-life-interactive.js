// DataviewJS - 生命之轮 v2（年度对比版）
// 三组数据：现状、目标、年终复盘
// 南丁格尔玫瑰图 + Tab 切换对比差异

// ===== 配置 =====
let config = {
  dimensions: [
    { key: 'Spiritual', label: '灵性成长', color: '#FF6384' },
    { key: 'Finance', label: '财务状况', color: '#53B6FF' },
    { key: 'Social', label: '社交生活', color: '#A8A8A8' },
    { key: 'FunRecreation', label: '休闲娱乐', color: '#FF9F40' },
    { key: 'CareerWork', label: '职业发展', color: '#36A2EB' },
    { key: 'LoveRelationships', label: '亲密关系', color: '#FFCE56' },
    { key: 'HealthFitness', label: '健康', color: '#4BC0C0' },
    { key: 'PersonalGrowth', label: '个人成长', color: '#9966FF' }
  ],
  // 三组数据类型（顺序即表格列顺序）
  types: [
    { key: 'current', label: '现状', suffix: '' },
    { key: 'goal', label: '目标', suffix: '_goal' },
    { key: 'review', label: '年终复盘', suffix: '_review' }
  ],
  // Tab 对比模式（三个维度两两对比）
  modes: [
    { key: 'current_vs_goal', label: '现状 → 目标', baseline: 'current', comparison: 'goal' },
    { key: 'goal_vs_review', label: '目标 → 年终复盘', baseline: 'goal', comparison: 'review' },
    { key: 'current_vs_review', label: '现状 → 年终复盘', baseline: 'current', comparison: 'review' }
  ]
};

if (input !== undefined) {
  config = { ...config, ...input };
}

// ===== 数据读取 =====
const currentPage = dv.current();
if (!currentPage) {
  dv.paragraph("⏳ 当前笔记尚未被 Dataview 索引，稍后会自动恢复");
  return;
}
const currentFile = app.workspace.getActiveFile();

let scores = {};

config.types.forEach(t => { scores[t.key] = {}; });

config.dimensions.forEach(dim => {
  config.types.forEach(t => {
    scores[t.key][dim.key] = currentPage[`${dim.key}${t.suffix}`] || 0;
  });
});

const typeLabels = {};
config.types.forEach(t => { typeLabels[t.key] = t.label; });

let activeMode = config.modes[0].key;

// ===== 容器 =====
const container = dv.el('div', '', { cls: 'wheel-of-life-v2' });

// 标题
const title = dv.el('h3', '🎡 生命之轮', { container });
title.style.textAlign = 'center';
title.style.margin = '0 0 12px 0';

// ===== 评分区域（表格在上方） =====
const ratingsWrap = dv.el('div', '', { container, cls: 'wol-ratings' });

// 表头（用纯 DOM 避免 dv.el 插入隐式文本节点）
const headerRow = document.createElement('div');
headerRow.className = 'wol-rrow wol-rheader';
ratingsWrap.appendChild(headerRow);
['维度', ...config.types.map(t => t.label)].forEach((h, i) => {
  const cell = document.createElement('div');
  cell.textContent = h;
  cell.style.textAlign = i === 0 ? 'left' : 'center';
  cell.style.whiteSpace = 'nowrap';
  headerRow.appendChild(cell);
});

// 维度行
config.dimensions.forEach(dim => {
  const row = document.createElement('div');
  row.className = 'wol-rrow';

  // 维度名
  const label = document.createElement('div');
  label.className = 'wol-rlabel';
  label.textContent = dim.label;
  label.style.borderLeft = `3px solid ${dim.color}`;
  row.appendChild(label);

  // 三组下拉
  config.types.forEach(t => {
    const select = document.createElement('select');
    select.className = 'wol-select';

    for (let i = 0; i <= 10; i++) {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = i === 0 ? '—' : `${i}`;
      if (i === scores[t.key][dim.key]) opt.selected = true;
      select.appendChild(opt);
    }

    select.addEventListener('change', async () => {
      scores[t.key][dim.key] = parseInt(select.value);
      renderChart();
      await saveScores();
    });

    row.appendChild(select);
  });

  ratingsWrap.appendChild(row);
});

// ===== Tab 栏（表格与图表之间） =====
const tabBar = dv.el('div', '', { container, cls: 'wol-tabs' });
const tabBtns = [];

config.modes.forEach(mode => {
  const btn = document.createElement('button');
  btn.className = 'wol-tab-btn';
  btn.textContent = mode.label;
  btn.dataset.mode = mode.key;
  if (mode.key === activeMode) btn.classList.add('wol-tab-active');

  btn.addEventListener('click', () => {
    activeMode = mode.key;
    tabBtns.forEach(b => b.classList.remove('wol-tab-active'));
    btn.classList.add('wol-tab-active');
    renderChart();
  });

  tabBar.appendChild(btn);
  tabBtns.push(btn);
});

// ===== 图表容器 =====
const chartBox = dv.el('div', '', { container, cls: 'wol-chart-box' });

// ===== 图例容器 =====
const legendBox = dv.el('div', '', { container, cls: 'wol-legend' });

// ===== 图表渲染 =====
function renderChart() {
  chartBox.innerHTML = '';
  legendBox.innerHTML = '';

  const mode = config.modes.find(m => m.key === activeMode);
  const baseline = scores[mode.baseline];
  const comparison = scores[mode.comparison];

  // 图例
  [
    { label: typeLabels[mode.baseline], opacity: 0.18 },
    { label: typeLabels[mode.comparison], opacity: 0.55 }
  ].forEach(item => {
    const entry = document.createElement('div');
    entry.className = 'wol-legend-item';
    const swatch = document.createElement('span');
    swatch.className = 'wol-legend-swatch';
    swatch.style.opacity = item.opacity;
    entry.appendChild(swatch);
    const txt = document.createElement('span');
    txt.textContent = item.label;
    entry.appendChild(txt);
    legendBox.appendChild(entry);
  });

  // 是否有对比数据
  const hasData = config.dimensions.some(d => comparison[d.key] > 0);

  const size = 420;
  const cx = size / 2, cy = size / 2;
  const maxR = size / 2 - 50;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
  svg.setAttribute('width', '100%');
  svg.style.height = 'auto';
  svg.style.display = 'block';
  svg.style.margin = '0 auto';

  // --- 同心圆网格 ---
  for (let r = 2; r <= 10; r += 2) {
    const rad = (r / 10) * maxR;
    svg.appendChild(svgEl('circle', {
      cx, cy, r: rad, fill: 'none',
      stroke: 'var(--background-modifier-border)',
      'stroke-width': 1, 'stroke-dasharray': '4,4'
    }));

    const tick = svgEl('text', {
      x: cx, y: cy - rad - 5,
      'text-anchor': 'middle', 'dominant-baseline': 'middle',
      fill: 'var(--text-muted)', 'font-size': 10
    });
    tick.textContent = r;
    svg.appendChild(tick);
  }

  // --- 扇形区域 ---
  const n = config.dimensions.length;
  const step = (2 * Math.PI) / n;
  const offset = -Math.PI / 2;

  config.dimensions.forEach((dim, i) => {
    const bVal = baseline[dim.key];
    const cVal = comparison[dim.key];
    const bR = (bVal / 10) * maxR;
    const cR = (cVal / 10) * maxR;
    const a1 = offset + i * step;
    const a2 = a1 + step;
    const mid = a1 + step / 2;
    const big = step > Math.PI ? 1 : 0;

    function arcPath(r) {
      const x1 = cx + Math.cos(a1) * r;
      const y1 = cy + Math.sin(a1) * r;
      const x2 = cx + Math.cos(a2) * r;
      const y2 = cy + Math.sin(a2) * r;
      return `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${big} 1 ${x2},${y2} Z`;
    }

    // 底层（浅色）
    if (bVal > 0) {
      svg.appendChild(svgEl('path', {
        d: arcPath(bR),
        fill: dim.color, 'fill-opacity': 0.18,
        stroke: dim.color, 'stroke-opacity': 0.45,
        'stroke-width': 1.5, 'stroke-linejoin': 'round'
      }));
    }

    // 对比层（深色）
    if (cVal > 0) {
      svg.appendChild(svgEl('path', {
        d: arcPath(cR),
        fill: dim.color, 'fill-opacity': 0.55,
        stroke: dim.color, 'stroke-opacity': 1,
        'stroke-width': 2, 'stroke-linejoin': 'round'
      }));
    }

    // --- 分数标注（扇形内部） ---
    const showR = cVal > 0 ? cR : bR;
    if (showR > 20) {
      const posR = showR * 0.78;
      const px = cx + Math.cos(mid) * posR;
      const py = cy + Math.sin(mid) * posR;

      let text;
      if (bVal > 0 && cVal > 0) {
        text = `${bVal}→${cVal}`;
      } else if (bVal > 0) {
        text = `${bVal}`;
      } else {
        text = `${cVal}`;
      }

      svg.appendChild(svgEl('text', {
        x: px, y: py,
        'text-anchor': 'middle', 'dominant-baseline': 'middle',
        fill: 'var(--text-normal)',
        'font-size': showR > 60 ? 12 : 10,
        'font-weight': 'bold',
        stroke: 'rgba(255,255,255,0.8)', 'stroke-width': 3,
        'paint-order': 'stroke',
        'pointer-events': 'none'
      }, text));
    }

    // --- 差异标注（扇形外侧） ---
    if (bVal > 0 && cVal > 0) {
      const diff = cVal - bVal;
      const outerR = Math.max(bR, cR);
      if (outerR > 15) {
        const gapR = outerR + 13;
        const gx = cx + Math.cos(mid) * gapR;
        const gy = cy + Math.sin(mid) * gapR;

        svg.appendChild(svgEl('text', {
          x: gx, y: gy,
          'text-anchor': 'middle', 'dominant-baseline': 'middle',
          fill: diff >= 0 ? '#4CAF50' : '#E53935',
          'font-size': 10, 'font-weight': 'bold',
          'pointer-events': 'none'
        }, diff > 0 ? `+${diff}` : `${diff}`));
      }
    }

    // --- 维度标签（最外圈） ---
    const labR = maxR + 32;
    const lx = cx + Math.cos(mid) * labR;
    const ly = cy + Math.sin(mid) * labR;

    svg.appendChild(svgEl('text', {
      x: lx, y: ly,
      'text-anchor': 'middle', 'dominant-baseline': 'middle',
      fill: 'var(--text-normal)',
      'font-size': 11, 'font-weight': 'bold'
    }, dim.label));
  });

  // 空数据提示
  if (!hasData) {
    svg.appendChild(svgEl('text', {
      x: cx, y: cy,
      'text-anchor': 'middle', 'dominant-baseline': 'middle',
      fill: 'var(--text-muted)', 'font-size': 13,
      'font-style': 'italic'
    }, `${typeLabels[mode.comparison]}数据尚未填写`));
  }

  chartBox.appendChild(svg);
}

// SVG 元素创建辅助
function svgEl(tag, attrs, textContent) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(attrs || {}).forEach(([k, v]) => el.setAttribute(k, v));
  if (textContent !== undefined) el.textContent = textContent;
  return el;
}

// ===== 保存到 Frontmatter =====
async function saveScores() {
  if (!currentFile) return;

  try {
    let content = await app.vault.read(currentFile);
    const fmMatch = content.match(/^---[\s\S]*?^---/m);

    const fields = {};
    config.dimensions.forEach(dim => {
      config.types.forEach(t => {
        fields[`${dim.key}${t.suffix}`] = scores[t.key][dim.key];
      });
    });

    if (fmMatch) {
      let fm = fmMatch[0];

      Object.entries(fields).forEach(([key, val]) => {
        const regex = new RegExp(`^${key}\\s*:\\s*\\S+`, 'gm');
        if (regex.test(fm)) {
          fm = fm.replace(regex, `${key}: ${val}`);
        } else {
          fm = fm.replace(/^---\n/, `---\n${key}: ${val}\n`);
        }
      });

      content = fm + content.substring(fmMatch.index + fmMatch[0].length);
    } else {
      const lines = config.dimensions.flatMap(dim =>
        config.types.map(t => `${dim.key}${t.suffix}: ${scores[t.key][dim.key]}`)
      );
      content = `---\n${lines.join('\n')}\n---\n` + content;
    }

    await app.vault.modify(currentFile, content);
  } catch (err) {
    console.error('[Wheel of Life] 保存失败:', err);
  }
}

// ===== 初始化 =====
renderChart();

// ===== 样式 =====
const style = document.createElement('style');
style.textContent = `
  .wheel-of-life-v2 {
    padding: 12px 8px;
    max-width: 520px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
  }

  /* --- Rating Rows --- */
  .wol-ratings {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding-bottom: 14px;
    border-bottom: 2px solid var(--background-modifier-border);
    margin-bottom: 0;
  }
  .wol-rrow {
    display: grid;
    grid-template-columns: 80px 1fr 1fr 1fr;
    gap: 6px;
    align-items: center;
  }
  .wol-rheader {
    font-size: 11px;
    color: var(--text-muted);
    font-weight: 700;
  }
  .wol-rheader div { text-align: center; white-space: nowrap; }
  .wol-rheader div:first-child { text-align: left; }

  .wol-rlabel {
    font-size: 12.5px;
    font-weight: 600;
    white-space: nowrap;
    padding-left: 6px;
    line-height: 1.4;
  }

  .wol-select {
    width: 100%;
    padding: 3px 4px;
    border-radius: 4px;
    border: 1px solid var(--background-modifier-border);
    background: var(--interactive-normal);
    color: var(--text-normal);
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.15s;
  }
  .wol-select:hover { background: var(--interactive-hover); }
  .wol-select:focus {
    outline: 2px solid var(--interactive-accent);
    outline-offset: 1px;
  }

  /* --- Tabs --- */
  .wol-tabs {
    display: flex;
    gap: 0;
    margin: 14px 0 14px 0;
    border-bottom: 2px solid var(--background-modifier-border);
  }
  .wol-tab-btn {
    flex: 1;
    padding: 8px 10px;
    border: none;
    background: transparent;
    color: var(--text-muted);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 6px 6px 0 0;
    transition: all 0.2s;
  }
  .wol-tab-btn:hover {
    background: var(--interactive-hover);
    color: var(--text-normal);
  }
  .wol-tab-active {
    background: var(--interactive-accent) !important;
    color: var(--text-on-accent) !important;
  }

  /* --- Chart --- */
  .wol-chart-box {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  /* --- Legend --- */
  .wol-legend {
    display: flex;
    justify-content: center;
    gap: 24px;
    font-size: 12px;
    color: var(--text-muted);
  }
  .wol-legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .wol-legend-swatch {
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 3px;
    background: var(--text-muted);
  }
`;
document.head.appendChild(style);
