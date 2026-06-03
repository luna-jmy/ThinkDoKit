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
  default: () => TaskMatrixPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");

// src/types.ts
var DEFAULT_SETTINGS = {
  scanFolders: [],
  excludeFolders: [],
  defaultView: "eisenhower",
  includeCompleted: true,
  includeCompletedWithoutDueDate: false,
  completedTaskDisplayRange: 1,
  openLocation: "sidebar",
  completionMarkers: ["x", "X"],
  excludeMarkers: [],
  cancelledMarkers: ["-"],
  listShowCancelled: false,
  listGroupByFolder: false,
  listGroupByFolderDepth: 1,
  newTaskTargetPath: "",
  newTaskTargetHeading: "",
  trackCompletionDate: false,
  urgentDaysRange: 1,
  showCalendarWeekends: true,
  showCalendarMonthWeekends: true,
  calendarListShowFullMonth: false,
  showCalendarInProcessTasks: false,
  calendarFirstDayOfWeek: "monday",
  dueDateDisplayRange: 1,
  hideFutureStartTasks: true
};

// src/task-parser.ts
var PRIORITY_MARKERS = [
  ["\u{1F53A}", "critical" /* Critical */],
  ["\u23EB", "highest" /* Highest */],
  ["\u{1F53C}", "high" /* High */],
  ["\u{1F53D}", "low" /* Low */],
  ["\u23EC", "lowest" /* Lowest */]
];
var FIELD_PATTERNS = {
  dueDate: /\ud83d\udcc5\s*(\d{4}-\d{2}-\d{2})/u,
  startDate: /\ud83d\udeeb\ufe0f?\s*(\d{4}-\d{2}-\d{2})/u,
  scheduledDate: /\u23f3\s*(\d{4}-\d{2}-\d{2})/u,
  doneDate: /\u2705\s*(\d{4}-\d{2}-\d{2})/u,
  createdDate: /\u2795\s*(\d{4}-\d{2}-\d{2})/u,
  recurrence: /\ud83d\udd04\s*([^\n]+)/u,
  taskIdIcon: /\ud83c\udd94\s*([^\s#]+)/u,
  taskIdField: /\bid::\s*([^\s#]+)/iu,
  dependsIcon: /\u26d4\s*([^\s#]+)/u,
  dependsField: /\bdependsOn::\s*([^\s#]+)/iu
};
var TASK_PATTERN = /^[ \t]*[-*][ \t]\[([^\]]*)\][ \t]+(.*)$/u;
function extractValue(text, regex) {
  const match = text.match(regex);
  return match?.[1]?.trim();
}
function cleanDescription(raw) {
  return raw.replace(FIELD_PATTERNS.dueDate, "").replace(FIELD_PATTERNS.startDate, "").replace(FIELD_PATTERNS.scheduledDate, "").replace(FIELD_PATTERNS.doneDate, "").replace(FIELD_PATTERNS.createdDate, "").replace(FIELD_PATTERNS.recurrence, "").replace(FIELD_PATTERNS.taskIdIcon, "").replace(FIELD_PATTERNS.taskIdField, "").replace(FIELD_PATTERNS.dependsIcon, "").replace(FIELD_PATTERNS.dependsField, "").replace(/[\u{1f4c5}\u{1f6eb}\u{23f3}\u{2705}\u{2795}\u{1f504}\u{1f194}\u{26d4}\u{1f53c}\u{23eb}\u{1f53d}\u{23ec}\u{1f53a}]/gu, "").replace(/\s+/g, " ").trim();
}
function isoDateOffset(days) {
  const date = /* @__PURE__ */ new Date();
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function getToday() {
  return isoDateOffset(0);
}
function isCompletedCheckbox(checkboxContent, completionMarkers) {
  const trimmed = checkboxContent.trim();
  return completionMarkers.includes(trimmed);
}
function isCancelledCheckbox(checkboxContent, cancelledMarkers) {
  const trimmed = checkboxContent.trim();
  return cancelledMarkers.includes(trimmed);
}
function computeDisplayStatus(checkboxContent, completionMarkers, cancelledMarkers, dueDate, startDate) {
  if (isCompletedCheckbox(checkboxContent, completionMarkers)) {
    return "completed";
  }
  if (isCancelledCheckbox(checkboxContent, cancelledMarkers)) {
    return "cancelled";
  }
  const today = getToday();
  if (dueDate && dueDate < today) {
    return "overdue";
  }
  if (startDate && startDate > today) {
    return "to-be-started";
  }
  return "open";
}
function computeGtdState(displayStatus, checkboxContent, description, dueDate, startDate, blocked) {
  if (displayStatus === "completed" || displayStatus === "cancelled") {
    return "Done";
  }
  const desc = description.toLowerCase();
  const today = getToday();
  if (blocked || desc.includes("#waiting") || desc.includes("#delegated") || desc.includes("#blocked")) {
    return "Waiting";
  }
  if (desc.includes("#started") || desc.includes("#doing") || desc.includes("#active")) {
    return "In Progress";
  }
  if (dueDate && dueDate < today) {
    return "Overdue";
  }
  if (startDate) {
    if (startDate < today) {
      return "In Progress";
    } else if (startDate > today) {
      return "To be Started";
    }
  }
  if (desc.includes("#doing") || desc.includes("#active") || desc.includes("#next")) {
    return "In Progress";
  }
  return "Inbox";
}
function computeQuadrant(priority, dueDate, urgentDaysRange) {
  const isImportant = priority === "critical" /* Critical */ || priority === "highest" /* Highest */ || priority === "high" /* High */;
  const urgentDeadline = isoDateOffset(urgentDaysRange - 1);
  const isUrgent = Boolean(dueDate && dueDate <= urgentDeadline);
  if (isImportant && isUrgent) return "Q1";
  if (isImportant && !isUrgent) return "Q2";
  if (!isImportant && isUrgent) return "Q3";
  return "Q4";
}
function parseTaskLine(line, filePath, lineNumber, settings) {
  const match = line.match(TASK_PATTERN);
  if (!match) return null;
  const checkboxContent = match[1];
  if (checkboxContent.includes("::")) return null;
  const rawDescription = match[2];
  const priority = PRIORITY_MARKERS.find(([marker]) => rawDescription.includes(marker))?.[1] ?? "none" /* None */;
  const dueDate = extractValue(rawDescription, FIELD_PATTERNS.dueDate);
  const startDate = extractValue(rawDescription, FIELD_PATTERNS.startDate);
  const scheduledDate = extractValue(rawDescription, FIELD_PATTERNS.scheduledDate);
  const doneDate = extractValue(rawDescription, FIELD_PATTERNS.doneDate);
  const createdDate = extractValue(rawDescription, FIELD_PATTERNS.createdDate);
  const recurrence = extractValue(rawDescription, FIELD_PATTERNS.recurrence);
  const taskId = extractValue(rawDescription, FIELD_PATTERNS.taskIdIcon) ?? extractValue(rawDescription, FIELD_PATTERNS.taskIdField);
  const dependsOn = extractValue(rawDescription, FIELD_PATTERNS.dependsIcon) ?? extractValue(rawDescription, FIELD_PATTERNS.dependsField);
  const tags = Array.from(rawDescription.matchAll(/(^|\s)(#[\p{L}\p{N}_/-]+)/gu)).map((entry) => entry[2].toLowerCase());
  const description = cleanDescription(rawDescription);
  const blocked = Boolean(dependsOn);
  const displayStatus = computeDisplayStatus(checkboxContent, settings.completionMarkers, settings.cancelledMarkers, dueDate, startDate);
  const gtdState = computeGtdState(displayStatus, checkboxContent, description, dueDate, startDate, blocked);
  const quadrant = computeQuadrant(priority, dueDate, settings.urgentDaysRange);
  return {
    id: `${filePath}:${lineNumber}:${description}`,
    filePath,
    lineNumber,
    lineText: line,
    description,
    checkboxStatus: checkboxContent,
    displayStatus,
    priority,
    dueDate,
    startDate,
    scheduledDate,
    doneDate,
    createdDate,
    recurrence,
    taskId,
    dependsOn,
    tags,
    blocked,
    gtdState,
    quadrant
  };
}
function priorityRank(priority) {
  switch (priority) {
    case "critical" /* Critical */:
      return 6;
    case "highest" /* Highest */:
      return 5;
    case "high" /* High */:
      return 4;
    case "medium" /* Medium */:
      return 3;
    case "none" /* None */:
      return 2;
    case "low" /* Low */:
      return 1;
    case "lowest" /* Lowest */:
      return 0;
  }
}
function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    const dueA = a.dueDate ?? "9999-99-99";
    const dueB = b.dueDate ?? "9999-99-99";
    if (dueA !== dueB) return dueA.localeCompare(dueB);
    const priorityDiff = priorityRank(b.priority) - priorityRank(a.priority);
    if (priorityDiff !== 0) return priorityDiff;
    if (a.filePath !== b.filePath) return a.filePath.localeCompare(b.filePath);
    return a.lineNumber - b.lineNumber;
  });
}
function generateShortId() {
  return Math.random().toString(36).substring(2, 8);
}

// src/main.ts
var VIEW_TYPE_TASK_MATRIX = "task-matrix-view";
var ICONS = {
  refresh: "\u21BB",
  list: "List",
  gtd: "GTD",
  eisenhower: "Matrix",
  calendar: "Calendar"
};
var TaskMatrixPlugin = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.settings = DEFAULT_SETTINGS;
    this.tasks = [];
    this.refreshTimer = null;
  }
  async onload() {
    await this.loadSettings();
    await this.refreshTasks();
    this.registerView(
      VIEW_TYPE_TASK_MATRIX,
      (leaf) => new TaskMatrixView(leaf, this)
    );
    this.addRibbonIcon("kanban-square", "Open task matrix", () => {
      void this.activateView();
    });
    this.addCommand({
      id: "open-view",
      name: "Open view",
      callback: () => {
        void this.activateView();
      }
    });
    this.addCommand({
      id: "refresh-view",
      name: "Refresh view",
      callback: () => {
        void this.refreshTasks(true);
      }
    });
    this.registerEvent(this.app.vault.on("create", (file) => this.handleVaultChange(file)));
    this.registerEvent(this.app.vault.on("modify", (file) => this.handleVaultChange(file)));
    this.registerEvent(this.app.vault.on("delete", (file) => this.handleVaultChange(file)));
    this.registerEvent(this.app.vault.on("rename", (file, oldPath) => this.handleVaultRename(file, oldPath)));
    this.addSettingTab(new TaskMatrixSettingTab(this.app, this));
  }
  onunload() {
  }
  async loadSettings() {
    const savedSettings = await this.loadData();
    this.settings = { ...DEFAULT_SETTINGS, ...savedSettings ?? {} };
  }
  async saveSettings() {
    await this.saveData(this.settings);
    await this.refreshOpenViews();
  }
  async activateView() {
    let leaf = this.app.workspace.getLeavesOfType(VIEW_TYPE_TASK_MATRIX)[0];
    if (!leaf) {
      if (this.settings.openLocation === "tab") {
        leaf = this.app.workspace.getLeaf(true);
      } else {
        leaf = this.app.workspace.getRightLeaf(false);
      }
      if (leaf) {
        await leaf.setViewState({ type: VIEW_TYPE_TASK_MATRIX, active: true });
      }
    }
    if (leaf) {
      await this.app.workspace.revealLeaf(leaf);
    }
  }
  scheduleRefresh() {
    if (this.refreshTimer !== null) {
      window.clearTimeout(this.refreshTimer);
    }
    this.refreshTimer = window.setTimeout(() => {
      void this.refreshTasks();
      this.refreshTimer = null;
    }, 500);
  }
  async refreshTasks(showNotice = false) {
    this.tasks = await this.collectTasks();
    await this.refreshOpenViews();
    if (showNotice) {
      new import_obsidian.Notice(`Task matrix refreshed: ${this.tasks.length} tasks`);
    }
  }
  async refreshOpenViews() {
    for (const leaf of this.app.workspace.getLeavesOfType(VIEW_TYPE_TASK_MATRIX)) {
      const view = leaf.view;
      if (view instanceof TaskMatrixView) {
        await view.render();
      }
    }
  }
  isExcalidrawFilePath(path) {
    return path.toLowerCase().endsWith(".excalidraw.md");
  }
  shouldIncludePath(path) {
    for (const excludeFolder of this.settings.excludeFolders) {
      const trimmed = excludeFolder.trim().replace(/^\/+|\/+$/g, "");
      if (trimmed && (path === trimmed || path.startsWith(`${trimmed}/`))) {
        return false;
      }
    }
    if (this.settings.scanFolders.length === 0) return true;
    for (const scanFolder of this.settings.scanFolders) {
      const trimmed = scanFolder.trim().replace(/^\/+|\/+$/g, "");
      if (trimmed && (path === trimmed || path.startsWith(`${trimmed}/`))) {
        return true;
      }
    }
    return false;
  }
  shouldTrackMarkdownPath(path) {
    return path.toLowerCase().endsWith(".md") && !this.isExcalidrawFilePath(path) && this.shouldIncludePath(path);
  }
  handleVaultChange(file) {
    if (file instanceof import_obsidian.TFile && this.shouldTrackMarkdownPath(file.path)) {
      this.scheduleRefresh();
    }
  }
  handleVaultRename(file, oldPath) {
    const currentPathMatches = file instanceof import_obsidian.TFile && this.shouldTrackMarkdownPath(file.path);
    const oldPathMatches = this.shouldTrackMarkdownPath(oldPath);
    if (currentPathMatches || oldPathMatches) {
      this.scheduleRefresh();
    }
  }
  shouldIncludeFile(file) {
    return this.shouldTrackMarkdownPath(file.path);
  }
  async collectTasks(options) {
    const tasks = [];
    const files = this.app.vault.getMarkdownFiles().filter((file) => this.shouldIncludeFile(file));
    for (const file of files) {
      const content = await this.app.vault.cachedRead(file);
      const lines = content.split(/\r?\n/u);
      let currentHeading;
      const fileCache = this.app.metadataCache.getFileCache(file);
      const codeSections = fileCache?.sections?.filter((s) => s.type === "code") ?? [];
      const codeBlockLines = /* @__PURE__ */ new Set();
      for (const section of codeSections) {
        const startLine = section.position.start.line + 1;
        const endLine = section.position.end.line + 1;
        for (let i = startLine; i <= endLine; i++) {
          codeBlockLines.add(i);
        }
      }
      for (let index = 0; index < lines.length; index++) {
        const line = lines[index];
        const lineNumber = index + 1;
        if (codeBlockLines.has(lineNumber)) continue;
        const headingMatch = line.match(/^\s{0,3}#{1,6}\s+(.+?)\s*#*\s*$/u);
        if (headingMatch) {
          currentHeading = headingMatch[1].trim();
        }
        const parsed = parseTaskLine(line, file.path, index + 1, this.settings);
        if (!parsed) continue;
        if (this.settings.excludeMarkers.includes(parsed.checkboxStatus.trim())) {
          continue;
        }
        parsed.sectionHeading = currentHeading;
        if (!options?.ignoreIncludeCompleted && !this.settings.includeCompleted && (parsed.displayStatus === "completed" || parsed.displayStatus === "cancelled")) {
          continue;
        }
        if (!options?.ignoreIncludeCompleted && parsed.displayStatus === "completed" && !parsed.dueDate && !this.settings.includeCompletedWithoutDueDate) {
          continue;
        }
        if (!options?.ignoreIncludeCompleted && this.settings.includeCompleted && !this.settings.includeCompletedWithoutDueDate && parsed.displayStatus === "completed") {
          if (this.settings.completedTaskDisplayRange > 0) {
            const cutoffDate = isoDateOffset(-this.settings.completedTaskDisplayRange * 30);
            const completedRangeDate = parsed.doneDate ?? parsed.dueDate;
            if (!completedRangeDate || completedRangeDate < cutoffDate) {
              continue;
            }
          }
        }
        tasks.push(parsed);
      }
    }
    const completedIds = new Set(tasks.filter((t) => t.displayStatus === "completed").map((t) => t.taskId).filter(Boolean));
    for (const task of tasks) {
      if (task.dependsOn) {
        task.blocked = !completedIds.has(task.dependsOn);
        task.gtdState = computeGtdState(task.displayStatus, task.checkboxStatus, task.description, task.dueDate, task.startDate, task.blocked);
      }
    }
    return sortTasks(tasks);
  }
  // Task operations
  async toggleTaskStatus(task) {
    const file = this.app.vault.getAbstractFileByPath(task.filePath);
    if (!(file instanceof import_obsidian.TFile)) {
      new import_obsidian.Notice(`File not found: ${task.filePath}`);
      return;
    }
    const content = await this.app.vault.read(file);
    const lines = content.split(/\r?\n/u);
    const lineIndex = task.lineNumber - 1;
    if (lineIndex < 0 || lineIndex >= lines.length) {
      new import_obsidian.Notice(`Line ${task.lineNumber} not found in file`);
      return;
    }
    const line = lines[lineIndex];
    const isCompleted = this.settings.completionMarkers.includes(task.checkboxStatus.trim());
    const defaultCompleteMarker = this.settings.completionMarkers[0] ?? "x";
    const newMarker = isCompleted ? " " : defaultCompleteMarker;
    let newLine = line.replace(/\[[^\]]*\]/u, `[${newMarker}]`);
    if (!isCompleted && this.settings.trackCompletionDate) {
      const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      newLine = `${newLine} \u2705 ${today}`;
    } else if (isCompleted && this.settings.trackCompletionDate) {
      newLine = newLine.replace(/\s*✅\s*\d{4}-\d{2}-\d{2}/u, "");
    }
    if (newLine !== line) {
      lines[lineIndex] = newLine;
      await this.app.vault.modify(file, lines.join("\n"));
      new import_obsidian.Notice(isCompleted ? "Task reopened" : "Task completed");
    }
  }
  async cancelTask(task) {
    const file = this.app.vault.getAbstractFileByPath(task.filePath);
    if (!(file instanceof import_obsidian.TFile)) {
      new import_obsidian.Notice(`File not found: ${task.filePath}`);
      return;
    }
    const content = await this.app.vault.read(file);
    const lines = content.split(/\r?\n/u);
    const lineIndex = task.lineNumber - 1;
    if (lineIndex < 0 || lineIndex >= lines.length) {
      new import_obsidian.Notice(`Line ${task.lineNumber} not found in file`);
      return;
    }
    const line = lines[lineIndex];
    const defaultCancelledMarker = this.settings.cancelledMarkers[0] ?? "-";
    const newLine = line.replace(/\[[^\]]*\]/u, `[${defaultCancelledMarker}]`);
    if (newLine !== line) {
      lines[lineIndex] = newLine;
      await this.app.vault.modify(file, lines.join("\n"));
      new import_obsidian.Notice("Task cancelled");
    }
  }
  async startTask(task) {
    const file = this.app.vault.getAbstractFileByPath(task.filePath);
    if (!(file instanceof import_obsidian.TFile)) {
      new import_obsidian.Notice(`File not found: ${task.filePath}`);
      return;
    }
    const content = await this.app.vault.read(file);
    const lines = content.split(/\r?\n/u);
    const lineIndex = task.lineNumber - 1;
    if (lineIndex < 0 || lineIndex >= lines.length) {
      new import_obsidian.Notice(`Line ${task.lineNumber} not found in file`);
      return;
    }
    const line = lines[lineIndex];
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    let newLine = line;
    if (!line.includes("\u{1F6EB}")) {
      newLine = `${line} \u{1F6EB} ${today}`;
    }
    if (!line.toLowerCase().includes("#doing")) {
      newLine = `${newLine} #doing`;
    }
    if (newLine !== line) {
      lines[lineIndex] = newLine;
      await this.app.vault.modify(file, lines.join("\n"));
      new import_obsidian.Notice("Task started");
    }
  }
  async deleteTask(task) {
    const file = this.app.vault.getAbstractFileByPath(task.filePath);
    if (!(file instanceof import_obsidian.TFile)) {
      new import_obsidian.Notice(`File not found: ${task.filePath}`);
      return;
    }
    const content = await this.app.vault.read(file);
    const lines = content.split(/\r?\n/u);
    const lineIndex = task.lineNumber - 1;
    if (lineIndex < 0 || lineIndex >= lines.length) {
      new import_obsidian.Notice(`Line ${task.lineNumber} not found in file`);
      return;
    }
    lines.splice(lineIndex, 1);
    await this.app.vault.modify(file, lines.join("\n"));
    new import_obsidian.Notice("Task deleted");
  }
  async updateTaskLine(task, newLine) {
    const file = this.app.vault.getAbstractFileByPath(task.filePath);
    if (!(file instanceof import_obsidian.TFile)) {
      new import_obsidian.Notice(`File not found: ${task.filePath}`);
      return;
    }
    const content = await this.app.vault.read(file);
    const lines = content.split(/\r?\n/u);
    const lineIndex = task.lineNumber - 1;
    if (lineIndex < 0 || lineIndex >= lines.length) {
      new import_obsidian.Notice(`Line ${task.lineNumber} not found in file`);
      return;
    }
    lines[lineIndex] = newLine;
    await this.app.vault.modify(file, lines.join("\n"));
  }
  // Check if there's a date conflict (start date > due date)
  checkDateConflict(startDate, dueDate) {
    if (!startDate || !dueDate) return false;
    return startDate > dueDate;
  }
  // Drag and drop: move task to different state/quadrant
  async moveTaskToGTDState(task, newState) {
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const updates = {};
    let tagToAdd = "";
    let removeTags = [];
    let shouldComplete = false;
    switch (newState) {
      case "Waiting":
        tagToAdd = "#waiting";
        removeTags = ["#doing", "#active", "#next"];
        break;
      case "In Progress":
        tagToAdd = "#doing";
        removeTags = ["#waiting", "#delegated", "#blocked"];
        updates.startDate = today;
        break;
      case "To be Started":
        removeTags = ["#doing", "#active", "#next", "#waiting", "#delegated", "#blocked"];
        break;
      case "Overdue":
        updates.dueDate = today;
        removeTags = ["#waiting", "#delegated", "#blocked"];
        break;
      case "Done":
        shouldComplete = true;
        removeTags = ["#doing", "#active", "#next", "#waiting", "#delegated", "#blocked"];
        break;
      case "Inbox":
        removeTags = ["#doing", "#active", "#next", "#waiting", "#delegated", "#blocked"];
        break;
    }
    const effectiveStartDate = updates.startDate ?? task.startDate;
    const effectiveDueDate = updates.dueDate ?? task.dueDate;
    const hasDateConflict = this.checkDateConflict(effectiveStartDate, effectiveDueDate);
    if (hasDateConflict && updates.startDate) {
      new DateConflictModal(
        this.app,
        effectiveStartDate,
        effectiveDueDate,
        (result) => {
          void (async () => {
            if (result.adjustDueDate) {
              updates.dueDate = today;
              new import_obsidian.Notice("Due date adjusted to today");
            } else if (result.addConflictTag) {
              new import_obsidian.Notice("Date conflict tag added");
            } else {
              return;
            }
            await this.applyGtdStateChanges(task, newState, updates, tagToAdd, removeTags, shouldComplete, result.addConflictTag);
          })();
        }
      ).open();
      return;
    }
    const noChangesNeeded = task.gtdState === newState && !updates.startDate && !updates.dueDate && !shouldComplete;
    if (noChangesNeeded) return;
    await this.applyGtdStateChanges(task, newState, updates, tagToAdd, removeTags, shouldComplete, false);
  }
  async applyGtdStateChanges(task, newState, updates, tagToAdd, removeTags, shouldComplete, addConflictTag) {
    const file = this.app.vault.getAbstractFileByPath(task.filePath);
    if (!(file instanceof import_obsidian.TFile)) return;
    const content = await this.app.vault.read(file);
    const lines = content.split(/\r?\n/u);
    const lineIndex = task.lineNumber - 1;
    if (lineIndex < 0 || lineIndex >= lines.length) return;
    let line = lines[lineIndex];
    for (const tag of removeTags) {
      const tagRegex = new RegExp(`\\s*${tag}\\b`, "gi");
      line = line.replace(tagRegex, "");
    }
    line = line.replace(/\s*#due-date-conflict\b/gi, "");
    line = line.trim();
    if (tagToAdd && !line.toLowerCase().includes(tagToAdd.toLowerCase())) {
      line += ` ${tagToAdd}`;
    }
    if (addConflictTag && !line.toLowerCase().includes("#due-date-conflict")) {
      line += " #due-date-conflict";
    }
    if (shouldComplete) {
      const defaultCompleteMarker = this.settings.completionMarkers[0] ?? "x";
      line = line.replace(/\[[^\]]*\]/u, `[${defaultCompleteMarker}]`);
    }
    if (updates.startDate !== void 0) {
      line = line.replace(/\s*🛫(?:\s*\d{4}-\d{2}-\d{2})?/gu, "");
      if (updates.startDate) {
        line += ` \u{1F6EB} ${updates.startDate}`;
      }
    }
    if (updates.dueDate !== void 0) {
      line = line.replace(/\s*📅(?:\s*\d{4}-\d{2}-\d{2})?/gu, "");
      if (updates.dueDate) {
        line += ` \u{1F4C5} ${updates.dueDate}`;
      }
    }
    lines[lineIndex] = line;
    await this.app.vault.modify(file, lines.join("\n"));
    new import_obsidian.Notice(`Moved to ${newState}`);
  }
  async moveTaskToQuadrant(task, newQuadrant) {
    if (task.quadrant === newQuadrant) return;
    const file = this.app.vault.getAbstractFileByPath(task.filePath);
    if (!(file instanceof import_obsidian.TFile)) return;
    const content = await this.app.vault.read(file);
    const lines = content.split(/\r?\n/u);
    const lineIndex = task.lineNumber - 1;
    if (lineIndex < 0 || lineIndex >= lines.length) return;
    let line = lines[lineIndex];
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    let priorityMarker = "";
    let shouldAddDueDate = false;
    switch (newQuadrant) {
      case "Q1":
        priorityMarker = "\u{1F53C}";
        shouldAddDueDate = true;
        break;
      case "Q2":
        priorityMarker = "\u{1F53C}";
        break;
      case "Q3":
        priorityMarker = "\u{1F53D}";
        shouldAddDueDate = true;
        break;
      case "Q4":
        priorityMarker = "\u23EC";
        break;
    }
    line = line.replace(/⏫|🔼|🔽|⏬/gu, "").trim();
    if (priorityMarker) {
      const checkboxMatch = line.match(/^(\s*[-*]\s*\[[ xX/-]\]\s*)/);
      if (checkboxMatch) {
        line = line.replace(checkboxMatch[1], checkboxMatch[1] + priorityMarker + " ");
      }
    }
    line = line.replace(/\s*📅(?:\s*\d{4}-\d{2}-\d{2})?/gu, "").trim();
    if (shouldAddDueDate) {
      line = line + ` \u{1F4C5} ${today}`;
    }
    lines[lineIndex] = line;
    await this.app.vault.modify(file, lines.join("\n"));
    new import_obsidian.Notice(`Moved to ${newQuadrant}`);
  }
};
var TaskMatrixView = class extends import_obsidian.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.calendarMode = "month";
    this.calendarDate = /* @__PURE__ */ new Date();
    this.calendarSummaryOpen = false;
    this.searchQuery = "";
    this.dateFiltersOpen = false;
    this.startDateFilter = { operator: "any", value: "" };
    this.dueDateFilter = { operator: "any", value: "" };
    this.collapsedMatrixQuadrants = /* @__PURE__ */ new Set();
    this.collapsedGtdColumns = /* @__PURE__ */ new Set();
    this.collapsedFolderGroups = /* @__PURE__ */ new Set();
    this.shellEl = null;
    this.bodyEl = null;
    this.searchEl = null;
    this.searchDebounceTimer = null;
    this.currentView = plugin.settings.defaultView;
  }
  getViewType() {
    return VIEW_TYPE_TASK_MATRIX;
  }
  getDisplayText() {
    return "Task matrix";
  }
  getIcon() {
    return "kanban-square";
  }
  async onOpen() {
    await this.render();
  }
  onClose() {
    if (this.searchDebounceTimer) {
      window.clearTimeout(this.searchDebounceTimer);
    }
    this.contentEl.empty();
    return Promise.resolve();
  }
  async render() {
    const root = this.contentEl;
    root.empty();
    root.addClass("task-matrix-view");
    this.shellEl = root.createDiv({ cls: "task-matrix-shell" });
    this.renderHeader(this.shellEl);
    await this.renderBodyContainer(this.shellEl);
  }
  async renderBodyContainer(parent) {
    if (this.bodyEl) {
      this.bodyEl.remove();
    }
    this.bodyEl = parent.createDiv({ cls: "task-matrix-body" });
    await this.renderBodyContent(this.bodyEl);
  }
  async refreshBody() {
    if (this.bodyEl) {
      this.bodyEl.empty();
      await this.renderBodyContent(this.bodyEl);
    }
  }
  get filteredTasks() {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) return this.plugin.tasks;
    return this.plugin.tasks.filter((task) => {
      const matchesQuery = [task.description, task.filePath, task.taskId, task.dependsOn].filter(Boolean).some((value) => String(value).toLowerCase().includes(query));
      return matchesQuery;
    });
  }
  get visibleTasks() {
    const { dueDateDisplayRange, hideFutureStartTasks } = this.plugin.settings;
    return this.filteredTasks.filter((task) => {
      if (this.currentView === "list" && !this.plugin.settings.listShowCancelled && task.displayStatus === "cancelled") {
        return false;
      }
      if (this.currentView === "calendar" && task.displayStatus === "cancelled") {
        return false;
      }
      if (dueDateDisplayRange > 0 && task.dueDate && task.displayStatus !== "overdue" && task.displayStatus !== "completed" && task.displayStatus !== "cancelled") {
        const maxDue = isoDateOffset(dueDateDisplayRange * 30);
        if (task.dueDate > maxDue) return false;
      }
      if (hideFutureStartTasks && task.startDate && task.displayStatus === "to-be-started") {
        const maxStart = isoDateOffset(30);
        if (task.startDate > maxStart) return false;
      }
      return this.matchesDateFilter(task.startDate, this.startDateFilter) && this.matchesDateFilter(task.dueDate, this.dueDateFilter);
    });
  }
  matchesDateFilter(dateValue, filter) {
    switch (filter.operator) {
      case "any":
        return true;
      case "is-empty":
        return !dateValue;
      case "is-not-empty":
        return Boolean(dateValue);
      default:
        if (!dateValue || !filter.value) return true;
        switch (filter.operator) {
          case "not-on":
            return dateValue !== filter.value;
          case "on":
            return dateValue === filter.value;
          case "before":
            return dateValue < filter.value;
          case "on-or-before":
            return dateValue <= filter.value;
          case "after":
            return dateValue > filter.value;
          case "on-or-after":
            return dateValue >= filter.value;
          default:
            return true;
        }
    }
  }
  usesDateValue(operator) {
    return !["any", "is-empty", "is-not-empty"].includes(operator);
  }
  isMobileLayout() {
    return window.matchMedia("(max-width: 800px)").matches;
  }
  getActiveDateFilterCount() {
    let count = 0;
    if (this.startDateFilter.operator !== "any") count++;
    if (this.dueDateFilter.operator !== "any") count++;
    return count;
  }
  renderHeader(parent) {
    const header = parent.createDiv({ cls: "task-matrix-header" });
    const titleBlock = header.createDiv({ cls: "task-matrix-title-block" });
    titleBlock.createEl("div", { text: "Obsidian task matrix", cls: "task-matrix-kicker" });
    titleBlock.createEl("h2", { text: "Vault task dashboards", cls: "task-matrix-title" });
    titleBlock.createEl("p", {
      text: `${this.plugin.tasks.length} tasks across ${new Set(this.plugin.tasks.map((task) => task.filePath)).size} files`,
      cls: "task-matrix-subtitle"
    });
    const toolbar = header.createDiv({ cls: "task-matrix-toolbar" });
    this.searchEl = toolbar.createEl("input", {
      type: "search",
      placeholder: "Search tasks, file paths, ids...",
      cls: "task-matrix-search"
    });
    this.searchEl.value = this.searchQuery;
    this.searchEl.addEventListener("input", () => {
      this.searchQuery = this.searchEl?.value || "";
      if (this.searchDebounceTimer) {
        window.clearTimeout(this.searchDebounceTimer);
      }
      this.searchDebounceTimer = window.setTimeout(() => {
        void this.refreshBody();
      }, 150);
    });
    const filterWrap = toolbar.createDiv({ cls: "task-matrix-filter-wrap" });
    const activeDateFilterCount = this.getActiveDateFilterCount();
    const filterButton = filterWrap.createEl("button", {
      text: activeDateFilterCount > 0 ? `Date filters (${activeDateFilterCount})` : "Date filters",
      cls: `task-matrix-filter-btn${activeDateFilterCount > 0 ? " is-active" : ""}`
    });
    const updateFilterButtonState = () => {
      const count = this.getActiveDateFilterCount();
      filterButton.setText(count > 0 ? `Date filters (${count})` : "Date filters");
      filterButton.toggleClass("is-active", count > 0);
    };
    filterButton.addEventListener("click", () => {
      this.dateFiltersOpen = !this.dateFiltersOpen;
      if (this.dateFiltersOpen) {
        filterPanel.removeAttribute("hidden");
      } else {
        filterPanel.setAttribute("hidden", "hidden");
      }
    });
    const filterPanel = filterWrap.createDiv({ cls: "task-matrix-filter-panel" });
    if (!this.dateFiltersOpen) {
      filterPanel.setAttribute("hidden", "hidden");
    }
    const filterGroup = filterPanel.createDiv({ cls: "task-matrix-filter-group" });
    const renderDateFilterRow = (label, filter, onChange) => {
      const row = filterGroup.createDiv({ cls: "task-matrix-filter-row" });
      row.createEl("label", { text: label });
      const selectEl = row.createEl("select");
      const options = [
        { value: "any", label: "Any" },
        { value: "not-on", label: "Not on" },
        { value: "on", label: "On" },
        { value: "before", label: "Before" },
        { value: "on-or-before", label: "On or before" },
        { value: "after", label: "After" },
        { value: "on-or-after", label: "On or after" },
        { value: "is-empty", label: "Is empty" },
        { value: "is-not-empty", label: "Is not empty" }
      ];
      for (const option of options) {
        selectEl.createEl("option", { value: option.value, text: option.label });
      }
      selectEl.value = filter.operator;
      const dateInput = row.createEl("input", { type: "date" });
      dateInput.value = filter.value;
      const syncDateInputState = () => {
        const needsDate = this.usesDateValue(selectEl.value);
        dateInput.disabled = !needsDate;
        if (!needsDate) {
          dateInput.value = "";
        }
      };
      syncDateInputState();
      const updateFilter = () => {
        const operator = selectEl.value;
        const value = this.usesDateValue(operator) ? dateInput.value : "";
        onChange({ operator, value });
        updateFilterButtonState();
        void this.refreshBody();
      };
      selectEl.addEventListener("change", () => {
        syncDateInputState();
        updateFilter();
      });
      dateInput.addEventListener("change", updateFilter);
    };
    renderDateFilterRow("Start date", this.startDateFilter, (next) => {
      this.startDateFilter = next;
    });
    renderDateFilterRow("Due date", this.dueDateFilter, (next) => {
      this.dueDateFilter = next;
    });
    const filterActions = filterPanel.createDiv({ cls: "task-matrix-filter-actions" });
    const clearButton = filterActions.createEl("button", {
      text: "Clear filters",
      cls: "task-matrix-filter-clear"
    });
    clearButton.addEventListener("click", () => {
      this.startDateFilter = { operator: "any", value: "" };
      this.dueDateFilter = { operator: "any", value: "" };
      this.dateFiltersOpen = false;
      updateFilterButtonState();
      void this.render();
    });
    const segmented = toolbar.createDiv({ cls: "task-matrix-segmented" });
    this.renderModeButton(segmented, "list", ICONS.list);
    this.renderModeButton(segmented, "gtd", ICONS.gtd);
    this.renderModeButton(segmented, "eisenhower", ICONS.eisenhower);
    this.renderModeButton(segmented, "calendar", ICONS.calendar);
    const completedBtn = toolbar.createEl("button", {
      text: "\u2713",
      cls: `task-matrix-toolbar-btn${this.plugin.settings.includeCompleted ? " is-active" : ""}`
    });
    completedBtn.title = this.plugin.settings.includeCompleted ? "Hide completed tasks" : "Show completed tasks";
    completedBtn.addEventListener("click", () => {
      this.plugin.settings.includeCompleted = !this.plugin.settings.includeCompleted;
      void this.plugin.saveSettings();
      void this.plugin.refreshTasks(true);
    });
    const isAllCollapsed = () => {
      if (this.currentView === "list") {
        const grouped = this.groupTasksByFolder(this.visibleTasks, this.plugin.settings.listGroupByFolderDepth);
        const keys = Object.keys(grouped).map((fp) => fp || "Root");
        return keys.length > 0 && keys.every((k) => this.collapsedFolderGroups.has(k));
      }
      if (this.currentView === "gtd") {
        const states = ["Inbox", "In Progress", "Waiting", "Done"];
        return states.every((s) => this.collapsedGtdColumns.has(s));
      }
      if (this.currentView === "eisenhower") {
        const quads = ["Q1", "Q2", "Q3", "Q4"];
        return quads.every((q) => this.collapsedMatrixQuadrants.has(q));
      }
      return false;
    };
    const collapseBtn = toolbar.createEl("button", {
      text: "\u229E",
      cls: "task-matrix-toolbar-btn"
    });
    collapseBtn.title = "Collapse all";
    collapseBtn.addEventListener("click", () => {
      if (isAllCollapsed()) {
        if (this.currentView === "list") {
          this.collapsedFolderGroups.clear();
        } else if (this.currentView === "gtd") {
          this.collapsedGtdColumns.clear();
        } else if (this.currentView === "eisenhower") {
          this.collapsedMatrixQuadrants.clear();
        }
      } else {
        if (this.currentView === "list") {
          const grouped = this.groupTasksByFolder(this.visibleTasks, this.plugin.settings.listGroupByFolderDepth);
          this.collapsedFolderGroups = new Set(Object.keys(grouped).map((fp) => fp || "Root"));
        } else if (this.currentView === "gtd") {
          this.collapsedGtdColumns = /* @__PURE__ */ new Set(["Inbox", "In Progress", "Waiting", "Done"]);
        } else if (this.currentView === "eisenhower") {
          this.collapsedMatrixQuadrants = /* @__PURE__ */ new Set(["Q1", "Q2", "Q3", "Q4"]);
        }
      }
      void this.refreshBody();
    });
    const refreshButton = toolbar.createEl("button", {
      text: ICONS.refresh,
      cls: "task-matrix-refresh"
    });
    refreshButton.title = "Refresh task index";
    refreshButton.addEventListener("click", () => {
      void this.plugin.refreshTasks(true);
    });
  }
  renderModeButton(parent, mode, label) {
    const button = parent.createEl("button", {
      text: label,
      cls: `task-matrix-mode-button${this.currentView === mode ? " is-active" : ""}`
    });
    button.addEventListener("click", () => {
      this.currentView = mode;
      void this.render();
    });
  }
  async renderBodyContent(parent) {
    const tasks = this.visibleTasks;
    if (tasks.length === 0) {
      const empty = parent.createDiv({ cls: "task-matrix-empty" });
      empty.createEl("h3", { text: "No tasks found" });
      empty.createEl("p", {
        text: this.searchQuery || this.getActiveDateFilterCount() > 0 ? "The current search or date filters did not match any tasks." : "Create markdown tasks in your vault, then refresh this view."
      });
      return;
    }
    if (this.currentView === "list") {
      await this.renderList(parent, tasks);
      return;
    }
    if (this.currentView === "gtd") {
      await this.renderGtd(parent, tasks);
      return;
    }
    if (this.currentView === "calendar") {
      await this.renderCalendar(parent, tasks);
      return;
    }
    await this.renderEisenhower(parent, tasks);
  }
  async renderList(parent, tasks) {
    const wrap = parent.createDiv({ cls: "task-matrix-list" });
    if (this.plugin.settings.listGroupByFolder) {
      const grouped = this.groupTasksByFolder(tasks, this.plugin.settings.listGroupByFolderDepth);
      const groupEntries = Object.entries(grouped);
      for (const [folderPath, folderTasks] of groupEntries) {
        const groupEl = wrap.createDiv({ cls: "task-matrix-folder-group" });
        const groupKey = folderPath || "Root";
        const toggle = groupEl.createEl("button", {
          cls: "task-matrix-folder-header task-matrix-folder-toggle"
        });
        const content = groupEl.createDiv({ cls: "task-matrix-folder-content" });
        const renderToggleLabel = () => {
          const collapsed = this.collapsedFolderGroups.has(groupKey);
          const marker = collapsed ? "\u25B8" : "\u25BE";
          toggle.setText(`${marker} ${groupKey} (${folderTasks.length})`);
          if (collapsed) {
            content.addClass("is-collapsed");
          } else {
            content.removeClass("is-collapsed");
          }
        };
        renderToggleLabel();
        toggle.addEventListener("click", () => {
          if (this.collapsedFolderGroups.has(groupKey)) {
            this.collapsedFolderGroups.delete(groupKey);
          } else {
            this.collapsedFolderGroups.add(groupKey);
          }
          renderToggleLabel();
        });
        for (const task of folderTasks) {
          await this.createTaskCard(content, task, `${task.filePath}:${task.lineNumber}`);
        }
      }
    } else {
      const flatGroup = wrap.createDiv({ cls: "task-matrix-folder-group" });
      flatGroup.createDiv({ cls: "task-matrix-folder-header", text: `All tasks (${tasks.length})` });
      const flatContent = flatGroup.createDiv({ cls: "task-matrix-folder-content" });
      for (const task of tasks) {
        await this.createTaskCard(flatContent, task, `${task.filePath}:${task.lineNumber}`);
      }
    }
  }
  groupTasksByFolder(tasks, depth) {
    const grouped = {};
    for (const task of tasks) {
      const folderPath = this.getFolderPath(task.filePath, depth);
      if (!grouped[folderPath]) {
        grouped[folderPath] = [];
      }
      grouped[folderPath].push(task);
    }
    return Object.keys(grouped).sort().reduce((acc, key) => {
      acc[key] = grouped[key];
      return acc;
    }, {});
  }
  getFolderPath(filePath, depth) {
    const parts = filePath.split("/");
    parts.pop();
    if (parts.length === 0) {
      return "";
    }
    const folderParts = parts.slice(0, depth);
    return folderParts.join("/");
  }
  mapTaskToGtdColumn(task) {
    if (task.gtdState === "To be Started") return "Inbox";
    if (task.gtdState === "Overdue") {
      const todayIso = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      const desc = task.description.toLowerCase();
      const hasActiveTag = desc.includes("#doing") || desc.includes("#active") || desc.includes("#next");
      const hasStarted = Boolean(task.startDate && task.startDate <= todayIso);
      return hasStarted || hasActiveTag ? "In Progress" : "Inbox";
    }
    return task.gtdState;
  }
  async renderGtd(parent, tasks) {
    const board = parent.createDiv({ cls: "task-matrix-board" });
    const columns = [
      { title: "Inbox", state: "Inbox" },
      { title: "In progress", state: "In Progress" },
      { title: "Waiting", state: "Waiting" },
      { title: "Done", state: "Done" }
    ];
    for (const column of columns) {
      const columnEl = board.createDiv({ cls: "task-matrix-column" });
      columnEl.dataset.state = column.state;
      columnEl.addEventListener("dragover", (e) => {
        e.preventDefault();
        columnEl.addClass("task-matrix-drag-over");
      });
      columnEl.addEventListener("dragleave", () => {
        columnEl.removeClass("task-matrix-drag-over");
      });
      columnEl.addEventListener("drop", (e) => {
        e.preventDefault();
        columnEl.removeClass("task-matrix-drag-over");
        const taskId = e.dataTransfer?.getData("text/task-id");
        if (taskId) {
          const task = this.plugin.tasks.find((t) => t.id === taskId);
          if (task) {
            void this.plugin.moveTaskToGTDState(task, column.state);
          }
        }
      });
      const group = tasks.filter((task) => {
        if (column.state === "Done") {
          return task.displayStatus === "completed" && this.mapTaskToGtdColumn(task) === column.state;
        }
        return task.displayStatus !== "cancelled" && this.mapTaskToGtdColumn(task) === column.state;
      });
      const getGtdDefaults = (state) => {
        const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
        switch (state) {
          case "Waiting":
            return { gtdState: "Waiting" };
          case "In Progress":
            return { gtdState: "In Progress", startDate: today };
          case "Overdue":
            return { dueDate: today };
          case "Done":
            return {};
          default:
            return { gtdState: state };
        }
      };
      this.createColumnHeader(columnEl, column.title, group.length, () => {
        const defaults = getGtdDefaults(column.state);
        new TaskEditModal(this.app, null, this.plugin, defaults).open();
      }, true, this.collapsedGtdColumns.has(column.state));
      if (this.collapsedGtdColumns.has(column.state)) {
        columnEl.addClass("is-collapsed");
      }
      const header = columnEl.querySelector(".task-matrix-column-header");
      const collapseState = column.state;
      header.addEventListener("click", (event) => {
        if (event.target.closest(".task-matrix-add-btn")) return;
        const wasCollapsed = this.collapsedGtdColumns.has(collapseState);
        if (wasCollapsed) {
          this.collapsedGtdColumns.delete(collapseState);
        } else {
          this.collapsedGtdColumns.add(collapseState);
        }
        const nowCollapsed = !wasCollapsed;
        columnEl.toggleClass("is-collapsed", nowCollapsed);
        const bodyEl = columnEl.querySelector(".task-matrix-column-body");
        if (bodyEl) bodyEl.toggleClass("is-collapsed", nowCollapsed);
        const indicator = header.querySelector(".task-matrix-collapse-indicator");
        if (indicator) indicator.setText(nowCollapsed ? "\u25B8" : "\u25BE");
        const headerEl = columnEl.querySelector(".task-matrix-column-header");
        if (headerEl) {
          headerEl.style.borderBottom = nowCollapsed ? "none" : "";
          headerEl.style.paddingBottom = nowCollapsed ? "0" : "";
          headerEl.style.marginBottom = nowCollapsed ? "0" : "";
        }
        columnEl.style.minHeight = nowCollapsed ? "0" : "";
        columnEl.style.paddingBottom = nowCollapsed ? "12px" : "";
      });
      const body = columnEl.createDiv({ cls: `task-matrix-column-body${this.collapsedGtdColumns.has(column.state) ? " is-collapsed" : ""}` });
      for (const task of group) {
        await this.createTaskCard(body, task, this.describeTask(task));
      }
    }
  }
  async renderCalendar(parent, tasks) {
    const wrap = parent.createDiv({ cls: "task-calendar" });
    const toolbar = wrap.createDiv({ cls: "task-calendar-toolbar" });
    const modes = toolbar.createDiv({ cls: "task-calendar-segmented" });
    const listBtn = modes.createEl("button", { text: "List", cls: `task-calendar-mode-btn${this.calendarMode === "list" ? " active" : ""}` });
    const monthBtn = modes.createEl("button", { text: "Month", cls: `task-calendar-mode-btn${this.calendarMode === "month" ? " active" : ""}` });
    const weekBtn = modes.createEl("button", { text: "Week", cls: `task-calendar-mode-btn${this.calendarMode === "week" ? " active" : ""}` });
    listBtn.addEventListener("click", () => {
      this.calendarMode = "list";
      void this.render();
    });
    monthBtn.addEventListener("click", () => {
      this.calendarMode = "month";
      void this.render();
    });
    weekBtn.addEventListener("click", () => {
      this.calendarMode = "week";
      void this.render();
    });
    const nav = toolbar.createDiv({ cls: "task-calendar-nav" });
    const prevBtn = nav.createEl("button", { text: "\u2190", cls: "task-calendar-nav-btn" });
    const titleEl = nav.createEl("div", { cls: "task-calendar-title" });
    const todayBtn = nav.createEl("button", { text: "Today", cls: "task-calendar-nav-btn" });
    const nextBtn = nav.createEl("button", { text: "\u2192", cls: "task-calendar-nav-btn" });
    const summaryWrap = nav.createDiv({ cls: "task-calendar-summary-wrap" });
    const summaryBtn = summaryWrap.createEl("button", { text: "Summary", cls: "task-calendar-nav-btn" });
    const summaryPopup = summaryWrap.createDiv({ cls: "task-calendar-summary-popup" });
    if (!this.calendarSummaryOpen) summaryPopup.setAttribute("hidden", "hidden");
    const allItems = this.collectCalendarItems(tasks);
    const todayIso = this.toCalendarIso(/* @__PURE__ */ new Date());
    const summaryTasks = this.plugin.settings.includeCompleted ? tasks : await this.plugin.collectTasks({ ignoreIncludeCompleted: true });
    const summary = this.buildCalendarSummary(summaryTasks, todayIso);
    const summaryList = summaryPopup.createEl("ul");
    summaryList.createEl("li", { text: `Done: ${summary.done}/${summary.total}` });
    summaryList.createEl("li", { text: `Due: ${summary.due}` });
    summaryList.createEl("li", { text: `Overdue: ${summary.overdue}` });
    summaryList.createEl("li", { text: `Start: ${summary.start}` });
    summaryList.createEl("li", { text: `Scheduled: ${summary.scheduled}` });
    summaryList.createEl("li", { text: `Recurrence: ${summary.recurrence}` });
    summaryList.createEl("li", { text: `Daily notes: ${summary.dailyNotes}` });
    const shiftCalendar = async (delta) => {
      const next = new Date(this.calendarDate);
      if (this.calendarMode === "week") {
        next.setDate(next.getDate() + delta * 7);
      } else {
        next.setMonth(next.getMonth() + delta);
      }
      this.calendarDate = next;
      await this.render();
    };
    prevBtn.addEventListener("click", () => {
      void shiftCalendar(-1);
    });
    nextBtn.addEventListener("click", () => {
      void shiftCalendar(1);
    });
    todayBtn.addEventListener("click", () => {
      this.calendarDate = /* @__PURE__ */ new Date();
      void this.render();
    });
    summaryBtn.addEventListener("click", () => {
      this.calendarSummaryOpen = !this.calendarSummaryOpen;
      if (this.calendarSummaryOpen) {
        summaryPopup.removeAttribute("hidden");
      } else {
        summaryPopup.setAttribute("hidden", "hidden");
      }
    });
    if (this.calendarMode === "month") {
      titleEl.setText(this.formatCalendarTitle(this.calendarDate, "month"));
      this.renderCalendarMonth(wrap, allItems, todayIso);
      return;
    }
    if (this.calendarMode === "week") {
      titleEl.setText(this.formatCalendarTitle(this.calendarDate, "week"));
      this.renderCalendarWeek(wrap, allItems, todayIso);
      return;
    }
    titleEl.setText(this.formatCalendarTitle(this.calendarDate, "list"));
    this.renderCalendarList(wrap, allItems, todayIso);
  }
  formatCalendarTitle(date, mode) {
    if (mode === "month" || mode === "list") {
      return date.toLocaleDateString(void 0, { year: "numeric", month: "long" });
    }
    const weekStart = this.startOfWeek(date);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    return `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`;
  }
  startOfWeek(date) {
    const result = new Date(date);
    const day = result.getDay();
    const sundayFirst = this.plugin.settings.calendarFirstDayOfWeek === "sunday";
    const offset = sundayFirst ? -day : day === 0 ? -6 : 1 - day;
    result.setDate(result.getDate() + offset);
    result.setHours(0, 0, 0, 0);
    return result;
  }
  getWeekdayOrder() {
    return this.plugin.settings.calendarFirstDayOfWeek === "sunday" ? [0, 1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5, 6, 0];
  }
  getWeekdayLabel(weekday) {
    const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return labels[weekday] ?? "";
  }
  toCalendarIso(date) {
    const copy = new Date(date);
    copy.setHours(0, 0, 0, 0);
    const year = copy.getFullYear();
    const month = String(copy.getMonth() + 1).padStart(2, "0");
    const day = String(copy.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  isValidIso(value) {
    return Boolean(value && /^\d{4}-\d{2}-\d{2}$/.test(value));
  }
  isDateInCalendarRange(dateIso) {
    if (!this.isValidIso(dateIso)) return false;
    const check = new Date(dateIso);
    check.setHours(0, 0, 0, 0);
    if (this.calendarMode === "week") {
      const weekStart = this.startOfWeek(this.calendarDate);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      return check >= weekStart && check <= weekEnd;
    }
    const monthStart = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth(), 1);
    const monthEnd = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth() + 1, 0);
    monthStart.setHours(0, 0, 0, 0);
    monthEnd.setHours(23, 59, 59, 999);
    return check >= monthStart && check <= monthEnd;
  }
  extractDailyNoteDate(filePath) {
    const match = filePath.match(/(\d{4}-\d{2}-\d{2})/);
    return match?.[1];
  }
  buildCalendarSummary(tasks, todayIso) {
    const inScope = (task) => {
      return [
        task.dueDate,
        task.startDate,
        task.scheduledDate,
        task.doneDate,
        this.extractDailyNoteDate(task.filePath)
      ].some((date) => Boolean(date && this.isDateInCalendarRange(date)));
    };
    const scopedTasks = tasks.filter(inScope);
    const uniqueById = new Map(scopedTasks.map((task) => [task.id, task]));
    const values = Array.from(uniqueById.values());
    const activeTasks = values.filter((task) => {
      const checkbox = task.checkboxStatus.trim();
      const isDoneByMarker = this.plugin.settings.completionMarkers.includes(checkbox);
      const isCancelledByMarker = this.plugin.settings.cancelledMarkers.includes(checkbox);
      return !isDoneByMarker && !isCancelledByMarker && task.displayStatus !== "completed" && task.displayStatus !== "cancelled";
    });
    const done = values.filter((task) => task.displayStatus === "completed").length;
    const due = activeTasks.filter(
      (task) => this.isValidIso(task.dueDate) && this.isDateInCalendarRange(task.dueDate)
    ).length;
    const overdue = activeTasks.filter((task) => task.displayStatus === "overdue" && this.isValidIso(task.dueDate) && task.dueDate < todayIso).length;
    const start = activeTasks.filter((task) => this.isValidIso(task.startDate) && this.isDateInCalendarRange(task.startDate)).length;
    const scheduled = activeTasks.filter((task) => this.isValidIso(task.scheduledDate) && this.isDateInCalendarRange(task.scheduledDate)).length;
    const recurrence = activeTasks.filter((task) => Boolean(task.recurrence)).length;
    const dailyNotes = values.filter((task) => {
      const dailyDate = this.extractDailyNoteDate(task.filePath);
      return Boolean(dailyDate && this.isDateInCalendarRange(dailyDate) && !task.dueDate && !task.startDate && !task.scheduledDate);
    }).length;
    return {
      total: values.length,
      done,
      due,
      overdue,
      start,
      scheduled,
      recurrence,
      dailyNotes
    };
  }
  collectCalendarItems(tasks) {
    const byDate = {};
    const todayIso = this.toCalendarIso(/* @__PURE__ */ new Date());
    const showInProcessTasks = this.plugin.settings.showCalendarInProcessTasks;
    const pushItem = (dateKey, task, type) => {
      if (!byDate[dateKey]) byDate[dateKey] = [];
      byDate[dateKey].push({ task, type });
    };
    for (const task of tasks) {
      if (task.displayStatus === "completed") {
        if (this.isValidIso(task.doneDate)) {
          pushItem(task.doneDate, task, "done");
        } else if (this.isValidIso(task.dueDate)) {
          pushItem(task.dueDate, task, "done");
        }
        continue;
      }
      if (this.isValidIso(task.dueDate)) pushItem(task.dueDate, task, "due");
      if (this.isValidIso(task.startDate) && task.startDate !== task.dueDate) pushItem(task.startDate, task, "start");
      if (this.isValidIso(task.scheduledDate)) pushItem(task.scheduledDate, task, "scheduled");
      if (task.displayStatus === "overdue" && this.isValidIso(task.dueDate) && task.dueDate < todayIso) {
        pushItem(todayIso, task, "overdue");
      }
      if (showInProcessTasks && task.displayStatus !== "cancelled" && this.isValidIso(task.startDate) && this.isValidIso(task.dueDate) && task.startDate < task.dueDate) {
        const start = new Date(task.startDate);
        for (let day = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1); this.toCalendarIso(day) < task.dueDate; day.setDate(day.getDate() + 1)) {
          pushItem(this.toCalendarIso(day), task, "process");
        }
      }
    }
    return byDate;
  }
  renderCalendarMonth(parent, itemsByDate, todayIso) {
    const showWeekends = this.plugin.settings.showCalendarMonthWeekends;
    const weekdayOrder = this.getWeekdayOrder();
    const visibleWeekdays = showWeekends ? weekdayOrder : weekdayOrder.filter((weekday) => weekday !== 0 && weekday !== 6);
    const monthWrap = parent.createDiv({ cls: "task-calendar-month" });
    const heads = monthWrap.createDiv({ cls: "task-calendar-heads" });
    if (visibleWeekdays.length === 5) {
      heads.addClass("is-workweek");
    }
    for (const weekday of visibleWeekdays) {
      const head = heads.createEl("div", { text: this.getWeekdayLabel(weekday), cls: "task-calendar-head" });
      if (weekday === 0 || weekday === 6) head.addClass("weekend");
    }
    const grid = monthWrap.createDiv({ cls: "task-calendar-month-grid" });
    if (visibleWeekdays.length === 5) {
      grid.addClass("is-workweek");
    }
    const monthStart = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth(), 1);
    const monthEnd = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth() + 1, 0);
    const cursor = this.startOfWeek(monthStart);
    const renderEnd = this.startOfWeek(monthEnd);
    renderEnd.setDate(renderEnd.getDate() + 6);
    for (let day = new Date(cursor); day <= renderEnd; day.setDate(day.getDate() + 1)) {
      const weekday = day.getDay();
      if (!showWeekends && (weekday === 0 || weekday === 6)) {
        continue;
      }
      const isoDate = this.toCalendarIso(day);
      const inCurrentMonth = day.getMonth() === monthStart.getMonth();
      const isWeekend = weekday === 0 || weekday === 6;
      const dayEl = grid.createDiv({ cls: `task-calendar-day${isWeekend ? " weekend-day" : ""}${inCurrentMonth ? "" : " outside"}${isoDate === todayIso ? " today" : ""}` });
      dayEl.createEl("div", { text: String(day.getDate()), cls: "task-calendar-date" });
      const itemsEl = dayEl.createDiv({ cls: "task-calendar-items" });
      const dayItems = itemsByDate[isoDate] ?? [];
      for (const entry of dayItems.slice(0, 4)) {
        this.renderCalendarItem(itemsEl, entry.task, entry.type);
      }
      if (dayItems.length > 4) {
        itemsEl.createEl("span", { text: `+${dayItems.length - 4} more`, cls: "task-calendar-item" });
      }
    }
  }
  renderCalendarWeek(parent, itemsByDate, todayIso) {
    const showWeekends = this.plugin.settings.showCalendarWeekends;
    const weekdayOrder = this.getWeekdayOrder();
    const start = this.startOfWeek(this.calendarDate);
    const renderDayCard = (container, index, isWeekend) => {
      const day = new Date(start);
      day.setDate(start.getDate() + index);
      const isoDate = this.toCalendarIso(day);
      const dayEl = container.createDiv({ cls: `task-calendar-day week-day${isWeekend ? " weekend-day" : ""}${isoDate === todayIso ? " today" : ""}` });
      dayEl.createEl("div", { text: `${this.getWeekdayLabel(day.getDay())} ${day.getDate()}`, cls: "task-calendar-date" });
      const itemsEl = dayEl.createDiv({ cls: "task-calendar-items" });
      for (const entry of itemsByDate[isoDate] ?? []) {
        this.renderCalendarItem(itemsEl, entry.task, entry.type);
      }
    };
    if (!showWeekends) {
      const weekGrid = parent.createDiv({ cls: "task-calendar-week task-calendar-week-compact" });
      for (let index = 0; index < 7; index++) {
        const weekday = weekdayOrder[index];
        if (weekday === 0 || weekday === 6) continue;
        renderDayCard(weekGrid, index, false);
      }
      return;
    }
    const weekSplit = parent.createDiv({ cls: "task-calendar-week-split" });
    const weekdayGrid = weekSplit.createDiv({ cls: "task-calendar-week task-calendar-week-main" });
    for (let index = 0; index < 7; index++) {
      const weekday = weekdayOrder[index];
      if (weekday === 0 || weekday === 6) continue;
      renderDayCard(weekdayGrid, index, false);
    }
    const weekendGrid = weekSplit.createDiv({ cls: "task-calendar-weekend" });
    for (const weekendWeekday of [6, 0]) {
      const index = weekdayOrder.indexOf(weekendWeekday);
      if (index >= 0) {
        renderDayCard(weekendGrid, index, true);
      }
    }
  }
  renderCalendarList(parent, itemsByDate, todayIso) {
    const list = parent.createDiv({ cls: "task-calendar-list" });
    const monthStart = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth(), 1);
    const monthEnd = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth() + 1, 0);
    const showFullMonth = this.plugin.settings.calendarListShowFullMonth;
    for (let date = new Date(monthStart); date <= monthEnd; date.setDate(date.getDate() + 1)) {
      const isoDate = this.toCalendarIso(date);
      const dayItems = itemsByDate[isoDate] ?? [];
      if (!showFullMonth && dayItems.length === 0) continue;
      const details = list.createEl("details", { cls: "task-calendar-list-day" });
      if (isoDate === todayIso) details.addClass("today");
      if (isoDate === todayIso) details.open = true;
      details.createEl("summary", { text: `${date.toLocaleDateString(void 0, { weekday: "long", month: "short", day: "numeric" })} (${dayItems.length})` });
      const content = details.createDiv({ cls: "task-calendar-list-content" });
      if (dayItems.length === 0) {
        content.createEl("span", { text: "No tasks", cls: "task-calendar-item" });
      } else {
        for (const entry of dayItems) {
          this.renderCalendarItem(content, entry.task, entry.type);
        }
      }
    }
  }
  renderCalendarItem(parent, task, type) {
    const linkTarget = task.sectionHeading ? `${task.filePath}#${task.sectionHeading}` : task.filePath;
    const item = parent.createEl("a", {
      cls: `task-calendar-item type-${type} internal-link`,
      text: `${type.toUpperCase()} ${task.description}`
    });
    item.setAttribute("href", linkTarget);
    item.setAttribute("data-href", linkTarget);
    item.setAttribute("aria-label", task.description);
    item.addEventListener("mouseenter", (event) => {
      this.app.workspace.trigger("hover-link", {
        event,
        source: VIEW_TYPE_TASK_MATRIX,
        hoverParent: this,
        targetEl: item,
        linktext: linkTarget
      });
    });
    item.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      void this.openTask(task);
    });
  }
  async renderEisenhower(parent, tasks) {
    const board = parent.createDiv({ cls: "task-matrix-grid" });
    const columns = [
      { title: "Q1", quadrant: "Q1", subtitle: "Important + urgent" },
      { title: "Q2", quadrant: "Q2", subtitle: "Important + not urgent" },
      { title: "Q3", quadrant: "Q3", subtitle: "Urgent + lower importance" },
      { title: "Q4", quadrant: "Q4", subtitle: "Delegated or discard" }
    ];
    for (const column of columns) {
      const cell = board.createDiv({ cls: "task-matrix-cell" });
      cell.dataset.quadrant = column.quadrant;
      cell.addClass("is-collapsible");
      cell.addEventListener("dragover", (e) => {
        e.preventDefault();
        cell.addClass("task-matrix-drag-over");
      });
      cell.addEventListener("dragleave", () => {
        cell.removeClass("task-matrix-drag-over");
      });
      cell.addEventListener("drop", (e) => {
        e.preventDefault();
        cell.removeClass("task-matrix-drag-over");
        const taskId = e.dataTransfer?.getData("text/task-id");
        if (taskId) {
          const task = this.plugin.tasks.find((t) => t.id === taskId);
          if (task) {
            void this.plugin.moveTaskToQuadrant(task, column.quadrant);
          }
        }
      });
      const group = tasks.filter((task) => task.quadrant === column.quadrant && task.displayStatus !== "completed" && task.displayStatus !== "cancelled");
      const getQuadrantDefaults = (quadrant) => {
        const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
        switch (quadrant) {
          case "Q1":
            return { priority: "high" /* High */, dueDate: today };
          case "Q2":
            return { priority: "high" /* High */ };
          case "Q3":
            return { priority: "low" /* Low */, dueDate: today };
          case "Q4":
            return { priority: "lowest" /* Lowest */ };
          default:
            return {};
        }
      };
      const isCollapsed = this.collapsedMatrixQuadrants.has(column.quadrant);
      if (isCollapsed) {
        cell.addClass("is-collapsed");
      }
      const header = this.createColumnHeader(cell, `${column.title} ${column.subtitle}`, group.length, () => {
        const defaults = getQuadrantDefaults(column.quadrant);
        new TaskEditModal(this.app, null, this.plugin, defaults).open();
      }, true, isCollapsed);
      const body = cell.createDiv({ cls: `task-matrix-cell-body${isCollapsed ? " is-collapsed" : ""}` });
      header.addEventListener("click", (event) => {
        if (event.target.closest(".task-matrix-add-btn")) return;
        const wasCollapsed = this.collapsedMatrixQuadrants.has(column.quadrant);
        if (wasCollapsed) {
          this.collapsedMatrixQuadrants.delete(column.quadrant);
        } else {
          this.collapsedMatrixQuadrants.add(column.quadrant);
        }
        const nowCollapsed = !wasCollapsed;
        cell.toggleClass("is-collapsed", nowCollapsed);
        const cellBody = cell.querySelector(".task-matrix-cell-body");
        if (cellBody) cellBody.toggleClass("is-collapsed", nowCollapsed);
        const indicator = header.querySelector(".task-matrix-collapse-indicator");
        if (indicator) indicator.setText(nowCollapsed ? "\u25B8" : "\u25BE");
        header.style.borderBottom = nowCollapsed ? "none" : "";
        header.style.paddingBottom = nowCollapsed ? "0" : "";
        header.style.marginBottom = nowCollapsed ? "0" : "";
        cell.style.minHeight = nowCollapsed ? "0" : "";
      });
      for (const task of group) {
        await this.createTaskCard(body, task, this.describeTask(task));
      }
    }
  }
  createColumnHeader(parent, title, count, onAddTask, isCollapsible = false, isCollapsed = false) {
    const header = parent.createDiv({ cls: `task-matrix-column-header${isCollapsible ? " is-collapsible" : ""}` });
    const titleWrap = header.createDiv({ cls: "task-matrix-column-title" });
    titleWrap.createEl("span", {
      text: isCollapsible ? isCollapsed ? "\u25B8" : "\u25BE" : "",
      cls: "task-matrix-collapse-indicator"
    });
    titleWrap.createEl("h3", { text: title });
    const rightSection = header.createDiv({ cls: "task-matrix-header-right" });
    if (onAddTask) {
      const addBtn = rightSection.createEl("button", {
        text: "+",
        cls: "task-matrix-add-btn",
        title: "Add task"
      });
      addBtn.addEventListener("click", onAddTask);
    }
    rightSection.createEl("span", { text: String(count), cls: "task-matrix-count" });
    return header;
  }
  async createTaskCard(parent, task, metaText) {
    const card = parent.createDiv({ cls: `task-matrix-card${task.blocked ? " blocked" : ""}` });
    card.draggable = true;
    card.dataset.taskId = task.id;
    card.addEventListener("dragstart", (e) => {
      e.dataTransfer?.setData("text/task-id", task.id);
      card.addClass("dragging");
    });
    card.addEventListener("dragend", () => {
      card.removeClass("dragging");
    });
    card.addEventListener("click", (e) => {
      if (e.target.closest(".task-matrix-action-btn")) return;
      void this.openTask(task);
    });
    const top = card.createDiv({ cls: "task-matrix-card-top" });
    const titleEl = top.createDiv({ cls: "task-matrix-card-title" });
    const file = this.app.vault.getAbstractFileByPath(task.filePath);
    if (file instanceof import_obsidian.TFile) {
      const markdownContent = task.description || "*No description*";
      await import_obsidian.MarkdownRenderer.render(this.app, markdownContent, titleEl, task.filePath, this);
    } else {
      titleEl.setText(task.description);
    }
    top.createEl("div", { text: this.statusBadge(task.displayStatus), cls: `task-matrix-badge status-${task.displayStatus}` });
    const chips = card.createDiv({ cls: "task-matrix-chip-row" });
    if (task.priority !== "none" /* None */) {
      chips.createEl("span", { text: `Priority ${task.priority}`, cls: "task-matrix-chip" });
    }
    if (task.dueDate) {
      chips.createEl("span", { text: `Due ${task.dueDate}`, cls: "task-matrix-chip" });
    }
    if (task.startDate) {
      chips.createEl("span", { text: `Start ${task.startDate}`, cls: "task-matrix-chip" });
    }
    if (task.dependsOn) {
      const depText = task.blocked ? `\u26D4 Depends ${task.dependsOn}` : `\u2713 Depends ${task.dependsOn}`;
      chips.createEl("span", { text: depText, cls: `task-matrix-chip${task.blocked ? " warning" : ""}` });
    }
    if (task.taskId) {
      chips.createEl("span", { text: `ID ${task.taskId}`, cls: "task-matrix-chip" });
    }
    if (task.lineText.toLowerCase().includes("#due-date-conflict")) {
      chips.createEl("span", { text: "\u26A0\uFE0F due date conflict", cls: "task-matrix-chip conflict" });
    }
    card.createEl("div", { text: metaText, cls: "task-matrix-card-meta" });
    const actions = card.createDiv({ cls: "task-matrix-card-actions" });
    if (task.displayStatus !== "completed") {
      const completeBtn = actions.createEl("button", {
        text: "\u2713",
        cls: "task-matrix-action-btn",
        title: "Complete task"
      });
      completeBtn.addEventListener("click", () => {
        void this.plugin.toggleTaskStatus(task);
      });
      if (!task.startDate || task.displayStatus === "to-be-started") {
        const startBtn = actions.createEl("button", {
          text: "\u25B6",
          cls: "task-matrix-action-btn",
          title: "Start task"
        });
        startBtn.addEventListener("click", () => {
          void this.plugin.startTask(task);
        });
      }
      const cancelBtn = actions.createEl("button", {
        text: "\u2715",
        cls: "task-matrix-action-btn",
        title: "Cancel task"
      });
      cancelBtn.addEventListener("click", () => {
        void this.plugin.cancelTask(task);
      });
    } else {
      const reopenBtn = actions.createEl("button", {
        text: "\u21BA",
        cls: "task-matrix-action-btn",
        title: "Reopen task"
      });
      reopenBtn.addEventListener("click", () => {
        void this.plugin.toggleTaskStatus(task);
      });
    }
    const editBtn = actions.createEl("button", {
      text: "\u270E",
      cls: "task-matrix-action-btn",
      title: "Edit task"
    });
    editBtn.addEventListener("click", () => {
      new TaskEditModal(this.app, task, this.plugin).open();
    });
    const deleteBtn = actions.createEl("button", {
      text: "\u{1F5D1}",
      cls: "task-matrix-action-btn",
      title: "Delete task"
    });
    deleteBtn.addEventListener("click", () => {
      new DeleteTaskModal(this.app, () => {
        void this.plugin.deleteTask(task);
      }).open();
    });
    if (this.currentView === "eisenhower") {
      actions.createEl("span", { text: "|", cls: "task-matrix-action-separator" });
      actions.createEl("span", { text: "Move to", cls: "task-matrix-action-label" });
      const quickTargets = ["Q1", "Q2", "Q3", "Q4"].filter(
        (quadrant) => quadrant !== task.quadrant
      );
      for (const targetQuadrant of quickTargets) {
        const moveBtn = actions.createEl("button", {
          text: targetQuadrant.slice(1),
          cls: "task-matrix-action-btn quadrant-move",
          title: `Move to ${targetQuadrant}`
        });
        moveBtn.addEventListener("click", () => {
          void this.plugin.moveTaskToQuadrant(task, targetQuadrant);
        });
      }
    }
    if (this.currentView === "gtd") {
      const currentGtdColumn = this.mapTaskToGtdColumn(task);
      const quickStates = ["Inbox", "In Progress", "Waiting"];
      const stateLabels = {
        Inbox: "I",
        "In Progress": "P",
        Waiting: "W"
      };
      if (quickStates.includes(currentGtdColumn)) {
        const targets = quickStates.filter((state) => state !== currentGtdColumn);
        actions.createEl("span", { text: "|", cls: "task-matrix-action-separator" });
        actions.createEl("span", { text: "Move to", cls: "task-matrix-action-label" });
        for (const targetState of targets) {
          const moveBtn = actions.createEl("button", {
            text: stateLabels[targetState],
            cls: "task-matrix-action-btn quadrant-move",
            title: `Move to ${targetState}`
          });
          moveBtn.addEventListener("click", () => {
            void this.plugin.moveTaskToGTDState(task, targetState);
          });
        }
      }
    }
  }
  statusBadge(status) {
    switch (status) {
      case "completed":
        return "Done";
      case "cancelled":
        return "Cancelled";
      case "in-progress":
        return "In progress";
      case "to-be-started":
        return "To be started";
      case "overdue":
        return "Overdue";
      default:
        return "Open";
    }
  }
  describeTask(task) {
    return `${task.filePath}:${task.lineNumber} \xB7 ${task.gtdState}`;
  }
  async openTask(task) {
    const file = this.app.vault.getAbstractFileByPath(task.filePath);
    if (!(file instanceof import_obsidian.TFile)) {
      new import_obsidian.Notice(`File not found: ${task.filePath}`);
      return;
    }
    const leaf = this.app.workspace.getLeaf(true);
    await leaf.openFile(file);
    new import_obsidian.Notice(`Opened ${task.filePath}:${task.lineNumber}`);
  }
};
var TaskEditModal = class extends import_obsidian.Modal {
  constructor(app, task, plugin, defaultValues = {}) {
    super(app);
    this.task = task;
    this.plugin = plugin;
    this.isCreateMode = task === null;
    this.defaultValues = defaultValues;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.addClass("task-matrix-modal");
    contentEl.createEl("h2", { text: this.isCreateMode ? "Add task" : "Edit task" });
    const form = contentEl.createDiv();
    const description = this.isCreateMode ? "" : this.task.description;
    const priority = this.isCreateMode ? this.defaultValues.priority ?? "none" /* None */ : this.task.priority;
    const dueDate = this.isCreateMode ? this.defaultValues.dueDate ?? "" : this.task.dueDate || "";
    const startDate = this.isCreateMode ? this.defaultValues.startDate ?? "" : this.task.startDate || "";
    const taskId = this.isCreateMode ? "" : this.task.taskId || "";
    const dependsOn = this.isCreateMode ? "" : this.task.dependsOn || "";
    const descRow = form.createDiv({ cls: "task-matrix-form-row" });
    descRow.createEl("label", { text: "Description" });
    const descInput = new import_obsidian.TextComponent(descRow);
    descInput.setValue(description);
    const priorityRow = form.createDiv({ cls: "task-matrix-form-row" });
    priorityRow.createEl("label", { text: "Priority" });
    const prioritySelect = new import_obsidian.DropdownComponent(priorityRow);
    prioritySelect.addOption("none", "None");
    prioritySelect.addOption("lowest", "Lowest");
    prioritySelect.addOption("low", "Low");
    prioritySelect.addOption("medium", "Medium");
    prioritySelect.addOption("high", "High");
    prioritySelect.addOption("highest", "Highest");
    prioritySelect.addOption("critical", "Critical");
    prioritySelect.setValue(priority);
    const startRow = form.createDiv({ cls: "task-matrix-form-row" });
    startRow.createEl("label", { text: "Start date" });
    const startInput = startRow.createEl("input", {
      type: "date",
      cls: "task-matrix-date-input",
      value: startDate
    });
    const dueRow = form.createDiv({ cls: "task-matrix-form-row" });
    dueRow.createEl("label", { text: "Due date" });
    const dueInput = dueRow.createEl("input", {
      type: "date",
      cls: "task-matrix-date-input",
      value: dueDate
    });
    const idRow = form.createDiv({ cls: "task-matrix-form-row" });
    const idLabelRow = idRow.createDiv({ cls: "task-matrix-label-row" });
    idLabelRow.createEl("label", { text: "Task ID" });
    const idInputRow = idRow.createDiv({ cls: "task-matrix-input-row" });
    const idInput = new import_obsidian.TextComponent(idInputRow);
    idInput.setValue(taskId);
    idInput.inputEl.addClass("task-matrix-grow-input");
    const generateIdBtn = new import_obsidian.ButtonComponent(idInputRow).setButtonText("\u{1F3B2}").setTooltip("Generate random ID").onClick(() => {
      idInput.setValue(generateShortId());
    });
    generateIdBtn.buttonEl.addClass("task-matrix-inline-action-btn");
    const dependsRow = form.createDiv({ cls: "task-matrix-form-row" });
    dependsRow.createEl("label", { text: "Depends on" });
    const dependsSelect = new import_obsidian.DropdownComponent(dependsRow);
    dependsSelect.addOption("", "-- none --");
    const availableTasks = this.plugin.tasks.filter((t) => t.displayStatus !== "completed" && t.displayStatus !== "cancelled" && t.taskId && t.taskId !== taskId).sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return a.dueDate.localeCompare(b.dueDate);
    });
    for (const t of availableTasks) {
      const dueLabel = t.dueDate ? ` (due: ${t.dueDate})` : "";
      const label = `${t.taskId}${dueLabel}: ${t.description.slice(0, 40)}${t.description.length > 40 ? "..." : ""}`;
      dependsSelect.addOption(t.taskId, label);
    }
    dependsSelect.setValue(dependsOn);
    const buttons = contentEl.createDiv({ cls: "task-matrix-modal-buttons" });
    new import_obsidian.ButtonComponent(buttons).setButtonText("Cancel").onClick(() => this.close());
    new import_obsidian.ButtonComponent(buttons).setButtonText(this.isCreateMode ? "Create" : "Save").setCta().onClick(() => {
      void (async () => {
        const updates = {
          description: descInput.getValue(),
          priority: prioritySelect.getValue(),
          dueDate: dueInput.value,
          startDate: startInput.value,
          taskId: idInput.getValue(),
          dependsOn: dependsSelect.getValue()
        };
        if (updates.startDate && updates.dueDate && updates.startDate > updates.dueDate) {
          new DateConflictModal(
            this.app,
            updates.startDate,
            updates.dueDate,
            (result) => {
              void (async () => {
                if (result.adjustDueDate) {
                  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
                  updates.dueDate = today;
                  new import_obsidian.Notice("Due date adjusted to today");
                } else if (result.addConflictTag) {
                } else {
                  return;
                }
                if (this.isCreateMode) {
                  await this.createTask(updates, result.addConflictTag);
                } else {
                  await this.saveTask(updates, result.addConflictTag);
                }
                this.close();
              })();
            }
          ).open();
          return;
        }
        if (this.isCreateMode) {
          await this.createTask(updates, false);
        } else {
          await this.saveTask(updates, false);
        }
        this.close();
      })();
    });
  }
  async createTask(updates, addConflictTag = false) {
    const desc = updates.description?.trim();
    if (!desc) {
      new import_obsidian.Notice("Task description is required");
      return;
    }
    let targetFile;
    const { newTaskTargetPath } = this.plugin.settings;
    if (newTaskTargetPath) {
      const resolvedPath = this.resolveDateTemplate(newTaskTargetPath);
      targetFile = this.app.vault.getAbstractFileByPath(resolvedPath);
      if (!targetFile) {
        new import_obsidian.Notice(`Target note not found: ${resolvedPath}`);
        return;
      }
    } else {
      const activeFile = this.app.workspace.getActiveFile();
      if (activeFile && activeFile.extension === "md") {
        targetFile = activeFile;
      } else {
        new import_obsidian.Notice("Set the target note path or open a Markdown file.");
        return;
      }
    }
    let taskLine = `- [ ] ${desc}`;
    if (updates.priority && updates.priority !== "none" /* None */) {
      const priorityEmoji = {
        ["critical" /* Critical */]: "\u{1F53A}",
        ["highest" /* Highest */]: "\u23EB",
        ["high" /* High */]: "\u{1F53C}",
        ["medium" /* Medium */]: "",
        ["low" /* Low */]: "\u{1F53D}",
        ["lowest" /* Lowest */]: "\u23EC",
        ["none" /* None */]: ""
      }[updates.priority];
      if (priorityEmoji) {
        taskLine = taskLine.replace(/^(- \[ \] )/, `$1${priorityEmoji} `);
      }
    }
    if (updates.dueDate) {
      taskLine += ` \u{1F4C5} ${updates.dueDate}`;
    }
    if (updates.startDate) {
      taskLine += ` \u{1F6EB} ${updates.startDate}`;
    }
    if (this.defaultValues.gtdState) {
      switch (this.defaultValues.gtdState) {
        case "Waiting":
          taskLine += " #waiting";
          break;
        case "In Progress":
          taskLine += " #doing";
          break;
      }
    }
    if (updates.taskId) {
      taskLine += ` \u{1F194} ${updates.taskId}`;
    }
    if (updates.dependsOn) {
      taskLine += ` \u26D4 ${updates.dependsOn}`;
    }
    if (addConflictTag) {
      taskLine += " #due-date-conflict";
    }
    const content = await this.app.vault.read(targetFile);
    const { newTaskTargetHeading } = this.plugin.settings;
    let newContent;
    if (newTaskTargetHeading) {
      const result = this.insertTaskUnderHeading(content, newTaskTargetHeading, taskLine);
      if (!result.success) {
        new import_obsidian.Notice(`Cannot add task: ${result.error}`);
        return;
      }
      newContent = result.content;
    } else {
      newContent = content.trim() + "\n" + taskLine;
    }
    await this.app.vault.modify(targetFile, newContent);
    new import_obsidian.Notice(`Task added to ${targetFile.path}`);
  }
  resolveDateTemplate(template) {
    const now = /* @__PURE__ */ new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return template.replace(/YYYY/g, String(year)).replace(/MM/g, month).replace(/DD/g, day);
  }
  insertTaskUnderHeading(content, heading, taskLine) {
    const lines = content.split(/\r?\n/u);
    const headingRegex = new RegExp(`^${heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`);
    const headingIndex = lines.findIndex((line) => headingRegex.test(line.trim()));
    if (headingIndex === -1) {
      return { success: false, error: `Heading "${heading}" not found` };
    }
    const headingMatch = lines[headingIndex].match(/^(#{1,6})/);
    if (!headingMatch) {
      return { success: false, error: "Invalid heading format" };
    }
    const headingLevel = headingMatch[1].length;
    let insertIndex = headingIndex + 1;
    for (let i = headingIndex + 1; i < lines.length; i++) {
      const line = lines[i];
      const nextHeadingMatch = line.match(/^(#{1,6})\s/);
      if (nextHeadingMatch && nextHeadingMatch[1].length <= headingLevel) {
        break;
      }
      insertIndex = i + 1;
    }
    let lastContentIndex = insertIndex - 1;
    while (lastContentIndex > headingIndex && !lines[lastContentIndex].trim()) {
      lastContentIndex--;
    }
    lines.splice(lastContentIndex + 1, 0, taskLine);
    return { success: true, content: lines.join("\n") };
  }
  async saveTask(updates, addConflictTag = false) {
    if (!this.task) return;
    const file = this.app.vault.getAbstractFileByPath(this.task.filePath);
    if (!(file instanceof import_obsidian.TFile)) {
      new import_obsidian.Notice(`File not found: ${this.task.filePath}`);
      return;
    }
    const content = await this.app.vault.read(file);
    const lines = content.split(/\r?\n/u);
    const lineIndex = this.task.lineNumber - 1;
    if (lineIndex < 0 || lineIndex >= lines.length) {
      new import_obsidian.Notice(`Line ${this.task.lineNumber} not found in file`);
      return;
    }
    let line = lines[lineIndex];
    const checkboxMatch = line.match(/^(\s*[-*]\s*\[[ xX/-]\]\s*)/);
    if (checkboxMatch && updates.description) {
      const prefix = checkboxMatch[1];
      const restOfLine = line.substring(prefix.length);
      const inlineFields = restOfLine.match(/(\s*(?:📅\s*\d{4}-\d{2}-\d{2}|🛫\s*\d{4}-\d{2}-\d{2}|⏳\s*\d{4}-\d{2}-\d{2}|✅\s*\d{4}-\d{2}-\d{2}|➕\s*\d{4}-\d{2}-\d{2}|🔺|⏫|🔼|🔽|⏬|🆔\s*\S+|⛔\s*\S+|#\w+|::\s*\S+)\s*)/gu) || [];
      const uniqueInlineFields = inlineFields.filter((field) => {
        const trimmed = field.trim();
        if (trimmed.startsWith("#")) {
          return !updates.description.toLowerCase().includes(trimmed.toLowerCase());
        }
        return true;
      });
      line = prefix + updates.description + " " + uniqueInlineFields.join(" ");
    }
    if (updates.priority !== void 0) {
      line = line.replace(/🔺|⏫|🔼|🔽|⏬/gu, "");
      if (updates.priority === "critical" /* Critical */) line = line.replace(/(\s*[-*]\s*\[[ xX/-]\]\s*)/, "$1\u{1F53A} ");
      else if (updates.priority === "highest" /* Highest */) line = line.replace(/(\s*[-*]\s*\[[ xX/-]\]\s*)/, "$1\u23EB ");
      else if (updates.priority === "high" /* High */) line = line.replace(/(\s*[-*]\s*\[[ xX/-]\]\s*)/, "$1\u{1F53C} ");
      else if (updates.priority === "low" /* Low */) line = line.replace(/(\s*[-*]\s*\[[ xX/-]\]\s*)/, "$1\u{1F53D} ");
      else if (updates.priority === "lowest" /* Lowest */) line = line.replace(/(\s*[-*]\s*\[[ xX/-]\]\s*)/, "$1\u23EC ");
    }
    if (updates.dueDate !== void 0) {
      line = line.replace(/\s*📅(?:\s*\d{4}-\d{2}-\d{2})?/gu, "");
      if (updates.dueDate) line += ` \u{1F4C5} ${updates.dueDate}`;
    }
    if (updates.startDate !== void 0) {
      line = line.replace(/\s*🛫(?:\s*\d{4}-\d{2}-\d{2})?/gu, "");
      if (updates.startDate) line += ` \u{1F6EB} ${updates.startDate}`;
    }
    if (updates.createdDate !== void 0) {
      line = line.replace(/\s*➕(?:\s*\d{4}-\d{2}-\d{2})?/gu, "");
      if (updates.createdDate) line += ` \u2795 ${updates.createdDate}`;
    }
    if (updates.taskId !== void 0) {
      line = line.replace(/\s*🆔\s*\S+/g, "");
      line = line.replace(/\bid::\s*\S+/gi, "");
      if (updates.taskId) line += ` \u{1F194} ${updates.taskId}`;
    }
    if (updates.dependsOn !== void 0) {
      line = line.replace(/\s*⛔\s*\S+/g, "");
      line = line.replace(/\bdependsOn::\s*\S+/gi, "");
      if (updates.dependsOn) line += ` \u26D4 ${updates.dependsOn}`;
    }
    line = line.replace(/\s*#due-date-conflict\b/gi, "");
    if (addConflictTag) {
      line += " #due-date-conflict";
    }
    line = line.replace(/\s+/g, " ").trim();
    lines[lineIndex] = line;
    await this.app.vault.modify(file, lines.join("\n"));
    new import_obsidian.Notice("Task updated");
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
};
var DateConflictModal = class extends import_obsidian.Modal {
  constructor(app, startDate, dueDate, onConfirm) {
    super(app);
    this.startDate = startDate;
    this.dueDate = dueDate;
    this.onConfirm = onConfirm;
    this.result = null;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.addClass("task-matrix-modal");
    contentEl.createEl("h2", { text: "Date conflict detected" });
    const message = contentEl.createEl("p");
    message.appendText("Start date (");
    message.createEl("strong", { text: this.startDate });
    message.appendText(") is later than due date (");
    message.createEl("strong", { text: this.dueDate });
    message.appendText(").");
    message.createEl("br");
    message.createEl("br");
    message.appendText("Would you like to adjust the due date to today?");
    const buttonRow = contentEl.createDiv({ cls: "task-matrix-modal-buttons" });
    new import_obsidian.ButtonComponent(buttonRow).setButtonText("No, add conflict tag").onClick(() => {
      this.result = { adjustDueDate: false, addConflictTag: true };
      this.onConfirm(this.result);
      this.close();
    });
    new import_obsidian.ButtonComponent(buttonRow).setButtonText("Yes, adjust due date").setCta().onClick(() => {
      this.result = { adjustDueDate: true, addConflictTag: false };
      this.onConfirm(this.result);
      this.close();
    });
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
    if (this.result === null) {
      this.onConfirm({ adjustDueDate: false, addConflictTag: false });
    }
  }
};
var DeleteTaskModal = class extends import_obsidian.Modal {
  constructor(app, onConfirm) {
    super(app);
    this.onConfirm = onConfirm;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.addClass("task-matrix-modal");
    contentEl.createEl("h2", { text: "Delete task" });
    contentEl.createEl("p", { text: "Are you sure you want to delete this task?" });
    const buttonRow = contentEl.createDiv({ cls: "task-matrix-modal-buttons" });
    new import_obsidian.ButtonComponent(buttonRow).setButtonText("Cancel").onClick(() => this.close());
    new import_obsidian.ButtonComponent(buttonRow).setButtonText("Delete").setWarning().onClick(() => {
      this.onConfirm();
      this.close();
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};
var TaskMatrixSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  persistSettings(refreshTasks = false) {
    void (async () => {
      await this.plugin.saveSettings();
      if (refreshTasks) {
        await this.plugin.refreshTasks();
      }
    })();
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    new import_obsidian.Setting(containerEl).setName("Scanning and views").setHeading();
    new import_obsidian.Setting(containerEl).setName("Scan folders").setDesc("Comma-separated list of folder paths to scan for tasks. Leave empty to scan the whole vault.").addText(
      (text) => text.setPlaceholder("Projects/tasks, inbox").setValue(this.plugin.settings.scanFolders.join(", ")).onChange((value) => {
        this.plugin.settings.scanFolders = value.split(",").map((s) => s.trim()).filter(Boolean);
        this.persistSettings(true);
      })
    );
    new import_obsidian.Setting(containerEl).setName("Default view").setDesc("Choose which dashboard opens first.").addDropdown(
      (dropdown) => dropdown.addOption("eisenhower", "Eisenhower matrix").addOption("calendar", "Calendar").addOption("gtd", "GTD").addOption("list", "List").setValue(this.plugin.settings.defaultView).onChange((value) => {
        this.plugin.settings.defaultView = value;
        this.persistSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Exclude folders").setDesc("Comma-separated list of folder paths to exclude from task scanning.").addText(
      (text) => text.setPlaceholder("Archive, templates, daily").setValue(this.plugin.settings.excludeFolders.join(", ")).onChange((value) => {
        this.plugin.settings.excludeFolders = value.split(",").map((s) => s.trim()).filter(Boolean);
        this.persistSettings(true);
      })
    );
    new import_obsidian.Setting(containerEl).setName("Open location").setDesc("Where to open the task matrix view.").addDropdown(
      (dropdown) => dropdown.addOption("sidebar", "Right sidebar").addOption("tab", "New tab").setValue(this.plugin.settings.openLocation).onChange((value) => {
        this.plugin.settings.openLocation = value;
        this.persistSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Completion markers").setDesc("Markers for completed tasks, separated by commas.").addText(
      (text) => text.setValue(this.plugin.settings.completionMarkers.join(", ")).onChange((value) => {
        this.plugin.settings.completionMarkers = value.split(",").map((s) => s.trim()).filter(Boolean);
        if (this.plugin.settings.completionMarkers.length === 0) {
          this.plugin.settings.completionMarkers = ["x", "X"];
        }
        this.persistSettings(true);
      })
    );
    new import_obsidian.Setting(containerEl).setName("Exclude markers").setDesc("Checkbox contents to exclude from task views and statistics, separated by commas.").addText(
      (text) => text.setPlaceholder("I, ?, !").setValue(this.plugin.settings.excludeMarkers.join(", ")).onChange((value) => {
        this.plugin.settings.excludeMarkers = value.split(",").map((s) => s.trim()).filter(Boolean);
        this.persistSettings(true);
      })
    );
    new import_obsidian.Setting(containerEl).setName("Cancelled markers").setDesc("Checkbox contents that indicate a cancelled task (comma-separated). Default: -").addText(
      (text) => text.setPlaceholder("-, cancelled, skip").setValue(this.plugin.settings.cancelledMarkers.join(", ")).onChange((value) => {
        this.plugin.settings.cancelledMarkers = value.split(",").map((s) => s.trim()).filter(Boolean);
        if (this.plugin.settings.cancelledMarkers.length === 0) {
          this.plugin.settings.cancelledMarkers = ["-"];
        }
        this.persistSettings(true);
      })
    );
    new import_obsidian.Setting(containerEl).setName("Include completed tasks").setDesc("Show completed tasks in the matrix.").addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.includeCompleted).onChange((value) => {
        this.plugin.settings.includeCompleted = value;
        this.persistSettings(true);
        this.display();
      })
    );
    if (this.plugin.settings.includeCompleted) {
      new import_obsidian.Setting(containerEl).setName("Show completed tasks without due date").setDesc("When disabled, completed tasks are shown only if they have a due date.").addToggle(
        (toggle) => toggle.setValue(this.plugin.settings.includeCompletedWithoutDueDate).onChange((value) => {
          this.plugin.settings.includeCompletedWithoutDueDate = value;
          this.persistSettings(true);
          this.display();
        })
      );
      if (!this.plugin.settings.includeCompletedWithoutDueDate) {
        new import_obsidian.Setting(containerEl).setName("Completed task display range").setDesc("Only show completed tasks finished within this many months. Uses completion date first, then due date. Set to 0 to show all.").addSlider(
          (slider) => slider.setLimits(0, 12, 1).setValue(this.plugin.settings.completedTaskDisplayRange).setDynamicTooltip().onChange((value) => {
            this.plugin.settings.completedTaskDisplayRange = value;
            this.persistSettings(true);
          })
        );
      }
    }
    new import_obsidian.Setting(containerEl).setName("Track completion date").setDesc("When enabled, automatically add \u2705 yyyy-mm-dd to tasks when they are marked as completed.").addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.trackCompletionDate).onChange((value) => {
        this.plugin.settings.trackCompletionDate = value;
        this.persistSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Urgent days range").setDesc("Number of days to consider a task as urgent (1-7). Default: 1 (today only). 2 = today+tomorrow, 3 = today+2 days, etc.").addSlider(
      (slider) => slider.setLimits(1, 7, 1).setValue(this.plugin.settings.urgentDaysRange).setDynamicTooltip().onChange((value) => {
        this.plugin.settings.urgentDaysRange = value;
        this.persistSettings(true);
      })
    );
    new import_obsidian.Setting(containerEl).setName("Due date display range").setDesc("Only show tasks due within this many months (overdue tasks are always shown). Set to 0 to show all.").addSlider(
      (slider) => slider.setLimits(0, 12, 1).setValue(this.plugin.settings.dueDateDisplayRange).setDynamicTooltip().onChange((value) => {
        this.plugin.settings.dueDateDisplayRange = value;
        this.persistSettings(true);
      })
    );
    new import_obsidian.Setting(containerEl).setName("Hide future start tasks").setDesc("Hide tasks whose start date is more than 1 month from now.").addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.hideFutureStartTasks).onChange((value) => {
        this.plugin.settings.hideFutureStartTasks = value;
        this.persistSettings(true);
      })
    );
    new import_obsidian.Setting(containerEl).setName("New tasks").setHeading();
    new import_obsidian.Setting(containerEl).setName("Target note path").setDesc("Path template for new tasks. Use yyyy, mm, dd for date substitution. Leave empty to use fallback logic.").addText(
      (text) => text.setPlaceholder("Daily/YYYY-MM-DD.md").setValue(this.plugin.settings.newTaskTargetPath).onChange((value) => {
        this.plugin.settings.newTaskTargetPath = value.trim();
        this.persistSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Target heading").setDesc("Insert new tasks under this heading. Leave empty to append at end of file.").addText(
      (text) => text.setPlaceholder("## tasks").setValue(this.plugin.settings.newTaskTargetHeading).onChange((value) => {
        this.plugin.settings.newTaskTargetHeading = value.trim();
        this.persistSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("List view").setHeading();
    new import_obsidian.Setting(containerEl).setName("Show cancelled tasks").setDesc("Show cancelled tasks in list view.").addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.listShowCancelled).onChange((value) => {
        this.plugin.settings.listShowCancelled = value;
        this.persistSettings(true);
      })
    );
    new import_obsidian.Setting(containerEl).setName("Group by folder").setDesc("Group tasks by their containing folder in list view.").addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.listGroupByFolder).onChange((value) => {
        this.plugin.settings.listGroupByFolder = value;
        this.persistSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Folder grouping depth").setDesc("How many folder levels to display for grouping (1 = top level only, 2 = two levels, etc.).").addSlider(
      (slider) => slider.setLimits(1, 5, 1).setValue(this.plugin.settings.listGroupByFolderDepth).setDynamicTooltip().onChange((value) => {
        this.plugin.settings.listGroupByFolderDepth = value;
        this.persistSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Calendar view").setHeading();
    new import_obsidian.Setting(containerEl).setName("Calendar: first day of week").setDesc("Choose whether calendar weeks start on monday or sunday.").addDropdown(
      (dropdown) => dropdown.addOption("monday", "Monday").addOption("sunday", "Sunday").setValue(this.plugin.settings.calendarFirstDayOfWeek).onChange((value) => {
        this.plugin.settings.calendarFirstDayOfWeek = value;
        this.persistSettings(true);
      })
    );
    new import_obsidian.Setting(containerEl).setName("Calendar week view: show weekends").setDesc("Show saturday and sunday columns in calendar week mode.").addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.showCalendarWeekends).onChange((value) => {
        this.plugin.settings.showCalendarWeekends = value;
        this.persistSettings(true);
      })
    );
    new import_obsidian.Setting(containerEl).setName("Calendar month view: show weekends").setDesc("Show saturday and sunday columns in calendar month mode.").addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.showCalendarMonthWeekends).onChange((value) => {
        this.plugin.settings.showCalendarMonthWeekends = value;
        this.persistSettings(true);
      })
    );
    new import_obsidian.Setting(containerEl).setName("Calendar: show in-progress tasks").setDesc("For tasks with both start and due dates, show them on each day between start and due in calendar views.").addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.showCalendarInProcessTasks).onChange((value) => {
        this.plugin.settings.showCalendarInProcessTasks = value;
        this.persistSettings(true);
      })
    );
    new import_obsidian.Setting(containerEl).setName("Calendar list: show full month").setDesc("When enabled, list mode shows every day of the month. When disabled, only shows dates that have tasks.").addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.calendarListShowFullMonth).onChange((value) => {
        this.plugin.settings.calendarListShowFullMonth = value;
        this.persistSettings(true);
      })
    );
  }
};
