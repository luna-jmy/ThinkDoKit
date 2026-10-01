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

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => ObsidianGanttBuilderPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian2 = require("obsidian");

// i18n.ts
var import_obsidian = require("obsidian");
var resolveLanguage = () => {
  try {
    const appLanguage = (0, import_obsidian.getLanguage)()?.toLowerCase?.();
    if (appLanguage?.startsWith("zh")) {
      return "zh";
    }
    if (appLanguage) {
      return "en";
    }
  } catch {
  }
  if (typeof navigator !== "undefined") {
    const browserLanguage = navigator.language.toLowerCase();
    if (browserLanguage.startsWith("zh")) {
      return "zh";
    }
  }
  return "en";
};
var dictionary = {
  zh: {
    defaultTargetHeading: "## \u9879\u76EE\u5206\u89E3",
    chartTitleLabel: "\u7518\u7279\u56FE\u6807\u9898",
    chartTitleHint: "\u4EC5\u5F71\u54CD Mermaid \u7518\u7279\u56FE\u91CC\u7684 title\uFF0C\u53EF\u7559\u7A7A\u3002",
    reloadFromNote: "\u4ECE\u7B14\u8BB0\u91CD\u8F7D",
    reloadSuccess: "\u5DF2\u4ECE\u5F53\u524D\u7B14\u8BB0\u91CD\u8F7D\u4EFB\u52A1",
    copyToClipboard: "\u590D\u5236\u5230\u526A\u8D34\u677F",
    mermaidCopied: "Mermaid \u4EE3\u7801\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F",
    exportSvg: "\u5BFC\u51FA SVG",
    exportPng: "\u5BFC\u51FA PNG",
    saveTasks: "\u5199\u5165/\u66F4\u65B0\u4EFB\u52A1",
    saveGantt: "\u5199\u5165/\u66F4\u65B0\u7518\u7279\u56FE",
    currentNote: "\u5F53\u524D\u7B14\u8BB0\uFF1A{name}",
    taskListTitle: "\u4EFB\u52A1\u5217\u8868\uFF08\u652F\u6301\u62D6\u62FD\u6392\u5E8F\uFF09",
    addTask: "\u65B0\u589E\u4EFB\u52A1",
    preview: "\u9884\u89C8",
    mermaidCode: "Mermaid \u4EE3\u7801",
    excludeWeekends: "\u6392\u9664\u5468\u672B",
    excludeWeekendsDesc: "\u542F\u7528\u540E\u6309\u5DE5\u4F5C\u65E5\u8BA1\u7B97\u65F6\u957F",
    writePosition: "\u5199\u5165\u4F4D\u7F6E",
    writePositionDesc: "\u540C\u65F6\u4F5C\u7528\u4E8E\u7518\u7279\u56FE\u548C\u4EFB\u52A1\u5199\u5165",
    optionCursor: "\u5149\u6807\u6240\u5728\u4F4D\u7F6E",
    optionBottom: "\u5E95\u90E8",
    unnamedTask: "\u672A\u547D\u540D\u4EFB\u52A1",
    currentDependency: "(\u5F53\u524D\u4F9D\u8D56)",
    headerAction: "\u64CD\u4F5C",
    headerGroup: "\u5206\u7EC4",
    headerTask: "\u4EFB\u52A1",
    headerDate: "\u65E5\u671F",
    headerIdDependency: "ID/\u4F9D\u8D56",
    addInCurrentGroup: "\u5728\u5F53\u524D\u5206\u7EC4\u65B0\u589E\u4EFB\u52A1",
    editTaskDetails: "\u7F16\u8F91\u4EFB\u52A1\u8BE6\u60C5",
    deleteTask: "\u5220\u9664\u4EFB\u52A1",
    groupPlaceholder: "\u5206\u7EC4\uFF0C\u5982\uFF1A\u6267\u884C\u9636\u6BB5",
    taskNamePlaceholder: "\u4EFB\u52A1\u540D\u79F0",
    done: "\u5B8C\u6210",
    milestone: "\u91CC\u7A0B\u7891",
    critical: "\u5173\u952E",
    from: "\u4ECE",
    to: "\u81F3",
    dateConflict: "\u65E5\u671F\u51B2\u7A81",
    optional: "\u53EF\u9009",
    randomIdTitle: "\u81EA\u52A8\u751F\u6210\u968F\u673A ID",
    dependency: "\u4F9D\u8D56",
    noDependency: "\u65E0\u4F9D\u8D56",
    noExportableChart: "\u672A\u627E\u5230\u53EF\u5BFC\u51FA\u7684\u7518\u7279\u56FE\uFF0C\u8BF7\u5148\u70B9\u51FB\u9884\u89C8\u3002",
    svgExported: "SVG \u5DF2\u5BFC\u51FA\uFF1A{path}",
    pngExported: "PNG \u5DF2\u5BFC\u51FA\uFF1A{path}",
    failedLoadSvgForPng: "\u65E0\u6CD5\u52A0\u8F7D SVG \u5BFC\u51FA PNG",
    createCanvasError: "\u65E0\u6CD5\u521B\u5EFA Canvas",
    cursorFallback: "\u672A\u627E\u5230\u5149\u6807\u4F4D\u7F6E\uFF0C\u5DF2\u56DE\u9000\u5230\u5E95\u90E8\u5199\u5165\u3002",
    tasksWritten: "\u4EFB\u52A1\u5DF2\u5199\u5165/\u66F4\u65B0\u5230 data \u8303\u56F4\u3002",
    ganttWritten: "\u7518\u7279\u56FE\u5DF2\u5199\u5165/\u66F4\u65B0\u3002",
    noteNotFound: "\u672A\u627E\u5230\u76EE\u6807\u7B14\u8BB0\u3002",
    openHintNoFile: "\u8BF7\u4ECE\u547D\u4EE4\u6216\u529F\u80FD\u533A\u5728\u67D0\u6761\u7B14\u8BB0\u4E2D\u6253\u5F00 Gantt Builder\u3002",
    ribbonTitle: "\u6253\u5F00\u5F53\u524D\u7B14\u8BB0 Gantt Builder",
    commandName: "\u6253\u5F00\u5F53\u524D\u7B14\u8BB0\u4EFB\u52A1\u7518\u7279\u6784\u5EFA\u5668",
    builderTabTitle: "\u7518\u7279\u6784\u5EFA\u5668",
    openMarkdownFirst: "\u8BF7\u5148\u6253\u5F00\u4E00\u6761 Markdown \u7B14\u8BB0\u3002",
    createViewFailed: "\u65E0\u6CD5\u521B\u5EFA\u76EE\u6807\u89C6\u56FE\uFF0C\u8BF7\u91CD\u8BD5\u3002",
    settingDefaultExcludeWeekends: "\u9ED8\u8BA4\u6392\u9664\u5468\u672B",
    settingDefaultExcludeWeekendsDesc: "\u65B0\u5F00\u6784\u5EFA\u5668\u65F6\u9ED8\u8BA4\u542F\u7528",
    settingOpenMode: "\u6253\u5F00\u65B9\u5F0F",
    settingOpenModeDesc: "\u9009\u62E9\u6253\u5F00\u6784\u5EFA\u5668\u7684\u9ED8\u8BA4\u4F4D\u7F6E",
    sidebar: "\u4FA7\u8FB9\u680F",
    modal: "\u5F39\u6846",
    newTab: "\u65B0\u6807\u7B7E\u9875",
    settingDefaultInsertMode: "\u9ED8\u8BA4\u5199\u5165\u4F4D\u7F6E",
    settingDefaultInsertModeDesc: "\u540C\u65F6\u4F5C\u7528\u4E8E\u7518\u7279\u56FE\u4E0E\u4EFB\u52A1\u5199\u5165",
    ungrouped: "\u672A\u5206\u7EC4"
  },
  en: {
    defaultTargetHeading: "## Project plan",
    chartTitleLabel: "Gantt title",
    chartTitleHint: "Only affects Mermaid gantt title. Leave empty for no title.",
    reloadFromNote: "Reload from note",
    reloadSuccess: "Tasks reloaded from current note.",
    copyToClipboard: "Copy to clipboard",
    mermaidCopied: "Mermaid code copied to clipboard.",
    exportSvg: "Export SVG",
    exportPng: "Export PNG",
    saveTasks: "Write or update tasks",
    saveGantt: "Write or update gantt",
    currentNote: "Current note: {name}",
    taskListTitle: "Task list (drag to reorder)",
    addTask: "Add task",
    preview: "Preview",
    mermaidCode: "Mermaid code",
    excludeWeekends: "Exclude weekends",
    excludeWeekendsDesc: "If enabled, durations are calculated by working days.",
    writePosition: "Write position",
    writePositionDesc: "Applies to both Gantt and task writing.",
    optionCursor: "At cursor",
    optionBottom: "At bottom",
    unnamedTask: "Untitled task",
    currentDependency: "(Current dependency)",
    headerAction: "Action",
    headerGroup: "Group",
    headerTask: "Task",
    headerDate: "Date",
    headerIdDependency: "ID/dependency",
    addInCurrentGroup: "Add task in current group",
    editTaskDetails: "Edit task details",
    deleteTask: "Delete task",
    groupPlaceholder: "Group, e.g. Execution",
    taskNamePlaceholder: "Task name",
    done: "Done",
    milestone: "Milestone",
    critical: "Critical",
    from: "From",
    to: "To",
    dateConflict: "Date conflict",
    optional: "Optional",
    randomIdTitle: "Generate random ID",
    dependency: "Dependency",
    noDependency: "No dependency",
    noExportableChart: "No exportable chart found. Please render preview first.",
    svgExported: "SVG exported: {path}",
    pngExported: "PNG exported: {path}",
    failedLoadSvgForPng: "Failed to load SVG for PNG export",
    createCanvasError: "Failed to create canvas",
    cursorFallback: "Cursor not found. Fallback to write at bottom.",
    tasksWritten: "Tasks written/updated to data scope.",
    ganttWritten: "Gantt written/updated.",
    noteNotFound: "Target note not found.",
    openHintNoFile: "Open Gantt Builder from a specific note via command or ribbon.",
    ribbonTitle: "Open builder for current note",
    commandName: "Open builder for current note",
    builderTabTitle: "Builder",
    openMarkdownFirst: "Please open a Markdown note first.",
    createViewFailed: "Unable to create target view. Please retry.",
    settingDefaultExcludeWeekends: "Default weekend exclusion",
    settingDefaultExcludeWeekendsDesc: "Enabled by default when opening the builder.",
    settingOpenMode: "Open location",
    settingOpenModeDesc: "Default location to open builder.",
    sidebar: "Sidebar",
    modal: "Modal",
    newTab: "New tab",
    settingDefaultInsertMode: "Default write position",
    settingDefaultInsertModeDesc: "Applies to both Gantt and task writing.",
    ungrouped: "Ungrouped"
  }
};
var t = (key, vars) => {
  const template = dictionary[resolveLanguage()][key];
  if (!vars) {
    return template;
  }
  return template.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? `{${name}}`);
};

