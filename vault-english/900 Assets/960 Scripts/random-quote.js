// randomQuote.js
let config = {
  folder: "300 Resources/330 Books/332 BookExcerpts",
  tag: "#content/金句",
  noQuoteMessage: "> 暂无金句可显示",
  errorTemplate: "> 错误: {error}",
  quoteTemplate: "> {quote}\n>\n> — *{source}*"
};

// 处理输入参数
if (input !== undefined) {
  config = { ...config, ...input };
}

// 防抖机制
let refreshTimeout = null;

// 处理书名格式的函数
function formatBookName(fileName) {
  // 去掉【】里的内容
  const withoutBrackets = fileName.replace(/^【.*?】/, '');
  // 去除可能的前后空格
  const trimmedName = withoutBrackets.trim();
  // 用书名号括起
  return `《${trimmedName}》`;
}

// 复制文本到剪贴板的函数
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    // 创建临时提示
    const notification = document.createElement('div');
    notification.textContent = '已复制到剪贴板';
    notification.style.position = 'fixed';
    notification.style.bottom = '10px';
    notification.style.right = '10px';
    notification.style.backgroundColor = 'var(--background-secondary)';
    notification.style.color = 'var(--text-normal)';
    notification.style.padding = '5px 10px';
    notification.style.borderRadius = '4px';
    notification.style.zIndex = '1000';
    notification.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    document.body.appendChild(notification);
    
    // 2秒后移除提示
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 2000);
  } catch (err) {
    console.error('复制失败:', err);
  }
}

// 获取并显示随机书摘的函数
async function displayRandomQuote(container, config) {
  try {
    // 清空容器
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    
    // 使用指定的文件夹路径
    const pages = dv.pages(`"${config.folder}"`).where(p => p.file.tags && p.file.tags.includes(config.tag));

    if (pages.length === 0) {
      dv.paragraph(config.noQuoteMessage, container);
      return;
    }
    
    const randomPage = pages[Math.floor(Math.random() * pages.length)];
    
    const file = app.vault.getAbstractFileByPath(randomPage.file.path);
    const content = await app.vault.read(file);
    
    const quotelines = content.split('\n').filter(line => line.includes(config.tag));
    
    if (quotelines.length > 0) {
      const randomLine = quotelines[Math.floor(Math.random() * quotelines.length)];
      const cleanQuote = randomLine
        .replace(/#[^\s#]+/g, '') // 移除所有标签
        .replace(/\[.*?::.*?\]/g, '') // 移除内联字段 [字段::值]
        .replace(/^[#\-*\s>]+/, '') // 移除行首的Markdown标记
        .replace(/\s{2,}/g, ' ') // 将多个空格替换为单个空格
        .trim();
      
      const quoteText = cleanQuote || randomLine;
      const formattedSource = formatBookName(randomPage.file.name);
      
      // 添加引用内容
      const quoteElement = document.createElement('blockquote');
      quoteElement.innerHTML = `
        <p>${quoteText}</p>
        <p>— <em>${formattedSource}</em></p>
      `;
      container.appendChild(quoteElement);
      
      // 添加按钮容器
      const buttonContainer = document.createElement('div');
      buttonContainer.style.textAlign = 'right';
      buttonContainer.style.marginTop = '5px';
      container.appendChild(buttonContainer);
      
      // 添加复制按钮
      const copyButton = document.createElement('span');
      copyButton.textContent = ' 📋';
      copyButton.style.cursor = 'pointer';
      copyButton.style.userSelect = 'none';
      copyButton.style.marginLeft = '5px';
      copyButton.title = '复制书摘';
      
      // 将书摘内容和书名组合起来，作为复制的内容
      const fullQuote = `${quoteText}\n\n— ${formattedSource}`;
      copyButton.setAttribute('data-quote', fullQuote);
      
      copyButton.onclick = function() {
        const quote = this.getAttribute('data-quote');
        copyToClipboard(quote);
      };
      
      // 添加刷新按钮（带防抖）
      const refreshButton = document.createElement('span');
      refreshButton.textContent = ' 🔄';
      refreshButton.style.cursor = 'pointer';
      refreshButton.style.userSelect = 'none';
      refreshButton.style.marginLeft = '5px';
      refreshButton.title = '刷新书摘';

      refreshButton.onclick = function() {
        // 防抖：清除之前的定时器
        if (refreshTimeout) {
          clearTimeout(refreshTimeout);
        }

        // 设置新的定时器
        refreshTimeout = setTimeout(() => {
          displayRandomQuote(container, config);
        }, 300);
      };
      
      // 将按钮添加到按钮容器
      buttonContainer.appendChild(copyButton);
      buttonContainer.appendChild(refreshButton);
      
    } else {
      dv.paragraph(`> 在 ${randomPage.file.name} 中找不到金句内容`, container);
    }
  } catch (error) {
    const errorMessage = config.errorTemplate.replace('{error}', error.message);
    dv.paragraph(errorMessage, container);
  }
}

// 创建容器元素
const container = dv.el('div', '');

// 显示初始书摘
displayRandomQuote(container, config);
