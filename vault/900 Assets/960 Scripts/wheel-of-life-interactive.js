// DataviewJS - 交互式生命之轮（Wheel of Life）
// 支持下拉选择框评分，自动更新图表

// 配置对象（可通过input参数覆盖）
let config = {
  // 8个生命之轮维度（按图表顺时针顺序排列）
  dimensions: [
    { key: 'Spiritual', label: '灵性成长', color: 'rgba(255, 99, 132, 0.2)', borderColor: 'rgba(255, 99, 132, 1)' },
    { key: 'Finance', label: '财务状况', color: 'rgba(83, 182, 255, 0.2)', borderColor: 'rgba(83, 182, 255, 1)' },
    { key: 'Social', label: '社交生活', color: 'rgba(199, 199, 199, 0.2)', borderColor: 'rgba(199, 199, 199, 1)' },
    { key: 'FunRecreation', label: '休闲娱乐', color: 'rgba(255, 159, 64, 0.2)', borderColor: 'rgba(255, 159, 64, 1)' },
    { key: 'CareerWork', label: '职业发展', color: 'rgba(54, 162, 235, 0.2)', borderColor: 'rgba(54, 162, 235, 1)' },
    { key: 'LoveRelationships', label: '亲密关系', color: 'rgba(255, 206, 86, 0.2)', borderColor: 'rgba(255, 206, 86, 1)' },
    { key: 'HealthFitness', label: '健康', color: 'rgba(75, 192, 192, 0.2)', borderColor: 'rgba(75, 192, 192, 1)' },
    { key: 'PersonalGrowth', label: '个人成长', color: 'rgba(153, 102, 255, 0.2)', borderColor: 'rgba(153, 102, 255, 1)' }
  ],
  // 评分范围（1-10分）
  minScore: 1,
  maxScore: 10
};

// 如果有input参数，覆盖默认配置
if (input !== undefined) {
  config = { ...config, ...input };
}

// 获取当前笔记
const currentPage = dv.current();
const currentFile = app.workspace.getActiveFile();

// 存储当前选择的分数
let scores = {};

// 初始化分数（从frontmatter读取或使用默认值）
config.dimensions.forEach(dim => {
  // 尝试从多个可能的键名中读取
  const value = currentPage[dim.key] ||
                currentPage[dim.key.replace(/([A-Z])/g, '_$1').toLowerCase()] ||
                0;
  scores[dim.key] = value || 0;
});

// 创建主容器
const container = dv.el('div', '', { cls: 'wheel-of-life-container' });

// 创建标题
const title = dv.el('h2', '🎡 生命之轮（Wheel of Life）', { container });
title.style.textAlign = 'center';
title.style.marginBottom = '10px';
title.style.borderBottom = '2px solid var(--background-modifier-border)';

// 创建评分区域容器
const ratingsContainer = dv.el('div', '', {
  container,
  cls: 'wheel-ratings-container'
});
ratingsContainer.style.display = 'flex';
ratingsContainer.style.flexWrap = 'wrap';
ratingsContainer.style.gap = '8px';
ratingsContainer.style.marginBottom = '15px';
ratingsContainer.style.width = '100%';
ratingsContainer.style.boxSizing = 'border-box';
ratingsContainer.style.borderBottom = '2px solid var(--background-modifier-border)';
ratingsContainer.style.justifyContent = 'center';