// utils/ganttHelper.ts
var DATE_PATTERN = "\\d{4}-\\d{2}-\\d{2}";
var startDateRegex = new RegExp(`(?:\\u{1F6EB}\\uFE0F?\\s*|\\[start::\\s*)(${DATE_PATTERN})\\]?`, "u");
var scheduledDateRegex = new RegExp(`(?:\\u{23F3}\\uFE0F?\\s*|\\[scheduled::\\s*)(${DATE_PATTERN})\\]?`, "u");
var dueDateRegex = new RegExp(`(?:\\u{1F4C5}\\uFE0F?\\s*|\\[due::\\s*)(${DATE_PATTERN})\\]?`, "u");
var doneDateRegex = new RegExp(`(?:\\u{2705}\\uFE0F?|\\[completion::\\s*)(${DATE_PATTERN})\\]?`, "u");
var createdDateRegex = new RegExp(`(?:\\u{2795}\\uFE0F?|\\[created::\\s*)(${DATE_PATTERN})\\]?`, "u");
var cancelledDateRegex = new RegExp(`(?:\\u{274C}\\uFE0F?|\\[cancelled::\\s*)(${DATE_PATTERN})\\]?`, "u");
var idRegex = new RegExp(`(?:\\u{1F194}\\uFE0F?\\s*|\\[id::\\s*)([a-zA-Z0-9_-]+)\\]?`, "u");
var dependencyRegex = new RegExp(`(?:\\u{26D4}\\uFE0F?\\s*|\\[(?:dependsOn|depends on|depends)::\\s*)([a-zA-Z0-9_-]+)\\]?`, "iu");
var ownerRegex = /\[owner::\s*([^\]]+)\]/;
var milestoneRegex = new RegExp(`#milestone|\\u{1F6A9}\\uFE0F?`, "iu");
var criticalRegex = new RegExp(`#crit|#critical|\\u{1F53A}\\uFE0F?`, "iu");
var DATA_START_MARKER = "%% gantt-builder-data-start %%";
var DATA_END_MARKER = "%% gantt-builder-data-end %%";
var LEGACY_DATA_START_MARKER = "%% gantt-builder:data:start %%";
var LEGACY_DATA_END_MARKER = "%% gantt-builder:data:end %%";
var GANTT_START_MARKER = "%% gantt-builder:start %%";
var GANTT_END_MARKER = "%% gantt-builder:end %%";
var DEFAULT_CHART_TITLE = "";
var normalizeDate = (date) => {
  const trimmed = date.trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(trimmed) ? trimmed : "";
};
var cleanName = (name) => name.replace(startDateRegex, "").replace(scheduledDateRegex, "").replace(dueDateRegex, "").replace(doneDateRegex, "").replace(createdDateRegex, "").replace(cancelledDateRegex, "").replace(idRegex, "").replace(dependencyRegex, "").replace(ownerRegex, "").replace(milestoneRegex, "").replace(criticalRegex, "").replace(/\s+/g, " ").trim();
var sanitizeName = (name) => name.replace(/[:#]/g, "").trim();
var formatDate = (date) => date.toISOString().slice(0, 10);
var addDays = (dateStr, days) => {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  date.setDate(date.getDate() + days);
  return formatDate(date);
};
function parseTasksFromNote(markdown) {
  const tasks = [];
  const lines = markdown.split(/\r?\n/);
  let currentProject = "Current Note";
  let currentSection = "";
  for (const line of lines) {
    const headingMatch = line.match(/^\s{0,3}(#{2,3})\s+(.+)$/);
    if (headingMatch) {
      if (headingMatch[1].length === 2) {
        currentProject = headingMatch[2].trim();
        currentSection = "";
      } else {
        currentSection = headingMatch[2].trim();
      }
      continue;
    }
    const taskMatch = line.match(/^\s*-\s*\[([ xX])\]\s+(.+)$/);
    if (!taskMatch) {
      continue;
    }
    const raw = taskMatch[2];
    const parsedStart = normalizeDate(raw.match(startDateRegex)?.[1] ?? "");
    const parsedScheduled = normalizeDate(raw.match(scheduledDateRegex)?.[1] ?? "");
    const parsedDue = normalizeDate(raw.match(dueDateRegex)?.[1] ?? "");
    const task = {
      internalId: crypto.randomUUID(),
      name: cleanName(raw) || "Untitled Task",
      project: currentProject,
      section: currentSection,
      completed: taskMatch[1].toLowerCase() === "x",
      startDate: parsedStart || parsedScheduled,
      dueDate: parsedDue,
      owner: (raw.match(ownerRegex)?.[1] ?? "").trim(),
      id: (raw.match(idRegex)?.[1] ?? "").trim(),
      dependency: (raw.match(dependencyRegex)?.[1] ?? "").trim(),
      isMilestone: milestoneRegex.test(raw),
      isHighPriority: criticalRegex.test(raw)
    };
    tasks.push(task);
  }
  return tasks;
}
var RESERVED_ATTRS = /* @__PURE__ */ new Set(["crit", "milestone", "done", "active"]);
function parseTaskLineFromMermaid(line, section, index) {
  const match = line.match(/^\s*([^:]+?)\s*:\s*(.+)\s*$/);
  if (!match) {
    return null;
  }
  const name = match[1].trim();
  const attrs = match[2].split(",").map((part) => part.trim()).filter(Boolean);
  let completed = false;
  let isMilestone = false;
  let isHighPriority = false;
  let id = "";
  let dependency = "";
  let startDate = "";
  let dueDate = "";
  for (const token of attrs) {
    if (token === "done") {
      completed = true;
      continue;
    }
    if (token === "milestone") {
      isMilestone = true;
      continue;
    }
    if (token === "crit") {
      isHighPriority = true;
      continue;
    }
    if (token.startsWith("after ")) {
      dependency = token.slice(6).trim();
      continue;
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(token)) {
      if (!startDate) {
        startDate = token;
      } else if (!dueDate) {
        dueDate = token;
      }
      continue;
    }
    if (/^\d+d$/i.test(token)) {
      const durationDays = Math.max(1, Number.parseInt(token, 10));
      if (startDate && !dueDate) {
        dueDate = addDays(startDate, durationDays - 1);
      }
      continue;
    }
    if (!RESERVED_ATTRS.has(token) && !id) {
      id = token;
    }
  }
  if (isMilestone && !dueDate) {
    dueDate = startDate;
  }
  return {
    internalId: crypto.randomUUID(),
    name: name || `Task ${index + 1}`,
    project: "Current Note",
    section,
    completed,
    startDate,
    dueDate,
    owner: "",
    id,
    dependency,
    isMilestone,
    isHighPriority
  };
}
function parseTasksFromGanttBlock(noteContent) {
  const startIndex = noteContent.indexOf(GANTT_START_MARKER);
  const endIndex = noteContent.indexOf(GANTT_END_MARKER);
  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    return null;
  }
  const raw = noteContent.slice(startIndex + GANTT_START_MARKER.length, endIndex);
  const mermaidMatch = raw.match(/```mermaid\s*([\s\S]*?)\s*```/i);
  const mermaid = mermaidMatch?.[1]?.trim();
  if (!mermaid) {
    return null;
  }
  const lines = mermaid.split(/\r?\n/);
  const tasks = [];
  let chartTitle = DEFAULT_CHART_TITLE;
  let currentSection = "";
  lines.forEach((line, index) => {
    const titleMatch = line.match(/^\s*title\s+(.+)$/i);
    if (titleMatch) {
      chartTitle = titleMatch[1].trim() || DEFAULT_CHART_TITLE;
      return;
    }
    const sectionMatch = line.match(/^\s*section\s+(.+)$/i);
    if (sectionMatch) {
      currentSection = sectionMatch[1].trim();
      return;
    }
    const task = parseTaskLineFromMermaid(line, currentSection, index);
    if (task) {
      tasks.push(task);
    }
  });
  return tasks.length ? { chartTitle, tasks } : null;
}
var calculateWorkingDays = (startDate, endDate) => {
  if (!startDate || !endDate) {
    return 1;
  }
  const start = new Date(startDate);
  const end = new Date(endDate);
  let current = start <= end ? new Date(start) : new Date(end);
  const final = start <= end ? new Date(end) : new Date(start);
  let days = 0;
  while (current <= final) {
    const dow = current.getDay();
    if (dow !== 0 && dow !== 6) {
      days += 1;
    }
    current.setDate(current.getDate() + 1);
  }
  return Math.max(1, days);
};
function calculateDuration(task, excludeWeekends) {
  if (task.isMilestone) {
    return "0d";
  }
  if (!task.startDate || !task.dueDate) {
    return "1d";
  }
  if (excludeWeekends) {
    return `${calculateWorkingDays(task.startDate, task.dueDate)}d`;
  }
  const start = new Date(task.startDate);
  const end = new Date(task.dueDate);
  const diff = Math.floor(Math.abs(end.getTime() - start.getTime()) / 864e5) + 1;
  return `${Math.max(1, diff)}d`;
}
function calculateDependencyDuration(currentTaskDueDate, dependencyTask, excludeWeekends) {
  if (!currentTaskDueDate || !dependencyTask) {
    return "1d";
  }
  let dependencyEndDate = dependencyTask.dueDate;
  if (!dependencyEndDate) {
    if (dependencyTask.startDate) {
      dependencyEndDate = addDays(dependencyTask.startDate, 1);
    } else {
      return "1d";
    }
  }
  if (excludeWeekends) {
    const depEnd2 = new Date(dependencyEndDate);
    const nextStart = new Date(depEnd2);
    nextStart.setDate(nextStart.getDate() + 1);
    while (nextStart.getDay() === 0 || nextStart.getDay() === 6) {
      nextStart.setDate(nextStart.getDate() + 1);
    }
    return `${calculateWorkingDays(formatDate(nextStart), currentTaskDueDate)}d`;
  }
  const currentDue = new Date(currentTaskDueDate);
  const depEnd = new Date(dependencyEndDate);
  const diff = Math.ceil((currentDue.getTime() - depEnd.getTime()) / 864e5);
  return `${Math.max(1, diff)}d`;
}
function generateMermaidCode(tasks, config, chartTitle = DEFAULT_CHART_TITLE) {
  const safeTitle = sanitizeName(chartTitle);
  const lines = ["gantt"];
  if (safeTitle) {
    lines.push(`    title ${safeTitle}`);
  }
  lines.push("    dateFormat YYYY-MM-DD", "    axisFormat %m/%d", "    todayMarker on");
  if (config.excludeWeekends) {
    lines.push("    excludes weekends");
  }
  lines.push("");
  if (!tasks.length) {
    return lines.join("\n");
  }
  const sections = /* @__PURE__ */ new Map();
  for (const task of tasks) {
    const sectionName = task.section || "Tasks";
    if (!sections.has(sectionName)) {
      sections.set(sectionName, []);
    }
    sections.get(sectionName)?.push(task);
  }
  const globalTaskMap = /* @__PURE__ */ new Map();
  for (const task of tasks) {
    if (task.id) {
      globalTaskMap.set(task.id, task);
    }
  }
  sections.forEach((sectionTasks, sectionName) => {
    lines.push(`    section ${sanitizeName(sectionName) || "Tasks"}`);
    for (const task of sectionTasks) {
      const attrs = [];
      if (task.isHighPriority) {
        attrs.push("crit");
      }
      if (task.isMilestone) {
        attrs.push("milestone");
      }
      attrs.push(task.completed ? "done" : "active");
      if (task.id) {
        attrs.push(task.id);
      }
      if (task.dependency) {
        attrs.push(`after ${task.dependency}`);
        if (task.dueDate) {
          attrs.push(calculateDependencyDuration(task.dueDate, globalTaskMap.get(task.dependency), config.excludeWeekends));
        } else {
          attrs.push("1d");
        }
      } else if (task.isMilestone) {
        attrs.push(task.dueDate || task.startDate || formatDate(/* @__PURE__ */ new Date()));
        attrs.push("0d");
      } else if (task.startDate && task.dueDate) {
        attrs.push(task.startDate);
        attrs.push(calculateDuration(task, config.excludeWeekends));
      } else if (task.dueDate) {
        attrs.push(task.dueDate);
        attrs.push("1d");
      } else {
        attrs.push(formatDate(/* @__PURE__ */ new Date()));
        attrs.push("1d");
      }
      lines.push(`    ${sanitizeName(task.name) || "Untitled Task"} :${attrs.join(", ")}`);
    }
    lines.push("");
  });
  return lines.join("\n").trimEnd();
}
var toMermaidBlock = (mermaidCode) => `\`\`\`mermaid
${mermaidCode}
\`\`\``;
function loadPersistedGanttData(noteContent) {
  const ganttData = parseTasksFromGanttBlock(noteContent);
  const defaultTitle = ganttData?.chartTitle ?? DEFAULT_CHART_TITLE;
  const scopes = [
    { start: DATA_START_MARKER, end: DATA_END_MARKER },
    { start: LEGACY_DATA_START_MARKER, end: LEGACY_DATA_END_MARKER }
  ];
  for (const scope of scopes) {
    const startIndex = noteContent.indexOf(scope.start);
    const endIndex = noteContent.indexOf(scope.end);
    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
      const scopedContent = noteContent.slice(startIndex + scope.start.length, endIndex);
      return {
        chartTitle: defaultTitle,
        tasks: parseTasksFromNote(scopedContent)
      };
    }
  }
  if (ganttData) {
    return ganttData;
  }
  return null;
}
function buildGanttBlock(mermaidCode) {
  return [GANTT_START_MARKER, toMermaidBlock(mermaidCode), GANTT_END_MARKER].join("\n");
}
function replaceExistingGantt(noteContent, ganttBlock) {
  const startIndex = noteContent.indexOf(GANTT_START_MARKER);
  const endIndex = noteContent.indexOf(GANTT_END_MARKER);
  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    return null;
  }
  const before = noteContent.slice(0, startIndex).replace(/\s+$/, "");
  const after = noteContent.slice(endIndex + GANTT_END_MARKER.length).replace(/^\s+/, "");
  return `${before}

${ganttBlock}

${after}`.trimEnd() + "\n";
}
function insertBlockByMode(noteContent, block, options) {
  if (options.mode === "cursor" && typeof options.cursorOffset === "number") {
    const offset = Math.max(0, Math.min(options.cursorOffset, noteContent.length));
    return `${noteContent.slice(0, offset)}
${block}
${noteContent.slice(offset)}`.trimEnd() + "\n";
  }
  return `${noteContent.replace(/\s*$/, "")}

${block}
`.trimStart();
}
function upsertGanttArtifacts(noteContent, mermaidCode, _tasks, _chartTitle = DEFAULT_CHART_TITLE, options = { mode: "bottom", useCustomTitle: true }) {
  const ganttBlock = buildGanttBlock(mermaidCode);
  const replaced = replaceExistingGantt(noteContent, ganttBlock);
  if (replaced) {
    return replaced;
  }
  return insertBlockByMode(noteContent, ganttBlock, options);
}
function serializeTasksToMarkdown(tasks) {
  const sections = /* @__PURE__ */ new Map();
  for (const task of tasks) {
    const sectionName = task.section.trim() || t("ungrouped");
    if (!sections.has(sectionName)) {
      sections.set(sectionName, []);
    }
    sections.get(sectionName)?.push(task);
  }
  const lines = [];
  sections.forEach((sectionTasks, sectionName) => {
    lines.push(`### ${sectionName}`);
    for (const task of sectionTasks) {
      const parts = [`- [${task.completed ? "x" : " "}]`, task.name || "Untitled Task"];
      if (task.startDate) {
        parts.push(`\u{1F6EB} ${task.startDate}`);
      }
      if (task.dueDate) {
        parts.push(`\u{1F4C5} ${task.dueDate}`);
      }
      if (task.id) {
        parts.push(`\u{1F194} ${task.id}`);
      }
      if (task.dependency) {
        parts.push(`\u26D4 ${task.dependency}`);
      }
      if (task.isHighPriority) {
        parts.push("\u{1F53A}");
      }
      if (task.isMilestone) {
        parts.push("#milestone");
      }
      lines.push(parts.join(" "));
    }
    lines.push("");
  });
  return lines.join("\n").trim();
}
function upsertTaskScope(noteContent, tasks, options = { mode: "bottom" }) {
  const taskBody = serializeTasksToMarkdown(tasks);
  const block = `${DATA_START_MARKER}
${taskBody}
${DATA_END_MARKER}`;
  const scopes = [
    { start: DATA_START_MARKER, end: DATA_END_MARKER },
    { start: LEGACY_DATA_START_MARKER, end: LEGACY_DATA_END_MARKER }
  ];
  for (const scope of scopes) {
    const startIndex = noteContent.indexOf(scope.start);
    const endIndex = noteContent.indexOf(scope.end);
    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
      const before = noteContent.slice(0, startIndex).replace(/\s+$/, "");
      const after = noteContent.slice(endIndex + scope.end.length).replace(/^\s+/, "");
      return `${before}

${block}

${after}`.trimEnd() + "\n";
    }
  }
  return insertBlockByMode(noteContent, block, options);
}

