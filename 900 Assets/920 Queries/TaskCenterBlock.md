---
cssclasses:
obsidianUIMode: preview
---

[list2card|addClass(ab-col5)]

- Vault Todo
  `$=dv.pages().where(p => !p.file.path.includes("900 Assets")).file.tasks.filter(t => !t.completed && t.status === " " && !t.text.includes("#exclude")).length`
- Postponed
  `$=dv.pages().where(p => !p.file.path.includes("900 Assets")).file.tasks.filter(t => t.status === ">" && !t.text.includes("#exclude")).length`
- Information
  `$=dv.pages().where(p => !p.file.path.includes("900 Assets")).file.tasks.filter(t => t.status === "i" || t.status === "n" || t.status === "!" && !t.text.includes("#exclude")).length`
- Cancelled
  `$=dv.pages().where(p => !p.file.path.includes("900 Assets")).file.tasks.filter(t => t.status === "/" || t.status === "-" && !t.text.includes("#exclude")).length`
- Vault Done
  `$=dv.pages().where(p => !p.file.path.includes("900 Assets")).file.tasks.filter(t => t.completed || t.status === "x" || t.status === "X" && !t.text.includes("#exclude")).length`

---

[list2tab]

- 000 Inbox
	- Inbox:
	  ```dataviewjs
	  const tasks = dv.pages('"000 Inbox"')
		 .file.tasks
		 .filter(t => !t.completed && t.status === " ");
	dv.paragraph(`📊 **任务统计**: 共 ${tasks.length} 个待办任务`);
	dv.paragraph(`---`);	
	for (let task of tasks) {
	    const fileName = task.path.split("/").pop().replace(".md", "");
	    const backlink = `[[${task.path}|📄 ${fileName}]]`;
	    dv.paragraph(`- [ ] ${task.text}  ${backlink}`);
	}
	  ```
- 100 Projects
	- Projects
	  ```dataviewjs
	  const tasks = dv.pages('"100 Projects"')
		 .file.tasks
		 .filter(t => !t.completed && t.status === " ");
	dv.paragraph(`📊 **任务统计**: 共 ${tasks.length} 个待办任务`);
	dv.paragraph(`---`);
	for (let task of tasks) {
	    const fileName = task.path.split("/").pop().replace(".md", "");
	    const backlink = `[[${task.path}|📄 ${fileName}]]`;
	    dv.paragraph(`- [ ] ${task.text}  ${backlink}`);
	}
	  ```
- 200 Areas
	- Areas
	  ```dataviewjs
	  const tasks = dv.pages('"200 Areas"')
		 .file.tasks
		 .filter(t => !t.completed && t.status === " ");
	dv.paragraph(`📊 **任务统计**: 共 ${tasks.length} 个待办任务`);
	dv.paragraph(`---`);
	for (let task of tasks) {
	    const fileName = task.path.split("/").pop().replace(".md", "");
	    const backlink = `[[${task.path}|📄 ${fileName}]]`;
	    dv.paragraph(`- [ ] ${task.text}  ${backlink}`);
	}
	  ```
- 300 Resources
	- Resources
	  ```dataviewjs
	  const tasks = dv.pages('"300 Resources"')
		 .file.tasks
		 .filter(t => !t.completed && t.status === " ");
	dv.paragraph(`📊 **任务统计**: 共 ${tasks.length} 个待办任务`);
	dv.paragraph(`---`);
	for (let task of tasks) {
	    const fileName = task.path.split("/").pop().replace(".md", "");
	    const backlink = `[[${task.path}|📄 ${fileName}]]`;
	    dv.paragraph(`- [ ] ${task.text}  ${backlink}`);
	}
	  ```
- 400 Archive
	- Archive
	  ```dataviewjs
	  const tasks = dv.pages('"400 Archive"')
		 .file.tasks
		 .filter(t => !t.completed && t.status === " ");
	dv.paragraph(`📊 **任务统计**: 共 ${tasks.length} 个待办任务`);
	dv.paragraph(`---`);
	for (let task of tasks) {
	    const fileName = task.path.split("/").pop().replace(".md", "");
	    const backlink = `[[${task.path}|📄 ${fileName}]]`;
	    dv.paragraph(`- [ ] ${task.text}  ${backlink}`);
	}
	  ```
- 500 Journal
	- Journal
	  ```dataviewjs
	  const tasks = dv.pages('"500 Journal"')
		 .file.tasks
		 .filter(t => !t.completed && t.status === " ");
	dv.paragraph(`📊 **任务统计**: 共 ${tasks.length} 个待办任务`);
	dv.paragraph(`---`);
	for (let task of tasks) {
	    const fileName = task.path.split("/").pop().replace(".md", "");
	    const backlink = `[[${task.path}|📄 ${fileName}]]`;
	    dv.paragraph(`- [ ] ${task.text}  ${backlink}`);
	}
	  ```
- 600 Zettelkasten
	- Zettelkasten
	  ```dataviewjs
	  const tasks = dv.pages('"600 Zettelkasten"')
		 .file.tasks
		 .filter(t => !t.completed && t.status === " ");
	dv.paragraph(`📊 **任务统计**: 共 ${tasks.length} 个待办任务`);
	dv.paragraph(`---`);
	for (let task of tasks) {
	    const fileName = task.path.split("/").pop().replace(".md", "");
	    const backlink = `[[${task.path}|📄 ${fileName}]]`;
	    dv.paragraph(`- [ ] ${task.text}  ${backlink}`);
	}
	  ```
- Postpone
	- 推迟任务
	  ```dataviewjs
	  	  const tasks = dv.pages()
	  	 .where(p => !p.file.path.includes("900 Assets"))
		 .file.tasks
		 .filter(t => !t.completed && t.status === ">" && !t.text.includes("#exclude"));
	dv.paragraph(`📊 **任务统计**: 共 ${tasks.length} 个已推迟任务`);
	dv.paragraph(`---`);
	for (let task of tasks) {
	    const fileName = task.path.split("/").pop().replace(".md", "");
	    const backlink = `[[${task.path}|📄 ${fileName}]]`;
	    dv.paragraph(`- [>] ${task.text}  ${backlink}`);
	}
	  ```
- Information
	- 备忘信息
	  ```dataviewjs
	const tasks = dv.pages()
	  	 .where(p => !p.file.path.includes("900 Assets"))
		 .file.tasks
		 .filter(t => !t.completed && !t.text.includes("#exclude") && (t.status === "i" || t.status === "!" || t.status === "n"));
	dv.paragraph(`📊 **任务统计**: 共 ${tasks.length} 个备忘信息`);
	dv.paragraph(`---`);
	for (let task of tasks) {
	    const fileName = task.path.split("/").pop().replace(".md", "");
	    const backlink = `[[${task.path}|📄 ${fileName}]]`;
	    dv.paragraph(`- [n] ${task.text}  ${backlink}`);
	}
	  ```