// 创建下拉选择框和标签
config.dimensions.forEach(dim => {
  // 维度容器
  const dimContainer = dv.el('div', '', { container: ratingsContainer });
  dimContainer.style.display = 'flex';
  dimContainer.style.alignItems = 'center';
  dimContainer.style.gap = '8px';
  dimContainer.style.flex = '0 0 48%';

  // 维度标签
  const label = dv.el('div', `${dim.label}：`, { container: dimContainer });
  label.style.fontWeight = 'bold';
  label.style.minWidth = '70px';
  label.style.flexShrink = '0';
  label.style.whiteSpace = 'nowrap';
  label.style.fontSize = '13px';

  // 下拉选择框
  const select = document.createElement('select');
  select.className = 'wheel-score-select';

  // 添加选项（1-10分）
  for (let i = config.minScore; i <= config.maxScore; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${i}分`;
    if (i === scores[dim.key]) {
      option.selected = true;
    }
    select.appendChild(option);
  }

  // 设置样式 - 自适应宽度
  select.style.flex = '1';
  select.style.minWidth = '0';
  select.style.padding = '4px 6px';
  select.style.borderRadius = '4px';
  select.style.border = '1px solid var(--background-modifier-border)';
  select.style.backgroundColor = 'var(--interactive-normal)';
  select.style.color = 'var(--text-normal)';
  select.style.cursor = 'pointer';
  select.style.fontSize = '13px';

  // 监听变化事件
  select.addEventListener('change', async (e) => {
    const newScore = parseInt(e.target.value);
    scores[dim.key] = newScore;

    // 更新图表
    updateChart();

    // 保存到当前笔记（可选）
    await saveScores();
  });

  dimContainer.appendChild(select);
});

// 创建图表容器
const chartContainer = dv.el('div', '', {
  container,
  cls: 'wheel-chart-container'
});
chartContainer.style.marginTop = '20px';

// 更新图表函数（南丁格尔玫瑰图样式，纯SVG，不依赖插件）
function updateChart() {
  // 清空图表容器
  while (chartContainer.firstChild) {
    chartContainer.removeChild(chartContainer.firstChild);
  }

  // 准备图表数据
  const labels = config.dimensions.map(dim => dim.label);
  const data = config.dimensions.map(dim => scores[dim.key]);
  const backgroundColors = config.dimensions.map(dim => dim.color);
  const borderColors = config.dimensions.map(dim => dim.borderColor);

  const size = 400;
  const centerX = size / 2;
  const centerY = size / 2;
  const maxRadius = (size / 2) - 50;

  // 创建SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', 'auto');
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
  svg.style.display = 'block';
  svg.style.margin = '0 auto';
  svg.style.maxWidth = '100%';

  // 绘制同心圆（网格线）
  for (let r = 2; r <= 10; r += 2) {
    const radius = (r / 10) * maxRadius;
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', centerX);
    circle.setAttribute('cy', centerY);
    circle.setAttribute('r', radius);
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', 'var(--background-modifier-border)');
    circle.setAttribute('stroke-width', '1');
    circle.setAttribute('stroke-dasharray', '4,4');
    svg.appendChild(circle);

    // 添加刻度标签
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', centerX);
    text.setAttribute('y', centerY - radius - 5);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('fill', 'var(--text-muted)');
    text.setAttribute('font-size', '10');
    text.textContent = r;
    svg.appendChild(text);
  }

  // 绘制扇形区域（南丁格尔玫瑰图样式）
  const angleStep = (2 * Math.PI) / data.length;
  const startAngle = -Math.PI / 2; // 从顶部开始

  data.forEach((value, index) => {
    const radius = (value / 10) * maxRadius;
    const angle1 = startAngle + index * angleStep;
    const angle2 = angle1 + angleStep;

    // 计算扇形路径（从中心点开始）
    const x1 = centerX + Math.cos(angle1) * radius;
    const y1 = centerY + Math.sin(angle1) * radius;
    const x2 = centerX + Math.cos(angle2) * radius;
    const y2 = centerY + Math.sin(angle2) * radius;

    const largeArc = angleStep > Math.PI ? 1 : 0;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const d = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    path.setAttribute('d', d);
    path.setAttribute('fill', backgroundColors[index]);
    path.setAttribute('stroke', borderColors[index]);
    path.setAttribute('stroke-width', '2');
    path.setAttribute('stroke-linejoin', 'round');
    path.style.cursor = 'pointer';
    path.style.transition = 'opacity 0.2s';

    // Hover效果
    path.addEventListener('mouseenter', () => {
      path.style.opacity = '0.8';
    });
    path.addEventListener('mouseleave', () => {
      path.style.opacity = '1';
    });

    svg.appendChild(path);

    // 添加标签（在外围）
    const midAngle = angle1 + angleStep / 2;
    const labelRadius = maxRadius + 25;
    const labelX = centerX + Math.cos(midAngle) * labelRadius;
    const labelY = centerY + Math.sin(midAngle) * labelRadius;

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', labelX);
    text.setAttribute('y', labelY);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('fill', 'var(--text-normal)');
    text.setAttribute('font-size', '11');
    text.setAttribute('font-weight', 'bold');
    text.textContent = labels[index];
    svg.appendChild(text);

    // 添加分数标签（在扇形边缘）
    const scoreRadius = radius * 0.85;
    const scoreX = centerX + Math.cos(midAngle) * scoreRadius;
    const scoreY = centerY + Math.sin(midAngle) * scoreRadius;

    const scoreText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    scoreText.setAttribute('x', scoreX);
    scoreText.setAttribute('y', scoreY);
    scoreText.setAttribute('text-anchor', 'middle');
    scoreText.setAttribute('dominant-baseline', 'middle');
    scoreText.setAttribute('fill', 'white');
    scoreText.setAttribute('font-size', '12');
    scoreText.setAttribute('font-weight', 'bold');
    scoreText.style.pointerEvents = 'none';
    scoreText.style.textShadow = '0 1px 2px rgba(0,0,0,0.3)';
    scoreText.textContent = value;
    svg.appendChild(scoreText);
  });

  chartContainer.appendChild(svg);
}

// 保存分数到笔记函数
async function saveScores() {
  if (!currentFile) return;

  try {
    // 读取当前文件内容
    let content = await app.vault.read(currentFile);

    // 检查是否有frontmatter
    const frontmatterMatch = content.match(/^---[\s\S]*?^---/m);

    if (frontmatterMatch) {
      // 已有frontmatter，只更新分数字段，保留其他字段
      const frontmatterStart = frontmatterMatch.index;
      const frontmatterEnd = frontmatterStart + frontmatterMatch[0].length;
      const frontmatterContent = content.substring(frontmatterStart, frontmatterEnd);

      // 复制frontmatter内容
      let newFrontmatter = frontmatterContent;

      // 更新或添加每个分数字段
      config.dimensions.forEach(dim => {
        const score = scores[dim.key];
        const fieldLine = `${dim.key}: ${score}`;
        const fieldPattern = new RegExp(`^${dim.key}\\s*:\\s*\\d+`, 'gm');

        if (fieldPattern.test(newFrontmatter)) {
          // 字段已存在，更新它
          newFrontmatter = newFrontmatter.replace(fieldPattern, fieldLine);
        } else {
          // 字段不存在，添加它（在第一个---之后）
          newFrontmatter = newFrontmatter.replace(/^---\n/, `---\n${fieldLine}\n`);
        }
      });

      // 替换原来的frontmatter
      content = newFrontmatter + content.substring(frontmatterEnd);

    } else {
      // 没有frontmatter，创建新的
      const newFrontmatterLines = config.dimensions.map(dim => {
        return `${dim.key}: ${scores[dim.key]}`;
      });

      const newFrontmatter = `---\n${newFrontmatterLines.join('\n')}\n---`;

      content = newFrontmatter + '\n' + content;
    }

    // 保存文件
    await app.vault.modify(currentFile, content);

  } catch (error) {
    console.error('保存分数时出错:', error);
  }
}

// 初始化
updateChart();

// 添加CSS样式
const style = document.createElement('style');
 style.textContent = `
  .wheel-of-life-container {
    padding: 10px;
    max-width: 600px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
  }
  .wheel-ratings-container {
    padding: 0 5px !important;
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
  }
  .wheel-chart-container {
    padding: 0 5px !important;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .wheel-score-select:hover {
    background-color: var(--interactive-hover);
  }
  .wheel-score-select:focus {
    outline: 2px solid var(--interactive-accent);
    outline-offset: 2px;
  }
`;
document.head.appendChild(style);