// main.ts
var VIEW_TYPE_GANTT_BUILDER = "gantt-builder-view";
var DEFAULT_SETTINGS = {
  excludeWeekends: true,
  openMode: "modal",
  insertMode: "bottom"
};
var createEmptyTask = (section = "") => ({
  internalId: crypto.randomUUID(),
  name: "",
  project: "Current Note",
  section,
  completed: false,
  startDate: "",
  dueDate: "",
  owner: "",
  id: "",
  dependency: "",
  isMilestone: false,
  isHighPriority: false
});
var TaskDetailsModal = class extends import_obsidian2.Modal {
  constructor(app, task, dependencyOptions, onTaskChange) {
    super(app);
    this.task = task;
    this.dependencyOptions = dependencyOptions;
    this.onTaskChange = onTaskChange;
    this.modalEl.addClass("gantt-builder-details-modal");
  }
  onOpen() {
    this.titleEl.setText(this.task.name || t("unnamedTask"));
    this.contentEl.empty();
    const cardEl = this.contentEl.createDiv("gantt-builder-details-card");
    const statusEl = cardEl.createDiv("gantt-builder-details-status");
    this.createFlagToggle(statusEl, t("done"), this.task.completed, async (value) => {
      this.task.completed = value;
      await this.onTaskChange();
    });
    this.createFlagToggle(statusEl, t("milestone"), this.task.isMilestone, async (value) => {
      this.task.isMilestone = value;
      await this.onTaskChange();
    });
    this.createFlagToggle(statusEl, t("critical"), this.task.isHighPriority, async (value) => {
      this.task.isHighPriority = value;
      await this.onTaskChange();
    });
    const dateGridEl = cardEl.createDiv("gantt-builder-details-grid");
    const startInput = this.createDateField(dateGridEl, t("from"), this.task.startDate);
    const dueInput = this.createDateField(dateGridEl, t("to"), this.task.dueDate);
    const conflictEl = cardEl.createDiv("gantt-builder-date-conflict");
    const updateConflict = () => {
      const hasConflict = Boolean(this.task.startDate && this.task.dueDate && new Date(this.task.startDate) > new Date(this.task.dueDate));
      conflictEl.setText(hasConflict ? t("dateConflict") : "");
    };
    updateConflict();
    startInput.onchange = async () => {
      this.task.startDate = startInput.value.trim();
      updateConflict();
      await this.onTaskChange();
    };
    dueInput.onchange = async () => {
      this.task.dueDate = dueInput.value.trim();
      updateConflict();
      await this.onTaskChange();
    };
    const idRowEl = cardEl.createDiv("gantt-builder-details-id-row");
    const idWrapEl = idRowEl.createDiv("gantt-builder-details-field");
    idWrapEl.createEl("label", { text: "ID" });
    const idInput = idWrapEl.createEl("input", { type: "text", value: this.task.id, placeholder: t("optional") });
    idInput.onchange = async () => {
      this.task.id = idInput.value.trim();
      await this.onTaskChange();
    };
    const randomButton = idRowEl.createEl("button", {
      text: "\u{1F3B2}",
      attr: { title: t("randomIdTitle"), "aria-label": t("randomIdTitle") }
    });
    randomButton.onclick = async () => {
      this.task.id = `task-${Math.random().toString(36).slice(2, 8)}`;
      idInput.value = this.task.id;
      await this.onTaskChange();
    };
    const dependencyFieldEl = cardEl.createDiv("gantt-builder-details-field");
    dependencyFieldEl.createEl("label", { text: t("dependency") });
    const dependencySelect = dependencyFieldEl.createEl("select");
    dependencySelect.createEl("option", { value: "", text: t("noDependency") });
    for (const option of this.dependencyOptions) {
      dependencySelect.createEl("option", { value: option.value, text: option.label });
    }
    dependencySelect.value = this.task.dependency || "";
    dependencySelect.onchange = async () => {
      this.task.dependency = dependencySelect.value;
      await this.onTaskChange();
    };
  }
  createFlagToggle(parentEl, labelText, checked, onChange) {
    const labelEl = parentEl.createEl("label");
    const inputEl = labelEl.createEl("input", { attr: { type: "checkbox" } });
    inputEl.checked = checked;
    inputEl.onchange = async () => {
      await onChange(inputEl.checked);
    };
    labelEl.appendText(labelText);
  }
  createDateField(parentEl, labelText, value) {
    const fieldEl = parentEl.createDiv("gantt-builder-details-field");
    fieldEl.createEl("label", { text: labelText });
    return fieldEl.createEl("input", { type: "date", value });
  }
};
var GanttBuilderEditor = class {
  constructor(app, file, rootEl, settings, onSettingsChange) {
    this.tasks = [];
    this.chartTitle = DEFAULT_CHART_TITLE;
    this.draggingTaskId = null;
    this.app = app;
    this.file = file;
    this.rootEl = rootEl;
    this.config = { excludeWeekends: settings.excludeWeekends };
    this.insertMode = settings.insertMode;
    this.onSettingsChange = onSettingsChange;
    this.previewComponent = new import_obsidian2.Component();
    this.previewComponent.load();
    const toolbarEl = this.rootEl.createDiv("gantt-builder-toolbar");
    const topButtonsEl = toolbarEl.createDiv("gantt-builder-button-row");
    const reloadButton = topButtonsEl.createEl("button", { text: t("reloadFromNote") });
    reloadButton.onclick = async () => {
      await this.reloadTasks();
      this.renderTaskTable();
      await this.refreshPreview();
      new import_obsidian2.Notice(t("reloadSuccess"));
    };
    const copyButton = topButtonsEl.createEl("button", { text: t("copyToClipboard") });
    copyButton.onclick = async () => {
      const code = generateMermaidCode(this.tasks, this.config, this.getEffectiveChartTitle());
      await navigator.clipboard.writeText(toMermaidBlock(code));
      new import_obsidian2.Notice(t("mermaidCopied"));
    };
    const exportSvgButton = topButtonsEl.createEl("button", { text: t("exportSvg") });
    exportSvgButton.onclick = async () => {
      await this.exportSvg();
    };
    const exportPngButton = topButtonsEl.createEl("button", { text: t("exportPng") });
    exportPngButton.onclick = async () => {
      await this.exportPng();
    };
    const saveTasksButton = topButtonsEl.createEl("button", { text: t("saveTasks") });
    saveTasksButton.onclick = async () => {
      await this.saveTasksToNote();
    };
    const saveGanttButton = topButtonsEl.createEl("button", { text: t("saveGantt"), cls: "mod-cta" });
    saveGanttButton.onclick = async () => {
      await this.saveGanttToNote();
    };
    this.rootEl.createDiv("gantt-builder-note-title").setText(t("currentNote", { name: this.file.basename }));
    const taskHeaderEl = this.rootEl.createDiv("gantt-builder-task-header");
    taskHeaderEl.createEl("h3", { text: t("taskListTitle") });
    const addTaskButton = taskHeaderEl.createEl("button", { text: t("addTask"), cls: "mod-cta" });
    addTaskButton.onclick = async () => {
      this.tasks.push(createEmptyTask());
      this.renderTaskTable();
      await this.refreshPreview();
    };
    this.tableWrapEl = this.rootEl.createDiv("gantt-builder-table-wrap");
    const viewerWrapEl = this.rootEl.createDiv("gantt-builder-viewer");
    const tabsEl = viewerWrapEl.createDiv("gantt-builder-tabs");
    const previewTabButton = tabsEl.createEl("button", { text: t("preview"), cls: "is-active" });
    const codeTabButton = tabsEl.createEl("button", { text: t("mermaidCode") });
    previewTabButton.onclick = () => this.switchTab("preview", previewTabButton, codeTabButton);
    codeTabButton.onclick = () => this.switchTab("code", previewTabButton, codeTabButton);
    const previewOptionsEl = tabsEl.createDiv("gantt-builder-preview-options");
    const titleWrapEl = previewOptionsEl.createDiv("gantt-builder-title-wrap");
    titleWrapEl.createEl("label", { text: t("chartTitleLabel"), attr: { title: t("chartTitleHint") } });
    this.titleInputEl = titleWrapEl.createEl("input", {
      type: "text",
      placeholder: t("optional"),
      value: this.chartTitle,
      attr: { title: t("chartTitleHint") }
    });
    this.titleInputEl.onchange = async () => {
      this.chartTitle = this.titleInputEl.value.trim();
      this.titleInputEl.value = this.chartTitle;
      await this.refreshPreview();
    };
    const excludeWeekendsLabel = previewOptionsEl.createEl("label", { attr: { title: t("excludeWeekendsDesc") } });
    const excludeWeekendsToggle = excludeWeekendsLabel.createEl("input", { attr: { type: "checkbox" } });
    excludeWeekendsToggle.checked = this.config.excludeWeekends;
    excludeWeekendsToggle.onchange = async () => {
      this.config.excludeWeekends = excludeWeekendsToggle.checked;
      await this.onSettingsChange({ excludeWeekends: this.config.excludeWeekends });
      await this.refreshPreview();
    };
    excludeWeekendsLabel.appendText(t("excludeWeekends"));
    this.previewPaneEl = viewerWrapEl.createDiv("gantt-builder-preview");
    this.codePaneEl = viewerWrapEl.createDiv("gantt-builder-code-pane");
    this.codePaneEl.addClass("is-hidden");
    this.codeTextEl = this.codePaneEl.createEl("textarea", {
      cls: "gantt-builder-code",
      attr: { readonly: "true" }
    });
  }
  async initialize() {
    await this.reloadTasks();
    this.renderTaskTable();
    await this.refreshPreview();
  }
  destroy() {
    this.previewComponent.unload();
  }
  switchTab(tab, previewButton, codeButton) {
    const previewActive = tab === "preview";
    previewButton.toggleClass("is-active", previewActive);
    codeButton.toggleClass("is-active", !previewActive);
    this.previewPaneEl.toggleClass("is-hidden", !previewActive);
    this.codePaneEl.toggleClass("is-hidden", previewActive);
  }
  updateTitleInputAvailability() {
    this.titleInputEl.disabled = false;
  }
  getEffectiveChartTitle() {
    return this.chartTitle;
  }
  hasDateConflict(task) {
    if (!task.startDate || !task.dueDate) {
      return false;
    }
    return new Date(task.startDate) > new Date(task.dueDate);
  }
  async reloadTasks() {
    const content = await this.app.vault.read(this.file);
    const persisted = loadPersistedGanttData(content);
    if (persisted) {
      this.tasks = persisted.tasks.length ? persisted.tasks : [createEmptyTask()];
      this.chartTitle = persisted.chartTitle || DEFAULT_CHART_TITLE;
      this.titleInputEl.value = this.chartTitle;
      return;
    }
    this.tasks = parseTasksFromNote(content);
    if (!this.tasks.length) {
      this.tasks = [createEmptyTask()];
    }
    this.chartTitle = DEFAULT_CHART_TITLE;
    this.titleInputEl.value = this.chartTitle;
  }
  generateRandomTaskId() {
    return `task-${Math.random().toString(36).slice(2, 8)}`;
  }
  getDependencyOptions(currentTask) {
    const options = this.tasks.filter((task) => task.internalId !== currentTask.internalId && task.id.trim()).map((task) => ({ value: task.id.trim(), label: `${task.id.trim()} \xB7 ${task.name || t("unnamedTask")}` }));
    if (currentTask.dependency && !options.some((item) => item.value === currentTask.dependency)) {
      options.unshift({ value: currentTask.dependency, label: `${currentTask.dependency} \xB7 ${t("currentDependency")}` });
    }
    return options;
  }
  moveTask(sourceId, targetId) {
    if (sourceId === targetId) {
      return;
    }
    const sourceIndex = this.tasks.findIndex((item) => item.internalId === sourceId);
    const targetIndex = this.tasks.findIndex((item) => item.internalId === targetId);
    if (sourceIndex === -1 || targetIndex === -1) {
      return;
    }
    const [moved] = this.tasks.splice(sourceIndex, 1);
    this.tasks.splice(targetIndex, 0, moved);
  }
  renderTaskTable() {
    this.tableWrapEl.empty();
    const table = this.tableWrapEl.createEl("table", { cls: "gantt-builder-table" });
    const head = table.createTHead();
    const headerRow = head.insertRow();
    [t("headerAction"), t("headerGroup"), t("headerTask")].forEach((title) => headerRow.createEl("th", { text: title }));
    const body = table.createTBody();
    for (const task of this.tasks) {
      const row = body.insertRow();
      row.draggable = true;
      row.dataset.taskId = task.internalId;
      row.addEventListener("dragstart", (event) => {
        this.draggingTaskId = task.internalId;
        event.dataTransfer?.setData("text/plain", task.internalId);
      });
      row.addEventListener("dragover", (event) => {
        event.preventDefault();
        row.classList.add("gantt-builder-row-drop");
      });
      row.addEventListener("dragleave", () => row.classList.remove("gantt-builder-row-drop"));
      row.addEventListener("drop", () => {
        row.classList.remove("gantt-builder-row-drop");
        if (!this.draggingTaskId) {
          return;
        }
        this.moveTask(this.draggingTaskId, task.internalId);
        this.draggingTaskId = null;
        this.renderTaskTable();
        void this.refreshPreview();
      });
      const actionCell = row.insertCell();
      const actionStack = actionCell.createDiv("gantt-builder-action-stack");
      const addButton = actionStack.createEl("button", { text: "+", attr: { title: t("addInCurrentGroup") } });
      const editButton = actionStack.createEl("button", { text: "\u270E", attr: { title: t("editTaskDetails"), "aria-label": t("editTaskDetails") } });
      const removeButton = actionStack.createEl("button", { text: "-", cls: "mod-warning", attr: { title: t("deleteTask") } });
      addButton.onclick = async () => {
        const index = this.tasks.findIndex((item) => item.internalId === task.internalId);
        this.tasks.splice(index + 1, 0, createEmptyTask(task.section));
        this.renderTaskTable();
        await this.refreshPreview();
      };
      editButton.onclick = () => this.openTaskDetailsModal(task);
      removeButton.onclick = async () => {
        this.tasks = this.tasks.filter((item) => item.internalId !== task.internalId);
        if (!this.tasks.length) {
          this.tasks.push(createEmptyTask());
        }
        this.renderTaskTable();
        await this.refreshPreview();
      };
      const sectionCell = row.insertCell();
      const sectionInput = sectionCell.createEl("input", {
        type: "text",
        cls: "gantt-builder-group-input",
        placeholder: t("groupPlaceholder")
      });
      sectionInput.value = task.section;
      sectionInput.onchange = async () => {
        task.section = sectionInput.value.trim();
        await this.refreshPreview();
      };
      const taskCell = row.insertCell();
      const taskMainCell = taskCell.createDiv("gantt-builder-task-main-cell");
      const taskInput = taskMainCell.createEl("textarea", {
        cls: "gantt-builder-task-input",
        attr: { rows: "1", placeholder: t("taskNamePlaceholder") }
      });
      taskInput.value = task.name;
      taskInput.onchange = async () => {
        task.name = taskInput.value.trim();
        await this.refreshPreview();
      };
      if (this.hasDateConflict(task)) {
        row.classList.add("gantt-builder-row-conflict");
      }
    }
  }
  openTaskDetailsModal(task) {
    new TaskDetailsModal(this.app, task, this.getDependencyOptions(task), async () => {
      this.renderTaskTable();
      await this.refreshPreview();
    }).open();
  }
  getCursorOffsetForCurrentFile() {
    const markdownView = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
    if (!markdownView?.file || markdownView.file.path !== this.file.path) {
      return void 0;
    }
    const editor = markdownView.editor;
    const cursor = editor.getCursor();
    if (typeof editor.posToOffset === "function") {
      return editor.posToOffset(cursor);
    }
    const lines = editor.getValue().split("\n");
    let offset = 0;
    for (let line = 0; line < cursor.line; line++) {
      offset += (lines[line] ?? "").length + 1;
    }
    return offset + cursor.ch;
  }
  getRenderedSvgElement() {
    return this.previewPaneEl.querySelector("svg");
  }
  async saveBinaryToVault(filename, bytes) {
    const attachmentFolder = this.app.vault.getConfig?.("attachmentFolderPath") || "";
    const normalizedFolder = attachmentFolder.trim();
    const path = normalizedFolder ? `${normalizedFolder}/${filename}` : filename;
    await this.app.vault.createBinary(path, bytes);
    return path;
  }
  async exportSvg() {
    const svgElement = this.getRenderedSvgElement();
    if (!svgElement) {
      new import_obsidian2.Notice(t("noExportableChart"));
      return;
    }
    const cloned = svgElement.cloneNode(true);
    cloned.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const content = `<?xml version="1.0" encoding="UTF-8"?>
${new XMLSerializer().serializeToString(cloned)}`;
    const bytes = new TextEncoder().encode(content);
    const savedPath = await this.saveBinaryToVault(`${this.file.basename}-gantt-${Date.now()}.svg`, bytes);
    new import_obsidian2.Notice(t("svgExported", { path: savedPath }));
  }
  async exportPng() {
    const svgElement = this.getRenderedSvgElement();
    if (!svgElement) {
      new import_obsidian2.Notice(t("noExportableChart"));
      return;
    }
    const cloned = svgElement.cloneNode(true);
    cloned.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const viewBox = cloned.getAttribute("viewBox");
    let width = 1200;
    let height = 600;
    if (viewBox) {
      const parts = viewBox.split(/[,\s]+/).filter(Boolean);
      if (parts.length >= 4) {
        width = Math.max(1, Math.round(Number(parts[2])));
        height = Math.max(1, Math.round(Number(parts[3])));
      }
    }
    const svgRaw = new XMLSerializer().serializeToString(cloned);
    const blob = new Blob([svgRaw], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    try {
      const image = await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(t("failedLoadSvgForPng")));
        img.src = url;
      });
      const canvas = document.createElement("canvas");
      canvas.width = width * 2;
      canvas.height = height * 2;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error(t("createCanvasError"));
      }
      ctx.scale(2, 2);
      ctx.drawImage(image, 0, 0, width, height);
      const dataUrl = canvas.toDataURL("image/png");
      const base64 = dataUrl.split(",")[1];
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const savedPath = await this.saveBinaryToVault(`${this.file.basename}-gantt-${Date.now()}.png`, bytes);
      new import_obsidian2.Notice(t("pngExported", { path: savedPath }));
    } finally {
      URL.revokeObjectURL(url);
    }
  }
  async refreshPreview() {
    const mermaidCode = generateMermaidCode(this.tasks, this.config, this.getEffectiveChartTitle());
    this.codeTextEl.value = toMermaidBlock(mermaidCode);
    this.previewPaneEl.empty();
    await import_obsidian2.MarkdownRenderer.render(this.app, `${toMermaidBlock(mermaidCode)}
`, this.previewPaneEl, this.file.path, this.previewComponent);
  }
  async saveTasksToNote() {
    const content = await this.app.vault.read(this.file);
    const cursorOffset = this.getCursorOffsetForCurrentFile();
    const mode = this.insertMode === "cursor" && cursorOffset === void 0 ? "bottom" : this.insertMode;
    if (this.insertMode === "cursor" && cursorOffset === void 0) {
      new import_obsidian2.Notice(t("cursorFallback"));
    }
    const next = upsertTaskScope(content, this.tasks, {
      mode,
      cursorOffset
    });
    await this.app.vault.modify(this.file, next);
    new import_obsidian2.Notice(t("tasksWritten"));
  }
  async saveGanttToNote() {
    const content = await this.app.vault.read(this.file);
    const effectiveTitle = this.getEffectiveChartTitle();
    const mermaidCode = generateMermaidCode(this.tasks, this.config, effectiveTitle);
    const cursorOffset = this.getCursorOffsetForCurrentFile();
    const mode = this.insertMode === "cursor" && cursorOffset === void 0 ? "bottom" : this.insertMode;
    if (this.insertMode === "cursor" && cursorOffset === void 0) {
      new import_obsidian2.Notice(t("cursorFallback"));
    }
    const next = upsertGanttArtifacts(content, mermaidCode, this.tasks, effectiveTitle, {
      mode,
      cursorOffset,
      useCustomTitle: true
    });
    await this.app.vault.modify(this.file, next);
    new import_obsidian2.Notice(t("ganttWritten"));
  }
};
var GanttBuilderModal = class extends import_obsidian2.Modal {
  constructor(app, plugin, file) {
    super(app);
    this.editor = null;
    this.plugin = plugin;
    this.file = file;
    this.modalEl.addClass("gantt-builder-modal");
  }
  async onOpen() {
    this.contentEl.empty();
    this.titleEl.setText(`${t("builderTabTitle")} \xB7 ${this.file.basename}`);
    this.editor = new GanttBuilderEditor(
      this.app,
      this.file,
      this.contentEl,
      {
        excludeWeekends: this.plugin.settings.excludeWeekends,
        insertMode: this.plugin.settings.insertMode
      },
      async (update) => {
        Object.assign(this.plugin.settings, update);
        await this.plugin.saveSettings();
      }
    );
    await this.editor.initialize();
  }
  onClose() {
    this.editor?.destroy();
    this.editor = null;
    this.contentEl.empty();
  }
};
var GanttBuilderWorkspaceView = class extends import_obsidian2.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.file = null;
    this.editor = null;
    this.renderVersion = 0;
    this.plugin = plugin;
  }
  getViewType() {
    return VIEW_TYPE_GANTT_BUILDER;
  }
  getDisplayText() {
    return this.file ? `${t("builderTabTitle")} \xB7 ${this.file.basename}` : t("builderTabTitle");
  }
  getIcon() {
    return "calendar-clock";
  }
  async setState(state) {
    const file = this.app.vault.getAbstractFileByPath(state.filePath);
    if (!(file instanceof import_obsidian2.TFile)) {
      new import_obsidian2.Notice(t("noteNotFound"));
      return;
    }
    await this.setFile(file);
  }
  getState() {
    return { filePath: this.file?.path ?? "" };
  }
  async onOpen() {
    this.registerEvent(
      this.app.workspace.on("file-open", (file) => {
        if (file instanceof import_obsidian2.TFile) {
          void this.setFile(file);
        }
      })
    );
    const activeFile = this.app.workspace.getActiveFile();
    if (activeFile instanceof import_obsidian2.TFile) {
      await this.setFile(activeFile);
      return;
    }
    await this.renderEditor();
  }
  onClose() {
    this.renderVersion += 1;
    this.editor?.destroy();
    this.editor = null;
    return Promise.resolve();
  }
  async setFile(file) {
    if (this.file?.path === file.path) {
      return;
    }
    this.file = file;
    await this.renderEditor();
  }
  async renderEditor() {
    const renderVersion = ++this.renderVersion;
    const container = this.containerEl.children[1];
    if (!container) {
      return;
    }
    container.empty();
    if (!this.file) {
      container.createEl("div", { text: t("openHintNoFile") });
      return;
    }
    this.editor?.destroy();
    const editor = new GanttBuilderEditor(
      this.app,
      this.file,
      container,
      {
        excludeWeekends: this.plugin.settings.excludeWeekends,
        insertMode: this.plugin.settings.insertMode
      },
      async (update) => {
        Object.assign(this.plugin.settings, update);
        await this.plugin.saveSettings();
      }
    );
    this.editor = editor;
    await editor.initialize();
    if (renderVersion !== this.renderVersion) {
      if (this.editor === editor) {
        this.editor = null;
      }
      editor.destroy();
      return;
    }
    this.leaf.setEphemeralState({ title: `${t("builderTabTitle")} \xB7 ${this.file.basename}` });
  }
};
var ObsidianGanttBuilderPlugin = class extends import_obsidian2.Plugin {
  constructor() {
    super(...arguments);
    this.settings = DEFAULT_SETTINGS;
  }
  async onload() {
    await this.loadSettings();
    this.registerView(VIEW_TYPE_GANTT_BUILDER, (leaf) => new GanttBuilderWorkspaceView(leaf, this));
    this.addRibbonIcon("calendar-clock", t("ribbonTitle"), () => void this.openBuilderForActiveNote());
    this.addCommand({
      id: "open-note-gantt-builder",
      name: t("commandName"),
      checkCallback: (checking) => {
        const markdownView = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
        if (!markdownView?.file) {
          return false;
        }
        if (!checking) {
          void this.openBuilderForActiveNote();
        }
        return true;
      }
    });
    this.addSettingTab(new GanttBuilderSettingTab(this.app, this));
  }
  async loadSettings() {
    const legacyData = await this.loadData();
    const loaded = Object.assign({}, DEFAULT_SETTINGS, legacyData);
    if (legacyData.insertMode === "heading") {
      loaded.insertMode = DEFAULT_SETTINGS.insertMode;
    }
    this.settings = loaded;
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  async openBuilderForActiveNote() {
    const markdownView = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
    const file = markdownView?.file;
    if (!file) {
      new import_obsidian2.Notice(t("openMarkdownFirst"));
      return;
    }
    if (this.settings.openMode === "modal") {
      new GanttBuilderModal(this.app, this, file).open();
      return;
    }
    const leaf = this.settings.openMode === "sidebar" ? this.app.workspace.getRightLeaf(false) : this.app.workspace.getLeaf("tab");
    if (!leaf) {
      new import_obsidian2.Notice(t("createViewFailed"));
      return;
    }
    await leaf.setViewState({
      type: VIEW_TYPE_GANTT_BUILDER,
      active: true,
      state: { filePath: file.path }
    });
    await this.app.workspace.revealLeaf(leaf);
  }
};
var GanttBuilderSettingTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    new import_obsidian2.Setting(containerEl).setName(t("settingDefaultExcludeWeekends")).setDesc(t("settingDefaultExcludeWeekendsDesc")).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.excludeWeekends).onChange(async (value) => {
        this.plugin.settings.excludeWeekends = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("settingOpenMode")).setDesc(t("settingOpenModeDesc")).addDropdown(
      (dropdown) => dropdown.addOption("new-tab", t("newTab")).addOption("sidebar", t("sidebar")).addOption("modal", t("modal")).setValue(this.plugin.settings.openMode).onChange(async (value) => {
        this.plugin.settings.openMode = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("settingDefaultInsertMode")).setDesc(t("settingDefaultInsertModeDesc")).addDropdown(
      (dropdown) => dropdown.addOption("cursor", t("optionCursor")).addOption("bottom", t("optionBottom")).setValue(this.plugin.settings.insertMode).onChange(async (value) => {
        this.plugin.settings.insertMode = value;
        await this.plugin.saveSettings();
      })
    );
  }
};
