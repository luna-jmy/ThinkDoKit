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
var import_obsidian14 = require("obsidian");

// src/i18n/en.ts
var EN = {
  // ── toolbar / modes ──────────────────────────────────────────────
  "\u4EFB\u52A1\u77E9\u9635": "Task matrix",
  "\u65B0\u5EFA\u4EFB\u52A1": "New task",
  "\u5237\u65B0": "Refresh",
  "\u91CD\u65B0\u626B\u63CF\u4EFB\u52A1": "Rescan tasks",
  "\u6253\u5F00\u4EFB\u52A1\u77E9\u9635": "Open task matrix",
  "\u5217\u8868": "List",
  "\u7B14\u8BB0\u5217\u8868": "Note list",
  "\u77E9\u9635": "Matrix",
  "\u65E5\u5386": "Calendar",
  "GTD": "GTD",
  "\u5168\u90E8\u5C55\u5F00": "Expand all",
  "\u5168\u90E8\u6536\u8D77": "Collapse all",
  // ── filter bar ───────────────────────────────────────────────────
  "\u72B6\u6001": "Status",
  "\u72B6\u6001\u9884\u8BBE": "Status presets",
  "\u5168\u90E8\u72B6\u6001": "All statuses",
  "\u53EA\u770B\u672A\u5B8C\u6210": "Active only",
  "\u9690\u85CF\u5DF2\u53D6\u6D88": "Hide cancelled",
  "\u6807\u8BB0": "Marker",
  "\u65B9\u62EC\u53F7\u5185\u5BB9\u662F {marker} \u7684\u4EFB\u52A1": "Tasks whose brackets contain {marker}",
  "\u641C\u7D22": "Search",
  "\u4EFB\u52A1\u63CF\u8FF0\u3001\u6587\u4EF6\u3001ID": "Description, file or ID",
  "\u5F00\u59CB\u65E5\u671F": "Start date",
  "\u622A\u6B62\u65E5\u671F": "Due date",
  "\u6309\u5F00\u59CB\u65E5\u671F\u7B5B\u9009": "Filter by start date",
  "\u6309\u622A\u6B62\u65E5\u671F\u7B5B\u9009": "Filter by due date",
  "\u533A\u95F4\u8D77\u59CB\u65E5\u671F": "Range start date",
  "\u533A\u95F4\u7ED3\u675F\u65E5\u671F": "Range end date",
  "\u4E0D\u9650": "Any time",
  "\u4ECA\u5929": "Today",
  "\u672C\u5468": "This week",
  "\u672C\u6708": "This month",
  "\u672C\u5E74": "This year",
  "\u81EA\u5B9A\u4E49\u533A\u95F4": "Custom range",
  "\u6392\u5E8F": "Sort",
  "\u6392\u5E8F\u65B9\u5F0F": "Sort mode",
  "\u622A\u6B62\u65E5 \u2191": "Due \u2191",
  "\u622A\u6B62\u65E5 \u2193": "Due \u2193",
  "\u5F00\u59CB\u65E5 \u2191": "Start \u2191",
  "\u4F18\u5148\u7EA7": "Priority",
  "\u6587\u4EF6\u540D": "File name",
  "\u6E05\u9664\u7B5B\u9009": "Clear filters",
  "\u6E05\u9664\u5168\u90E8\u7B5B\u9009\u6761\u4EF6\uFF0C\u663E\u793A\u6240\u6709\u4EFB\u52A1": "Clear every filter and show all tasks",
  "{shown}/{total} \u4E2A\u4EFB\u52A1": "{shown}/{total} tasks",
  // ── task status ──────────────────────────────────────────────────
  "\u672A\u5F00\u59CB": "Open",
  "\u5F85\u5F00\u59CB": "To be started",
  "\u8FDB\u884C\u4E2D": "In progress",
  "\u5DF2\u903E\u671F": "Overdue",
  "\u5DF2\u5B8C\u6210": "Completed",
  "\u5DF2\u53D6\u6D88": "Cancelled",
  // ── priority levels ──────────────────────────────────────────────
  "\u7D27\u6025": "Critical",
  "\u6700\u9AD8": "Highest",
  "\u9AD8": "High",
  "\u4E2D": "Medium",
  "\u4F4E": "Low",
  "\u6700\u4F4E": "Lowest",
  "\u65E0": "None",
  // ── containers ───────────────────────────────────────────────────
  "\u5168\u90E8\u4EFB\u52A1": "All tasks",
  "\u6839\u76EE\u5F55": "Vault root",
  "\u6536\u4EF6\u7BB1": "Inbox",
  "\u7B49\u5F85\u4E2D": "Waiting",
  "\u91CD\u8981\u4E14\u7D27\u6025": "Important and urgent",
  "\u91CD\u8981\u4E0D\u7D27\u6025": "Important, not urgent",
  "\u7D27\u6025\u4E0D\u91CD\u8981": "Urgent, not important",
  "\u4E0D\u91CD\u8981\u4E0D\u7D27\u6025": "Not important, not urgent",
  "\u6682\u65E0\u4EFB\u52A1": "No tasks",
  "\u6CA1\u6709\u7B26\u5408\u5F53\u524D\u7B5B\u9009\u6761\u4EF6\u7684\u4EFB\u52A1": "No tasks match the current filters",
  "\u6B63\u5728\u5EFA\u7ACB\u4EFB\u52A1\u7D22\u5F15\u2026": "Building the task index\u2026",
  "\u7D22\u5F15\u5728 Obsidian \u5E03\u5C40\u5C31\u7EEA\u540E\u5F00\u59CB\uFF0C\u5927\u5E93\u9700\u8981\u4E00\u70B9\u65F6\u95F4\u3002": "Indexing starts once Obsidian has finished loading; a large vault takes a moment.",
  "{count} \u4E2A\u4EFB\u52A1": "{count} tasks",
  "\u5728\u6B64\u5BB9\u5668\u65B0\u5EFA\u4EFB\u52A1": "New task in this container",
  // ── cards ────────────────────────────────────────────────────────
  "\u65E0\u63CF\u8FF0": "No description",
  "\u4F18\u5148\u7EA7 {level}": "Priority {level}",
  "\u622A\u6B62 {date}": "Due {date}",
  "\u5F00\u59CB {date}": "Start {date}",
  "ID {id}": "ID {id}",
  "\u88AB {id} \u963B\u585E": "Blocked by {id}",
  "\u4F9D\u8D56 {id} \u5DF2\u5B8C\u6210": "Depends on {id} (done)",
  "\u65E5\u671F\u51B2\u7A81": "Date conflict",
  "\u5B8C\u6210": "Done",
  "\u91CD\u65B0\u6253\u5F00": "Reopen",
  "\u5F00\u59CB": "Start",
  "\u53D6\u6D88": "Cancel",
  "\u7F16\u8F91": "Edit",
  "\u5220\u9664": "Delete",
  "\u79FB\u52A8\u5230": "Move to",
  "\u79FB\u52A8\u5230 {quadrant}": "Move to {quadrant}",
  "\u79FB\u52A8\u5230\u300C{state}\u300D": "Move to {state}",
  "\u5DF2\u79FB\u52A8\u5230 {quadrant}": "Moved to {quadrant}",
  "\u5DF2\u79FB\u52A8\u5230\u300C{state}\u300D": "Moved to {state}",
  "\u4EFB\u52A1\u5DF2\u5B8C\u6210": "Task completed",
  "\u5DF2\u91CD\u65B0\u6253\u5F00": "Task reopened",
  "\u4EFB\u52A1\u5DF2\u53D6\u6D88": "Task cancelled",
  "\u4EFB\u52A1\u5DF2\u5F00\u59CB": "Task started",
  "\u4EFB\u52A1\u5DF2\u5220\u9664": "Task deleted",
  "\u4EFB\u52A1\u5DF2\u66F4\u65B0": "Task updated",
  "\u5DF2\u5237\u65B0\uFF1A{count} \u4E2A\u4EFB\u52A1": "Refreshed: {count} tasks",
  // ── calendar ─────────────────────────────────────────────────────
  "\u6708": "Month",
  "\u5468": "Week",
  "\u6C47\u603B": "Summary",
  "\u622A\u6B62": "Due",
  "\u8BA1\u5212": "Scheduled",
  "\u903E\u671F": "Overdue",
  "\u65E0\u4EFB\u52A1": "No tasks",
  "\u8FD8\u6709 {count} \u9879": "{count} more",
  "\u5DF2\u5B8C\u6210\uFF1A{done}/{total}": "Done: {done}/{total}",
  "\u622A\u6B62\uFF1A{count}": "Due: {count}",
  "\u903E\u671F\uFF1A{count}": "Overdue: {count}",
  "\u5F00\u59CB\uFF1A{count}": "Start: {count}",
  "\u8BA1\u5212\uFF1A{count}": "Scheduled: {count}",
  "\u91CD\u590D\uFF1A{count}": "Recurring: {count}",
  "\u65E5\u8BB0\uFF1A{count}": "Daily notes: {count}",
  "\u5468\u4E00": "Mon",
  "\u5468\u4E8C": "Tue",
  "\u5468\u4E09": "Wed",
  "\u5468\u56DB": "Thu",
  "\u5468\u4E94": "Fri",
  "\u5468\u516D": "Sat",
  "\u5468\u65E5": "Sun",
  // ── gantt ────────────────────────────────────────────────────────
  "\u7518\u7279": "Gantt",
  "\u65F6\u95F4\u7C92\u5EA6": "Time scale",
  "\u5206\u7EC4\u4F9D\u636E": "Group by",
  "\u65E5": "Day",
  "\u5E74": "Year",
  "\u4E0D\u5206\u7EC4": "No grouping",
  "\u6309 GTD \u72B6\u6001\u5206\u7EC4": "Group by GTD state",
  "\u6309\u77E9\u9635\u8C61\u9650\u5206\u7EC4": "Group by quadrant",
  "\u672A\u547D\u540D\u4EFB\u52A1": "Untitled task",
  "\u91CC\u7A0B\u7891": "Milestone",
  "\u5173\u952E": "Critical",
  "\u7F3A\u65E5\u671F": "Missing dates",
  "\u8D77\u6B62\u65E5\u671F\u4E0D\u5B8C\u6574\uFF0C\u56FE\u4E0A\u90A3\u4E00\u6BB5\u662F\u63A8\u5BFC\u51FA\u6765\u7684": "Start or due date is missing, so the span shown is inferred",
  "{count} \u5929": "{count} days",
  "{count} \u4E2A\u6CA1\u6709\u65E5\u671F": "{count} without dates",
  "{name}\uFF1A{start} \u81F3 {end}\uFF0C{days} \u5929": "{name}: {start} to {end}, {days} days",
  "\u6CA1\u6709\u53EF\u663E\u793A\u7684\u4EFB\u52A1\uFF08\u9700\u8981\u81F3\u5C11\u4E00\u4E2A\u5F00\u59CB\u65E5\u6216\u622A\u6B62\u65E5\uFF09": "No tasks to show (each needs a start or due date)",
  // ── settings: tabs ───────────────────────────────────────────────
  "\u901A\u7528": "General",
  "\u626B\u63CF\u8303\u56F4\u3001\u754C\u9762\u8BED\u8A00\u4E0E\u4EFB\u52A1\u6807\u8BB0\u7684\u5199\u6CD5\u3002\u6539\u52A8\u4F1A\u89E6\u53D1\u4E00\u6B21\u5168\u5E93\u91CD\u65B0\u7D22\u5F15\u3002": "Scan scope, interface language and how task markers are written. Changing these rebuilds the index.",
  "\u65B0\u5EFA\u4EFB\u52A1\u843D\u5230\u54EA\u7BC7\u7B14\u8BB0\u3001\u7528\u54EA\u4E2A\u6A21\u677F\u3001\u63D2\u5230\u54EA\u4E2A\u6807\u9898\u4E0B\u3002": "Where new tasks go, which template to use, and which heading they are inserted under.",
  "\u89C6\u56FE\u504F\u597D": "View preferences",
  "\u6253\u5F00\u89C6\u56FE\u65F6\u7684\u9ED8\u8BA4\u72B6\u6001\uFF0C\u4EE5\u53CA\u9762\u677F\u6A21\u5F0F\u94FA\u51FA\u54EA\u4E9B\u4EFB\u52A1\u3002": "What the view looks like when it opens, and which tasks the panel modes show.",
  "\u65E5\u5386\u4E0E\u7518\u7279": "Calendar and Gantt",
  "\u65E5\u5386\u4E0E\u7518\u7279\u5404\u81EA\u7684\u663E\u793A\u53E3\u5F84\u548C\u914D\u8272\uFF0C\u4E92\u4E0D\u5F71\u54CD\u3002": "Display settings and colours for the calendar and the Gantt, which do not affect each other.",
  "\u7518\u7279\u56FE\u6A21\u5F0F": "Gantt mode",
  "\u9000\u51FA\u7518\u7279\u56FE\u6A21\u5F0F": "Exit Gantt mode",
  // ── settings: journal template ───────────────────────────────────
  "\u65E5\u5FD7\u6A21\u677F": "Journal template",
  "\u6A21\u677F\u7B14\u8BB0\u8DEF\u5F84": "Template note path",
  "\u76EE\u6807\u7B14\u8BB0\u4E0D\u5B58\u5728\u65F6\uFF0C\u7528\u8FD9\u7BC7\u7B14\u8BB0\u7684\u5185\u5BB9\u65B0\u5EFA\u3002\u586B vault \u76F8\u5BF9\u8DEF\u5F84\uFF0C\u6269\u5C55\u540D\u53EF\u7701\u7565\uFF1B\u7559\u7A7A\u5219\u65B0\u5EFA\u7A7A\u767D\u7B14\u8BB0\u3002": "Used to create the target note when it does not exist yet. Enter a vault-relative path; the extension is optional. Leave empty to create a blank note.",
  "\u6A21\u677F": "Templates",
  "\u76EE\u6807\u7B14\u8BB0\u8DEF\u5F84\u4E0E\u6A21\u677F\u91CC\u53EF\u7528\u7684\u5360\u4F4D\u7B26": "Placeholders available in the path and the template",
  "{{title}} \u662F\u65B0\u7B14\u8BB0\u7684\u6587\u4EF6\u540D\uFF0C{{date}} \u4E0E {{time}} \u662F\u5F53\u524D\u65E5\u671F\u4E0E\u65F6\u95F4\uFF0C\u4E5F\u53EF\u4EE5\u5199\u6210 {{date:YYYY-MM-DD}} \u6307\u5B9A\u683C\u5F0F\uFF1B\u672A\u8BC6\u522B\u7684\u5360\u4F4D\u7B26\u539F\u6837\u4FDD\u7559\u3002": "{{title}} is the new note's file name, {{date}} and {{time}} are the current date and time, and {{date:YYYY-MM-DD}} picks a format. Unrecognised placeholders are kept as they are.",
  "\u65B0\u5EFA\u4EFB\u52A1\u7684\u843D\u70B9\uFF0C\u9ED8\u8BA4\u5199\u5230\u5F53\u65E5\u65E5\u5FD7\uFF1B\u7B14\u8BB0\u4E0D\u5B58\u5728\u65F6\u4F1A\u81EA\u52A8\u65B0\u5EFA\u3002\u7559\u7A7A\u8868\u793A\u5199\u8FDB\u5F53\u524D\u6253\u5F00\u7684\u7B14\u8BB0\u3002": "Where new tasks go. The default writes to today's journal, creating the note if needed. Leave empty to use the note you have open.",
  "\u627E\u4E0D\u5230\u6A21\u677F\u7B14\u8BB0\uFF1A{path}\uFF08\u5DF2\u6309\u7A7A\u767D\u7B14\u8BB0\u521B\u5EFA\uFF09": "Template note not found: {path} (created a blank note instead)",
  "\u6A21\u677F\u547D\u4EE4\u672A\u5168\u90E8\u6267\u884C\uFF0C\u7B14\u8BB0\u5DF2\u6309\u6A21\u677F\u539F\u6587\u521B\u5EFA\uFF1B\u53EF\u7A0D\u540E\u6267\u884C\u4E00\u6B21\u6A21\u677F\u547D\u4EE4\u91CD\u8DD1": "Some template commands did not run. The note was created from the template as written; run the template command again later if needed.",
  "\u65E0\u6CD5\u521B\u5EFA\u76EE\u6807\u7B14\u8BB0\uFF1A{path}": "Could not create the target note: {path}",
  // ── filter bar: collapse ─────────────────────────────────────────
  "\u6536\u8D77\u7B5B\u9009": "Hide filters",
  "\u5C55\u5F00\u7B5B\u9009": "Show filters",
  // ── Gantt: jump to today ─────────────────────────────────────────
  "\u5B9A\u4F4D\u5230\u4ECA\u5929": "Jump to today",
  "\u628A\u65F6\u95F4\u8F74\u590D\u4F4D\u5230\u4ECA\u5929\u7684\u4F4D\u7F6E": "Scroll the timeline back to today",
  // ── Gantt bar duration ───────────────────────────────────────────
  "\u6761\u4E0A\u663E\u793A\u5929\u6570": "Days on bars",
  "\u5728\u7518\u7279\u6761\u4E0A\u6807\u51FA\u5929\u6570\u3002\u300C\u5DE5\u4F5C\u65E5\u300D= \u81EA\u7136\u65E5 \u2212 \u5468\u672B\uFF08\u9700\u5728 Mermaid \u9884\u89C8\u9875\u7B7E\u6253\u5F00\u300C\u6392\u9664\u5468\u672B\u300D\uFF09\u2212 \u6CD5\u5B9A\u8282\u5047\u65E5\u6392\u671F + \u8865\u73ED\u65E5\uFF1B\u4E0E\u5BFC\u51FA\u7684 excludes/includes\u3001\u56FE\u4E0A\u7684\u7070\u8272\u5217\u662F\u540C\u4E00\u4EFD\u53E3\u5F84\u3002": "Label each bar with its length. Workdays = calendar days \u2212 weekends (turn on Exclude weekends on the Mermaid preview tab) \u2212 public holidays + make-up workdays, the same calendar behind the exported excludes/includes and the shaded columns.",
  "\u4E0D\u663E\u793A": "Do not show",
  "\u81EA\u7136\u65E5\uFF08\u542B\u9996\u5C3E\uFF09": "Calendar days (inclusive)",
  "\u5DE5\u4F5C\u65E5": "Workdays",
  "{count} \u5DE5\u4F5C\u65E5": "{count} workdays",
  "\u81EA\u7136\u65E5 {calendar} \u5929 \xB7 \u5DE5\u4F5C\u65E5 {workday} \u5929": "{calendar} calendar days \xB7 {workday} workdays",
  "\u6761\u5B50\u592A\u7A84\u653E\u4E0D\u4E0B\u65F6\u4F1A\u632A\u5230\u6761\u5B50\u53F3\u4FA7\u663E\u793A\u3002": "When a bar is too narrow, the label moves to its right.",
  // ── Gantt task column ────────────────────────────────────────────
  "\u4EFB\u52A1\u5217\u5BBD\u5EA6": "Task column width",
  "\u7518\u7279\u5DE6\u4FA7\u4EFB\u52A1\u5217\u7684\u5BBD\u5EA6\uFF08px\uFF09\u3002\u4E5F\u53EF\u4EE5\u76F4\u63A5\u5728\u7518\u7279\u91CC\u62D6\u52A8\u4EFB\u52A1\u5217\u4E0E\u65F6\u95F4\u8F74\u4E4B\u95F4\u7684\u5206\u9694\u6761\u3002": "Width of the Gantt's task column in pixels. You can also drag the divider between the task column and the timeline.",
  "\u62D6\u52A8\u8C03\u6574\u4EFB\u52A1\u5217\u5BBD\u5EA6": "Drag to resize the task column",
  // ── settings: gantt colours ──────────────────────────────────────
  "\u7518\u7279\u89C6\u56FE": "Gantt view",
  "\u7518\u7279\u6761\u914D\u8272": "Bar colours",
  "\u6309 Mermaid \u7518\u7279\u7684\u56DB\u79CD\u72B6\u6001\u914D\u8272\u3002\u989C\u8272\u53EF\u5199 var(--color-blue) \u6216\u989C\u8272\u540D\uFF1B\u70B9\u4E0B\u9762\u7684\u8272\u5757\u5373\u6539\u3002": "One colour per Mermaid Gantt state. Values can be var(--color-blue) or a colour name; click a swatch to change one.",
  "\u5173\u952E\u4EFB\u52A1": "Critical tasks",
  "\u5E26 \u{1F53A} \u6216 #crit \u6807\u8BB0\u7684\u4EFB\u52A1\uFF1B\u4F18\u5148\u7EA7\u6700\u9AD8\uFF0C\u540C\u65F6\u5DF2\u5B8C\u6210\u4E5F\u6309\u8FD9\u4E00\u8272\u663E\u793A\u3002": "Tasks marked \u{1F53A} or #crit. Takes precedence, so a critical task keeps this colour even when completed.",
  "\u5176\u4ED6\u72B6\u6001": "Other states",
  "\u65E2\u975E\u5173\u952E\u4E5F\u975E\u5DF2\u5B8C\u6210\u3001\u4E14\u8D77\u6B62\u65E5\u671F\u4E0D\u5B8C\u6574\uFF08\u56FE\u4E0A\u90A3\u4E00\u6BB5\u662F\u63A8\u5BFC\u503C\uFF09\u7684\u4EFB\u52A1\u3002": "Tasks that are neither critical nor completed and are missing a date, so the span shown is inferred.",
  "\u672A\u5B8C\u6210\u3001\u4E14\u8D77\u6B62\u65E5\u671F\u5B8C\u6574\u7684\u4EFB\u52A1\u3002": "Tasks that are still open and have both dates.",
  "\u5DF2\u5B8C\u6210\u7684\u4EFB\u52A1\uFF08\u52FE\u9009\u6846\u4E3A x\uFF09\u3002": "Tasks whose checkbox is ticked.",
  "\u9ED8\u8BA4\uFF1A{value}": "Default: {value}",
  "\u7EA2": "Red",
  "\u6A59": "Orange",
  "\u9EC4": "Yellow",
  "\u7EFF": "Green",
  "\u9752": "Cyan",
  "\u84DD": "Blue",
  "\u7D2B": "Purple",
  "\u7C89": "Pink",
  // ── Mermaid preview: options and image export ───────────────────
  "\u6392\u9664\u65E5\u671F": "Excluded dates",
  "\u8C03\u4F11\u4E0A\u73ED": "Make-up workdays",
  "\u628A\u5468\u516D\u5468\u65E5\u6807\u6210\u975E\u5DE5\u4F5C\u65E5\uFF1A\u81EA\u7ED8\u7518\u7279\u56FE\u4E0E\u5BFC\u51FA\u7684\u56FE\u90FD\u4F1A\u628A\u5B83\u4EEC\u753B\u6210\u7070\u8272\u5217\u3002\u6CE8\u610F\uFF1A\u4EFB\u52A1\u6761\u957F\u5EA6\u59CB\u7EC8\u6309\u8D77\u6B62\u65E5\u671F\u7B97\uFF08\u81EA\u7136\u65E5\uFF09\uFF0C\u4E0D\u4F1A\u56E0\u4E3A\u8DF3\u8FC7\u5468\u672B\u800C\u7F29\u77ED\u3002": "Mark Saturdays and Sundays as non-working days: both the built-in Gantt and the exported diagram shade them. Note that bar lengths always follow the start and end dates (calendar days) and are never shortened by skipping weekends.",
  "\u4E34\u65F6\u8865\u5145\u7684\u6392\u9664\u65E5\u671F\u3002\u652F\u6301\u533A\u95F4 2026-10-01~2026-10-07\uFF08\u4E5F\u8BA4\u300C\u81F3\u300D\uFF09\uFF0C\u591A\u6761\u7528\u9017\u53F7\u5206\u9694\uFF1B\u8FD9\u4E9B\u65E5\u5B50\u5728\u56FE\u4E0A\u4F1A\u753B\u6210\u7070\u8272\u7684\u975E\u5DE5\u4F5C\u65E5\u3002\u6210\u89C4\u6A21\u7684\u6CD5\u5B9A\u8282\u5047\u65E5\u5EFA\u8BAE\u5728\u8BBE\u7F6E\u91CC\u6309\u5E74\u4EFD\u7EF4\u62A4\u300C\u6CD5\u5B9A\u8282\u5047\u65E5\u6392\u671F\u300D\uFF0C\u5BFC\u51FA\u65F6\u4F1A\u81EA\u52A8\u5957\u7528\u3002": "Extra excluded dates. Ranges work too (2026-10-01~2026-10-07, and \u81F3 as well), separated by commas; these days are shaded as non-working days. For a full year of public holidays, keep the per-year schedule in the settings instead \u2014 it is applied automatically.",
  "\u4E34\u65F6\u8865\u5145\u7684\u8C03\u4F11\u8865\u73ED\u65E5\u3002\u5199\u6CD5\u540C\u4E0A\uFF1B\u8FD9\u4E9B\u65E5\u5B50\u5F3A\u5236\u7B97\u5DE5\u4F5C\u65E5\uFF08\u4F18\u5148\u7EA7\u9AD8\u4E8E\u6392\u9664\uFF09\uFF0C\u7528\u4E8E\u628A\u300C\u5468\u516D\u4F46\u8981\u4E0A\u73ED\u300D\u4ECE\u7070\u8272\u91CC\u635E\u56DE\u6765\u3002\u5E74\u5EA6\u6392\u671F\u91CC\u7684\u8865\u73ED\u65E5\u4F1A\u81EA\u52A8\u5957\u7528\uFF0C\u8FD9\u91CC\u53EA\u586B\u4F8B\u5916\u3002": "Extra make-up workdays. Same syntax; these days count as working days (they win over exclusions), which pulls a working Saturday out of the shading. Make-up days from the yearly schedule apply automatically \u2014 only add exceptions here.",
  "\u5BFC\u51FA SVG": "Export SVG",
  "\u5BFC\u51FA JPG": "Export JPG",
  "\u628A\u9884\u89C8\u91CC\u7684\u56FE\u5B58\u6210\u77E2\u91CF\u56FE\uFF08.svg\uFF09\uFF1A\u653E\u5927\u4E0D\u7CCA\uFF0C\u4E5F\u80FD\u518D\u62FF\u53BB\u522B\u7684\u5DE5\u5177\u91CC\u6539\u3002": "Save the preview as a vector image (.svg): stays sharp at any size and can be edited in other tools.",
  "\u628A\u9884\u89C8\u91CC\u7684\u56FE\u5B58\u6210\u4F4D\u56FE\uFF08.jpg\uFF0C2 \u500D\u5206\u8FA8\u7387\u3001\u5E95\u8272\u8DDF\u968F\u4E3B\u9898\uFF09\uFF1A\u9002\u5408\u8D34\u8FDB\u804A\u5929\u6216\u6587\u6863\u3002": "Save the preview as a bitmap (.jpg at 2x, background follows the theme): handy for chat or documents.",
  "\u9884\u89C8\u91CC\u8FD8\u6CA1\u6709\u53EF\u5BFC\u51FA\u7684\u56FE\uFF0C\u7B49\u5B83\u6E32\u67D3\u5B8C\u518D\u70B9\u4E00\u6B21": "The preview has no diagram to export yet \u2014 wait for it to render and try again",
  "\u5BFC\u51FA\u56FE\u7247\u5931\u8D25\uFF1A{message}": "Image export failed: {message}",
  "\u5DF2\u5BFC\u51FA\u5E76\u590D\u5236\u8DEF\u5F84\uFF1A{path}": "Exported and copied the path: {path}",
  "\u5DF2\u5BFC\u51FA {path}\uFF08\u590D\u5236\u8DEF\u5F84\u5931\u8D25\uFF0C\u8BF7\u5230\u9644\u4EF6\u76EE\u5F55\u67E5\u627E\uFF09": "Exported {path} (copying the path failed; look for it in your attachment folder)",
  "\u7518\u7279\u56FE": "Gantt",
  // ── settings: public holiday schedule ────────────────────────────
  "\u6CD5\u5B9A\u8282\u5047\u65E5\u6392\u671F": "Public holiday schedule",
  "\u6309\u5E74\u4EFD\u7EF4\u62A4\u300C\u653E\u5047\u300D\u4E0E\u300C\u8C03\u4F11\u4E0A\u73ED\u300D\u3002\u5BFC\u51FA\u65F6\u6309\u7518\u7279\u56FE\u8DE8\u5230\u7684\u5E74\u4EFD\u81EA\u52A8\u5957\u7528\uFF0C\u4E0D\u5FC5\u5728\u56FE\u4E0A\u7684\u9762\u677F\u91CC\u624B\u6253\u6BCF\u4E00\u5929\u3002": "Keep holidays and make-up workdays per year. Whatever the Gantt spans is applied automatically, so there is no need to type each day into the panel.",
  "\u8FD8\u6CA1\u6709\u6392\u671F": "No schedule yet",
  "\u70B9\u4E0B\u9762\u7684\u6309\u94AE\u6DFB\u52A0\u4E00\u4E2A\u5E74\u5EA6\uFF0C\u4E4B\u540E\u6309\u56FD\u52A1\u9662\u516C\u544A\u7684\u533A\u95F4\u586B\u5373\u53EF\u3002": "Add a year with the button below, then fill in the ranges as they are announced.",
  "{year} \xB7 \u653E\u5047": "{year} \xB7 Holidays",
  "\u533A\u95F4\u5199\u6210 10-01~10-07\uFF08`~` \u4E0E\u300C\u81F3\u300D\u90FD\u8BA4\uFF09\uFF1B\u8DE8\u5E74\u533A\u95F4\u5982 12-30~01-02 \u81EA\u52A8\u7B97\u5230\u6B21\u5E74\u3002": "Ranges look like 10-01~10-07 (`~` or \u81F3 both work); a range that crosses the new year, such as 12-30~01-02, rolls into the next year automatically.",
  "{year} \xB7 \u8C03\u4F11\u4E0A\u73ED": "{year} \xB7 Make-up workdays",
  "\u8FD9\u4E9B\u65E5\u5B50\u5F3A\u5236\u7B97\u5DE5\u4F5C\u65E5\uFF08\u4F18\u5148\u7EA7\u9AD8\u4E8E\u653E\u5047\uFF09\uFF0C\u7528\u4E8E\u628A\u300C\u5468\u516D\u4F46\u8981\u4E0A\u73ED\u300D\u4ECE\u7070\u8272\u975E\u5DE5\u4F5C\u65E5\u91CC\u635E\u56DE\u6765\u3002": "These days always count as working days (they win over holidays), which pulls a working Saturday out of the shading.",
  "\u5220\u9664\u8BE5\u5E74\u5EA6\u6392\u671F": "Delete this year",
  "\u65B0\u589E\u5E74\u5EA6": "Add a year",
  "\u6BCF\u5E74\u516C\u544A\u51FA\u6765\u540E\uFF0C\u6DFB\u4E00\u4E2A\u5E74\u5EA6\u518D\u586B\u533A\u95F4\u5373\u53EF\u3002": "Once a year is announced, add it and fill in the ranges.",
  "\u6DFB\u52A0\u5E74\u4EFD": "Add year",
  "\u6392\u9664\u65E5\u671F\u4E0E\u8C03\u4F11\u4E0A\u73ED": "Excluded dates and make-up workdays",
  "\u540C\u6837\u5728\u300CMermaid \u9884\u89C8\u300D\u9875\u7B7E\u4E0A\u4E34\u65F6\u586B\u5199\uFF08\u5199\u5B8C\u6574\u65E5\u671F\uFF0C\u53EF\u8DE8\u5E74\u5EA6\uFF09\u3002\u6210\u89C4\u6A21\u7684\u6CD5\u5B9A\u8282\u5047\u65E5\u8BF7\u5230\u300C\u6CD5\u5B9A\u8282\u5047\u65E5\u6392\u671F\u300D\u4E00\u9875\u6309\u5E74\u4EFD\u7EF4\u62A4\u3002": "Also filled in on the Mermaid preview tab, as full dates, and they may span years. For a whole year of public holidays use the Public holiday schedule tab instead.",
  // ── Mermaid preview and export ───────────────────────────────────
  "Mermaid \u9884\u89C8": "Mermaid preview",
  "Mermaid \u4EE3\u7801\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F": "Mermaid code copied to the clipboard",
  "\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5": "Copy failed, please try again",
  "\u5DF2\u66F4\u65B0 {path} \u7684\u843D\u70B9\u6807\u8BB0\u4E4B\u95F4": "Updated the marked block in {path}",
  "\u6CA1\u627E\u5230\u843D\u70B9\u6807\u8BB0\uFF0C\u5DF2\u8FFD\u52A0\u5230 {path} \u6587\u672B": "No markers found; appended to the end of {path}",
  "Mermaid \u7684 gantt \u8BED\u6CD5\u4E0D\u652F\u6301\u9010\u4EFB\u52A1\u914D\u8272\uFF1A\u8BBE\u7F6E\u91CC\u7684\u56DB\u79CD\u6761\u8272\u53EA\u5F71\u54CD\u81EA\u7ED8\u7518\u7279\u56FE\uFF0C\u5BFC\u51FA\u65F6\u4F1A\u5FFD\u7565\u3002": "Mermaid's gantt syntax has no per-task colours: the four bar colours in the settings only affect the built-in Gantt and are ignored on export.",
  "Mermaid \u9884\u89C8\u6E32\u67D3\u5931\u8D25\uFF0C\u5BFC\u51FA\u7684\u4EE3\u7801\u4ECD\u53EF\u7528": "The Mermaid preview failed to render; the exported code still works",
  "\u4ECA\u5929\u7EBF": "Today line",
  "\u5BFC\u51FA\u7684\u4EE3\u7801\u91CC\u4FDD\u7559\u4ECA\u5929\u7684\u7AD6\u7EBF\u3002": "Keep today's vertical line in the exported code.",
  "\u5BFC\u51FA\u4EE3\u7801": "Export code",
  "\u590D\u5236\u5F53\u524D\u9884\u89C8\u7684 Mermaid \u4EE3\u7801": "Copy the Mermaid code behind the current preview",
  "\u5199\u5165\u7B14\u8BB0": "Write to note",
  "\u66FF\u6362\u6307\u5B9A\u7B14\u8BB0\u91CC\u843D\u70B9\u6807\u8BB0\u4E4B\u95F4\u7684\u5185\u5BB9\uFF08\u6807\u8BB0\u53EF\u5728\u8BBE\u7F6E\u91CC\u6539\uFF09": "Replace the block between the markers in a note you pick (the markers are configurable)",
  "\u6392\u9664\u5468\u672B": "Exclude weekends",
  "\u6CA1\u6709\u53EF\u6E32\u67D3\u7684\u5185\u5BB9": "Nothing to render",
  "\u9884\u89C8\u6E32\u67D3\u5931\u8D25\uFF1A{message}": "Preview failed to render: {message}",
  "\u9009\u62E9\u8981\u5199\u5165 Mermaid \u7684\u7B14\u8BB0\uFF08\u5176\u6807\u8BB0\u5757\u5185\u5185\u5BB9\u4F1A\u88AB\u66FF\u6362\uFF09": "Pick the note to write into (the block between its markers is replaced)",
  "Mermaid \u5BFC\u51FA": "Mermaid export",
  "\u56FE\u6807\u9898": "Diagram title",
  "\u5BFC\u51FA\u4EE3\u7801\u91CC\u7684 title \u884C\u3002\u7559\u7A7A\u5219\u4E0D\u8F93\u51FA\u8FD9\u4E00\u884C\u3002": "The title line of the exported code. Leave empty to omit it.",
  "\u843D\u70B9\u6807\u8BB0": "Markers",
  "\u300C\u5199\u5165\u7B14\u8BB0\u300D\u53EA\u66FF\u6362\u8FD9\u4E24\u4E2A\u6807\u8BB0\u4E4B\u95F4\u7684\u5185\u5BB9\uFF0C\u6807\u8BB0\u4E4B\u5916\u4E00\u4E2A\u5B57\u4E0D\u52A8\uFF1B\u7B14\u8BB0\u91CC\u8FD8\u6CA1\u6709\u6807\u8BB0\u65F6\uFF0C\u6574\u5757\u8FFD\u52A0\u5230\u6587\u672B\u3002": "Write to note replaces only what sits between these two markers and touches nothing else; when the note has no markers yet, the whole block is appended at the end.",
  "\u4ECA\u5929\u7EBF\u4E0E\u6392\u9664\u5468\u672B": "Today line and weekends",
  "\u5728\u7518\u7279\u6A21\u5F0F\u7684\u300CMermaid \u9884\u89C8\u300D\u9875\u7B7E\u4E0A\u5207\u6362\uFF0C\u6539\u52A8\u4F1A\u7ACB\u5373\u91CD\u7B97\u9884\u89C8\u5E76\u4FDD\u5B58\u5728\u6B64\u3002": "Toggled on the Mermaid preview tab in Gantt mode; changes recompute the preview right away and are saved here.",
  // ── task editor ──────────────────────────────────────────────────
  "\u7F16\u8F91\u4EFB\u52A1": "Edit task",
  "\u6253\u5F00\u7B14\u8BB0": "Open note",
  "\u4EFB\u52A1\u5728\u7B14\u8BB0\u91CC\u53EA\u5360\u4E00\u884C\uFF0C\u6362\u884C\u4F1A\u88AB\u5E76\u6210\u4E00\u4E2A\u7A7A\u683C\u3002\u6807\u7B7E\u76F4\u63A5\u5199\u5728\u63CF\u8FF0\u91CC\uFF08\u5982 #\u5DE5\u4F5C\uFF09\uFF0C\u4E5F\u53EF\u4EE5\u70B9\u300C\u6807\u7B7E\u300D\u5C55\u5F00\u5019\u9009\u9009\u62E9\u3002": "A task is a single line in the note, so line breaks are joined into one space. Tags live straight in the description (e.g. #work), or expand the Tags dropdown and pick one.",
  "\u6807\u7B7E": "Tags",
  "\u70B9\u4E00\u4E0B\u52A0\u5230\u63CF\u8FF0\u91CC": "Click to add it to the description",
  "\u70B9\u4E00\u4E0B\u4ECE\u63CF\u8FF0\u91CC\u53BB\u6389": "Click to remove it from the description",
  "\u8FD8\u6CA1\u6709\u7528\u8FC7\u7684\u6807\u7B7E\uFF0C\u76F4\u63A5\u5728\u63CF\u8FF0\u91CC\u5199 #\u6807\u7B7E \u5373\u53EF\u3002": "No tags used yet \u2014 just type #tag in the description.",
  "\u63CF\u8FF0": "Description",
  "\u4EFB\u52A1\u63CF\u8FF0": "Task description",
  "\u4EFB\u52A1 ID": "Task ID",
  "\u7528\u4E8E\u88AB\u5176\u4ED6\u4EFB\u52A1\u4F9D\u8D56": "Used by other tasks as a dependency",
  "\u968F\u673A\u751F\u6210 ID": "Generate a random ID",
  "\u4F9D\u8D56\u4EFB\u52A1": "Depends on",
  "\u4E0D\u4F9D\u8D56": "No dependency",
  "\uFF08\u622A\u6B62 {date}\uFF09": "(due {date})",
  "\u521B\u5EFA": "Create",
  "\u4FDD\u5B58": "Save",
  "\u8BF7\u586B\u5199\u4EFB\u52A1\u63CF\u8FF0": "Enter a task description",
  "\u627E\u4E0D\u5230\u6587\u4EF6\uFF1A{path}": "File not found: {path}",
  "\u8BF7\u5148\u5728\u8BBE\u7F6E\u91CC\u6307\u5B9A\u76EE\u6807\u7B14\u8BB0\uFF0C\u6216\u6253\u5F00\u4E00\u4E2A Markdown \u6587\u4EF6": "Set a target note in the settings, or open a Markdown file first",
  "\u5DF2\u6DFB\u52A0\u5230 {path}": "Added to {path}",
  "\u65E0\u6CD5\u6DFB\u52A0\u4EFB\u52A1\uFF1A{reason}": "Cannot add the task: {reason}",
  "\u627E\u4E0D\u5230\u6807\u9898\u300C{heading}\u300D": 'Heading "{heading}" not found',
  "\u6807\u9898\u683C\u5F0F\u4E0D\u5408\u6CD5": "Invalid heading format",
  "\u5728 {path}:{line} \u627E\u4E0D\u5230\u8BE5\u4EFB\u52A1\u884C": "Task line not found in {path}:{line}",
  // ── confirm dialogs ──────────────────────────────────────────────
  "\u5F00\u59CB\u65E5\u671F\uFF08{start}\uFF09\u665A\u4E8E\u622A\u6B62\u65E5\u671F\uFF08{due}\uFF09\u3002": "The start date ({start}) is later than the due date ({due}).",
  "\u8981\u628A\u622A\u6B62\u65E5\u671F\u8C03\u6574\u5230\u4ECA\u5929\uFF0C\u8FD8\u662F\u4FDD\u7559\u539F\u65E5\u671F\u5E76\u6807\u8BB0\u4E3A\u51B2\u7A81\uFF1F": "Adjust the due date to today, or keep it and mark the conflict?",
  "\u8C03\u6574\u622A\u6B62\u65E5\u671F": "Adjust due date",
  "\u6807\u8BB0\u51B2\u7A81": "Mark as conflicting",
  "\u5DF2\u628A\u622A\u6B62\u65E5\u671F\u8C03\u6574\u4E3A\u4ECA\u5929": "Due date adjusted to today",
  "\u5220\u9664\u4EFB\u52A1": "Delete task",
  "\u786E\u5B9A\u8981\u5220\u9664\u300C{description}\u300D\u5417\uFF1F\u8FD9\u4E00\u884C\u4F1A\u4ECE\u7B14\u8BB0\u91CC\u79FB\u9664\u3002": 'Delete "{description}"? The line is removed from the note.',
  // ── settings: interface / scanning ───────────────────────────────
  "\u754C\u9762": "Interface",
  "\u754C\u9762\u8BED\u8A00": "Interface language",
  "\u81EA\u52A8": "Automatic",
  "\u4E2D\u6587": "\u4E2D\u6587",
  "\u81EA\u52A8\u8DDF\u968F Obsidian \u7684\u754C\u9762\u8BED\u8A00\u3002": "Follow the Obsidian interface language.",
  "\u626B\u63CF\u8303\u56F4": "Scanning",
  "\u626B\u63CF\u76EE\u5F55": "Scan folders",
  "\u9017\u53F7\u5206\u9694\u591A\u4E2A\u76EE\u5F55\uFF0C\u652F\u6301\u591A\u7EA7\u8DEF\u5F84\uFF08\u4F8B\u5982 300 Resources/360 WorkMemos\uFF09\u3002\u7559\u7A7A\u8868\u793A\u626B\u63CF\u6574\u4E2A\u4ED3\u5E93\uFF08\u5927\u5E93\u4F1A\u5F88\u6162\uFF09\u3002\u5F53\u524D\u9ED8\u8BA4\uFF1A{folders}": "Comma separated folders; multi-level paths are fine (for example 300 Resources/360 WorkMemos). Leave empty to scan the whole vault (slow on large vaults). Current default: {folders}",
  "\u6392\u9664\u76EE\u5F55": "Excluded folders",
  "\u9017\u53F7\u5206\u9694\u591A\u4E2A\u76EE\u5F55\uFF0C\u5176\u4E0B\u7684\u4EFB\u52A1\u4E0D\u53C2\u4E0E\u7EDF\u8BA1\uFF1B\u540C\u6837\u652F\u6301\u591A\u7EA7\u8DEF\u5F84\u3002": "Comma separated folders whose tasks are left out of every view; multi-level paths work here too.",
  // ── settings: markers ────────────────────────────────────────────
  "\u4EFB\u52A1\u6807\u8BB0": "Task markers",
  "\u5DF2\u5B8C\u6210\u6807\u8BB0": "Completion markers",
  "\u65B9\u62EC\u53F7\u91CC\u7684\u5185\u5BB9\uFF0C\u9017\u53F7\u5206\u9694\u3002\u9ED8\u8BA4 x \u4E0E X\u3002": "Checkbox contents, comma separated. Defaults to x and X.",
  "\u5DF2\u53D6\u6D88\u6807\u8BB0": "Cancelled markers",
  "\u65B9\u62EC\u53F7\u91CC\u7684\u5185\u5BB9\uFF0C\u9017\u53F7\u5206\u9694\u3002\u9ED8\u8BA4\u77ED\u6A2A\u7EBF\u3002": "Checkbox contents, comma separated. Defaults to a hyphen.",
  "\u5FFD\u7565\u6807\u8BB0": "Ignored markers",
  "\u5E26\u8FD9\u4E9B\u6807\u8BB0\u7684\u4EFB\u52A1\u4E0D\u8FDB\u89C6\u56FE\u4E5F\u4E0D\u8FDB\u7EDF\u8BA1\uFF0C\u9017\u53F7\u5206\u9694\u3002": "Tasks with these markers are skipped in views and counts, comma separated.",
  "\u81EA\u52A8\u8BB0\u5F55\u5B8C\u6210\u65E5\u671F": "Track completion date",
  "\u52FE\u9009\u5B8C\u6210\u65F6\u81EA\u52A8\u8865\u4E0A\u5B8C\u6210\u6807\u8BB0\u4E0E\u5F53\u5929\u65E5\u671F\uFF0C\u91CD\u65B0\u6253\u5F00\u65F6\u79FB\u9664\u3002": "Adds the completion marker and today's date when you complete a task, and removes it when you reopen.",
  // ── settings: display ────────────────────────────────────────────
  "\u663E\u793A": "Display",
  "\u9ED8\u8BA4\u89C6\u56FE": "Default view",
  "\u6253\u5F00\u65F6\u5148\u663E\u793A\u54EA\u4E00\u79CD\u9762\u677F\u3002": "Which panel to show first.",
  "\u6253\u5F00\u4F4D\u7F6E": "Open location",
  "\u53F3\u4FA7\u8FB9\u680F": "Right sidebar",
  "\u65B0\u6807\u7B7E\u9875": "New tab",
  "\u9762\u677F\u6253\u5F00\u5728\u53F3\u4FA7\u8FB9\u680F\u8FD8\u662F\u65B0\u6807\u7B7E\u9875\u3002": "Open the panel in the right sidebar or a new tab.",
  "\u7D27\u6025\u5929\u6570": "Urgent window",
  "\u622A\u6B62\u65E5\u663E\u793A\u8303\u56F4": "Due date range",
  "\u53EA\u94FA\u51FA\u8FD9\u4E48\u591A\u6708\u5185\u5230\u671F\u7684\u4EFB\u52A1\uFF0C\u903E\u671F\u4E0E\u5DF2\u5B8C\u6210\u7684\u59CB\u7EC8\u663E\u793A\u30020 \u8868\u793A\u4E0D\u9650\u5236\u3002": "Only show tasks due within this many months. Overdue and completed tasks always show. 0 means no limit.",
  "\u9690\u85CF\u8FDC\u671F\u5F00\u59CB\u7684\u4EFB\u52A1": "Hide tasks that start far ahead",
  "\u5F00\u59CB\u65E5\u5728 1 \u4E2A\u6708\u4E4B\u540E\u7684\u5148\u4E0D\u94FA\u51FA\u6765\u3002": "Hide tasks that start more than one month away.",
  "\u94FA\u51FA\u65E0\u622A\u6B62\u65E5\u7684\u5DF2\u5B8C\u6210\u4EFB\u52A1": "Show completed tasks without a due date",
  "\u5173\u95ED\u65F6\uFF0C\u5DF2\u5B8C\u6210\u4EFB\u52A1\u8981\u6709\u5B8C\u6210\u65E5\u6216\u622A\u6B62\u65E5\u624D\u4F1A\u663E\u793A\u3002": "When off, a completed task needs a completion or due date to show.",
  "\u5DF2\u5B8C\u6210\u4EFB\u52A1\u7684\u663E\u793A\u8303\u56F4": "Completed task range",
  "\u53EA\u94FA\u51FA\u8FD9\u4E48\u591A\u6708\u5185\u5B8C\u6210\u7684\u5DF2\u5B8C\u6210\u4EFB\u52A1\uFF0C0 \u8868\u793A\u4E0D\u9650\u5236\u3002": "Only show tasks completed within this many months. 0 means no limit.",
  "\u6392\u5E8F\u6863\u4F4D\u8BF4\u660E": "Sort options",
  "\u6392\u5E8F\u5728\u7B5B\u9009\u680F\u91CC\u968F\u65F6\u53EF\u6539\uFF0C\u53EF\u9009\uFF1A{modes}": "Sorting can be changed from the filter bar at any time: {modes}",
  // ── settings: new tasks ──────────────────────────────────────────
  "\u76EE\u6807\u7B14\u8BB0\u8DEF\u5F84": "Target note path",
  "\u76EE\u6807\u6807\u9898": "Target heading",
  "\u628A\u65B0\u4EFB\u52A1\u63D2\u5230\u54EA\u4E2A\u6807\u9898\u4E0B\uFF08\u8981\u5E26\u4E0A\u4E95\u53F7\uFF09\u3002\u7559\u7A7A\u8868\u793A\u8FFD\u52A0\u5230\u6587\u672B\u3002": "Heading to insert new tasks under (include the #). Leave empty to append at the end of the note.",
  // ── settings: list ───────────────────────────────────────────────
  "\u5217\u8868\u89C6\u56FE": "List view",
  "\u6309\u6587\u4EF6\u5939\u5206\u7EC4": "Group by folder",
  "\u6309\u7B14\u8BB0\u5206\u7EC4": "Group by note",
  "\u5173\u95ED\u65F6\u4E00\u6761\u7B14\u8BB0\u4E00\u4E2A\u5BB9\u5668\uFF1B\u5F00\u542F\u65F6\u7B14\u8BB0\u5BB9\u5668\u5F52\u5165\u53EF\u6298\u53E0\u7684\u6587\u4EF6\u5939\u5206\u533A\u3002": "Off: one container per note. On: those containers sit under collapsible folder sections.",
  "\u5206\u533A\u540D": "Section names",
  "\u7528\u626B\u63CF\u76EE\u5F55\u91CC\u7684\u5B8C\u6574\u8DEF\u5F84\u4F5C\u4E3A\u5206\u533A\u540D\uFF08\u4F8B\u5982 300 Resources/360 WorkMemos\uFF09\uFF1B\u672A\u914D\u7F6E\u626B\u63CF\u76EE\u5F55\u65F6\u7528\u7B14\u8BB0\u81EA\u5DF1\u7684\u6587\u4EF6\u5939\u8DEF\u5F84\u3002": "Sections are named after the full path of the scan folder (for example 300 Resources/360 WorkMemos); without scan folders, each note's own folder is used.",
  "\u5F52\u6863, \u6A21\u677F": "Archive, Templates",
  // ── settings: GTD and matrix ─────────────────────────────────────
  "GTD \u4E0E\u77E9\u9635": "GTD and matrix",
  "\u5206\u5F00\u4E24\u5757\uFF1A\u5206\u7C7B\u4F9D\u636E\u51B3\u5B9A\u4EFB\u52A1\u843D\u5728\u54EA\u4E00\u5217\uFF0C\u62D6\u62FD\u51B3\u5B9A\u62D6\u8FC7\u53BB\u5F80\u7B14\u8BB0\u91CC\u5199\u4EC0\u4E48\u3002": "Two parts: classification decides which column a task belongs to, dragging decides what a drop writes into the note.",
  "\u5206\u7C7B\u4F9D\u636E": "Classification",
  "\u8FD9\u4E24\u4EFD\u6807\u7B7E\u6E05\u5355\u4E0E\u7D27\u6025\u7A97\u53E3\u662F\u552F\u4E8C\u53EF\u8C03\u7684\uFF1B\u5224\u5B9A\u987A\u5E8F\u5728\u4E0B\u9762\u5199\u7740\u3002": "These two tag lists and the urgent window are the only settings here; the order of the rules is spelled out below.",
  "\u7B49\u5F85\u4E2D\u6807\u7B7E": "Waiting tags",
  "\u5E26\u8FD9\u4E9B\u6807\u7B7E\u7684\u4EFB\u52A1\u843D\u5728\u300C\u7B49\u5F85\u4E2D\u300D\u3002\u9017\u53F7\u5206\u9694\uFF0C# \u53EF\u7701\u7565\u3002": "Tasks carrying these tags fall in Waiting. Comma separated; the # is optional.",
  "\u8FDB\u884C\u4E2D\u6807\u7B7E": "In-progress tags",
  "\u5E26\u8FD9\u4E9B\u6807\u7B7E\u7684\u4EFB\u52A1\u843D\u5728\u300C\u8FDB\u884C\u4E2D\u300D\u3002": "Tasks carrying these tags fall in In progress.",
  "\u8DDD\u4ECA\u591A\u5C11\u5929\u5185\u6709\u622A\u6B62\u65E5\u7684\u4EFB\u52A1\u7B97\u7D27\u6025\uFF0C\u77E9\u9635\u636E\u6B64\u5212\u5230\u7D27\u6025\u90A3\u4E00\u4FA7\u3002": "How many days ahead counts as urgent; the matrix uses this to pick the urgent side.",
  "\u5224\u5B9A\u987A\u5E8F": "Order of the rules",
  "\u4F9D\u8D56\u672A\u5B8C\u6210\u6216\u5E26\u7B49\u5F85\u4E2D\u6807\u7B7E \u2192 \u7B49\u5F85\u4E2D\uFF1B\u5E26\u8FDB\u884C\u4E2D\u6807\u7B7E \u2192 \u8FDB\u884C\u4E2D\uFF1B\u622A\u6B62\u65E5\u5DF2\u8FC7 \u2192 \u903E\u671F\uFF1B\u5F00\u59CB\u65E5\u5DF2\u8FC7 \u2192 \u8FDB\u884C\u4E2D\uFF1B\u5F00\u59CB\u65E5\u5728\u672A\u6765 \u2192 \u5F85\u5F00\u59CB\uFF08\u5E76\u5165\u6536\u4EF6\u7BB1\uFF09\uFF1B\u5176\u4F59 \u2192 \u6536\u4EF6\u7BB1\u3002": "Blocked by a dependency or carrying a waiting tag \u2192 Waiting; an in-progress tag \u2192 In progress; due date in the past \u2192 Overdue; start date in the past \u2192 In progress; start date in the future \u2192 To be started (folded into Inbox); anything else \u2192 Inbox.",
  "\u62D6\u62FD": "Dragging",
  "\u5173\u6389\u540E\u4E0B\u9762\u7684\u9879\u90FD\u4E0D\u751F\u6548\uFF0C\u4E5F\u5C31\u4E00\u5E76\u7981\u7528\u3002": "With this off, the settings below have no effect and are disabled.",
  "\u542F\u7528\u62D6\u62FD": "Enable dragging",
  "\u5173\u95ED\u540E GTD/\u77E9\u9635\u5BB9\u5668\u4E0D\u518D\u63A5\u53D7\u62D6\u5165\u3001\u5361\u7247\u4E5F\u4E0D\u53EF\u62D6\u52A8\uFF1B\u5361\u7247\u4E0A\u7684\u5FEB\u6377\u79FB\u52A8\u6309\u94AE\u4E0E\u7518\u7279\u53F3\u952E\u83DC\u5355\u4E0D\u53D7\u5F71\u54CD\u3002": "Turn this off and the GTD/Matrix containers stop accepting drops and cards can no longer be dragged; the quick-move buttons on cards and the Gantt context menu keep working.",
  "\u62D6\u62FD\u5199\u5165\u4EC0\u4E48": "What a drop writes",
  "\u62D6\u5230\u67D0\u4E00\u5217\u4F1A\u5199\u5165\u8BE5\u5217\u7684\u72B6\u6001\u6807\u7B7E\uFF08\u53D6\u6E05\u5355\u91CC\u7684\u7B2C\u4E00\u4E2A\uFF09\u5E76\u6458\u6389\u53E6\u4E00\u5217\u7684\u6807\u7B7E\uFF0C\u540C\u65F6\u628A\u5F00\u59CB\u65E5\u8C03\u5230\u4E0E\u90A3\u4E00\u5217\u4E00\u81F4 \u2014\u2014 \u62D6\u5230\u300C\u8FDB\u884C\u4E2D\u300D\u8865\u4ECA\u5929\u7684\u5F00\u59CB\u65E5\uFF0C\u62D6\u5230\u300C\u6536\u4EF6\u7BB1\u300D\u6E05\u6389\u5F00\u59CB\u65E5\uFF08\u5F00\u59CB\u65E5\u7559\u5728\u8FC7\u53BB\u4F1A\u88AB\u5224\u5B9A\u56DE\u8FDB\u884C\u4E2D\uFF09\u3002\u62D6\u5230\u8C61\u9650\u5199\u4F18\u5148\u7EA7\uFF0C\u5E76\u8BA9\u622A\u6B62\u65E5\u4E0E\u7D27\u6025\u90A3\u4E00\u4FA7\u4E00\u81F4\uFF1AQ1/Q3 \u8865\u4ECA\u5929\u7684\u622A\u6B62\u65E5\uFF0CQ2/Q4 \u6E05\u6389\u4F1A\u9020\u6210\u7D27\u6025\u7684\u65E5\u671F\u3002": "A drop writes the target column's status tag (the first entry of its list) and removes the other column's tags, then adjusts the start date to match the column \u2014 In progress gets a start date of today, Inbox has it cleared (a start date left in the past would send the task back to In progress). Dropping into a quadrant writes its priority and brings the due date in line with the urgent side: Q1/Q3 get today's date, Q2/Q4 lose a date that would make them urgent.",
  "\u62D6\u5230\u8FD9\u4E00\u8C61\u9650\u5199\u5165\u7684\u4F18\u5148\u7EA7\u3002\u91CD\u8981\u90A3\u4E00\u4FA7\u53EA\u80FD\u9009\u9AD8\u53CA\u4EE5\u4E0A\u3002": "The priority written when a task is dragged into this quadrant. On the important side, only high and above can be picked.",
  "\u62D6\u5230\u8FD9\u4E00\u8C61\u9650\u5199\u5165\u7684\u4F18\u5148\u7EA7\u3002\u4E0D\u91CD\u8981\u90A3\u4E00\u4FA7\u53EA\u80FD\u9009\u4E2D\u53CA\u4EE5\u4E0B\uFF08\u53EF\u7559\u7A7A\u4E0D\u5199\u6807\u8BB0\uFF09\u3002": "The priority written when a task is dragged into this quadrant. On the not-important side, only medium and below can be picked (or nothing at all).",
  // ── settings: calendar ───────────────────────────────────────────
  "\u65E5\u5386\u89C6\u56FE": "Calendar view",
  "\u6BCF\u5468\u7B2C\u4E00\u5929": "First day of week",
  "\u51B3\u5B9A\u65E5\u5386\u91CC\u4E00\u5468\u4ECE\u54EA\u5929\u6392\u8D77\u3002": "Which day a calendar week starts on.",
  "\u6708\u89C6\u56FE\u663E\u793A\u5468\u672B": "Show weekends in month view",
  "\u5173\u95ED\u540E\u53EA\u5217\u5DE5\u4F5C\u65E5\u3002": "When off, only weekdays are shown.",
  "\u5468\u89C6\u56FE\u663E\u793A\u5468\u672B": "Show weekends in week view",
  "\u5F00\u542F\u540E\u5468\u672B\u5355\u72EC\u6392\u5728\u4E0B\u65B9\u4E00\u884C\u3002": "When on, weekends move to their own row below.",
  "\u5217\u8868\u89C6\u56FE\u663E\u793A\u6574\u6708": "Show the whole month in list view",
  "\u5173\u95ED\u540E\u53EA\u5217\u51FA\u6709\u4EFB\u52A1\u7684\u65E5\u671F\u3002": "When off, only dates with tasks are listed.",
  "\u94FA\u5F00\u8FDB\u884C\u4E2D\u7684\u4EFB\u52A1": "Spread in-progress tasks",
  "\u540C\u65F6\u6709\u5F00\u59CB\u65E5\u4E0E\u622A\u6B62\u65E5\u7684\u4EFB\u52A1\uFF0C\u4F1A\u5728\u8D77\u6B62\u4E4B\u95F4\u7684\u6BCF\u4E00\u5929\u90FD\u51FA\u73B0\u3002": "Tasks with both a start and a due date appear on every day in between."
};

// src/i18n/translate.ts
function detectLocale(hostLocale) {
  return hostLocale.toLowerCase().startsWith("zh") ? "zh" : "en";
}
function fillParams(text, params) {
  if (params === void 0) return text;
  return text.replace(/\{(\w+)\}/g, (match, name) => {
    const value = params[name];
    return value === void 0 ? match : String(value);
  });
}
function translate(locale, key, params) {
  const text = locale === "en" ? EN[key] ?? key : key;
  return fillParams(text, params);
}

// src/i18n/index.ts
var current = "zh";
function getLocale() {
  return current;
}
function setLocale(locale) {
  if (locale === current) return false;
  current = locale;
  return true;
}
function applyLanguageSetting(setting, detected) {
  return setLocale(setting === "auto" ? detected : setting);
}
function t(key, params) {
  return translate(current, key, params);
}

// src/settings.ts
var import_obsidian2 = require("obsidian");

// src/utils/text.ts
function parseCommaList(value) {
  return value.split(/[,;，；\n\r]+/u).map((entry) => entry.trim()).filter((entry) => entry.length > 0);
}
function parsePathList(value) {
  return parseCommaList(value).map((entry) => entry.replace(/\\/gu, "/").replace(/^\/+|\/+$/gu, "")).filter((entry) => entry.length > 0);
}

// src/types.ts
var DEFAULT_GANTT_BAR_COLORS = {
  active: "var(--color-blue)",
  done: "var(--color-green)",
  crit: "var(--color-red)",
  fallback: "var(--text-muted)"
};
var BAR_DURATION_MODE_KEYS = {
  off: true,
  calendar: true,
  workday: true
};
var BAR_DURATION_MODES = Object.keys(BAR_DURATION_MODE_KEYS);
var GANTT_SIDEBAR_MIN_WIDTH = 140;
var GANTT_SIDEBAR_DEFAULT_WIDTH = 240;
var DEFAULT_SETTINGS = {
  uiLanguage: "auto",
  // Defaults keep the first index pass small instead of scanning the whole vault.
  scanFolders: ["500 Journal", "100 Projects"],
  excludeFolders: [],
  defaultView: "eisenhower",
  ganttBarColors: { ...DEFAULT_GANTT_BAR_COLORS },
  ganttSidebarWidth: GANTT_SIDEBAR_DEFAULT_WIDTH,
  // 默认沿用「一直显示自然日」的旧行为：这个插件历来就把天数写在条上，
  // 默认改成「不显示」等于让现有用户的甘特图悄悄变样
  ganttBarDuration: "calendar",
  mermaidTitle: "\u4EFB\u52A1\u8FDB\u5EA6\u7518\u7279\u56FE",
  mermaidTodayMarker: true,
  mermaidExcludeWeekends: false,
  mermaidExcludeDates: "",
  mermaidIncludeDates: "",
  holidaySchedules: {},
  mermaidMarkerStart: "%% task-matrix:start %%",
  mermaidMarkerEnd: "%% task-matrix:end %%",
  completedTaskDisplayRange: 1,
  includeCompletedWithoutDueDate: false,
  openLocation: "sidebar",
  gtdWaitingTags: ["#waiting", "#delegated", "#blocked"],
  gtdInProgressTags: ["#doing", "#active", "#started", "#next"],
  dragEnabled: true,
  quadrantPriorities: {
    Q1: "high" /* High */,
    Q2: "high" /* High */,
    Q3: "low" /* Low */,
    Q4: "lowest" /* Lowest */
  },
  completionMarkers: ["x", "X"],
  excludeMarkers: [],
  cancelledMarkers: ["-"],
  listGroupByFolder: false,
  // 默认落到当日日志：新任务最常见的去处就是今天那条，缺了会被自动建出来
  newTaskTargetPath: "500 Journal/{{date:YYYY-MM-DD}}",
  newTaskTemplatePath: "",
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

// src/utils/date.ts
function formatIso(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function todayIso() {
  return formatIso(/* @__PURE__ */ new Date());
}
function isoDateOffset(days) {
  const date = /* @__PURE__ */ new Date();
  date.setDate(date.getDate() + days);
  return formatIso(date);
}
function isValidIso(value) {
  return Boolean(value && /^\d{4}-\d{2}-\d{2}$/u.test(value));
}
function parseIso(value) {
  if (!isValidIso(value)) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}
function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}
function startOfDay(date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}
function startOfWeek(date, firstDay) {
  const result = startOfDay(date);
  const weekday = result.getDay();
  const offset = firstDay === "sunday" ? -weekday : weekday === 0 ? -6 : 1 - weekday;
  result.setDate(result.getDate() + offset);
  return result;
}
function weekdayOrder(firstDay) {
  return firstDay === "sunday" ? [0, 1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5, 6, 0];
}
function isWeekend(weekday) {
  return weekday === 0 || weekday === 6;
}
var ISO_PREFIX = /^(\d{4})-(\d{2})-(\d{2})/u;
function isoFromParts(year, month, day) {
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
function parseIsoParts(iso) {
  const match = ISO_PREFIX.exec(iso);
  if (match === null) {
    const now2 = /* @__PURE__ */ new Date();
    return { year: now2.getFullYear(), month: now2.getMonth() + 1, day: now2.getDate() };
  }
  return { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) };
}
function daysInMonth(year, month) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}
function addDaysIso(iso, days) {
  const { year, month, day } = parseIsoParts(iso);
  const shifted = new Date(Date.UTC(year, month - 1, day + days));
  return isoFromParts(shifted.getUTCFullYear(), shifted.getUTCMonth() + 1, shifted.getUTCDate());
}
function diffDaysIso(fromIso, toIso) {
  const from = parseIsoParts(fromIso);
  const to = parseIsoParts(toIso);
  const fromUtc = Date.UTC(from.year, from.month - 1, from.day);
  const toUtc = Date.UTC(to.year, to.month - 1, to.day);
  return Math.round((toUtc - fromUtc) / 864e5);
}
function weekdayOfIso(iso) {
  const { year, month, day } = parseIsoParts(iso);
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}
function minIso(a, b) {
  if (a === null) return b;
  if (b === null) return a;
  return a <= b ? a : b;
}
function maxIso(a, b) {
  if (a === null) return b;
  if (b === null) return a;
  return a >= b ? a : b;
}
function monthStartIso(iso) {
  const { year, month } = parseIsoParts(iso);
  return isoFromParts(year, month, 1);
}
function monthEndIso(iso) {
  const { year, month } = parseIsoParts(iso);
  return isoFromParts(year, month, daysInMonth(year, month));
}

// src/parser/task-parser.ts
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
var INLINE_FIELD_TOKEN_SOURCE = "\u{1F4C5}\\s*\\d{4}-\\d{2}-\\d{2}|\u{1F6EB}\\s*\\d{4}-\\d{2}-\\d{2}|\u23F3\\s*\\d{4}-\\d{2}-\\d{2}|\u2705\\s*\\d{4}-\\d{2}-\\d{2}|\u2795\\s*\\d{4}-\\d{2}-\\d{2}|\u{1F194}\\s*\\S+|\u26D4\\s*\\S+|\u{1F53A}|\u23EB|\u{1F53C}|\u{1F53D}|\u23EC|#[\\p{L}\\p{N}_/-]+|\\w+::\\s*\\S+";
var DEFAULT_GTD_RULES = {
  waitingTags: ["#waiting", "#delegated", "#blocked"],
  inProgressTags: ["#doing", "#active", "#started", "#next"]
};
function gtdRulesOf(settings) {
  return {
    waitingTags: settings.gtdWaitingTags.length > 0 ? settings.gtdWaitingTags : DEFAULT_GTD_RULES.waitingTags,
    inProgressTags: settings.gtdInProgressTags.length > 0 ? settings.gtdInProgressTags : DEFAULT_GTD_RULES.inProgressTags
  };
}
function matchesAnyTag(description, tags) {
  return tags.some((tag) => {
    const name = tag.trim().replace(/^#+/u, "");
    if (name.length === 0) return false;
    const pattern = new RegExp(`(?:^|\\s)#${escapeRegExp(name)}(?![\\p{L}\\p{N}_/-])`, "iu");
    return pattern.test(description);
  });
}
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}
function extractValue(text, regex) {
  const match = text.match(regex);
  return match?.[1]?.trim();
}
var TAG_PATTERN = /(^|\s)(#[\p{L}\p{N}_/-]+)/gu;
function extractTags(text) {
  return Array.from(text.matchAll(TAG_PATTERN)).map((entry) => entry[2].toLowerCase());
}
function stripTags(text) {
  return text.replace(TAG_PATTERN, "$1").replace(/[ \t]+/gu, " ").trim();
}
function tagPatternOf(tag) {
  const name = tag.trim().replace(/^#+/u, "").toLowerCase();
  return new RegExp(`(^|\\s)#${escapeRegExp(name)}(?![\\p{L}\\p{N}_/-])`, "giu");
}
function addTagToText(text, tag) {
  const name = tag.trim().replace(/^#+/u, "").toLowerCase();
  if (name.length === 0) return text;
  if (extractTags(text).some((entry) => entry.replace(/^#+/u, "") === name)) return text;
  const trimmed = text.trimEnd();
  return trimmed.length === 0 ? `#${name}` : `${trimmed} #${name}`;
}
function removeTagFromText(text, tag) {
  return text.replace(tagPatternOf(tag), "").replace(/\s+/gu, " ").trim();
}
function cleanDescription(raw) {
  return raw.replace(FIELD_PATTERNS.dueDate, "").replace(FIELD_PATTERNS.startDate, "").replace(FIELD_PATTERNS.scheduledDate, "").replace(FIELD_PATTERNS.doneDate, "").replace(FIELD_PATTERNS.createdDate, "").replace(FIELD_PATTERNS.recurrence, "").replace(FIELD_PATTERNS.taskIdIcon, "").replace(FIELD_PATTERNS.taskIdField, "").replace(FIELD_PATTERNS.dependsIcon, "").replace(FIELD_PATTERNS.dependsField, "").replace(/[\u{1f4c5}\u{1f6eb}\u{23f3}\u{2705}\u{2795}\u{1f504}\u{1f194}\u{26d4}\u{1f53c}\u{23eb}\u{1f53d}\u{23ec}\u{1f53a}]/gu, "").replace(/\s+/g, " ").trim();
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
  const today = todayIso();
  if (dueDate && dueDate < today) {
    return "overdue";
  }
  if (startDate && startDate > today) {
    return "to-be-started";
  }
  return "open";
}
function computeGtdState(displayStatus, checkboxContent, description, dueDate, startDate, blocked, rules = DEFAULT_GTD_RULES) {
  if (displayStatus === "completed" || displayStatus === "cancelled") {
    return "Done";
  }
  const today = todayIso();
  if (blocked || matchesAnyTag(description, rules.waitingTags)) {
    return "Waiting";
  }
  if (matchesAnyTag(description, rules.inProgressTags)) {
    return "In Progress";
  }
  if (dueDate && dueDate < today) {
    return "Overdue";
  }
  if (startDate) {
    if (startDate < today) return "In Progress";
    if (startDate > today) return "To be Started";
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
  const tags = extractTags(rawDescription);
  const description = cleanDescription(rawDescription);
  const blocked = Boolean(dependsOn);
  const displayStatus = computeDisplayStatus(checkboxContent, settings.completionMarkers, settings.cancelledMarkers, dueDate, startDate);
  const gtdState = computeGtdState(
    displayStatus,
    checkboxContent,
    description,
    dueDate,
    startDate,
    blocked,
    gtdRulesOf(settings)
  );
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
function generateShortId() {
  return Math.random().toString(36).substring(2, 8);
}

// src/services/filter-service.ts
var TASK_STATUSES = [
  "open",
  "to-be-started",
  "overdue",
  "completed",
  "cancelled"
];
function statusLabel(status) {
  switch (status) {
    case "open":
      return t("\u672A\u5F00\u59CB");
    case "to-be-started":
      return t("\u5F85\u5F00\u59CB");
    case "overdue":
      return t("\u5DF2\u903E\u671F");
    case "completed":
      return t("\u5DF2\u5B8C\u6210");
    case "cancelled":
      return t("\u5DF2\u53D6\u6D88");
    case "in-progress":
      return t("\u8FDB\u884C\u4E2D");
  }
}
function priorityLabel(priority) {
  switch (priority) {
    case "critical" /* Critical */:
      return t("\u7D27\u6025");
    case "highest" /* Highest */:
      return t("\u6700\u9AD8");
    case "high" /* High */:
      return t("\u9AD8");
    case "medium" /* Medium */:
      return t("\u4E2D");
    case "low" /* Low */:
      return t("\u4F4E");
    case "lowest" /* Lowest */:
      return t("\u6700\u4F4E");
    default:
      return t("\u65E0");
  }
}
function statusPresetLabel(preset) {
  switch (preset) {
    case "active-only":
      return t("\u53EA\u770B\u672A\u5B8C\u6210");
    case "hide-cancelled":
      return t("\u9690\u85CF\u5DF2\u53D6\u6D88");
    default:
      return t("\u5168\u90E8\u72B6\u6001");
  }
}
function presetToStatuses(preset) {
  switch (preset) {
    case "active-only":
      return ["open", "to-be-started", "overdue"];
    case "hide-cancelled":
      return TASK_STATUSES.filter((status) => status !== "cancelled");
    default:
      return [...TASK_STATUSES];
  }
}
function detectStatusPreset(statuses) {
  for (const preset of ["active-only", "hide-cancelled", "all"]) {
    const expected = presetToStatuses(preset);
    if (expected.length === statuses.length && expected.every((status) => statuses.includes(status))) {
      return preset;
    }
  }
  return "all";
}
function sortModeLabel(mode) {
  switch (mode) {
    case "due-asc":
      return t("\u622A\u6B62\u65E5 \u2191");
    case "due-desc":
      return t("\u622A\u6B62\u65E5 \u2193");
    case "start-asc":
      return t("\u5F00\u59CB\u65E5 \u2191");
    case "priority":
      return t("\u4F18\u5148\u7EA7");
    default:
      return t("\u6587\u4EF6\u540D");
  }
}
var SORT_MODES = ["due-asc", "due-desc", "start-asc", "priority", "file"];
function datePresetLabel(preset) {
  switch (preset) {
    case "today":
      return t("\u4ECA\u5929");
    case "week":
      return t("\u672C\u5468");
    case "month":
      return t("\u672C\u6708");
    case "year":
      return t("\u672C\u5E74");
    case "custom":
      return t("\u81EA\u5B9A\u4E49\u533A\u95F4");
    default:
      return t("\u4E0D\u9650");
  }
}
var DATE_PRESETS = ["all", "today", "week", "month", "year", "custom"];
function emptyDateRange() {
  return { preset: "all", start: null, end: null };
}
function defaultFilterState() {
  return {
    search: "",
    statuses: [...TASK_STATUSES],
    markers: [],
    startDate: emptyDateRange(),
    dueDate: emptyDateRange()
  };
}
function initialFilterState() {
  return {
    search: "",
    statuses: presetToStatuses("hide-cancelled"),
    markers: [],
    startDate: emptyDateRange(),
    dueDate: emptyDateRange()
  };
}
function collectMarkers(tasks, settings) {
  const present = new Set(tasks.map((task) => task.checkboxStatus.trim()));
  const preferred = ["", ...settings.completionMarkers, ...settings.cancelledMarkers].map((marker) => marker.trim());
  const ordered = [];
  for (const marker of preferred) {
    if (present.has(marker) && !ordered.includes(marker)) ordered.push(marker);
  }
  const rest = [...present].filter((marker) => !ordered.includes(marker)).sort((a, b) => a.localeCompare(b));
  return [...ordered, ...rest];
}
function markerLabel(marker) {
  return marker.length === 0 ? "[ ]" : `[${marker}]`;
}
function toggle(list, value) {
  return list.includes(value) ? list.filter((entry) => entry !== value) : [...list, value];
}
function hasActiveFilter(state) {
  return state.search.trim().length > 0 || detectStatusPreset(state.statuses) !== "all" || state.markers.length > 0 || state.startDate.preset !== "all" || state.dueDate.preset !== "all";
}
function resolveDateRange(range, today) {
  if (range.preset === "custom") return { start: range.start, end: range.end };
  const now2 = parseIso(today) ?? /* @__PURE__ */ new Date();
  switch (range.preset) {
    case "today":
      return { start: today, end: today };
    case "week": {
      const start = startOfWeek(now2, "monday");
      return { start: formatIso(start), end: formatIso(addDays(start, 6)) };
    }
    case "month": {
      const start = new Date(now2.getFullYear(), now2.getMonth(), 1);
      const end = new Date(now2.getFullYear(), now2.getMonth() + 1, 0);
      return { start: formatIso(start), end: formatIso(end) };
    }
    case "year": {
      const start = new Date(now2.getFullYear(), 0, 1);
      const end = new Date(now2.getFullYear(), 11, 31);
      return { start: formatIso(start), end: formatIso(end) };
    }
    default:
      return { start: null, end: null };
  }
}
function matchesRange(dateIso, range, today) {
  if (range.preset === "all") return true;
  if (!dateIso) return false;
  const { start, end } = resolveDateRange(range, today);
  if (start !== null && dateIso < start) return false;
  if (end !== null && dateIso > end) return false;
  return true;
}
function applyFilters(tasks, state, today = todayIso()) {
  const keyword = state.search.trim().toLowerCase();
  return tasks.filter((task) => {
    if (!state.statuses.includes(task.displayStatus)) return false;
    if (state.markers.length > 0 && !state.markers.includes(task.checkboxStatus.trim())) {
      return false;
    }
    if (!matchesRange(task.startDate, state.startDate, today)) return false;
    if (!matchesRange(task.dueDate, state.dueDate, today)) return false;
    if (keyword.length > 0) {
      const haystack = [task.description, task.filePath, task.taskId, task.dependsOn].filter((value) => Boolean(value)).join(" ").toLowerCase();
      if (!haystack.includes(keyword)) return false;
    }
    return true;
  });
}
function applyVisibilityRanges(tasks, settings, today = todayIso()) {
  const maxDue = settings.dueDateDisplayRange > 0 ? isoOffsetFrom(today, settings.dueDateDisplayRange * 30) : null;
  const maxStart = settings.hideFutureStartTasks ? isoOffsetFrom(today, 30) : null;
  const completedCutoff = settings.completedTaskDisplayRange > 0 ? isoOffsetFrom(today, -settings.completedTaskDisplayRange * 30) : null;
  return tasks.filter((task) => {
    if (task.displayStatus === "completed" && !settings.includeCompletedWithoutDueDate) {
      const reference = task.doneDate ?? task.dueDate;
      if (reference === void 0) return false;
      if (completedCutoff !== null && reference < completedCutoff) return false;
    }
    if (maxDue !== null && task.dueDate && task.dueDate > maxDue) {
      const pinned = task.displayStatus === "overdue" || task.displayStatus === "completed" || task.displayStatus === "cancelled";
      if (!pinned) return false;
    }
    if (maxStart !== null && task.startDate && task.displayStatus === "to-be-started" && task.startDate > maxStart) {
      return false;
    }
    return true;
  });
}
function isoOffsetFrom(baseIso, days) {
  const base = parseIso(baseIso);
  return base === null ? baseIso : formatIso(addDays(base, days));
}
function sortTasks(tasks, mode) {
  const sorted = [...tasks];
  sorted.sort((a, b) => {
    switch (mode) {
      case "due-desc":
        return compareOptionalDesc(a.dueDate, b.dueDate) || compareByFile(a, b);
      case "start-asc":
        return compareOptionalAsc(a.startDate, b.startDate) || compareByFile(a, b);
      case "priority":
        return priorityRank(b.priority) - priorityRank(a.priority) || compareOptionalAsc(a.dueDate, b.dueDate) || compareByFile(a, b);
      case "file":
        return compareByFile(a, b);
      default:
        return compareOptionalAsc(a.dueDate, b.dueDate) || priorityRank(b.priority) - priorityRank(a.priority) || compareByFile(a, b);
    }
  });
  return sorted;
}
function compareOptionalAsc(a, b) {
  if (a === b) return 0;
  if (a === void 0) return 1;
  if (b === void 0) return -1;
  return a.localeCompare(b);
}
function compareOptionalDesc(a, b) {
  if (a === b) return 0;
  if (a === void 0) return 1;
  if (b === void 0) return -1;
  return b.localeCompare(a);
}
function compareByFile(a, b) {
  if (a.filePath !== b.filePath) return a.filePath.localeCompare(b.filePath);
  return a.lineNumber - b.lineNumber;
}

// src/services/holiday-schedule.ts
var MAX_RANGE_DAYS = 366;
var MAX_YEAR_SPAN = 50;
function uniqueSorted(dates) {
  return [...new Set(dates)].sort();
}
function expandSpecs(raw, resolve) {
  const out = [];
  for (const chunk of raw.split(/[,，\n\s]+/u)) {
    const token = chunk.trim();
    if (token.length === 0) continue;
    const parts = token.split(/[~～至]/u).map((part) => part.trim()).filter((part) => part.length > 0);
    if (parts.length === 0 || parts.length > 2) continue;
    const start = resolve(parts[0] ?? "", 0);
    if (start === null) continue;
    const rawEnd = parts[1] ?? parts[0] ?? "";
    const end = resolve(rawEnd, 0);
    if (end === null) continue;
    const resolvedEnd = end < start ? resolve(rawEnd, 1) : end;
    if (resolvedEnd === null) continue;
    let cursor = start;
    for (let i = 0; cursor <= resolvedEnd && i <= MAX_RANGE_DAYS; i += 1) {
      out.push(cursor);
      cursor = addDaysIso(cursor, 1);
    }
  }
  return out;
}
function expandIsoDateSpecs(raw) {
  return uniqueSorted(
    expandSpecs(raw, (value, yearOffset) => yearOffset === 0 && isValidIso(value) ? value : null)
  );
}
function expandYearSpecs(raw, year) {
  return uniqueSorted(
    expandSpecs(raw, (value, yearOffset) => resolveYearDate(value, year + yearOffset))
  );
}
function resolveYearDate(raw, year) {
  if (isValidIso(raw)) return raw;
  const matched = /^(\d{1,2})-(\d{1,2})$/u.exec(raw);
  if (matched === null) return null;
  const month = Number(matched[1]);
  const day = Number(matched[2]);
  if (month < 1 || month > 12) return null;
  if (day < 1 || day > daysInMonth(year, month)) return null;
  return isoFromParts(year, month, day);
}
function expandYearSchedule(year, schedule) {
  return {
    exclude: expandYearSpecs(schedule.holidays, year),
    include: expandYearSpecs(schedule.makeupWorkdays, year)
  };
}
function collectHolidayDates(rangeStart, rangeEnd, schedules) {
  const [from, to] = rangeStart <= rangeEnd ? [rangeStart, rangeEnd] : [rangeEnd, rangeStart];
  const firstYear = parseIsoParts(from).year;
  const lastYear = parseIsoParts(to).year;
  const exclude = [];
  const include = [];
  for (let year = firstYear; year <= lastYear && year - firstYear <= MAX_YEAR_SPAN; year += 1) {
    const schedule = schedules[String(year)];
    if (schedule === void 0) continue;
    const expanded = expandYearSchedule(year, schedule);
    exclude.push(...expanded.exclude);
    include.push(...expanded.include);
  }
  return { exclude: uniqueSorted(exclude), include: uniqueSorted(include) };
}
function weekendDaysInRange(rangeStart, rangeEnd) {
  const [from, to] = rangeStart <= rangeEnd ? [rangeStart, rangeEnd] : [rangeEnd, rangeStart];
  const out = [];
  let cursor = from;
  for (let guard = 0; cursor <= to && guard <= MAX_RANGE_DAYS * MAX_YEAR_SPAN; guard += 1) {
    const weekday = weekdayOfIso(cursor);
    if (weekday === 0 || weekday === 6) out.push(cursor);
    cursor = addDaysIso(cursor, 1);
  }
  return out;
}
function resolveHolidayDates(rangeStart, rangeEnd, settings) {
  const schedule = collectHolidayDates(rangeStart, rangeEnd, settings.holidaySchedules);
  return {
    exclude: uniqueSorted([
      ...schedule.exclude,
      ...expandIsoDateSpecs(settings.mermaidExcludeDates)
    ]),
    include: uniqueSorted([
      ...schedule.include,
      ...expandIsoDateSpecs(settings.mermaidIncludeDates)
    ])
  };
}
function resolveNonWorkingDays(rangeStart, rangeEnd, settings) {
  const holiday = resolveHolidayDates(rangeStart, rangeEnd, settings);
  const days = new Set(holiday.exclude);
  if (settings.mermaidExcludeWeekends) {
    for (const day of weekendDaysInRange(rangeStart, rangeEnd)) days.add(day);
  }
  for (const day of holiday.include) days.delete(day);
  return [...days].sort();
}
function mergeContiguousDays(days) {
  const runs = [];
  let start = null;
  let previous = null;
  for (const day of days) {
    if (start === null || previous === null) {
      start = day;
    } else if (addDaysIso(previous, 1) !== day) {
      runs.push({ start, end: previous });
      start = day;
    }
    previous = day;
  }
  if (start !== null && previous !== null) runs.push({ start, end: previous });
  return runs;
}
function sortedScheduleYears(schedules) {
  return Object.keys(schedules).sort();
}
function nextScheduleYear(schedules, today = todayIso()) {
  const years = sortedScheduleYears(schedules);
  if (years.length === 0) return today.slice(0, 4);
  const latest = Number(years[years.length - 1]);
  return Number.isFinite(latest) ? String(latest + 1) : today.slice(0, 4);
}

// src/services/task-index.ts
var import_obsidian = require("obsidian");

// src/parser/gantt-parser.ts
var GANTT_TASK_PATTERN = /^\s*-\s*\[([ xX])\]\s+(.+)$/u;
var GANTT_HEADING_PATTERN = /^\s{0,3}(#{2,3})\s+(.+)$/u;
var DATE = "\\d{4}-\\d{2}-\\d{2}";
var START_FIELD = `(?:\\u{1F6EB}\\uFE0F?\\s*|\\[start::\\s*)(${DATE})\\]?`;
var SCHEDULED_FIELD = `(?:\\u{23F3}\\uFE0F?\\s*|\\[scheduled::\\s*)(${DATE})\\]?`;
var DUE_FIELD = `(?:\\u{1F4C5}\\uFE0F?\\s*|\\[due::\\s*)(${DATE})\\]?`;
var DONE_FIELD = `(?:\\u{2705}\\uFE0F?|\\[completion::\\s*)(${DATE})\\]?`;
var CREATED_FIELD = `(?:\\u{2795}\\uFE0F?|\\[created::\\s*)(${DATE})\\]?`;
var CANCELLED_FIELD = `(?:\\u{274C}\\uFE0F?|\\[cancelled::\\s*)(${DATE})\\]?`;
var ID_FIELD = "(?:\\u{1F194}\\uFE0F?\\s*|\\[id::\\s*)([a-zA-Z0-9_-]+)\\]?";
var DEPENDENCY_FIELD = "(?:\\u{26D4}\\uFE0F?\\s*|\\[(?:dependsOn|depends on|depends)::\\s*)([a-zA-Z0-9_-]+)\\]?";
var OWNER_FIELD = "\\[owner::\\s*([^\\]]+)\\]";
var START_RE = new RegExp(START_FIELD, "u");
var SCHEDULED_RE = new RegExp(SCHEDULED_FIELD, "u");
var DUE_RE = new RegExp(DUE_FIELD, "u");
var ID_RE = new RegExp(ID_FIELD, "u");
var DEPENDENCY_RE = new RegExp(DEPENDENCY_FIELD, "iu");
var MILESTONE_RE = new RegExp("#milestone|\\u{1F6A9}\\uFE0F?", "iu");
var CRITICAL_RE = new RegExp("\\u{1F53A}\\uFE0F?", "u");
var STRIP_PATTERNS = [
  START_FIELD,
  SCHEDULED_FIELD,
  DUE_FIELD,
  DONE_FIELD,
  CREATED_FIELD,
  CANCELLED_FIELD,
  ID_FIELD,
  DEPENDENCY_FIELD,
  OWNER_FIELD
].map((source) => new RegExp(source, "gu"));
var ORPHAN_EMOJI = /[\u{1F6EB}\u{23F3}\u{1F4C5}\u{2705}\u{2795}\u{274C}\u{1F194}\u{26D4}\u{1F53A}\u{1F6A9}]/gu;
function ganttHeadingOf(line) {
  const match = GANTT_HEADING_PATTERN.exec(line);
  if (match === null) return null;
  return { level: match[1].length === 2 ? 2 : 3, text: match[2].trim() };
}
function stripGanttFields(raw) {
  let name = raw;
  for (const pattern of STRIP_PATTERNS) {
    name = name.replace(pattern, "");
  }
  name = name.replace(ORPHAN_EMOJI, "");
  name = name.replace(/#crit\b/giu, "").replace(/#milestone\b/giu, "");
  return name.replace(/\s+/gu, " ").trim();
}
function parseGanttTaskLine(line, filePath, lineNumber, headings) {
  const match = GANTT_TASK_PATTERN.exec(line);
  if (match === null) return null;
  const raw = match[2];
  const start = normalizeIso(START_RE.exec(raw)?.[1]);
  const scheduled = normalizeIso(SCHEDULED_RE.exec(raw)?.[1]);
  const due = normalizeIso(DUE_RE.exec(raw)?.[1]);
  const name = stripGanttFields(raw) || t("\u672A\u547D\u540D\u4EFB\u52A1");
  return {
    id: `${filePath}:${lineNumber}:${name}`,
    filePath,
    lineNumber,
    lineText: line,
    name,
    project: headings.project,
    section: headings.section,
    completed: match[1].toLowerCase() === "x",
    // 🛫 缺省时用 ⏳ 顶上：来源项目的口径，能让「只写了计划日」的任务也上得了图
    startDate: start ?? scheduled,
    scheduledDate: scheduled,
    dueDate: due,
    taskId: ID_RE.exec(raw)?.[1]?.trim() || void 0,
    dependsOn: DEPENDENCY_RE.exec(raw)?.[1]?.trim() || void 0,
    critical: CRITICAL_RE.test(raw),
    milestone: MILESTONE_RE.test(raw)
  };
}
function normalizeIso(value) {
  const trimmed = value?.trim();
  return trimmed !== void 0 && isValidIso(trimmed) ? trimmed : void 0;
}

// src/services/task-index.ts
function isExcalidrawPath(path) {
  return path.toLowerCase().endsWith(".excalidraw.md");
}
function isPathInScope(path, settings) {
  const excluded = settings.excludeFolders.some((folder) => isInside(path, folder));
  if (excluded) return false;
  if (settings.scanFolders.length === 0) return true;
  return settings.scanFolders.some((folder) => isInside(path, folder));
}
function isTrackedMarkdownPath(path, settings) {
  return path.toLowerCase().endsWith(".md") && !isExcalidrawPath(path) && isPathInScope(path, settings);
}
function scanFolderOf(path, folders) {
  return folders.find((folder) => isInside(path, folder)) ?? null;
}
function isInside(path, folderSetting) {
  const folder = folderSetting.trim().replace(/\\/gu, "/").replace(/^\/+|\/+$/gu, "").toLowerCase();
  if (folder.length === 0) return false;
  const target = path.toLowerCase();
  return target === folder || target.startsWith(`${folder}/`);
}
function shouldRescanForVaultChange(file, settings) {
  return file instanceof import_obsidian.TFile && isTrackedMarkdownPath(file.path, settings);
}
function shouldRescanForRename(file, oldPath, settings) {
  const currentMatches = file instanceof import_obsidian.TFile && isTrackedMarkdownPath(file.path, settings);
  return currentMatches || isTrackedMarkdownPath(oldPath, settings);
}
async function collectIndex(app, settings) {
  const tasks = [];
  const ganttTasks = [];
  const files = app.vault.getMarkdownFiles().filter((file) => isTrackedMarkdownPath(file.path, settings));
  for (const file of files) {
    const content = await app.vault.cachedRead(file);
    const lines = content.split(/\r?\n/u);
    const codeBlockLines = codeBlockLineNumbers(app, file);
    let sectionHeading;
    let ganttProject = "";
    let ganttSection = "";
    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      const lineNumber = index + 1;
      if (codeBlockLines.has(lineNumber)) continue;
      const headingMatch = line.match(/^\s{0,3}#{1,6}\s+(.+?)\s*#*\s*$/u);
      if (headingMatch) sectionHeading = headingMatch[1].trim();
      const ganttHeading = ganttHeadingOf(line);
      if (ganttHeading !== null) {
        if (ganttHeading.level === 2) {
          ganttProject = ganttHeading.text;
          ganttSection = "";
        } else {
          ganttSection = ganttHeading.text;
        }
      }
      const parsed = parseTaskLine(line, file.path, lineNumber, settings);
      if (parsed !== null && !settings.excludeMarkers.includes(parsed.checkboxStatus.trim())) {
        parsed.sectionHeading = sectionHeading;
        tasks.push(parsed);
      }
      const ganttTask = parseGanttTaskLine(line, file.path, lineNumber, {
        project: ganttProject,
        section: ganttSection
      });
      if (ganttTask !== null) ganttTasks.push(ganttTask);
    }
  }
  applyBlockedState(tasks);
  return { tasks, ganttTasks };
}
function codeBlockLineNumbers(app, file) {
  const lines = /* @__PURE__ */ new Set();
  const sections = app.metadataCache.getFileCache(file)?.sections ?? [];
  for (const section of sections) {
    if (section.type !== "code") continue;
    for (let line = section.position.start.line + 1; line <= section.position.end.line + 1; line += 1) {
      lines.add(line);
    }
  }
  return lines;
}
function applyBlockedState(tasks) {
  const completedIds = new Set(
    tasks.filter((task) => task.displayStatus === "completed").map((task) => task.taskId).filter((id) => Boolean(id))
  );
  for (const task of tasks) {
    if (!task.dependsOn) continue;
    task.blocked = !completedIds.has(task.dependsOn);
    task.gtdState = computeGtdState(
      task.displayStatus,
      task.checkboxStatus,
      task.description,
      task.dueDate,
      task.startDate,
      task.blocked
    );
  }
}
function taskSignature(tasks) {
  return tasks.map(
    (task) => `${task.id}|${task.lineText}|${task.displayStatus}|${task.gtdState}|${task.quadrant}|${task.blocked}|${task.sectionHeading ?? ""}`
  ).join("\n");
}
function ganttSignature(tasks) {
  return tasks.map(
    (task) => `${task.id}|${task.lineText}|${task.project}|${task.section}|${task.completed}|${task.critical}|${task.milestone}`
  ).join("\n");
}

// src/services/grouping-service.ts
var GTD_COLUMNS = ["Inbox", "In Progress", "Waiting", "Done"];
var QUADRANTS = ["Q1", "Q2", "Q3", "Q4"];
function gtdStateLabel(state) {
  switch (state) {
    case "Inbox":
      return t("\u6536\u4EF6\u7BB1");
    case "To be Started":
      return t("\u5F85\u5F00\u59CB");
    case "In Progress":
      return t("\u8FDB\u884C\u4E2D");
    case "Waiting":
      return t("\u7B49\u5F85\u4E2D");
    case "Overdue":
      return t("\u5DF2\u903E\u671F");
    default:
      return t("\u5DF2\u5B8C\u6210");
  }
}
function quadrantSubtitle(quadrant) {
  switch (quadrant) {
    case "Q1":
      return t("\u91CD\u8981\u4E14\u7D27\u6025");
    case "Q2":
      return t("\u91CD\u8981\u4E0D\u7D27\u6025");
    case "Q3":
      return t("\u7D27\u6025\u4E0D\u91CD\u8981");
    default:
      return t("\u4E0D\u91CD\u8981\u4E0D\u7D27\u6025");
  }
}
function panelKeyForGtd(state) {
  return `gtd:${state}`;
}
function panelKeyForQuadrant(quadrant) {
  return `q:${quadrant}`;
}
function panelKeyForFolder(folder) {
  return `folder:${folder}`;
}
function panelKeyForNote(filePath) {
  return `note:${filePath}`;
}
function noteNameOf(filePath) {
  return filePath.slice(filePath.lastIndexOf("/") + 1).replace(/\.md$/u, "");
}
function buildPanels(tasks, mode, settings) {
  switch (mode) {
    case "gtd":
      return buildGtdPanels(tasks, gtdRulesOf(settings));
    case "eisenhower":
      return buildQuadrantPanels(tasks);
    case "calendar":
      return { grid: "flow", panels: [] };
    default:
      return buildListPanels(tasks, settings);
  }
}
function buildListPanels(tasks, settings) {
  if (!settings.listGroupByFolder) return buildNoteContainers(tasks);
  const byFolder = /* @__PURE__ */ new Map();
  for (const task of tasks) {
    const folder = groupFolderOf(task.filePath, settings);
    const bucket = byFolder.get(folder);
    if (bucket === void 0) byFolder.set(folder, [task]);
    else bucket.push(task);
  }
  const sections = [...byFolder.keys()].sort((a, b) => a.localeCompare(b)).map((folder) => ({
    key: panelKeyForFolder(folder),
    title: folder === "" ? t("\u6839\u76EE\u5F55") : folder,
    // 分区里装的仍然是笔记容器：复用「按笔记分容器」这一份，口径不漂移
    panels: buildNoteContainers(byFolder.get(folder) ?? []).panels
  }));
  return { grid: "flow", sections, panels: [] };
}
function buildNoteContainers(tasks) {
  const grouped = /* @__PURE__ */ new Map();
  for (const task of tasks) {
    const bucket = grouped.get(task.filePath);
    if (bucket === void 0) grouped.set(task.filePath, [task]);
    else bucket.push(task);
  }
  const panels = [...grouped.keys()].sort((a, b) => a.localeCompare(b)).map((filePath) => ({
    key: panelKeyForNote(filePath),
    title: noteNameOf(filePath),
    tasks: grouped.get(filePath) ?? [],
    noteMeta: "hidden",
    addDefaults: { filePath }
  }));
  return { grid: "flow", panels };
}
function groupFolderOf(filePath, settings) {
  const scanned = scanFolderOf(filePath, settings.scanFolders);
  if (scanned !== null) return scanned;
  const slash = filePath.lastIndexOf("/");
  return slash === -1 ? "" : filePath.slice(0, slash);
}
function gtdColumnOf(task, today = todayIso(), rules = DEFAULT_GTD_RULES) {
  if (task.gtdState === "To be Started") return "Inbox";
  if (task.gtdState !== "Overdue") return task.gtdState;
  const description = task.description.toLowerCase();
  const hasActiveTag = matchesAnyTag(description, rules.inProgressTags);
  const hasStarted = Boolean(task.startDate && task.startDate <= today);
  return hasStarted || hasActiveTag ? "In Progress" : "Inbox";
}
function buildGtdPanels(tasks, rules) {
  const today = todayIso();
  const panels = GTD_COLUMNS.map((state) => {
    const columnTasks = tasks.filter((task) => {
      if (task.displayStatus === "cancelled") return false;
      if (state === "Done") {
        return task.displayStatus === "completed" && gtdColumnOf(task, today, rules) === state;
      }
      return task.displayStatus !== "completed" && gtdColumnOf(task, today, rules) === state;
    });
    return {
      key: panelKeyForGtd(state),
      title: gtdStateLabel(state),
      subtitle: taskCountLabel(columnTasks.length),
      tasks: columnTasks,
      dropTarget: { kind: "gtd", state },
      addDefaults: gtdDefaultsFor(state, today)
    };
  });
  return { grid: "fixed", panels };
}
function gtdDefaultsFor(state, today) {
  switch (state) {
    case "Waiting":
      return { gtdState: "Waiting" };
    case "In Progress":
      return { gtdState: "In Progress", startDate: today };
    case "Overdue":
      return { dueDate: today };
    default:
      return { gtdState: state };
  }
}
function buildQuadrantPanels(tasks) {
  const today = todayIso();
  const panels = QUADRANTS.map((quadrant) => {
    const cellTasks = tasks.filter(
      (task) => task.quadrant === quadrant && task.displayStatus !== "completed" && task.displayStatus !== "cancelled"
    );
    return {
      key: panelKeyForQuadrant(quadrant),
      title: quadrant,
      subtitle: quadrantSubtitle(quadrant),
      tasks: cellTasks,
      dropTarget: { kind: "quadrant", quadrant },
      addDefaults: quadrantDefaultsFor(quadrant, today)
    };
  });
  return { grid: "fixed", panels };
}
function quadrantDefaultsFor(quadrant, today) {
  switch (quadrant) {
    case "Q1":
      return { priority: "high" /* High */, dueDate: today };
    case "Q2":
      return { priority: "high" /* High */ };
    case "Q3":
      return { priority: "low" /* Low */, dueDate: today };
    default:
      return { priority: "lowest" /* Lowest */ };
  }
}
function taskCountLabel(count) {
  return t("{count} \u4E2A\u4EFB\u52A1", { count });
}

// src/settings.ts
function barDurationLabel(mode) {
  switch (mode) {
    case "off":
      return t("\u4E0D\u663E\u793A");
    case "workday":
      return t("\u5DE5\u4F5C\u65E5");
    default:
      return t("\u81EA\u7136\u65E5\uFF08\u542B\u9996\u5C3E\uFF09");
  }
}
var QUADRANTS2 = ["Q1", "Q2", "Q3", "Q4"];
var IMPORTANT_PRIORITIES = [
  "critical" /* Critical */,
  "highest" /* Highest */,
  "high" /* High */
];
var UNIMPORTANT_PRIORITIES = [
  "medium" /* Medium */,
  "low" /* Low */,
  "lowest" /* Lowest */,
  "none" /* None */
];
var TaskMatrixSettingTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin, host) {
    super(app, plugin);
    this.host = host;
    /**
     * 当前停在哪一页。
     *
     * 存成实例状态而不是每次回到第一页：开关（比如「铺出无截止日的已完成任务」）
     * 会重绘整个设置页，回到第一页会让人以为自己点错了。
     */
    this.activeTab = "general";
  }
  /**
   * 每次都从 host 现取，不缓存引用：设置对象在保存/迁移时会被整份替换，
   * 缓存一份就会在「改了没生效」时骗自己。
   */
  get settings() {
    return this.host.settings;
  }
  persist(rescan = false) {
    void this.host.persistSettings(rescan);
  }
  /** Obsidian 每次打开设置页都会调它；内部一律转 `render()`，重绘只走一条路 */
  display() {
    this.render();
  }
  tabs() {
    return [
      {
        id: "general",
        label: t("\u901A\u7528"),
        lead: t("\u626B\u63CF\u8303\u56F4\u3001\u754C\u9762\u8BED\u8A00\u4E0E\u4EFB\u52A1\u6807\u8BB0\u7684\u5199\u6CD5\u3002\u6539\u52A8\u4F1A\u89E6\u53D1\u4E00\u6B21\u5168\u5E93\u91CD\u65B0\u7D22\u5F15\u3002"),
        render: (host) => {
          this.renderLanguage(host);
          this.renderScanning(host);
          this.renderMarkers(host);
        }
      },
      {
        id: "newtask",
        label: t("\u65B0\u5EFA\u4EFB\u52A1"),
        lead: t("\u65B0\u5EFA\u4EFB\u52A1\u843D\u5230\u54EA\u7BC7\u7B14\u8BB0\u3001\u7528\u54EA\u4E2A\u6A21\u677F\u3001\u63D2\u5230\u54EA\u4E2A\u6807\u9898\u4E0B\u3002"),
        render: (host) => {
          this.renderNewTasks(host);
          this.renderJournalTemplate(host);
        }
      },
      {
        id: "view",
        label: t("\u89C6\u56FE\u504F\u597D"),
        lead: t("\u6253\u5F00\u89C6\u56FE\u65F6\u7684\u9ED8\u8BA4\u72B6\u6001\uFF0C\u4EE5\u53CA\u9762\u677F\u6A21\u5F0F\u94FA\u51FA\u54EA\u4E9B\u4EFB\u52A1\u3002"),
        render: (host) => {
          this.renderDisplay(host);
          this.renderList(host);
        }
      },
      {
        id: "gtd",
        label: t("GTD \u4E0E\u77E9\u9635"),
        lead: t("\u5206\u5F00\u4E24\u5757\uFF1A\u5206\u7C7B\u4F9D\u636E\u51B3\u5B9A\u4EFB\u52A1\u843D\u5728\u54EA\u4E00\u5217\uFF0C\u62D6\u62FD\u51B3\u5B9A\u62D6\u8FC7\u53BB\u5F80\u7B14\u8BB0\u91CC\u5199\u4EC0\u4E48\u3002"),
        render: (host) => {
          this.renderGtdClassification(host);
          this.renderGtdDrag(host);
        }
      },
      {
        id: "calendar",
        label: t("\u65E5\u5386\u4E0E\u7518\u7279"),
        lead: t("\u65E5\u5386\u4E0E\u7518\u7279\u5404\u81EA\u7684\u663E\u793A\u53E3\u5F84\u548C\u914D\u8272\uFF0C\u4E92\u4E0D\u5F71\u54CD\u3002"),
        render: (host) => {
          this.renderCalendar(host);
          this.renderGantt(host);
        }
      },
      {
        id: "holiday",
        label: t("\u6CD5\u5B9A\u8282\u5047\u65E5\u6392\u671F"),
        lead: t("\u6309\u5E74\u4EFD\u7EF4\u62A4\u300C\u653E\u5047\u300D\u4E0E\u300C\u8C03\u4F11\u4E0A\u73ED\u300D\u3002\u5BFC\u51FA\u65F6\u6309\u7518\u7279\u56FE\u8DE8\u5230\u7684\u5E74\u4EFD\u81EA\u52A8\u5957\u7528\uFF0C\u4E0D\u5FC5\u5728\u56FE\u4E0A\u7684\u9762\u677F\u91CC\u624B\u6253\u6BCF\u4E00\u5929\u3002"),
        render: (host) => this.renderHolidaySection(host)
      }
    ];
  }
  render() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.addClass("tm-settings");
    const tabs = this.tabs();
    this.renderTabBar(containerEl, tabs);
    const body = containerEl.createDiv({ cls: "tm-settings__body", attr: { role: "tabpanel" } });
    const active = tabs.find((tab) => tab.id === this.activeTab) ?? tabs[0];
    if (active === void 0) return;
    body.createDiv({ cls: "tm-settings__lead", text: active.lead });
    active.render(body);
  }
  renderTabBar(host, tabs) {
    const bar = host.createDiv({ cls: "tm-settings__tabs", attr: { role: "tablist" } });
    for (const tab of tabs) {
      const isActive = tab.id === this.activeTab;
      const button = bar.createEl("button", {
        cls: `tm-settings__tab${isActive ? " is-active" : ""}`,
        text: tab.label,
        attr: { type: "button", role: "tab", "aria-selected": String(isActive) }
      });
      button.addEventListener("click", () => this.switchTab(tab.id, false));
      button.addEventListener("keydown", (event) => this.onTabKeyDown(event, tabs, tab.id));
    }
  }
  switchTab(id, focus) {
    if (id === this.activeTab) return;
    this.activeTab = id;
    this.render();
    if (focus) {
      this.containerEl.querySelector(".tm-settings__tab.is-active")?.focus();
    }
  }
  /** 方向键在 tab 间移动：键盘用户不必退回列表再选下一个 */
  onTabKeyDown(event, tabs, id) {
    const offset = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (offset !== 0) {
      event.preventDefault();
      const index = tabs.findIndex((tab) => tab.id === id);
      const next = tabs[(index + offset + tabs.length) % tabs.length];
      if (next !== void 0) this.switchTab(next.id, true);
      return;
    }
    if (event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    const target = event.key === "Home" ? tabs[0] : tabs[tabs.length - 1];
    if (target !== void 0) this.switchTab(target.id, true);
  }
  renderLanguage(containerEl) {
    new import_obsidian2.Setting(containerEl).setName(t("\u754C\u9762")).setHeading();
    new import_obsidian2.Setting(containerEl).setName(t("\u754C\u9762\u8BED\u8A00")).setDesc(t("\u81EA\u52A8\u8DDF\u968F Obsidian \u7684\u754C\u9762\u8BED\u8A00\u3002")).addDropdown(
      (dropdown) => dropdown.addOption("auto", t("\u81EA\u52A8")).addOption("zh", t("\u4E2D\u6587")).addOption("en", "English").setValue(this.settings.uiLanguage).onChange((value) => {
        this.settings.uiLanguage = value;
        this.persist();
        void this.host.refreshViews();
        this.display();
      })
    );
  }
  renderScanning(containerEl) {
    new import_obsidian2.Setting(containerEl).setName(t("\u626B\u63CF\u8303\u56F4")).setHeading();
    new import_obsidian2.Setting(containerEl).setName(t("\u626B\u63CF\u76EE\u5F55")).setDesc(
      t("\u9017\u53F7\u5206\u9694\u591A\u4E2A\u76EE\u5F55\uFF0C\u652F\u6301\u591A\u7EA7\u8DEF\u5F84\uFF08\u4F8B\u5982 300 Resources/360 WorkMemos\uFF09\u3002\u7559\u7A7A\u8868\u793A\u626B\u63CF\u6574\u4E2A\u4ED3\u5E93\uFF08\u5927\u5E93\u4F1A\u5F88\u6162\uFF09\u3002\u5F53\u524D\u9ED8\u8BA4\uFF1A{folders}", {
        folders: DEFAULT_SETTINGS.scanFolders.join(", ")
      })
    ).addText(
      (text) => text.setPlaceholder(DEFAULT_SETTINGS.scanFolders.join(", ")).setValue(this.settings.scanFolders.join(", ")).onChange((value) => {
        this.settings.scanFolders = parsePathList(value);
        this.persist(true);
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("\u6392\u9664\u76EE\u5F55")).setDesc(t("\u9017\u53F7\u5206\u9694\u591A\u4E2A\u76EE\u5F55\uFF0C\u5176\u4E0B\u7684\u4EFB\u52A1\u4E0D\u53C2\u4E0E\u7EDF\u8BA1\uFF1B\u540C\u6837\u652F\u6301\u591A\u7EA7\u8DEF\u5F84\u3002")).addText(
      (text) => text.setPlaceholder(t("\u5F52\u6863, \u6A21\u677F")).setValue(this.settings.excludeFolders.join(", ")).onChange((value) => {
        this.settings.excludeFolders = parsePathList(value);
        this.persist(true);
      })
    );
  }
  renderMarkers(containerEl) {
    new import_obsidian2.Setting(containerEl).setName(t("\u4EFB\u52A1\u6807\u8BB0")).setHeading();
    new import_obsidian2.Setting(containerEl).setName(t("\u5DF2\u5B8C\u6210\u6807\u8BB0")).setDesc(t("\u65B9\u62EC\u53F7\u91CC\u7684\u5185\u5BB9\uFF0C\u9017\u53F7\u5206\u9694\u3002\u9ED8\u8BA4 x \u4E0E X\u3002")).addText(
      (text) => text.setValue(this.settings.completionMarkers.join(", ")).onChange((value) => {
        const markers = parseCommaList(value);
        this.settings.completionMarkers = markers.length > 0 ? markers : DEFAULT_SETTINGS.completionMarkers;
        this.persist(true);
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("\u5DF2\u53D6\u6D88\u6807\u8BB0")).setDesc(t("\u65B9\u62EC\u53F7\u91CC\u7684\u5185\u5BB9\uFF0C\u9017\u53F7\u5206\u9694\u3002\u9ED8\u8BA4\u77ED\u6A2A\u7EBF\u3002")).addText(
      (text) => text.setValue(this.settings.cancelledMarkers.join(", ")).onChange((value) => {
        const markers = parseCommaList(value);
        this.settings.cancelledMarkers = markers.length > 0 ? markers : DEFAULT_SETTINGS.cancelledMarkers;
        this.persist(true);
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("\u5FFD\u7565\u6807\u8BB0")).setDesc(t("\u5E26\u8FD9\u4E9B\u6807\u8BB0\u7684\u4EFB\u52A1\u4E0D\u8FDB\u89C6\u56FE\u4E5F\u4E0D\u8FDB\u7EDF\u8BA1\uFF0C\u9017\u53F7\u5206\u9694\u3002")).addText(
      (text) => text.setPlaceholder("I, ?, !").setValue(this.settings.excludeMarkers.join(", ")).onChange((value) => {
        this.settings.excludeMarkers = parseCommaList(value);
        this.persist(true);
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("\u81EA\u52A8\u8BB0\u5F55\u5B8C\u6210\u65E5\u671F")).setDesc(t("\u52FE\u9009\u5B8C\u6210\u65F6\u81EA\u52A8\u8865\u4E0A\u5B8C\u6210\u6807\u8BB0\u4E0E\u5F53\u5929\u65E5\u671F\uFF0C\u91CD\u65B0\u6253\u5F00\u65F6\u79FB\u9664\u3002")).addToggle(
      (toggle2) => toggle2.setValue(this.settings.trackCompletionDate).onChange((value) => {
        this.settings.trackCompletionDate = value;
        this.persist();
      })
    );
  }
  renderDisplay(containerEl) {
    new import_obsidian2.Setting(containerEl).setName(t("\u663E\u793A")).setHeading();
    new import_obsidian2.Setting(containerEl).setName(t("\u9ED8\u8BA4\u89C6\u56FE")).setDesc(t("\u6253\u5F00\u65F6\u5148\u663E\u793A\u54EA\u4E00\u79CD\u9762\u677F\u3002")).addDropdown(
      (dropdown) => dropdown.addOption("eisenhower", t("\u77E9\u9635")).addOption("gtd", t("GTD")).addOption("list", t("\u7B14\u8BB0\u5217\u8868")).addOption("calendar", t("\u65E5\u5386")).addOption("gantt", t("\u7518\u7279")).setValue(this.settings.defaultView).onChange((value) => {
        this.settings.defaultView = value;
        this.persist();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("\u6253\u5F00\u4F4D\u7F6E")).setDesc(t("\u9762\u677F\u6253\u5F00\u5728\u53F3\u4FA7\u8FB9\u680F\u8FD8\u662F\u65B0\u6807\u7B7E\u9875\u3002")).addDropdown(
      (dropdown) => dropdown.addOption("sidebar", t("\u53F3\u4FA7\u8FB9\u680F")).addOption("tab", t("\u65B0\u6807\u7B7E\u9875")).setValue(this.settings.openLocation).onChange((value) => {
        this.settings.openLocation = value;
        this.persist();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("\u622A\u6B62\u65E5\u663E\u793A\u8303\u56F4")).setDesc(t("\u53EA\u94FA\u51FA\u8FD9\u4E48\u591A\u6708\u5185\u5230\u671F\u7684\u4EFB\u52A1\uFF0C\u903E\u671F\u4E0E\u5DF2\u5B8C\u6210\u7684\u59CB\u7EC8\u663E\u793A\u30020 \u8868\u793A\u4E0D\u9650\u5236\u3002")).addSlider(
      (slider) => slider.setLimits(0, 12, 1).setValue(this.settings.dueDateDisplayRange).setDynamicTooltip().onChange((value) => {
        this.settings.dueDateDisplayRange = value;
        this.persist(true);
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("\u9690\u85CF\u8FDC\u671F\u5F00\u59CB\u7684\u4EFB\u52A1")).setDesc(t("\u5F00\u59CB\u65E5\u5728 1 \u4E2A\u6708\u4E4B\u540E\u7684\u5148\u4E0D\u94FA\u51FA\u6765\u3002")).addToggle(
      (toggle2) => toggle2.setValue(this.settings.hideFutureStartTasks).onChange((value) => {
        this.settings.hideFutureStartTasks = value;
        this.persist(true);
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("\u94FA\u51FA\u65E0\u622A\u6B62\u65E5\u7684\u5DF2\u5B8C\u6210\u4EFB\u52A1")).setDesc(t("\u5173\u95ED\u65F6\uFF0C\u5DF2\u5B8C\u6210\u4EFB\u52A1\u8981\u6709\u5B8C\u6210\u65E5\u6216\u622A\u6B62\u65E5\u624D\u4F1A\u663E\u793A\u3002")).addToggle(
      (toggle2) => toggle2.setValue(this.settings.includeCompletedWithoutDueDate).onChange((value) => {
        this.settings.includeCompletedWithoutDueDate = value;
        this.persist(true);
        this.display();
      })
    );
    if (!this.settings.includeCompletedWithoutDueDate) {
      new import_obsidian2.Setting(containerEl).setName(t("\u5DF2\u5B8C\u6210\u4EFB\u52A1\u7684\u663E\u793A\u8303\u56F4")).setDesc(t("\u53EA\u94FA\u51FA\u8FD9\u4E48\u591A\u6708\u5185\u5B8C\u6210\u7684\u5DF2\u5B8C\u6210\u4EFB\u52A1\uFF0C0 \u8868\u793A\u4E0D\u9650\u5236\u3002")).addSlider(
        (slider) => slider.setLimits(0, 12, 1).setValue(this.settings.completedTaskDisplayRange).setDynamicTooltip().onChange((value) => {
          this.settings.completedTaskDisplayRange = value;
          this.persist(true);
        })
      );
    }
    const activeModes = ["due-asc", "due-desc", "start-asc", "priority", "file"];
    new import_obsidian2.Setting(containerEl).setName(t("\u6392\u5E8F\u6863\u4F4D\u8BF4\u660E")).setDesc(t("\u6392\u5E8F\u5728\u7B5B\u9009\u680F\u91CC\u968F\u65F6\u53EF\u6539\uFF0C\u53EF\u9009\uFF1A{modes}", {
      modes: activeModes.map((mode) => sortModeLabel(mode)).join("\u3001")
    }));
  }
  renderNewTasks(containerEl) {
    new import_obsidian2.Setting(containerEl).setName(t("\u65B0\u5EFA\u4EFB\u52A1")).setHeading();
    new import_obsidian2.Setting(containerEl).setName(t("\u76EE\u6807\u7B14\u8BB0\u8DEF\u5F84")).setDesc(
      t("\u65B0\u5EFA\u4EFB\u52A1\u7684\u843D\u70B9\uFF0C\u9ED8\u8BA4\u5199\u5230\u5F53\u65E5\u65E5\u5FD7\uFF1B\u7B14\u8BB0\u4E0D\u5B58\u5728\u65F6\u4F1A\u81EA\u52A8\u65B0\u5EFA\u3002\u7559\u7A7A\u8868\u793A\u5199\u8FDB\u5F53\u524D\u6253\u5F00\u7684\u7B14\u8BB0\u3002")
    ).addText(
      (text) => text.setPlaceholder(DEFAULT_SETTINGS.newTaskTargetPath).setValue(this.settings.newTaskTargetPath).onChange((value) => {
        this.settings.newTaskTargetPath = value.trim();
        this.persist();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("\u76EE\u6807\u6807\u9898")).setDesc(t("\u628A\u65B0\u4EFB\u52A1\u63D2\u5230\u54EA\u4E2A\u6807\u9898\u4E0B\uFF08\u8981\u5E26\u4E0A\u4E95\u53F7\uFF09\u3002\u7559\u7A7A\u8868\u793A\u8FFD\u52A0\u5230\u6587\u672B\u3002")).addText(
      (text) => text.setPlaceholder("## \u4EFB\u52A1").setValue(this.settings.newTaskTargetHeading).onChange((value) => {
        this.settings.newTaskTargetHeading = value.trim();
        this.persist();
      })
    );
  }
  /**
   * 日志模板。
   *
   * 与 Project Master 的「新建项目模板」同口径：模板是**一篇笔记**，不是设置里的一段文本 ——
   * 模板里通常还有 frontmatter、Templater 命令、其他插件要解析的东西，复制进设置页就全丢了。
   * 占位符只解 `{{title}}` / `{{date}}` / `{{time}}`，`<% %>` 原样留着交给 Templater 自己执行。
   */
  renderJournalTemplate(containerEl) {
    new import_obsidian2.Setting(containerEl).setName(t("\u65E5\u5FD7\u6A21\u677F")).setHeading();
    new import_obsidian2.Setting(containerEl).setName(t("\u6A21\u677F\u7B14\u8BB0\u8DEF\u5F84")).setDesc(t("\u76EE\u6807\u7B14\u8BB0\u4E0D\u5B58\u5728\u65F6\uFF0C\u7528\u8FD9\u7BC7\u7B14\u8BB0\u7684\u5185\u5BB9\u65B0\u5EFA\u3002\u586B vault \u76F8\u5BF9\u8DEF\u5F84\uFF0C\u6269\u5C55\u540D\u53EF\u7701\u7565\uFF1B\u7559\u7A7A\u5219\u65B0\u5EFA\u7A7A\u767D\u7B14\u8BB0\u3002")).addText(
      (text) => text.setPlaceholder(`${t("\u6A21\u677F")}/\u65E5\u8BB0\u6A21\u677F.md`).setValue(this.settings.newTaskTemplatePath).onChange((value) => {
        this.settings.newTaskTemplatePath = value.trim();
        this.persist();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("\u76EE\u6807\u7B14\u8BB0\u8DEF\u5F84\u4E0E\u6A21\u677F\u91CC\u53EF\u7528\u7684\u5360\u4F4D\u7B26")).setDesc(
      t("{{title}} \u662F\u65B0\u7B14\u8BB0\u7684\u6587\u4EF6\u540D\uFF0C{{date}} \u4E0E {{time}} \u662F\u5F53\u524D\u65E5\u671F\u4E0E\u65F6\u95F4\uFF0C\u4E5F\u53EF\u4EE5\u5199\u6210 {{date:YYYY-MM-DD}} \u6307\u5B9A\u683C\u5F0F\uFF1B\u672A\u8BC6\u522B\u7684\u5360\u4F4D\u7B26\u539F\u6837\u4FDD\u7559\u3002")
    );
  }
  renderList(containerEl) {
    new import_obsidian2.Setting(containerEl).setName(t("\u5217\u8868\u89C6\u56FE")).setHeading();
    new import_obsidian2.Setting(containerEl).setName(t("\u6309\u6587\u4EF6\u5939\u5206\u7EC4")).setDesc(t("\u5173\u95ED\u65F6\u4E00\u6761\u7B14\u8BB0\u4E00\u4E2A\u5BB9\u5668\uFF1B\u5F00\u542F\u65F6\u7B14\u8BB0\u5BB9\u5668\u5F52\u5165\u53EF\u6298\u53E0\u7684\u6587\u4EF6\u5939\u5206\u533A\u3002")).addToggle(
      (toggle2) => toggle2.setValue(this.settings.listGroupByFolder).onChange((value) => {
        this.settings.listGroupByFolder = value;
        this.persist();
        this.display();
      })
    );
    if (!this.settings.listGroupByFolder) return;
    new import_obsidian2.Setting(containerEl).setName(t("\u5206\u533A\u540D")).setDesc(
      t("\u7528\u626B\u63CF\u76EE\u5F55\u91CC\u7684\u5B8C\u6574\u8DEF\u5F84\u4F5C\u4E3A\u5206\u533A\u540D\uFF08\u4F8B\u5982 300 Resources/360 WorkMemos\uFF09\uFF1B\u672A\u914D\u7F6E\u626B\u63CF\u76EE\u5F55\u65F6\u7528\u7B14\u8BB0\u81EA\u5DF1\u7684\u6587\u4EF6\u5939\u8DEF\u5F84\u3002")
    );
  }
  /**
   * 甘特条配色。
   *
   * 只给「四类 Mermaid 状态」各一个颜色，而不是让用户逐条设色：任务的颜色
   * 存在笔记里没有落点（Project Master 存的是 frontmatter 字段，任务矩阵的
   * 任务只是一行文字）。四类色覆盖了图上能出现的所有条子，既够用，
   * 也不用往用户的笔记里塞插件私有语法。
   */
  renderGantt(containerEl) {
    new import_obsidian2.Setting(containerEl).setName(t("\u7518\u7279\u89C6\u56FE")).setHeading();
    new import_obsidian2.Setting(containerEl).setName(t("\u6761\u4E0A\u663E\u793A\u5929\u6570")).setDesc(
      t(
        "\u5728\u7518\u7279\u6761\u4E0A\u6807\u51FA\u5929\u6570\u3002\u300C\u5DE5\u4F5C\u65E5\u300D= \u81EA\u7136\u65E5 \u2212 \u5468\u672B\uFF08\u9700\u5728 Mermaid \u9884\u89C8\u9875\u7B7E\u6253\u5F00\u300C\u6392\u9664\u5468\u672B\u300D\uFF09\u2212 \u6CD5\u5B9A\u8282\u5047\u65E5\u6392\u671F + \u8865\u73ED\u65E5\uFF1B\u4E0E\u5BFC\u51FA\u7684 excludes/includes\u3001\u56FE\u4E0A\u7684\u7070\u8272\u5217\u662F\u540C\u4E00\u4EFD\u53E3\u5F84\u3002"
      ) + t("\u6761\u5B50\u592A\u7A84\u653E\u4E0D\u4E0B\u65F6\u4F1A\u632A\u5230\u6761\u5B50\u53F3\u4FA7\u663E\u793A\u3002")
    ).addDropdown((dropdown) => {
      for (const mode of BAR_DURATION_MODES) {
        dropdown.addOption(mode, barDurationLabel(mode));
      }
      dropdown.setValue(this.settings.ganttBarDuration).onChange((value) => {
        this.settings.ganttBarDuration = value;
        this.persist();
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t("\u4EFB\u52A1\u5217\u5BBD\u5EA6")).setDesc(
      t("\u7518\u7279\u5DE6\u4FA7\u4EFB\u52A1\u5217\u7684\u5BBD\u5EA6\uFF08px\uFF09\u3002\u4E5F\u53EF\u4EE5\u76F4\u63A5\u5728\u7518\u7279\u91CC\u62D6\u52A8\u4EFB\u52A1\u5217\u4E0E\u65F6\u95F4\u8F74\u4E4B\u95F4\u7684\u5206\u9694\u6761\u3002")
    ).addText(
      (text) => text.setPlaceholder(String(GANTT_SIDEBAR_DEFAULT_WIDTH)).setValue(String(this.settings.ganttSidebarWidth)).onChange((value) => {
        const parsed = Number.parseInt(value.trim(), 10);
        if (!Number.isFinite(parsed)) return;
        this.settings.ganttSidebarWidth = parsed;
        this.persist();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("\u7518\u7279\u6761\u914D\u8272")).setDesc(
      t("\u6309 Mermaid \u7518\u7279\u7684\u56DB\u79CD\u72B6\u6001\u914D\u8272\u3002\u989C\u8272\u53EF\u5199 var(--color-blue) \u6216\u989C\u8272\u540D\uFF1B\u70B9\u4E0B\u9762\u7684\u8272\u5757\u5373\u6539\u3002")
    );
    for (const key of Object.keys(DEFAULT_GANTT_BAR_COLORS)) {
      this.renderBarColorSetting(containerEl, key);
    }
    this.renderMermaidExport(containerEl);
  }
  /**
   * Mermaid 导出。
   *
   * 这里只有「代码里长什么样」的静态项；今天线与排除周末放在预览栏上做成 chips ——
   * 它们要边看边调（改一下预览立刻重算），埋进设置页就得来回切。
   */
  renderMermaidExport(containerEl) {
    new import_obsidian2.Setting(containerEl).setName(t("Mermaid \u5BFC\u51FA")).setHeading();
    new import_obsidian2.Setting(containerEl).setName(t("\u56FE\u6807\u9898")).setDesc(t("\u5BFC\u51FA\u4EE3\u7801\u91CC\u7684 title \u884C\u3002\u7559\u7A7A\u5219\u4E0D\u8F93\u51FA\u8FD9\u4E00\u884C\u3002")).addText(
      (text) => text.setPlaceholder(DEFAULT_SETTINGS.mermaidTitle).setValue(this.settings.mermaidTitle).onChange((value) => {
        this.settings.mermaidTitle = value;
        this.persist();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("\u843D\u70B9\u6807\u8BB0")).setDesc(
      t("\u300C\u5199\u5165\u7B14\u8BB0\u300D\u53EA\u66FF\u6362\u8FD9\u4E24\u4E2A\u6807\u8BB0\u4E4B\u95F4\u7684\u5185\u5BB9\uFF0C\u6807\u8BB0\u4E4B\u5916\u4E00\u4E2A\u5B57\u4E0D\u52A8\uFF1B\u7B14\u8BB0\u91CC\u8FD8\u6CA1\u6709\u6807\u8BB0\u65F6\uFF0C\u6574\u5757\u8FFD\u52A0\u5230\u6587\u672B\u3002")
    ).addText(
      (text) => text.setPlaceholder(DEFAULT_SETTINGS.mermaidMarkerStart).setValue(this.settings.mermaidMarkerStart).onChange((value) => {
        this.settings.mermaidMarkerStart = value;
        this.persist();
      })
    ).addText(
      (text) => text.setPlaceholder(DEFAULT_SETTINGS.mermaidMarkerEnd).setValue(this.settings.mermaidMarkerEnd).onChange((value) => {
        this.settings.mermaidMarkerEnd = value;
        this.persist();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("\u4ECA\u5929\u7EBF\u4E0E\u6392\u9664\u5468\u672B")).setDesc(t("\u5728\u7518\u7279\u6A21\u5F0F\u7684\u300CMermaid \u9884\u89C8\u300D\u9875\u7B7E\u4E0A\u5207\u6362\uFF0C\u6539\u52A8\u4F1A\u7ACB\u5373\u91CD\u7B97\u9884\u89C8\u5E76\u4FDD\u5B58\u5728\u6B64\u3002"));
    new import_obsidian2.Setting(containerEl).setName(t("\u6392\u9664\u65E5\u671F\u4E0E\u8C03\u4F11\u4E0A\u73ED")).setDesc(
      t("\u540C\u6837\u5728\u300CMermaid \u9884\u89C8\u300D\u9875\u7B7E\u4E0A\u4E34\u65F6\u586B\u5199\uFF08\u5199\u5B8C\u6574\u65E5\u671F\uFF0C\u53EF\u8DE8\u5E74\u5EA6\uFF09\u3002\u6210\u89C4\u6A21\u7684\u6CD5\u5B9A\u8282\u5047\u65E5\u8BF7\u5230\u300C\u6CD5\u5B9A\u8282\u5047\u65E5\u6392\u671F\u300D\u4E00\u9875\u6309\u5E74\u4EFD\u7EF4\u62A4\u3002")
    );
  }
  /**
   * 法定节假日排期。
   *
   * 单独一页而不是塞进「日历与甘特」：它是逐年两行的输入表格，与别的条目混在一起
   * 页面会长到没人愿意往下翻；而它一年只动一两次。
   */
  renderHolidaySection(containerEl) {
    const schedules = this.settings.holidaySchedules;
    const years = sortedScheduleYears(schedules);
    if (years.length === 0) {
      new import_obsidian2.Setting(containerEl).setName(t("\u8FD8\u6CA1\u6709\u6392\u671F")).setDesc(t("\u70B9\u4E0B\u9762\u7684\u6309\u94AE\u6DFB\u52A0\u4E00\u4E2A\u5E74\u5EA6\uFF0C\u4E4B\u540E\u6309\u56FD\u52A1\u9662\u516C\u544A\u7684\u533A\u95F4\u586B\u5373\u53EF\u3002"));
    }
    for (const year of years) {
      const schedule = schedules[year] ?? {
        holidays: "",
        makeupWorkdays: ""
      };
      new import_obsidian2.Setting(containerEl).setName(t("{year} \xB7 \u653E\u5047", { year })).setDesc(t("\u533A\u95F4\u5199\u6210 10-01~10-07\uFF08`~` \u4E0E\u300C\u81F3\u300D\u90FD\u8BA4\uFF09\uFF1B\u8DE8\u5E74\u533A\u95F4\u5982 12-30~01-02 \u81EA\u52A8\u7B97\u5230\u6B21\u5E74\u3002")).addText(
        (text) => text.setPlaceholder("10-01~10-07, 01-01~01-03").setValue(schedule.holidays).onChange((value) => this.patchSchedule(year, { holidays: value }))
      ).addExtraButton(
        (button) => button.setIcon("trash").setTooltip(t("\u5220\u9664\u8BE5\u5E74\u5EA6\u6392\u671F")).onClick(() => {
          const next = { ...schedules };
          delete next[year];
          this.writeSchedules(next);
          this.render();
        })
      );
      new import_obsidian2.Setting(containerEl).setName(t("{year} \xB7 \u8C03\u4F11\u4E0A\u73ED", { year })).setDesc(
        t("\u8FD9\u4E9B\u65E5\u5B50\u5F3A\u5236\u7B97\u5DE5\u4F5C\u65E5\uFF08\u4F18\u5148\u7EA7\u9AD8\u4E8E\u653E\u5047\uFF09\uFF0C\u7528\u4E8E\u628A\u300C\u5468\u516D\u4F46\u8981\u4E0A\u73ED\u300D\u4ECE\u7070\u8272\u975E\u5DE5\u4F5C\u65E5\u91CC\u635E\u56DE\u6765\u3002")
      ).addText(
        (text) => text.setPlaceholder("09-27, 10-10").setValue(schedule.makeupWorkdays).onChange((value) => this.patchSchedule(year, { makeupWorkdays: value }))
      );
    }
    new import_obsidian2.Setting(containerEl).setName(t("\u65B0\u589E\u5E74\u5EA6")).setDesc(t("\u6BCF\u5E74\u516C\u544A\u51FA\u6765\u540E\uFF0C\u6DFB\u4E00\u4E2A\u5E74\u5EA6\u518D\u586B\u533A\u95F4\u5373\u53EF\u3002")).addButton(
      (button) => button.setButtonText(t("\u6DFB\u52A0\u5E74\u4EFD")).onClick(() => {
        const year = nextScheduleYear(schedules);
        this.writeSchedules({
          ...schedules,
          [year]: { holidays: "", makeupWorkdays: "" }
        });
        this.render();
      })
    );
  }
  patchSchedule(year, patch) {
    const current2 = this.settings.holidaySchedules;
    const existing = current2[year] ?? { holidays: "", makeupWorkdays: "" };
    this.writeSchedules({ ...current2, [year]: { ...existing, ...patch } });
  }
  /**
   * 排期写入口：落设置 + 刷视图，**不重扫索引**。
   *
   * 它只在画灰色列与导出时被读到，不影响索引结果；而这是个逐字符输入的表单，
   * 走「改动影响索引」那条路的话，敲 20 个字符 = 20 次全库重扫。
   */
  writeSchedules(holidaySchedules) {
    this.settings.holidaySchedules = holidaySchedules;
    this.persist();
  }
  renderBarColorSetting(containerEl, key) {
    const meta = barColorCopy(key);
    const current2 = this.settings.ganttBarColors[key] || DEFAULT_GANTT_BAR_COLORS[key];
    new import_obsidian2.Setting(containerEl).setName(meta.label).setDesc(`${meta.desc}${t("\u9ED8\u8BA4\uFF1A{value}", { value: DEFAULT_GANTT_BAR_COLORS[key] })}`).addText(
      (text) => text.setValue(current2).setPlaceholder(DEFAULT_GANTT_BAR_COLORS[key]).onChange((value) => {
        const trimmed = value.trim();
        if (trimmed.length === 0) return;
        void this.patchBarColor(key, trimmed);
      })
    );
    const swatches = containerEl.createDiv({ cls: "tm-color-presets" });
    for (const preset of barColorPresets()) {
      const swatch = swatches.createEl("button", {
        cls: `tm-color-swatch${preset.value === current2 ? " is-active" : ""}`,
        // 颜色直接写在元素上，不经过自定义属性中转：那层解析不出颜色（色块会空心）
        attr: { type: "button", title: preset.label, "aria-label": preset.label }
      });
      swatch.style.backgroundColor = preset.value;
      swatch.addEventListener("click", () => {
        void this.patchBarColor(key, preset.value);
        this.display();
      });
    }
  }
  /** 配色改动不影响解析，所以只重绘视图、不重扫全库 */
  async patchBarColor(key, value) {
    this.settings.ganttBarColors = { ...this.settings.ganttBarColors, [key]: value };
    await this.host.persistSettings(false);
  }
  /**
   * 影响「分类」的：决定任务落在哪一列 / 哪一象限。
   *
   * 这里只放**真参数**（标签词汇、紧急窗口）。判定链条本身写在下方的说明里 ——
   * 「开始日已过算不算进行中」这类开关关掉只会让分类错位，它不是参数而是规则。
   */
  renderGtdClassification(containerEl) {
    new import_obsidian2.Setting(containerEl).setName(t("\u5206\u7C7B\u4F9D\u636E")).setDesc(t("\u8FD9\u4E24\u4EFD\u6807\u7B7E\u6E05\u5355\u4E0E\u7D27\u6025\u7A97\u53E3\u662F\u552F\u4E8C\u53EF\u8C03\u7684\uFF1B\u5224\u5B9A\u987A\u5E8F\u5728\u4E0B\u9762\u5199\u7740\u3002")).setHeading();
    new import_obsidian2.Setting(containerEl).setName(t("\u7B49\u5F85\u4E2D\u6807\u7B7E")).setDesc(t("\u5E26\u8FD9\u4E9B\u6807\u7B7E\u7684\u4EFB\u52A1\u843D\u5728\u300C\u7B49\u5F85\u4E2D\u300D\u3002\u9017\u53F7\u5206\u9694\uFF0C# \u53EF\u7701\u7565\u3002")).addText(
      (text) => text.setPlaceholder(DEFAULT_SETTINGS.gtdWaitingTags.join(", ")).setValue(this.settings.gtdWaitingTags.join(", ")).onChange((value) => {
        this.settings.gtdWaitingTags = parseCommaList(value);
        this.persist(true);
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("\u8FDB\u884C\u4E2D\u6807\u7B7E")).setDesc(t("\u5E26\u8FD9\u4E9B\u6807\u7B7E\u7684\u4EFB\u52A1\u843D\u5728\u300C\u8FDB\u884C\u4E2D\u300D\u3002")).addText(
      (text) => text.setPlaceholder(DEFAULT_SETTINGS.gtdInProgressTags.join(", ")).setValue(this.settings.gtdInProgressTags.join(", ")).onChange((value) => {
        this.settings.gtdInProgressTags = parseCommaList(value);
        this.persist(true);
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("\u7D27\u6025\u5929\u6570")).setDesc(t("\u8DDD\u4ECA\u591A\u5C11\u5929\u5185\u6709\u622A\u6B62\u65E5\u7684\u4EFB\u52A1\u7B97\u7D27\u6025\uFF0C\u77E9\u9635\u636E\u6B64\u5212\u5230\u7D27\u6025\u90A3\u4E00\u4FA7\u3002")).addSlider(
      (slider) => slider.setLimits(1, 7, 1).setValue(this.settings.urgentDaysRange).setDynamicTooltip().onChange((value) => {
        this.settings.urgentDaysRange = value;
        this.persist(true);
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("\u5224\u5B9A\u987A\u5E8F")).setDesc(
      t("\u4F9D\u8D56\u672A\u5B8C\u6210\u6216\u5E26\u7B49\u5F85\u4E2D\u6807\u7B7E \u2192 \u7B49\u5F85\u4E2D\uFF1B\u5E26\u8FDB\u884C\u4E2D\u6807\u7B7E \u2192 \u8FDB\u884C\u4E2D\uFF1B\u622A\u6B62\u65E5\u5DF2\u8FC7 \u2192 \u903E\u671F\uFF1B\u5F00\u59CB\u65E5\u5DF2\u8FC7 \u2192 \u8FDB\u884C\u4E2D\uFF1B\u5F00\u59CB\u65E5\u5728\u672A\u6765 \u2192 \u5F85\u5F00\u59CB\uFF08\u5E76\u5165\u6536\u4EF6\u7BB1\uFF09\uFF1B\u5176\u4F59 \u2192 \u6536\u4EF6\u7BB1\u3002")
    );
  }
  /**
   * 影响「拖拽」的：一个总开关 + 打开后各象限写入的优先级。
   *
   * 写入规则本身也是固定的（写在说明里）：它们保证「拖到哪就落在哪」，
   * 做成开关或三选一，就会出现「拖进收件箱却出现在进行中」这类自相矛盾的组合。
   */
  renderGtdDrag(containerEl) {
    const enabled = this.settings.dragEnabled;
    new import_obsidian2.Setting(containerEl).setName(t("\u62D6\u62FD")).setDesc(t("\u5173\u6389\u540E\u4E0B\u9762\u7684\u9879\u90FD\u4E0D\u751F\u6548\uFF0C\u4E5F\u5C31\u4E00\u5E76\u7981\u7528\u3002")).setHeading();
    new import_obsidian2.Setting(containerEl).setName(t("\u542F\u7528\u62D6\u62FD")).setDesc(
      t("\u5173\u95ED\u540E GTD/\u77E9\u9635\u5BB9\u5668\u4E0D\u518D\u63A5\u53D7\u62D6\u5165\u3001\u5361\u7247\u4E5F\u4E0D\u53EF\u62D6\u52A8\uFF1B\u5361\u7247\u4E0A\u7684\u5FEB\u6377\u79FB\u52A8\u6309\u94AE\u4E0E\u7518\u7279\u53F3\u952E\u83DC\u5355\u4E0D\u53D7\u5F71\u54CD\u3002")
    ).addToggle(
      (toggle2) => toggle2.setValue(this.settings.dragEnabled).onChange((value) => {
        this.settings.dragEnabled = value;
        this.persist();
        this.display();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("\u62D6\u62FD\u5199\u5165\u4EC0\u4E48")).setDesc(
      t("\u62D6\u5230\u67D0\u4E00\u5217\u4F1A\u5199\u5165\u8BE5\u5217\u7684\u72B6\u6001\u6807\u7B7E\uFF08\u53D6\u6E05\u5355\u91CC\u7684\u7B2C\u4E00\u4E2A\uFF09\u5E76\u6458\u6389\u53E6\u4E00\u5217\u7684\u6807\u7B7E\uFF0C\u540C\u65F6\u628A\u5F00\u59CB\u65E5\u8C03\u5230\u4E0E\u90A3\u4E00\u5217\u4E00\u81F4 \u2014\u2014 \u62D6\u5230\u300C\u8FDB\u884C\u4E2D\u300D\u8865\u4ECA\u5929\u7684\u5F00\u59CB\u65E5\uFF0C\u62D6\u5230\u300C\u6536\u4EF6\u7BB1\u300D\u6E05\u6389\u5F00\u59CB\u65E5\uFF08\u5F00\u59CB\u65E5\u7559\u5728\u8FC7\u53BB\u4F1A\u88AB\u5224\u5B9A\u56DE\u8FDB\u884C\u4E2D\uFF09\u3002\u62D6\u5230\u8C61\u9650\u5199\u4F18\u5148\u7EA7\uFF0C\u5E76\u8BA9\u622A\u6B62\u65E5\u4E0E\u7D27\u6025\u90A3\u4E00\u4FA7\u4E00\u81F4\uFF1AQ1/Q3 \u8865\u4ECA\u5929\u7684\u622A\u6B62\u65E5\uFF0CQ2/Q4 \u6E05\u6389\u4F1A\u9020\u6210\u7D27\u6025\u7684\u65E5\u671F\u3002")
    ).setDisabled(!enabled);
    for (const quadrant of QUADRANTS2) {
      const important = quadrant === "Q1" || quadrant === "Q2";
      const choices = important ? IMPORTANT_PRIORITIES : UNIMPORTANT_PRIORITIES;
      const current2 = this.settings.quadrantPriorities[quadrant];
      new import_obsidian2.Setting(containerEl).setName(`${quadrant} \xB7 ${quadrantSubtitle(quadrant)}`).setDesc(
        important ? t("\u62D6\u5230\u8FD9\u4E00\u8C61\u9650\u5199\u5165\u7684\u4F18\u5148\u7EA7\u3002\u91CD\u8981\u90A3\u4E00\u4FA7\u53EA\u80FD\u9009\u9AD8\u53CA\u4EE5\u4E0A\u3002") : t("\u62D6\u5230\u8FD9\u4E00\u8C61\u9650\u5199\u5165\u7684\u4F18\u5148\u7EA7\u3002\u4E0D\u91CD\u8981\u90A3\u4E00\u4FA7\u53EA\u80FD\u9009\u4E2D\u53CA\u4EE5\u4E0B\uFF08\u53EF\u7559\u7A7A\u4E0D\u5199\u6807\u8BB0\uFF09\u3002")
      ).setDisabled(!enabled).addDropdown((dropdown) => {
        for (const level of choices.includes(current2) ? choices : [...choices, current2]) {
          dropdown.addOption(level, priorityLabel(level));
        }
        dropdown.setValue(current2).onChange((value) => {
          this.settings.quadrantPriorities = {
            ...this.settings.quadrantPriorities,
            [quadrant]: value
          };
          this.persist();
        });
      });
    }
  }
  renderCalendar(containerEl) {
    new import_obsidian2.Setting(containerEl).setName(t("\u65E5\u5386\u89C6\u56FE")).setHeading();
    new import_obsidian2.Setting(containerEl).setName(t("\u6BCF\u5468\u7B2C\u4E00\u5929")).setDesc(t("\u51B3\u5B9A\u65E5\u5386\u91CC\u4E00\u5468\u4ECE\u54EA\u5929\u6392\u8D77\u3002")).addDropdown(
      (dropdown) => dropdown.addOption("monday", t("\u5468\u4E00")).addOption("sunday", t("\u5468\u65E5")).setValue(this.settings.calendarFirstDayOfWeek).onChange((value) => {
        this.settings.calendarFirstDayOfWeek = value;
        this.persist(true);
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("\u6708\u89C6\u56FE\u663E\u793A\u5468\u672B")).setDesc(t("\u5173\u95ED\u540E\u53EA\u5217\u5DE5\u4F5C\u65E5\u3002")).addToggle(
      (toggle2) => toggle2.setValue(this.settings.showCalendarMonthWeekends).onChange((value) => {
        this.settings.showCalendarMonthWeekends = value;
        this.persist(true);
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("\u5468\u89C6\u56FE\u663E\u793A\u5468\u672B")).setDesc(t("\u5F00\u542F\u540E\u5468\u672B\u5355\u72EC\u6392\u5728\u4E0B\u65B9\u4E00\u884C\u3002")).addToggle(
      (toggle2) => toggle2.setValue(this.settings.showCalendarWeekends).onChange((value) => {
        this.settings.showCalendarWeekends = value;
        this.persist(true);
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("\u5217\u8868\u89C6\u56FE\u663E\u793A\u6574\u6708")).setDesc(t("\u5173\u95ED\u540E\u53EA\u5217\u51FA\u6709\u4EFB\u52A1\u7684\u65E5\u671F\u3002")).addToggle(
      (toggle2) => toggle2.setValue(this.settings.calendarListShowFullMonth).onChange((value) => {
        this.settings.calendarListShowFullMonth = value;
        this.persist(true);
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("\u94FA\u5F00\u8FDB\u884C\u4E2D\u7684\u4EFB\u52A1")).setDesc(t("\u540C\u65F6\u6709\u5F00\u59CB\u65E5\u4E0E\u622A\u6B62\u65E5\u7684\u4EFB\u52A1\uFF0C\u4F1A\u5728\u8D77\u6B62\u4E4B\u95F4\u7684\u6BCF\u4E00\u5929\u90FD\u51FA\u73B0\u3002")).addToggle(
      (toggle2) => toggle2.setValue(this.settings.showCalendarInProcessTasks).onChange((value) => {
        this.settings.showCalendarInProcessTasks = value;
        this.persist(true);
      })
    );
  }
};
function barColorPresets() {
  return [
    { value: "var(--color-red)", label: t("\u7EA2") },
    { value: "var(--color-orange)", label: t("\u6A59") },
    { value: "var(--color-yellow)", label: t("\u9EC4") },
    { value: "var(--color-green)", label: t("\u7EFF") },
    { value: "var(--color-cyan)", label: t("\u9752") },
    { value: "var(--color-blue)", label: t("\u84DD") },
    { value: "var(--color-purple)", label: t("\u7D2B") },
    { value: "var(--color-pink)", label: t("\u7C89") }
  ];
}
function barColorCopy(key) {
  switch (key) {
    case "active":
      return { label: t("\u8FDB\u884C\u4E2D"), desc: t("\u672A\u5B8C\u6210\u3001\u4E14\u8D77\u6B62\u65E5\u671F\u5B8C\u6574\u7684\u4EFB\u52A1\u3002") };
    case "done":
      return { label: t("\u5DF2\u5B8C\u6210"), desc: t("\u5DF2\u5B8C\u6210\u7684\u4EFB\u52A1\uFF08\u52FE\u9009\u6846\u4E3A x\uFF09\u3002") };
    case "crit":
      return {
        label: t("\u5173\u952E\u4EFB\u52A1"),
        desc: t("\u5E26 \u{1F53A} \u6216 #crit \u6807\u8BB0\u7684\u4EFB\u52A1\uFF1B\u4F18\u5148\u7EA7\u6700\u9AD8\uFF0C\u540C\u65F6\u5DF2\u5B8C\u6210\u4E5F\u6309\u8FD9\u4E00\u8272\u663E\u793A\u3002")
      };
    default:
      return {
        label: t("\u5176\u4ED6\u72B6\u6001"),
        desc: t("\u65E2\u975E\u5173\u952E\u4E5F\u975E\u5DF2\u5B8C\u6210\u3001\u4E14\u8D77\u6B62\u65E5\u671F\u4E0D\u5B8C\u6574\uFF08\u56FE\u4E0A\u90A3\u4E00\u6BB5\u662F\u63A8\u5BFC\u503C\uFF09\u7684\u4EFB\u52A1\u3002")
      };
  }
}

// src/utils/icon.ts
var ICON_CANDIDATES = [
  "square-kanban",
  "kanban",
  "list-checks",
  "list-todo",
  "layout-list"
];
function pickViewIcon(iconIds, candidates = ICON_CANDIDATES) {
  const available = new Set(iconIds.map((id) => id.replace(/^lucide-/u, "")));
  return candidates.find((name) => available.has(name)) ?? candidates[0] ?? "list-checks";
}

// src/views/matrix-view.ts
var import_obsidian13 = require("obsidian");

// src/gantt/gantt-labels.ts
var GANTT_GROUPINGS = [
  "none",
  "folder",
  "note",
  "gtd",
  "quadrant"
];
var GANTT_VIEWS = ["gantt", "mermaid"];
function ganttViewLabel(view) {
  return view === "mermaid" ? t("Mermaid \u9884\u89C8") : t("\u7518\u7279");
}
function ganttGroupingLabel(grouping) {
  switch (grouping) {
    case "folder":
      return t("\u6309\u6587\u4EF6\u5939\u5206\u7EC4");
    case "note":
      return t("\u6309\u7B14\u8BB0\u5206\u7EC4");
    case "gtd":
      return t("\u6309 GTD \u72B6\u6001\u5206\u7EC4");
    case "quadrant":
      return t("\u6309\u77E9\u9635\u8C61\u9650\u5206\u7EC4");
    default:
      return t("\u4E0D\u5206\u7EC4");
  }
}
function ganttZoomLabel(zoom) {
  switch (zoom) {
    case "week":
      return t("\u5468");
    case "month":
      return t("\u6708");
    case "year":
      return t("\u5E74");
    default:
      return t("\u65E5");
  }
}

// src/gantt/gantt-model.ts
var FALLBACK_DAYS = 1;
function buildGanttModel(tasks, options) {
  const today = options.today ?? todayIso();
  const grouped = /* @__PURE__ */ new Map();
  const skipped = [];
  for (const task of tasks) {
    if (resolveRow(task) === null) {
      skipped.push(task);
      continue;
    }
    const { key, name } = sectionOf(task, options, today);
    const bucket = grouped.get(key);
    if (bucket === void 0) grouped.set(key, { name, tasks: [task] });
    else bucket.tasks.push(task);
  }
  const buckets = [...grouped.entries()];
  if (options.grouping === "note") buckets.sort((a, b) => a[0].localeCompare(b[0]));
  const sections = [];
  for (const [key, bucket] of buckets) {
    const rows2 = [];
    for (const task of bucket.tasks) {
      const row = resolveRow(task);
      if (row !== null) rows2.push(row);
    }
    sections.push({
      key,
      name: bucket.name,
      rows: rows2,
      // 「无分组」只有一个分节且没有分节头，折叠它就没法展开了 —— 直接不参与折叠
      collapsed: options.grouping !== "none" && options.collapsedKeys.has(key)
    });
  }
  const rows = sections.flatMap((section) => section.rows);
  const range = resolveRange(rows, options, today);
  applyDurations(
    rows,
    resolveNonWorkingDays(range.rangeStart, range.rangeEnd, options.settings),
    options.settings.ganttBarDuration
  );
  return {
    sections,
    rows,
    // 无分组时只有一个分节，分节名与内容重复，是纯噪声
    showSectionHeaders: options.grouping !== "none",
    ...range,
    skipped
  };
}
function resolveRow(task) {
  const { startDate, dueDate } = task;
  if (startDate !== void 0 && dueDate !== void 0) {
    const [start, end] = startDate <= dueDate ? [startDate, dueDate] : [dueDate, startDate];
    return withSpan(task, start, end, false, false);
  }
  if (startDate !== void 0) {
    return withSpan(task, startDate, addDaysIso(startDate, FALLBACK_DAYS), false, true);
  }
  if (dueDate !== void 0) {
    return withSpan(task, addDaysIso(dueDate, -FALLBACK_DAYS), dueDate, true, false);
  }
  return null;
}
function withSpan(task, start, end, startFallback, endFallback) {
  const calendarDays = diffDaysIso(start, end) + 1;
  return {
    task,
    start,
    end,
    startFallback,
    endFallback,
    calendarDays,
    // 先按「没有非工作日」填上，随后由 applyDurations 按设置与排期覆盖
    workdayDays: calendarDays,
    durationLabel: null
  };
}
function applyDurations(rows, nonWorkingDays, mode) {
  for (const row of rows) {
    let offDays = 0;
    for (const day of nonWorkingDays) {
      if (day < row.start) continue;
      if (day > row.end) break;
      offDays += 1;
    }
    row.workdayDays = Math.max(0, row.calendarDays - offDays);
    row.durationLabel = durationLabel(mode, row.calendarDays, row.workdayDays);
  }
}
function durationLabel(mode, calendarDays, workdayDays) {
  switch (mode) {
    case "off":
      return null;
    case "workday":
      return t("{count} \u5DE5\u4F5C\u65E5", { count: workdayDays });
    default:
      return t("{count} \u5929", { count: calendarDays });
  }
}
function sectionOf(task, options, today) {
  switch (options.grouping) {
    case "folder": {
      const folder = groupFolderOf(task.filePath, options.settings);
      return { key: panelKeyForFolder(folder), name: folder === "" ? t("\u6839\u76EE\u5F55") : folder };
    }
    case "note":
      return { key: panelKeyForNote(task.filePath), name: noteNameOf(task.filePath) };
    case "gtd": {
      const state = gtdColumnFor(task, options, today);
      return { key: panelKeyForGtd(state), name: gtdStateLabel(state) };
    }
    case "quadrant": {
      const quadrant = quadrantFor(task, options, today);
      return { key: panelKeyForQuadrant(quadrant), name: `${quadrant} \xB7 ${quadrantSubtitle(quadrant)}` };
    }
    default:
      return { key: "all", name: t("\u5168\u90E8\u4EFB\u52A1") };
  }
}
function gtdColumnFor(task, options, today) {
  const parsed = options.parsedByLine.get(`${task.filePath}:${task.lineNumber}`);
  if (parsed !== void 0) return gtdColumnOf(parsed, today, gtdRulesOf(options.settings));
  return task.completed ? "Done" : "Inbox";
}
function quadrantFor(task, options, today) {
  const parsed = options.parsedByLine.get(`${task.filePath}:${task.lineNumber}`);
  if (parsed !== void 0) return parsed.quadrant;
  const urgent = task.dueDate !== void 0 && task.dueDate <= addDaysIso(today, options.settings.urgentDaysRange - 1);
  if (task.critical && urgent) return "Q1";
  if (task.critical) return "Q2";
  if (urgent) return "Q3";
  return "Q4";
}
function resolveRange(rows, options, today) {
  let rangeStart = null;
  let rangeEnd = null;
  for (const row of rows) {
    rangeStart = minIso(rangeStart, row.start);
    rangeEnd = maxIso(rangeEnd, row.end);
  }
  rangeStart = minIso(rangeStart, monthStartIso(today));
  rangeEnd = maxIso(rangeEnd, monthEndIso(today));
  if (options.axisRange !== void 0) {
    rangeStart = minIso(rangeStart, options.axisRange.start);
    rangeEnd = maxIso(rangeEnd, options.axisRange.end);
  }
  return { rangeStart: rangeStart ?? today, rangeEnd: rangeEnd ?? today };
}

// src/gantt/mermaid-export.ts
var UNSAFE_IN_NAME = /[:`\n\r]+/gu;
var UNSAFE_IN_ID = /[^\p{L}\p{N}_-]+/gu;
function exportMermaid(model, options) {
  let code = "```mermaid\ngantt\n";
  const title = options.title.replace(/\s+/gu, " ").trim();
  if (title.length > 0) code += `    title ${title}
`;
  code += "    dateFormat YYYY-MM-DD\n";
  code += "    axisFormat %y-%m\n";
  for (const directive of buildDirectives(options)) code += `${directive}
`;
  code += "\n";
  const sections = visibleSections(model);
  const emitSections = sections.length > 1;
  const usedIds = /* @__PURE__ */ new Map();
  for (const section of sections) {
    if (emitSections) code += `    section ${cleanLabel(section.name)}
`;
    for (const row of section.rows) {
      code += `    ${taskLine(row, usedIds)}
`;
    }
    code += "\n";
  }
  code += "```";
  return code;
}
function buildDirectives(options) {
  const lines = [];
  if (!options.todayMarker) {
    lines.push("    todayMarker off");
  }
  const excludes = [
    ...options.excludeWeekends ? ["weekends"] : [],
    ...options.holidays.exclude
  ];
  if (excludes.length > 0) lines.push(`    excludes ${excludes.join(",")}`);
  if (options.holidays.include.length > 0) {
    lines.push(`    includes ${options.holidays.include.join(",")}`);
  }
  return lines;
}
function visibleSections(model) {
  return model.sections.filter((section) => !section.collapsed);
}
function taskLine(row, usedIds) {
  const id = uniqueId(row.task.name, usedIds);
  const label = cleanLabel(row.task.name) || id;
  const critical = row.task.critical ? "crit, " : "";
  if (row.task.milestone) {
    return `${label} :${critical}milestone, ${id}, ${row.end}, 0d`;
  }
  const status = row.task.completed ? "done, " : "active, ";
  return `${label} :${critical}${status}${id}, ${row.start}, ${row.end}`;
}
function cleanLabel(text) {
  return text.replace(UNSAFE_IN_NAME, " ").replace(/\s+/gu, " ").trim();
}
function uniqueId(name, usedIds) {
  const cleaned = name.replace(UNSAFE_IN_ID, "").trim();
  const base = cleaned.length > 0 ? cleaned : "task";
  const seen = usedIds.get(base);
  if (seen === void 0) {
    usedIds.set(base, 1);
    return base;
  }
  const next = seen + 1;
  usedIds.set(base, next);
  return `${base}-${next}`;
}
function wrapInMarkers(mermaid, markers) {
  return `${markers.start}

${mermaid}

${markers.end}`;
}

// src/gantt/time-scale.ts
var DAY_WIDTH = {
  day: 34,
  week: 14,
  month: 5,
  year: 1.2
};
var LOWER_UNIT = {
  day: "day",
  week: "week",
  month: "month",
  // 再按「月」画线就太密了，退到季度；标签形如 2026-Q1
  year: "quarter"
};
var UPPER_UNIT = {
  day: "month",
  week: "month",
  month: "year",
  year: "year"
};
var ZOOM_LADDER = ["year", "month", "week", "day"];
function quarterOf(month) {
  const index = Math.floor((month - 1) / 3) + 1;
  return { index, firstMonth: (index - 1) * 3 + 1 };
}
function unitStart(iso, unit) {
  const { year, month, day } = parseIsoParts(iso);
  switch (unit) {
    case "day":
      return iso;
    case "week": {
      const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
      return addDaysIso(iso, -weekday);
    }
    case "month":
      return isoFromParts(year, month, 1);
    case "quarter":
      return isoFromParts(year, quarterOf(month).firstMonth, 1);
    case "year":
      return isoFromParts(year, 1, 1);
  }
}
function unitEnd(iso, unit) {
  const { year, month } = parseIsoParts(iso);
  switch (unit) {
    case "day":
      return iso;
    case "week":
      return addDaysIso(iso, 6);
    case "month":
      return isoFromParts(year, month, daysInMonth(year, month));
    case "quarter": {
      const lastMonth = quarterOf(month).firstMonth + 2;
      return isoFromParts(year, lastMonth, daysInMonth(year, lastMonth));
    }
    case "year":
      return isoFromParts(year, 12, 31);
  }
}
function nextUnitStart(iso, unit) {
  const { year, month } = parseIsoParts(iso);
  switch (unit) {
    case "day":
      return addDaysIso(iso, 1);
    case "week":
      return addDaysIso(iso, 7);
    case "month": {
      const nextMonth = month === 12 ? 1 : month + 1;
      const nextYear = month === 12 ? year + 1 : year;
      return isoFromParts(nextYear, nextMonth, 1);
    }
    case "quarter": {
      const nextMonth = quarterOf(month).firstMonth + 3;
      return nextMonth > 12 ? isoFromParts(year + 1, 1, 1) : isoFromParts(year, nextMonth, 1);
    }
    case "year":
      return isoFromParts(year + 1, 1, 1);
  }
}
function unitLabel(iso, unit) {
  const { year, month, day } = parseIsoParts(iso);
  switch (unit) {
    case "day":
      return String(day);
    case "week":
      return `${month}/${day}`;
    case "month":
      return isoFromParts(year, month, 1).slice(0, 7);
    case "quarter":
      return `${year}-Q${quarterOf(month).index}`;
    case "year":
      return String(year);
  }
}
function buildColumns(from, to, unit, scaleStart, dayWidth) {
  const columns = [];
  let cursor = unitStart(from, unit);
  const maxColumns = 4e3;
  while (cursor <= to && columns.length < maxColumns) {
    const rawStart = cursor;
    const rawEnd = unitEnd(rawStart, unit);
    const colStart = rawStart < scaleStart ? scaleStart : rawStart;
    const colEnd = rawEnd > to ? to : rawEnd;
    if (colStart <= colEnd) {
      columns.push({
        key: `${unit}:${colStart}`,
        label: unitLabel(colStart, unit),
        startIso: colStart,
        endIso: colEnd,
        x: diffDaysIso(scaleStart, colStart) * dayWidth,
        width: (diffDaysIso(colStart, colEnd) + 1) * dayWidth
      });
    }
    cursor = nextUnitStart(rawStart, unit);
    if (rawEnd >= to) break;
  }
  return columns;
}
function buildTimeScale(rangeStart, rangeEnd, zoom, options = {}) {
  const lowerUnit = LOWER_UNIT[zoom];
  const upperUnit = UPPER_UNIT[zoom];
  const dayWidth = DAY_WIDTH[zoom];
  const [from, to] = rangeStart <= rangeEnd ? [rangeStart, rangeEnd] : [rangeEnd, rangeStart];
  const startIso = unitStart(addDaysIso(unitStart(from, lowerUnit), -1), lowerUnit);
  const endIso = unitEnd(addDaysIso(unitEnd(unitStart(to, lowerUnit), lowerUnit), 1), lowerUnit);
  const totalDays = diffDaysIso(startIso, endIso) + 1;
  const today = options.today ?? null;
  const todayInRange = today !== null && today >= startIso && today <= endIso ? today : null;
  return {
    startIso,
    endIso,
    dayWidth,
    totalWidth: totalDays * dayWidth,
    lower: buildColumns(startIso, endIso, lowerUnit, startIso, dayWidth),
    upper: buildColumns(startIso, endIso, upperUnit, startIso, dayWidth),
    todayX: todayInRange !== null ? diffDaysIso(startIso, todayInRange) * dayWidth + dayWidth / 2 : null,
    xForDate: (iso) => diffDaysIso(startIso, iso) * dayWidth,
    endXForDate: (iso) => (diffDaysIso(startIso, iso) + 1) * dayWidth,
    dateForX: (x) => addDaysIso(startIso, Math.floor(x / dayWidth))
  };
}

// src/modals/mermaid-target-modal.ts
var import_obsidian3 = require("obsidian");
var MermaidTargetModal = class extends import_obsidian3.FuzzySuggestModal {
  constructor(app, onPick) {
    super(app);
    this.onPick = onPick;
    this.setPlaceholder(t("\u9009\u62E9\u8981\u5199\u5165 Mermaid \u7684\u7B14\u8BB0\uFF08\u5176\u6807\u8BB0\u5757\u5185\u5185\u5BB9\u4F1A\u88AB\u66FF\u6362\uFF09"));
  }
  getItems() {
    return this.app.vault.getMarkdownFiles();
  }
  getItemText(file) {
    return file.path;
  }
  onChooseItem(file) {
    this.onPick(file);
  }
};

// src/panels/mermaid-board.ts
var import_obsidian4 = require("obsidian");

// src/utils/svg-image.ts
var SVG_NS = "http://www.w3.org/2000/svg";
var XLINK_NS = "http://www.w3.org/1999/xlink";
var HOST_CSS_VARIABLES = [
  "--background-primary",
  "--background-primary-alt",
  "--background-secondary",
  "--background-modifier-border",
  "--text-normal",
  "--text-muted",
  "--text-faint",
  "--text-accent",
  "--interactive-accent",
  "--font-text",
  "--font-interface",
  "--color-red",
  "--color-green",
  "--color-blue",
  "--color-orange",
  "--color-yellow"
];
var MAX_CANVAS_PIXELS = 24e6;
function exportImageName(prefix, ext, now2) {
  const pad = (value) => String(value).padStart(2, "0");
  const stamp = `${now2.getFullYear()}${pad(now2.getMonth() + 1)}${pad(now2.getDate())}-${pad(now2.getHours())}${pad(now2.getMinutes())}`;
  return `${prefix}-${stamp}.${ext}`;
}
function resolveAttachmentFolder(setting, activeFolder) {
  const raw = typeof setting === "string" ? setting.trim() : "";
  if (raw.length === 0 || raw === "/") return "";
  if (raw === "./") return activeFolder ?? "";
  return raw.replace(/^\/+|\/+$/gu, "");
}
function parseViewBoxSize(viewBox) {
  if (viewBox === null) return null;
  const parts = viewBox.trim().split(/[\s,]+/u).map(Number);
  if (parts.length !== 4) return null;
  const width = parts[2];
  const height = parts[3];
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    return null;
  }
  return { width, height };
}
function readAttachmentSetting(app) {
  const vault = app.vault;
  if (typeof vault.getConfig !== "function") return void 0;
  try {
    return vault.getConfig("attachmentFolderPath");
  } catch {
    return void 0;
  }
}
function serializePreviewSvg(svg) {
  const rect = svg.getBoundingClientRect();
  const boxed = parseViewBoxSize(svg.getAttribute("viewBox"));
  const width = Math.max(1, Math.round(Math.max(rect.width, boxed?.width ?? 0)));
  const height = Math.max(1, Math.round(Math.max(rect.height, boxed?.height ?? 0)));
  const clone = svg.cloneNode(true);
  clone.setAttribute("xmlns", SVG_NS);
  clone.setAttribute("xmlns:xlink", XLINK_NS);
  clone.setAttribute("width", String(width));
  clone.setAttribute("height", String(height));
  if (svg.getAttribute("viewBox") === null) {
    clone.setAttribute("viewBox", `0 0 ${width} ${height}`);
  }
  injectHostVariables(clone, svg);
  return { text: new XMLSerializer().serializeToString(clone), width, height };
}
function resolveExportBackground(svg) {
  const computed = svg.ownerDocument.defaultView?.getComputedStyle(svg);
  const value = computed?.getPropertyValue("--background-primary").trim() ?? "";
  return value.length > 0 ? value : "#ffffff";
}
async function svgToJpegBlob(doc, svgText, options) {
  const view = doc.defaultView;
  if (view === null) throw new Error("\u6CA1\u6709\u53EF\u7528\u7684\u7A97\u53E3\u73AF\u5883");
  const scale = clampScale(options.scale ?? 2, options.width, options.height);
  const url = view.URL.createObjectURL(
    new Blob([svgText], { type: "image/svg+xml;charset=utf-8" })
  );
  try {
    const image = await loadSvgImage(doc, url);
    const canvas = doc.createElement("canvas");
    canvas.width = Math.max(1, Math.round(options.width * scale));
    canvas.height = Math.max(1, Math.round(options.height * scale));
    const ctx = canvas.getContext("2d");
    if (ctx === null) throw new Error("\u65E0\u6CD5\u521B\u5EFA\u753B\u5E03\u4E0A\u4E0B\u6587");
    ctx.fillStyle = options.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return await toJpegBlob(canvas);
  } finally {
    view.URL.revokeObjectURL(url);
  }
}
function loadSvgImage(doc, url) {
  return new Promise((resolve, reject) => {
    const image = doc.createElement("img");
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("\u65E0\u6CD5\u628A SVG \u8F6C\u6210\u4F4D\u56FE\uFF08\u56FE\u91CC\u5F15\u7528\u4E86\u5916\u90E8\u8D44\u6E90\u65F6\u4F1A\u88AB\u62E6\u4E0B\uFF09"));
    image.src = url;
  });
}
function toJpegBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob === null) {
          reject(new Error("\u753B\u5E03\u5BFC\u51FA\u5931\u8D25"));
          return;
        }
        resolve(blob);
      },
      "image/jpeg",
      0.92
    );
  });
}
function clampScale(scale, width, height) {
  const desired = Math.max(1, scale);
  if (width <= 0 || height <= 0) return 1;
  const pixels = width * height * desired * desired;
  if (pixels <= MAX_CANVAS_PIXELS) return desired;
  return Math.max(1, Math.sqrt(MAX_CANVAS_PIXELS / (width * height)));
}
function injectHostVariables(target, source) {
  const view = source.ownerDocument.defaultView;
  if (view === null) return;
  const computed = view.getComputedStyle(source);
  const declarations = [];
  for (const name of HOST_CSS_VARIABLES) {
    const value = computed.getPropertyValue(name).trim();
    if (value.length > 0) declarations.push(`${name}: ${value};`);
  }
  if (declarations.length === 0) return;
  const style = source.ownerDocument.createElementNS(SVG_NS, "style");
  style.textContent = `svg { ${declarations.join(" ")} }`;
  target.insertBefore(style, target.firstChild);
}

// src/panels/mermaid-board.ts
function toggleSpecs() {
  return [
    { key: "todayMarker", label: t("\u4ECA\u5929\u7EBF"), hint: t("\u5BFC\u51FA\u7684\u4EE3\u7801\u91CC\u4FDD\u7559\u4ECA\u5929\u7684\u7AD6\u7EBF\u3002") },
    {
      key: "excludeWeekends",
      label: t("\u6392\u9664\u5468\u672B"),
      hint: t(
        "\u628A\u5468\u516D\u5468\u65E5\u6807\u6210\u975E\u5DE5\u4F5C\u65E5\uFF1A\u81EA\u7ED8\u7518\u7279\u56FE\u4E0E\u5BFC\u51FA\u7684\u56FE\u90FD\u4F1A\u628A\u5B83\u4EEC\u753B\u6210\u7070\u8272\u5217\u3002\u6CE8\u610F\uFF1A\u4EFB\u52A1\u6761\u957F\u5EA6\u59CB\u7EC8\u6309\u8D77\u6B62\u65E5\u671F\u7B97\uFF08\u81EA\u7136\u65E5\uFF09\uFF0C\u4E0D\u4F1A\u56E0\u4E3A\u8DF3\u8FC7\u5468\u672B\u800C\u7F29\u77ED\u3002"
      )
    }
  ];
}
function dateFieldSpecs() {
  return [
    {
      key: "excludeDates",
      label: t("\u6392\u9664\u65E5\u671F"),
      placeholder: "2026-10-01~2026-10-07",
      hint: t(
        "\u4E34\u65F6\u8865\u5145\u7684\u6392\u9664\u65E5\u671F\u3002\u652F\u6301\u533A\u95F4 2026-10-01~2026-10-07\uFF08\u4E5F\u8BA4\u300C\u81F3\u300D\uFF09\uFF0C\u591A\u6761\u7528\u9017\u53F7\u5206\u9694\uFF1B\u8FD9\u4E9B\u65E5\u5B50\u5728\u56FE\u4E0A\u4F1A\u753B\u6210\u7070\u8272\u7684\u975E\u5DE5\u4F5C\u65E5\u3002\u6210\u89C4\u6A21\u7684\u6CD5\u5B9A\u8282\u5047\u65E5\u5EFA\u8BAE\u5728\u8BBE\u7F6E\u91CC\u6309\u5E74\u4EFD\u7EF4\u62A4\u300C\u6CD5\u5B9A\u8282\u5047\u65E5\u6392\u671F\u300D\uFF0C\u5BFC\u51FA\u65F6\u4F1A\u81EA\u52A8\u5957\u7528\u3002"
      )
    },
    {
      key: "includeDates",
      label: t("\u8C03\u4F11\u4E0A\u73ED"),
      placeholder: "2026-10-10",
      hint: t(
        "\u4E34\u65F6\u8865\u5145\u7684\u8C03\u4F11\u8865\u73ED\u65E5\u3002\u5199\u6CD5\u540C\u4E0A\uFF1B\u8FD9\u4E9B\u65E5\u5B50\u5F3A\u5236\u7B97\u5DE5\u4F5C\u65E5\uFF08\u4F18\u5148\u7EA7\u9AD8\u4E8E\u6392\u9664\uFF09\uFF0C\u7528\u4E8E\u628A\u300C\u5468\u516D\u4F46\u8981\u4E0A\u73ED\u300D\u4ECE\u7070\u8272\u91CC\u635E\u56DE\u6765\u3002\u5E74\u5EA6\u6392\u671F\u91CC\u7684\u8865\u73ED\u65E5\u4F1A\u81EA\u52A8\u5957\u7528\uFF0C\u8FD9\u91CC\u53EA\u586B\u4F8B\u5916\u3002"
      )
    }
  ];
}
function imageExports() {
  return [
    {
      format: "svg",
      label: t("\u5BFC\u51FA SVG"),
      hint: t("\u628A\u9884\u89C8\u91CC\u7684\u56FE\u5B58\u6210\u77E2\u91CF\u56FE\uFF08.svg\uFF09\uFF1A\u653E\u5927\u4E0D\u7CCA\uFF0C\u4E5F\u80FD\u518D\u62FF\u53BB\u522B\u7684\u5DE5\u5177\u91CC\u6539\u3002")
    },
    {
      format: "jpg",
      label: t("\u5BFC\u51FA JPG"),
      hint: t("\u628A\u9884\u89C8\u91CC\u7684\u56FE\u5B58\u6210\u4F4D\u56FE\uFF08.jpg\uFF0C2 \u500D\u5206\u8FA8\u7387\u3001\u5E95\u8272\u8DDF\u968F\u4E3B\u9898\uFF09\uFF1A\u9002\u5408\u8D34\u8FDB\u804A\u5929\u6216\u6587\u6863\u3002")
    }
  ];
}
var INPUT_DEBOUNCE_MS = 400;
var MermaidBoard = class {
  constructor(component, app, host, deps) {
    this.component = component;
    this.app = app;
    this.host = host;
    this.deps = deps;
    this.toggles = /* @__PURE__ */ new Map();
    this.dateInputs = /* @__PURE__ */ new Map();
    this.previewEl = null;
    this.previewChild = null;
    /** 渲染代次：mermaid 渲染是异步的，用它丢弃过期结果 */
    this.renderGeneration = 0;
    this.inputTimer = null;
    /** 防抖期间累积的改动（两个输入框共用一个定时器） */
    this.pendingPatch = {};
    this.build();
    this.component.register(() => this.clearInputTimer());
  }
  build() {
    this.host.addClass("tm-mermaid");
    const bar = this.host.createDiv({ cls: "tm-mermaid__bar" });
    for (const spec of toggleSpecs()) {
      const button = bar.createEl("button", {
        cls: "tm-chip",
        text: spec.label,
        attr: { type: "button", title: spec.hint, "aria-pressed": "false" }
      });
      this.toggles.set(spec.key, button);
      this.component.registerDomEvent(button, "click", () => {
        const next = !this.deps.getOptions()[spec.key];
        this.deps.onOptionsChange({ [spec.key]: next });
      });
    }
    for (const spec of dateFieldSpecs()) {
      const field = bar.createEl("label", { cls: "tm-mermaid__field", attr: { title: spec.hint } });
      field.createSpan({ cls: "tm-mermaid__field-label", text: spec.label });
      const input = field.createEl("input", {
        cls: "tm-mermaid__input",
        attr: { type: "text", placeholder: spec.placeholder, "aria-label": spec.label }
      });
      this.dateInputs.set(spec.key, input);
      this.component.registerDomEvent(input, "input", () => {
        this.scheduleInput(
          spec.key === "excludeDates" ? { excludeDates: input.value } : { includeDates: input.value }
        );
      });
    }
    bar.createSpan({
      cls: "tm-mermaid__hint",
      text: "\u24D8",
      attr: {
        title: t(
          "Mermaid \u7684 gantt \u8BED\u6CD5\u4E0D\u652F\u6301\u9010\u4EFB\u52A1\u914D\u8272\uFF1A\u8BBE\u7F6E\u91CC\u7684\u56DB\u79CD\u6761\u8272\u53EA\u5F71\u54CD\u81EA\u7ED8\u7518\u7279\u56FE\uFF0C\u5BFC\u51FA\u65F6\u4F1A\u5FFD\u7565\u3002"
        )
      }
    });
    const actions = bar.createDiv({ cls: "tm-mermaid__actions" });
    const exportButton = actions.createEl("button", {
      cls: "tm-btn mod-cta",
      text: t("\u5BFC\u51FA\u4EE3\u7801"),
      attr: { type: "button", title: t("\u590D\u5236\u5F53\u524D\u9884\u89C8\u7684 Mermaid \u4EE3\u7801") }
    });
    this.component.registerDomEvent(exportButton, "click", () => this.deps.onExportCode());
    const writeButton = actions.createEl("button", {
      cls: "tm-btn",
      text: t("\u5199\u5165\u7B14\u8BB0"),
      attr: {
        type: "button",
        title: t("\u66FF\u6362\u6307\u5B9A\u7B14\u8BB0\u91CC\u843D\u70B9\u6807\u8BB0\u4E4B\u95F4\u7684\u5185\u5BB9\uFF08\u6807\u8BB0\u53EF\u5728\u8BBE\u7F6E\u91CC\u6539\uFF09")
      }
    });
    this.component.registerDomEvent(writeButton, "click", () => this.deps.onWriteToNote());
    for (const spec of imageExports()) {
      const button = actions.createEl("button", {
        cls: "tm-btn",
        text: spec.label,
        attr: { type: "button", title: spec.hint }
      });
      this.component.registerDomEvent(button, "click", () => void this.exportImage(spec.format));
    }
    this.previewEl = this.host.createDiv({ cls: "tm-mermaid__preview" });
  }
  /**
   * 导出预览里的图。
   *
   * 图从**当前渲染出来的 svg** 上取，不重新跑一遍 mermaid：导出的就是眼前这张
   * （含今天线、排除周末、节假日等选项的效果）。取不到就明说，不静默失败 ——
   * 预览还没渲染完就点按钮是最常见的一种操作。
   */
  async exportImage(format) {
    const svg = this.previewEl?.querySelector("svg") ?? null;
    if (svg === null) {
      new import_obsidian4.Notice(t("\u9884\u89C8\u91CC\u8FD8\u6CA1\u6709\u53EF\u5BFC\u51FA\u7684\u56FE\uFF0C\u7B49\u5B83\u6E32\u67D3\u5B8C\u518D\u70B9\u4E00\u6B21"));
      return;
    }
    try {
      const serialized = serializePreviewSvg(svg);
      if (format === "svg") {
        this.deps.onExportImage({ format, data: serialized.text });
        return;
      }
      const blob = await svgToJpegBlob(this.host.ownerDocument, serialized.text, {
        width: serialized.width,
        height: serialized.height,
        background: resolveExportBackground(svg)
      });
      this.deps.onExportImage({ format, data: await blob.arrayBuffer() });
    } catch (error) {
      new import_obsidian4.Notice(t("\u5BFC\u51FA\u56FE\u7247\u5931\u8D25\uFF1A{message}", { message: describeError(error) }));
    }
  }
  /**
   * 与外部的唯一同步入口：甘特状态一变就调它。
   *
   * 调用方必须**先让本面板可见再调**：mermaid 在 `display:none` 的容器里量不到尺寸，
   * 渲染出来是坏的（这坑与 Project Master 那边同源）。
   */
  update() {
    const options = this.deps.getOptions();
    for (const [key, button] of this.toggles) {
      const active = options[key];
      button.toggleClass("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    }
    for (const [key, input] of this.dateInputs) {
      if (this.host.ownerDocument.activeElement === input) continue;
      const value = options[key];
      if (input.value !== value) input.value = value;
    }
    this.renderPreview(this.deps.getSource());
  }
  renderPreview(source) {
    const el = this.previewEl;
    if (el === null) return;
    this.releasePreviewChild();
    el.empty();
    const generation = ++this.renderGeneration;
    const child = new import_obsidian4.Component();
    this.component.addChild(child);
    this.previewChild = child;
    void import_obsidian4.MarkdownRenderer.render(this.app, source, el, "", child).then(() => {
      if (generation !== this.renderGeneration) return;
      if (el.childElementCount === 0) {
        el.createDiv({ cls: "tm-mermaid__preview-empty", text: t("\u6CA1\u6709\u53EF\u6E32\u67D3\u7684\u5185\u5BB9") });
      }
    }).catch((error) => {
      if (generation !== this.renderGeneration) return;
      el.empty();
      el.createDiv({
        cls: "tm-mermaid__preview-error",
        text: t("\u9884\u89C8\u6E32\u67D3\u5931\u8D25\uFF1A{message}", { message: describeError(error) })
      });
      new import_obsidian4.Notice(t("Mermaid \u9884\u89C8\u6E32\u67D3\u5931\u8D25\uFF0C\u5BFC\u51FA\u7684\u4EE3\u7801\u4ECD\u53EF\u7528"));
    });
  }
  scheduleInput(patch) {
    this.pendingPatch = { ...this.pendingPatch, ...patch };
    this.clearInputTimer();
    const win = this.host.ownerDocument.defaultView;
    if (win === null) return;
    this.inputTimer = win.setTimeout(() => {
      this.inputTimer = null;
      const pending = this.pendingPatch;
      this.pendingPatch = {};
      this.deps.onOptionsChange(pending);
    }, INPUT_DEBOUNCE_MS);
  }
  clearInputTimer() {
    if (this.inputTimer === null) return;
    this.host.ownerDocument.defaultView?.clearTimeout(this.inputTimer);
    this.inputTimer = null;
  }
  destroy() {
    this.clearInputTimer();
    this.releasePreviewChild();
    this.host.empty();
  }
  releasePreviewChild() {
    if (this.previewChild === null) return;
    this.component.removeChild(this.previewChild);
    this.previewChild = null;
  }
};
function describeError(error) {
  return error instanceof Error ? error.message : String(error);
}

// src/services/image-export.ts
var import_obsidian5 = require("obsidian");
async function writeMermaidImage(app, payload) {
  const folder = resolveAttachmentFolder(
    readAttachmentSetting(app),
    app.workspace.getActiveFile()?.parent?.path ?? null
  );
  const name = exportImageName(t("\u7518\u7279\u56FE"), payload.format, /* @__PURE__ */ new Date());
  if (folder.length > 0 && app.vault.getAbstractFileByPath(folder) === null) {
    await app.vault.createFolder(folder);
  }
  const path = uniqueExportPath(app, folder, name);
  if (typeof payload.data === "string") {
    await app.vault.create(path, payload.data);
  } else {
    await app.vault.createBinary(path, payload.data);
  }
  return path;
}
function uniqueExportPath(app, folder, name) {
  const join = (fileName) => (0, import_obsidian5.normalizePath)(folder.length === 0 ? fileName : `${folder}/${fileName}`);
  const dot = name.lastIndexOf(".");
  const base = dot === -1 ? name : name.slice(0, dot);
  const ext = dot === -1 ? "" : name.slice(dot);
  for (let index = 1; index < 1e3; index += 1) {
    const candidate = join(index === 1 ? name : `${base}-${index}${ext}`);
    if (app.vault.getAbstractFileByPath(candidate) === null) return candidate;
  }
  return join(name);
}

// src/services/note-service.ts
var import_obsidian6 = require("obsidian");
var CORE_DATE_FORMAT = "YYYY-MM-DD";
var CORE_TIME_FORMAT = "HH:mm";
var now = import_obsidian6.moment;
function resolvePlaceholders(text, options = {}) {
  const at = now();
  const formatted = (raw, fallback) => {
    const value = (raw ?? "").trim();
    return at.format(value.length === 0 ? fallback : value);
  };
  return text.replace(/\{\{title\}\}/gu, options.title ?? "").replace(
    /\{\{date(?::([^}]+))?\}\}/gu,
    (_match, format) => formatted(format, CORE_DATE_FORMAT)
  ).replace(
    /\{\{time(?::([^}]+))?\}\}/gu,
    (_match, format) => formatted(format, CORE_TIME_FORMAT)
  ).replace(/YYYY/gu, at.format("YYYY")).replace(/MM/gu, at.format("MM")).replace(/DD/gu, at.format("DD"));
}
async function ensureFolder(app, folderPath) {
  const normalized = (0, import_obsidian6.normalizePath)(folderPath.trim()).replace(/^\/+|\/+$/gu, "");
  if (normalized.length === 0 || normalized === ".") return;
  let current2 = "";
  for (const segment of normalized.split("/")) {
    if (segment.length === 0) continue;
    current2 = current2.length === 0 ? segment : `${current2}/${segment}`;
    if (app.vault.getAbstractFileByPath(current2) !== null) continue;
    await app.vault.createFolder(current2);
  }
}
function templateCandidates(raw) {
  let value = raw.trim();
  const link = /^!?\[\[([^\]|]+)(?:\|[^\]]*)?\]\]$/u.exec(value);
  if (link !== null) value = (link[1] ?? "").trim();
  value = value.replace(/^["'`]+|["'`]+$/gu, "");
  const path = (0, import_obsidian6.normalizePath)(value).replace(/^\/+|\/+$/gu, "");
  if (path.length === 0) return [];
  return path.toLowerCase().endsWith(".md") ? [path] : [path, `${path}.md`];
}
async function upsertMarkedBlock(app, file, options) {
  const { start, end, block } = options;
  const target = app.vault.getAbstractFileByPath(file.path);
  if (!(target instanceof import_obsidian6.TFile)) return "missing";
  let result = "missing";
  await app.vault.process(target, (content) => {
    result = "appended";
    const startIndex = start.length > 0 ? content.indexOf(start) : -1;
    const endIndex = startIndex === -1 ? -1 : content.indexOf(end, startIndex + start.length);
    if (startIndex !== -1 && endIndex !== -1) {
      result = "updated";
      return `${content.slice(0, startIndex)}${block}${content.slice(endIndex + end.length)}`;
    }
    const prefix = content.length === 0 ? "" : content.endsWith("\n\n") ? "" : content.endsWith("\n") ? "\n" : "\n\n";
    return `${content}${prefix}${block}
`;
  });
  return result;
}
function findTemplate(app, raw) {
  for (const candidate of templateCandidates(raw)) {
    const file = app.vault.getAbstractFileByPath(candidate);
    if (file instanceof import_obsidian6.TFile) return file;
  }
  return null;
}
async function ensureNote(app, path, options = { templatePath: "" }) {
  const normalized = (0, import_obsidian6.normalizePath)(path);
  const existing = app.vault.getAbstractFileByPath(normalized);
  if (existing instanceof import_obsidian6.TFile) return existing;
  const slash = normalized.lastIndexOf("/");
  await ensureFolder(app, slash === -1 ? "" : normalized.slice(0, slash));
  const rawTemplate = options.templatePath.trim();
  const template = rawTemplate.length === 0 ? null : findTemplate(app, rawTemplate);
  if (rawTemplate.length > 0 && template === null) {
    new import_obsidian6.Notice(t("\u627E\u4E0D\u5230\u6A21\u677F\u7B14\u8BB0\uFF1A{path}\uFF08\u5DF2\u6309\u7A7A\u767D\u7B14\u8BB0\u521B\u5EFA\uFF09", { path: rawTemplate }));
  }
  const name = slash === -1 ? normalized : normalized.slice(slash + 1);
  const title = name.replace(/\.md$/u, "");
  const body = template === null ? "" : resolvePlaceholders(await app.vault.read(template), { title });
  const file = await app.vault.create(normalized, body);
  if (template !== null) await runTemplateCommands(app, file);
  return file;
}
async function runTemplateCommands(app, file) {
  const templater = app.plugins?.plugins?.["templater-obsidian"]?.templater;
  if (templater === void 0 || typeof templater.overwrite_file_commands !== "function") return;
  try {
    await templater.overwrite_file_commands(file);
  } catch {
    new import_obsidian6.Notice(t("\u6A21\u677F\u547D\u4EE4\u672A\u5168\u90E8\u6267\u884C\uFF0C\u7B14\u8BB0\u5DF2\u6309\u6A21\u677F\u539F\u6587\u521B\u5EFA\uFF1B\u53EF\u7A0D\u540E\u6267\u884C\u4E00\u6B21\u6A21\u677F\u547D\u4EE4\u91CD\u8DD1"));
  }
}

// src/gantt/gantt-view.ts
var import_obsidian7 = require("obsidian");

// src/utils/split-resizer.ts
var KEY_STEP = 16;
var KEY_STEP_LARGE = 64;
function clampSplitWidth(width, min, max) {
  const ceiling = Math.max(min, max);
  if (!Number.isFinite(width)) return min;
  return Math.min(Math.max(Math.round(width), min), ceiling);
}
var SplitResizer = class {
  constructor(component, config) {
    this.component = component;
    this.config = config;
    this.startX = 0;
    this.startWidth = 0;
    this.lastWidth = 0;
    /** 拖动期间的 document 监听器；松手必须摘掉，否则会随着每次拖动累积 */
    this.detach = null;
    this.component.registerDomEvent(
      config.handle,
      "pointerdown",
      (evt) => this.onPointerDown(evt)
    );
    this.component.registerDomEvent(config.handle, "keydown", (evt) => this.onKeyDown(evt));
  }
  /** 元素当下的实测宽度：不读设置，读它自己 —— 这样与「用户看到的多宽」永远一致 */
  currentWidth() {
    return this.config.target.getBoundingClientRect().width;
  }
  maxWidth() {
    return Math.max(this.config.min, Math.round(this.config.max()));
  }
  onPointerDown(evt) {
    if (evt.button !== 0) return;
    evt.preventDefault();
    evt.stopPropagation();
    this.startX = evt.clientX;
    this.startWidth = this.currentWidth();
    this.lastWidth = this.startWidth;
    this.config.handle.addClass("is-dragging");
    const doc = this.config.handle.ownerDocument;
    doc.body.addClass("tm-resizing");
    const onMove = (move) => {
      const width = clampSplitWidth(
        this.startWidth + (move.clientX - this.startX),
        this.config.min,
        this.maxWidth()
      );
      this.lastWidth = width;
      this.config.onResize(width);
    };
    const onEnd = () => {
      this.finish();
      if (Math.round(this.lastWidth) !== Math.round(this.startWidth)) {
        this.config.onCommit(this.lastWidth);
      }
    };
    doc.addEventListener("pointermove", onMove);
    doc.addEventListener("pointerup", onEnd);
    doc.addEventListener("pointercancel", onEnd);
    this.detach = () => {
      doc.removeEventListener("pointermove", onMove);
      doc.removeEventListener("pointerup", onEnd);
      doc.removeEventListener("pointercancel", onEnd);
    };
  }
  onKeyDown(evt) {
    const step = evt.shiftKey ? KEY_STEP_LARGE : KEY_STEP;
    let delta = 0;
    if (evt.key === "ArrowLeft") delta = -step;
    else if (evt.key === "ArrowRight") delta = step;
    else return;
    evt.preventDefault();
    const width = clampSplitWidth(this.currentWidth() + delta, this.config.min, this.maxWidth());
    this.config.onResize(width);
    this.config.onCommit(width);
  }
  finish() {
    this.detach?.();
    this.detach = null;
    this.config.handle.removeClass("is-dragging");
    this.config.handle.ownerDocument.body.removeClass("tm-resizing");
  }
};

// src/gantt/bar-colors.ts
function barColorKey(row) {
  const { task } = row;
  if (task.critical) return "crit";
  if (task.completed) return "done";
  if (row.startFallback || row.endFallback) return "fallback";
  return "active";
}
function barClass(row) {
  if (row.task.milestone) return "tm-gantt__bar--milestone";
  return `tm-gantt__bar--${barColorKey(row)}`;
}

// src/gantt/gantt-view.ts
var SVG_NS2 = "http://www.w3.org/2000/svg";
var ROW_HEIGHT = 30;
var SECTION_HEIGHT = 26;
var MAX_GRID_LINES = 1e3;
var MAX_HEADER_LABELS = 240;
var MIN_DAY_WIDTH_FOR_OFF_DAYS = 3;
var WHEEL_STEP_THRESHOLD = 40;
var PAN_THRESHOLD_PX = 4;
var TIMELINE_MIN_WIDTH = 220;
var SIDEBAR_WIDTH_VAR = "--tm-gantt-sidebar-width";
var GanttView = class {
  constructor(component, root, callbacks) {
    this.component = component;
    this.root = root;
    this.callbacks = callbacks;
    this.frameBuilt = false;
    /**
     * 甘特框架元素。刻意在宿主容器里**再套一层**：宿主由调用方持有、负责在父级
     * flex 布局里占位；本视图只管「甘特内部怎么排」。两者落在同一个元素上时，
     * 双方各自写的 flex 属性会互相覆盖。
     */
    this.frame = null;
    /** 任务列本身（拖动分隔条时调整宽度的目标） */
    this.sidebarEl = null;
    this.sidebarHeadEl = null;
    this.sidebarBodyEl = null;
    this.timelineEl = null;
    this.canvasEl = null;
    this.scale = null;
    this.layout = [];
    this.wheelAccumulator = 0;
    /** 拖动平移的现场（null = 没在拖） */
    this.pan = null;
    /** 刚刚拖过时间轴：吞掉随之而来的那次 click（浏览器在 pointerup 后一定补发） */
    this.suppressNextClick = false;
    /** 还欠一次「落到今天」：容器当时量不到宽度，等 ResizeObserver 报出宽度再补 */
    this.pendingScrollToToday = false;
    /** 本轮配色：跟着每次 render 一起传进来，视图自己不留一份可能过期的副本 */
    this.colors = DEFAULT_GANTT_BAR_COLORS;
    /** 本轮非工作日色带，同样每次 render 一起进来 */
    this.offDays = [];
    /**
     * 任务 id → 任务。
     *
     * 任务条上只带 id（DOM 属性挂不了对象），点击时回来查表。每次渲染重建，
     * 与当前 model 严格一致，不会残留上一轮的任务。
     */
    this.taskIndex = /* @__PURE__ */ new Map();
    this.registerInteraction();
  }
  // ────────────────────────────── 渲染 ──────────────────────────────
  render(model, zoom, today, options) {
    const { anchor, colors } = options;
    this.colors = colors;
    this.offDays = options.offDays;
    this.scale = buildTimeScale(model.rangeStart, model.rangeEnd, zoom, { today });
    this.layout = buildLayout(model);
    this.taskIndex = new Map(model.rows.map((row) => [row.task.id, row.task]));
    this.ensureFrame();
    this.applySidebarWidth(options.sidebarWidth);
    const head = this.sidebarHeadEl;
    const body = this.sidebarBodyEl;
    const canvas = this.canvasEl;
    if (head === null || body === null || canvas === null) return;
    head.setText(summaryLabel(model));
    body.empty();
    canvas.empty();
    canvas.style.setProperty("--tm-canvas-width", `${this.scale.totalWidth}px`);
    this.renderSidebar(body);
    this.renderHeader(canvas);
    this.renderBody(canvas);
    if (model.rows.length === 0) {
      canvas.createDiv({
        cls: "tm-gantt__empty",
        text: t("\u6CA1\u6709\u53EF\u663E\u793A\u7684\u4EFB\u52A1\uFF08\u9700\u8981\u81F3\u5C11\u4E00\u4E2A\u5F00\u59CB\u65E5\u6216\u622A\u6B62\u65E5\uFF09")
      });
    }
    this.syncScroll();
    if (anchor !== void 0 && this.timelineEl !== null) {
      this.timelineEl.scrollLeft = Math.max(0, this.scale.xForDate(anchor.iso) - anchor.offsetX);
    }
  }
  /** 只建一次：滚动监听器挂在持久节点上，重渲染不会累积监听器 */
  ensureFrame() {
    if (this.frameBuilt) return;
    this.root.tabIndex = -1;
    const frame = this.root.createDiv({ cls: "tm-gantt" });
    this.frame = frame;
    const sidebar = frame.createDiv({ cls: "tm-gantt__sidebar" });
    this.sidebarEl = sidebar;
    this.sidebarHeadEl = sidebar.createDiv({ cls: "tm-gantt__sidebar-head" });
    this.sidebarBodyEl = sidebar.createDiv({ cls: "tm-gantt__sidebar-body" });
    const handle = frame.createDiv({
      cls: "tm-gantt__resizer",
      attr: {
        role: "separator",
        "aria-orientation": "vertical",
        "aria-label": t("\u62D6\u52A8\u8C03\u6574\u4EFB\u52A1\u5217\u5BBD\u5EA6"),
        tabindex: "0"
      }
    });
    new SplitResizer(this.component, {
      target: sidebar,
      handle,
      min: GANTT_SIDEBAR_MIN_WIDTH,
      // 上限现算：时间轴至少要留得下 TIMELINE_MIN_WIDTH
      max: () => frame.getBoundingClientRect().width - TIMELINE_MIN_WIDTH,
      onResize: (width) => this.applySidebarWidth(width),
      onCommit: (width) => this.callbacks.onSidebarWidthCommit(width)
    });
    this.timelineEl = frame.createDiv({ cls: "tm-gantt__timeline" });
    this.canvasEl = this.timelineEl.createDiv({ cls: "tm-gantt__canvas" });
    this.component.registerDomEvent(this.timelineEl, "scroll", () => this.syncScroll());
    this.registerPanning(this.timelineEl);
    this.watchTimelineWidth(this.timelineEl);
    this.frameBuilt = true;
  }
  /**
   * 布局稳定后再补一次「落到今天」。
   *
   * 视图挂载与索引就绪的先后不保证：首次渲染时容器可能还没有宽度（视图在收起的侧栏里、
   * 或页签在后台），`clientWidth` 是 0，这种时候按 0 算会把视野甩到很远的地方，只能等
   * 它真的被量出宽度再滚。**只靠「下一次渲染」不够** —— 索引就绪之后可能根本不会再有
   * 下一次渲染，用户就永远停在时间轴最左端（最早的日期）。
   */
  watchTimelineWidth(timeline) {
    const view = timeline.ownerDocument.defaultView;
    const Observer = view?.ResizeObserver;
    if (Observer === void 0) return;
    const observer = new Observer(() => {
      if (!this.pendingScrollToToday || timeline.clientWidth === 0) return;
      this.scrollToToday();
    });
    observer.observe(timeline);
    this.component.register(() => observer.disconnect());
  }
  /**
   * 时间轴的拖动平移（按住拖动，桌面端鼠标 / 触控笔）。
   *
   * 甘特的常态是「横向看时间」，而横向滚动条在 Obsidian 里是浮层、又细，
   * 不好找也不好抓；按住拖动是最直接的手势。触屏不接这一套 ——
   * 那里本来就是滑动滚动，再叠一层平移会互相打架。
   *
   * 拖动超过阈值就吞掉随后那次 click：否则「拖完顺手打开一篇笔记」
   * （浏览器在 pointerup 后一定补发 click）。
   */
  registerPanning(timeline) {
    const doc = timeline.ownerDocument;
    this.component.registerDomEvent(timeline, "pointerdown", (evt) => {
      if (evt.button !== 0 || evt.pointerType === "touch") return;
      this.pendingScrollToToday = false;
      this.pan = {
        pointerX: evt.clientX,
        pointerY: evt.clientY,
        startLeft: timeline.scrollLeft,
        startTop: timeline.scrollTop,
        moved: false
      };
    });
    this.component.registerDomEvent(doc, "pointermove", (evt) => {
      const pan = this.pan;
      if (pan === null || this.timelineEl === null) return;
      const dx = evt.clientX - pan.pointerX;
      const dy = evt.clientY - pan.pointerY;
      if (!pan.moved && Math.abs(dx) + Math.abs(dy) < PAN_THRESHOLD_PX) return;
      if (!pan.moved) {
        pan.moved = true;
        timeline.addClass("is-panning");
      }
      evt.preventDefault();
      timeline.scrollLeft = pan.startLeft - dx;
      timeline.scrollTop = pan.startTop - dy;
    });
    const endPan = () => {
      const pan = this.pan;
      if (pan === null) return;
      this.pan = null;
      this.suppressNextClick = pan.moved;
      timeline.removeClass("is-panning");
    };
    this.component.registerDomEvent(doc, "pointerup", endPan);
    this.component.registerDomEvent(doc, "pointercancel", endPan);
  }
  /**
   * 把宽度写进 CSS 变量（不写内联 width）。
   *
   * 变量只负责这一件事，样式表里 `max-width: calc(100% - …)` 之类的兜底规则照样生效 ——
   * 窗口被拖窄后，昨天存的宽度不会把时间轴挤没。
   */
  applySidebarWidth(width) {
    const value = clampSplitWidth(width, GANTT_SIDEBAR_MIN_WIDTH, Number.MAX_SAFE_INTEGER);
    this.frame?.style.setProperty(SIDEBAR_WIDTH_VAR, `${value}px`);
  }
  renderSidebar(host) {
    for (const entry of this.layout) {
      if (entry.kind === "section") {
        this.renderSectionHeader(host, entry);
        continue;
      }
      const row = entry.row;
      if (row === null) continue;
      const rowEl = host.createDiv({ cls: "tm-gantt__sidebar-row" });
      rowEl.dataset.taskId = row.task.id;
      rowEl.dataset.section = entry.sectionKey;
      const nameEl = rowEl.createDiv({ cls: "tm-gantt__sidebar-name" });
      const link = nameEl.createEl("a", {
        cls: "internal-link",
        text: row.task.name,
        attr: { title: `${row.task.filePath}:${row.task.lineNumber}`, tabindex: "-1" }
      });
      link.dataset.openTask = row.task.id;
      const meta = rowEl.createDiv({ cls: "tm-gantt__sidebar-meta" });
      if (row.task.milestone) {
        meta.createSpan({ cls: "tm-gantt__tag", text: t("\u91CC\u7A0B\u7891") });
      }
      if (row.task.critical) {
        meta.createSpan({ cls: "tm-gantt__tag", text: t("\u5173\u952E") });
      }
      if (row.startFallback || row.endFallback) {
        meta.createSpan({
          cls: "tm-gantt__fallback-hint",
          text: t("\u7F3A\u65E5\u671F"),
          attr: { title: t("\u8D77\u6B62\u65E5\u671F\u4E0D\u5B8C\u6574\uFF0C\u56FE\u4E0A\u90A3\u4E00\u6BB5\u662F\u63A8\u5BFC\u51FA\u6765\u7684") }
        });
      }
      const edit = rowEl.createEl("button", {
        cls: "tm-gantt__row-edit",
        text: "\u270E",
        attr: {
          type: "button",
          title: t("\u7F16\u8F91\u4EFB\u52A1"),
          "aria-label": `${t("\u7F16\u8F91\u4EFB\u52A1")}\uFF1A${row.task.name}`
        }
      });
      edit.dataset.editTask = row.task.id;
    }
  }
  renderSectionHeader(host, entry) {
    const header = host.createEl("button", {
      cls: `tm-gantt__sidebar-section${entry.collapsed ? " is-collapsed" : ""}`,
      attr: { type: "button", "aria-expanded": String(!entry.collapsed) }
    });
    header.dataset.toggleSection = entry.sectionKey;
    header.createSpan({ cls: "tm-gantt__chevron", text: entry.collapsed ? "\u25B8" : "\u25BE" });
    header.createSpan({ cls: "tm-gantt__sidebar-section-name", text: entry.sectionName });
  }
  renderHeader(host) {
    const scale = this.scale;
    if (scale === null) return;
    const header = host.createDiv({ cls: "tm-gantt__header" });
    const upper = header.createDiv({ cls: "tm-gantt__header-row tm-gantt__header-row--upper" });
    const lower = header.createDiv({ cls: "tm-gantt__header-row tm-gantt__header-row--lower" });
    this.fillHeaderRow(upper, scale.upper);
    this.fillHeaderRow(lower, scale.lower);
  }
  fillHeaderRow(host, columns) {
    const step = Math.max(1, Math.ceil(columns.length / MAX_HEADER_LABELS));
    columns.forEach((column, index) => {
      const cell = host.createDiv({ cls: "tm-gantt__header-cell" });
      cell.style.setProperty("--tm-cell-width", `${column.width}px`);
      if (index % step === 0) {
        cell.createSpan({ cls: "tm-gantt__header-label", text: column.label });
      }
    });
  }
  renderBody(host) {
    const scale = this.scale;
    if (scale === null) return;
    const height = Math.max(entryBottom(this.layout), ROW_HEIGHT);
    const svg = this.svg("svg");
    svg.setAttribute("class", "tm-gantt__svg");
    svg.setAttribute("width", String(scale.totalWidth));
    svg.setAttribute("height", String(height));
    host.appendChild(svg);
    const shapes = this.svg("g");
    svg.appendChild(shapes);
    this.renderOffDays(shapes, scale, height);
    this.renderGrid(shapes, scale, height);
    for (const entry of this.layout) {
      if (entry.kind !== "row" || entry.row === null) continue;
      this.renderRowShapes(shapes, entry.row, entry.y, scale);
    }
    if (scale.todayX !== null) {
      const line = this.svg("line");
      line.setAttribute("class", "tm-gantt__today");
      line.setAttribute("x1", String(scale.todayX));
      line.setAttribute("x2", String(scale.todayX));
      line.setAttribute("y1", "0");
      line.setAttribute("y2", String(height));
      shapes.appendChild(line);
    }
  }
  /**
   * 非工作日底带：画在所有内容之下，只做背景提示。
   *
   * 内容 = 周末（开关打开时）∪ 法定节假日 − 调休补班日，由调用方按同一份日历算好
   * （见 GanttRenderOptions.offDays）。视图这里只负责按日期画矩形。
   */
  renderOffDays(host, scale, height) {
    if (scale.dayWidth < MIN_DAY_WIDTH_FOR_OFF_DAYS) return;
    for (const band of this.offDays) {
      const x = scale.xForDate(band.start);
      const rect = this.svg("rect");
      rect.setAttribute("class", "tm-gantt__off-day");
      rect.setAttribute("x", String(x));
      rect.setAttribute("y", "0");
      rect.setAttribute("width", String(scale.endXForDate(band.end) - x));
      rect.setAttribute("height", String(height));
      host.appendChild(rect);
    }
  }
  renderGrid(host, scale, height) {
    if (scale.lower.length > MAX_GRID_LINES) return;
    for (const column of scale.lower) {
      const line = this.svg("line");
      line.setAttribute("class", "tm-gantt__grid-line");
      line.setAttribute("x1", String(column.x));
      line.setAttribute("x2", String(column.x));
      line.setAttribute("y1", "0");
      line.setAttribute("y2", String(height));
      host.appendChild(line);
    }
  }
  renderRowShapes(host, row, y, scale) {
    const x = scale.xForDate(row.start);
    const width = barWidth(row.start, row.end, scale, x);
    const barY = y + 5;
    const barHeight = ROW_HEIGHT - 10;
    const fallback = row.startFallback || row.endFallback;
    const color = this.colors[barColorKey(row)];
    const bar = row.task.milestone ? this.buildMilestone(x, width, barY, barHeight, color) : this.buildBar(x, width, barY, barHeight, row, fallback, color);
    bar.dataset.taskId = row.task.id;
    bar.setAttribute("tabindex", "0");
    bar.setAttribute("role", "button");
    bar.setAttribute(
      "aria-label",
      t("{name}\uFF1A{start} \u81F3 {end}\uFF0C{days} \u5929", {
        name: row.task.name,
        start: row.start,
        end: row.end,
        days: row.calendarDays
      })
    );
    const title = this.svg("title");
    title.textContent = row.durationLabel === null ? `${row.task.name}
${row.start} \u2192 ${row.end}` : `${row.task.name}
${row.start} \u2192 ${row.end}
` + t("\u81EA\u7136\u65E5 {calendar} \u5929 \xB7 \u5DE5\u4F5C\u65E5 {workday} \u5929", {
      calendar: row.calendarDays,
      workday: row.workdayDays
    });
    bar.appendChild(title);
    host.appendChild(bar);
    if (!row.task.milestone && row.durationLabel !== null) {
      this.renderDurationLabel(host, row.durationLabel, x, width, barY, barHeight);
    }
  }
  buildBar(x, width, barY, barHeight, row, fallback, color) {
    const bar = this.svg("rect");
    bar.setAttribute("class", `tm-gantt__bar ${barClass(row)}`);
    bar.setAttribute("x", String(x));
    bar.setAttribute("y", String(barY));
    bar.setAttribute("width", String(width));
    bar.setAttribute("height", String(barHeight));
    bar.setAttribute("rx", "4");
    if (fallback) bar.dataset.fallback = "true";
    bar.style.fill = color;
    return bar;
  }
  /** 里程碑：以结束日为尖点的菱形，宽度固定一个日宽；颜色沿用状态色，形状负责区分 */
  buildMilestone(x, width, barY, barHeight, color) {
    const size = Math.min(barHeight, 14);
    const centerX = x + width;
    const centerY = barY + barHeight / 2;
    const half = size / 2;
    const diamond = this.svg("polygon");
    diamond.setAttribute("class", "tm-gantt__bar tm-gantt__bar--milestone");
    diamond.setAttribute(
      "points",
      [
        `${centerX},${centerY - half}`,
        `${centerX + half},${centerY}`,
        `${centerX},${centerY + half}`,
        `${centerX - half},${centerY}`
      ].join(" ")
    );
    diamond.style.fill = color;
    return diamond;
  }
  /**
   * 条上的天数。
   *
   * 放得下就写在条内（配合对比色与描边），放不下就挪到右外侧用次要色——
   * 绝不能因为条子窄就把信息吞掉：年档下 40 天的条子只有几十像素宽，
   * 而「这段到底跨了多久」正是最需要看见的。
   */
  renderDurationLabel(host, label, barX, barWidthPx, barY, barHeight) {
    const inset = 6;
    const fits = barWidthPx >= estimateTextWidth(label) + inset * 2;
    const text = this.svg("text");
    text.setAttribute(
      "class",
      fits ? "tm-gantt__bar-duration" : "tm-gantt__bar-duration tm-gantt__bar-duration--outside"
    );
    text.setAttribute("y", String(barY + barHeight / 2));
    if (fits) {
      text.setAttribute("x", String(barX + barWidthPx / 2));
      text.setAttribute("text-anchor", "middle");
    } else {
      text.setAttribute("x", String(barX + barWidthPx + inset));
      text.setAttribute("text-anchor", "start");
    }
    text.textContent = label;
    host.appendChild(text);
  }
  /** SVG 元素统一经 ownerDocument 创建（popout 安全） */
  svg(tag) {
    return this.root.ownerDocument.createElementNS(SVG_NS2, tag);
  }
  // ────────────────────────────── 交互 ──────────────────────────────
  /** 监听器只注册这一次，之后全靠 data-* 委托分发 */
  registerInteraction() {
    this.component.registerDomEvent(this.root, "click", (evt) => this.onClick(evt));
    this.component.registerDomEvent(this.root, "keydown", (evt) => this.onKeyDown(evt));
    this.component.registerDomEvent(this.root, "contextmenu", (evt) => this.onContextMenu(evt));
    this.component.registerDomEvent(this.root, "wheel", (evt) => this.onWheel(evt), {
      passive: false
    });
  }
  /** 把事件目标收窄成元素（跨窗口安全：用根容器所属窗口的构造器判断） */
  elementOf(target) {
    const win = this.root.ownerDocument.defaultView;
    if (win === null || !(target instanceof win.Element)) return null;
    return target;
  }
  taskOf(target) {
    const el = this.elementOf(target);
    if (el === null) return null;
    const id = el.closest("[data-task-id]")?.getAttribute("data-task-id");
    if (id === null || id === void 0) return null;
    return this.taskIndex.get(id) ?? null;
  }
  onClick(evt) {
    if (this.suppressNextClick) {
      this.suppressNextClick = false;
      return;
    }
    const el = this.elementOf(evt.target);
    if (el === null) return;
    const toggle2 = el.closest("[data-toggle-section]")?.getAttribute("data-toggle-section");
    if (toggle2 !== null && toggle2 !== void 0) {
      evt.preventDefault();
      this.callbacks.onToggleSection(toggle2);
      return;
    }
    const editId = el.closest("[data-edit-task]")?.getAttribute("data-edit-task");
    if (editId !== null && editId !== void 0) {
      evt.preventDefault();
      const editable = this.taskIndex.get(editId);
      if (editable !== void 0) this.callbacks.onEditTask(editable);
      return;
    }
    const task = this.taskOf(evt.target);
    if (task !== null) {
      evt.preventDefault();
      this.callbacks.onOpenTask(task);
    }
  }
  /**
   * 右键任务条：编辑任务 / 打开笔记。
   *
   * 任务条本身是一段 SVG，塞不进 HTML 按钮（塞进去也要自己处理定位、缩放、命中），
   * 所以条子上的等价入口是右键菜单 —— Obsidian 同类场景的通行做法（文件树、关系图），
   * Project Master 的甘特条也是这么做的。**但右键不能是唯一入口**：任务列里的行与条子
   * 一一对应，编辑按钮放在那儿（见 renderSidebar）。单击仍然是「打开笔记」，与卡片一致。
   */
  onContextMenu(evt) {
    const task = this.taskOf(evt.target);
    if (task === null) return;
    evt.preventDefault();
    const menu = new import_obsidian7.Menu();
    menu.addItem(
      (item) => item.setTitle(t("\u7F16\u8F91\u4EFB\u52A1")).setIcon("pencil").onClick(() => this.callbacks.onEditTask(task))
    );
    menu.addItem(
      (item) => item.setTitle(t("\u6253\u5F00\u7B14\u8BB0")).setIcon("file-text").onClick(() => this.callbacks.onOpenTask(task))
    );
    menu.showAtMouseEvent(evt);
  }
  onKeyDown(evt) {
    const el = this.elementOf(evt.target);
    if (el !== null && el.closest("[data-edit-task]") !== null) return;
    const task = this.taskOf(evt.target);
    if (task === null) return;
    if (evt.key === "Enter" || evt.key === " ") {
      evt.preventDefault();
      this.callbacks.onOpenTask(task);
    }
  }
  onWheel(evt) {
    if (!evt.ctrlKey && !evt.metaKey) return;
    evt.preventDefault();
    this.wheelAccumulator += evt.deltaY;
    if (Math.abs(this.wheelAccumulator) < WHEEL_STEP_THRESHOLD) return;
    const direction = this.wheelAccumulator < 0 ? 1 : -1;
    this.wheelAccumulator = 0;
    this.callbacks.onZoom(direction, this.anchorAtClientX(evt.clientX));
  }
  /** 把屏幕 x 换算成「日期 + 距可视区左缘的偏移」，缩放后据此还原视野 */
  anchorAtClientX(clientX) {
    const scale = this.scale;
    const timeline = this.timelineEl;
    if (scale === null || timeline === null) return null;
    const bounds = timeline.getBoundingClientRect();
    const offsetX = clientX - bounds.left;
    return { iso: scale.dateForX(offsetX + timeline.scrollLeft), offsetX };
  }
  /** 供键盘 Ctrl +/- 用：以可视区中心为锚点 */
  centerAnchor() {
    const timeline = this.timelineEl;
    if (timeline === null) return null;
    const bounds = timeline.getBoundingClientRect();
    return this.anchorAtClientX(bounds.left + bounds.width / 2);
  }
  // ────────────────────────────── 滚动 ──────────────────────────────
  /**
   * 打开时把视野落到今天：甘特的常态就是盯着最近这几周。
   *
   * @returns 是否真的滚了。容器还量不到宽度时（视图在收起的侧栏里、页签在后台）
   *          `clientWidth` 是 0，按 0 算会把视野甩到很远的地方；这时记下「还欠一次
   *          定位」，等 ResizeObserver 报出真实宽度再补（见 watchTimelineWidth）。
   */
  scrollToToday() {
    const scale = this.scale;
    const timeline = this.timelineEl;
    if (scale === null || timeline === null || scale.todayX === null) return false;
    if (timeline.clientWidth === 0) {
      this.pendingScrollToToday = true;
      return false;
    }
    this.pendingScrollToToday = false;
    timeline.scrollLeft = Math.max(0, scale.todayX - timeline.clientWidth / 3);
    return true;
  }
  /** 侧栏纵向跟随时间轴滚动（两侧行高一致，用 transform 对齐） */
  syncScroll() {
    if (this.timelineEl === null || this.sidebarBodyEl === null) return;
    this.sidebarBodyEl.style.setProperty("--tm-sidebar-offset", `${-this.timelineEl.scrollTop}px`);
  }
  destroy() {
    this.frameBuilt = false;
    this.frame = null;
    this.sidebarHeadEl = null;
    this.sidebarBodyEl = null;
    this.timelineEl = null;
    this.canvasEl = null;
    this.scale = null;
    this.layout = [];
    this.taskIndex.clear();
    this.root.empty();
  }
};
var DURATION_FONT_SIZE = 11;
function estimateTextWidth(label) {
  let width = 0;
  for (const char of label) {
    width += /[\u3000-\u9fff\uff00-\uffef]/u.test(char) ? DURATION_FONT_SIZE : DURATION_FONT_SIZE * 0.55;
  }
  return width;
}
function buildLayout(model) {
  const entries = [];
  let y = 0;
  for (const section of model.sections) {
    if (model.showSectionHeaders) {
      entries.push({
        kind: "section",
        sectionKey: section.key,
        sectionName: section.name,
        collapsed: section.collapsed,
        row: null,
        y,
        height: SECTION_HEIGHT
      });
      y += SECTION_HEIGHT;
    }
    if (section.collapsed) continue;
    for (const row of section.rows) {
      entries.push({
        kind: "row",
        sectionKey: section.key,
        sectionName: section.name,
        collapsed: false,
        row,
        y,
        height: ROW_HEIGHT
      });
      y += ROW_HEIGHT;
    }
  }
  return entries;
}
function entryBottom(entries) {
  const last = entries[entries.length - 1];
  return last === void 0 ? 0 : last.y + last.height;
}
function barWidth(start, end, scale, x) {
  return Math.max(scale.dayWidth, scale.endXForDate(end) - x);
}
function summaryLabel(model) {
  const base = t("{count} \u4E2A\u4EFB\u52A1", { count: model.rows.length });
  if (model.skipped.length === 0) return base;
  return `${base} \xB7 ${t("{count} \u4E2A\u6CA1\u6709\u65E5\u671F", { count: model.skipped.length })}`;
}

// src/panels/gantt-board.ts
var GanttBoard = class {
  constructor(host, component, callbacks) {
    host.addClass("tm-gantt-board");
    const viewHost = host.createDiv({ cls: "tm-gantt-board__view" });
    this.view = new GanttView(component, viewHost, {
      onOpenTask: (task) => callbacks.onOpenTask(task),
      onEditTask: (task) => callbacks.onEditTask(task),
      onToggleSection: (key) => callbacks.onToggleSection(key),
      onZoom: (direction, anchor) => callbacks.onZoomStep(direction, anchor),
      onSidebarWidthCommit: (width) => callbacks.onSidebarWidthCommit(width)
    });
  }
  /**
   * 复位到「今天」：只挪滚动位置，不重渲染。
   *
   * @returns 是否真的滚了（容器量不到宽度时为 false，视图会记下来等宽度就绪再补）
   */
  scrollToToday() {
    return this.view.scrollToToday();
  }
  /** @returns 是否已经把视野落到今天（容器还没显示出来时为 false，调用方下次再试） */
  render(options) {
    this.view.render(options.model, options.zoom, options.today, {
      anchor: options.anchor,
      colors: options.colors,
      sidebarWidth: options.sidebarWidth,
      offDays: options.offDays
    });
    return options.scrollToToday ? this.view.scrollToToday() : false;
  }
  destroy() {
    this.view.destroy();
  }
};

// src/modals/confirm-modals.ts
var import_obsidian8 = require("obsidian");
var DateConflictModal = class extends import_obsidian8.Modal {
  constructor(app, startDate, dueDate, settle) {
    super(app);
    this.startDate = startDate;
    this.dueDate = dueDate;
    this.settle = settle;
    this.answered = false;
  }
  onOpen() {
    this.contentEl.addClass("tm-modal");
    this.titleEl.setText(t("\u65E5\u671F\u51B2\u7A81"));
    const message = this.contentEl.createEl("p", { cls: "tm-modal__message" });
    message.setText(
      t("\u5F00\u59CB\u65E5\u671F\uFF08{start}\uFF09\u665A\u4E8E\u622A\u6B62\u65E5\u671F\uFF08{due}\uFF09\u3002", { start: this.startDate, due: this.dueDate })
    );
    this.contentEl.createEl("p", {
      cls: "tm-modal__message",
      text: t("\u8981\u628A\u622A\u6B62\u65E5\u671F\u8C03\u6574\u5230\u4ECA\u5929\uFF0C\u8FD8\u662F\u4FDD\u7559\u539F\u65E5\u671F\u5E76\u6807\u8BB0\u4E3A\u51B2\u7A81\uFF1F")
    });
    const buttons = this.contentEl.createDiv({ cls: "tm-modal__buttons" });
    new import_obsidian8.ButtonComponent(buttons).setButtonText(t("\u53D6\u6D88")).onClick(() => this.close());
    new import_obsidian8.ButtonComponent(buttons).setButtonText(t("\u6807\u8BB0\u51B2\u7A81")).onClick(() => this.answer("mark-conflict"));
    new import_obsidian8.ButtonComponent(buttons).setButtonText(t("\u8C03\u6574\u622A\u6B62\u65E5\u671F")).setCta().onClick(() => this.answer("adjust-due"));
  }
  onClose() {
    this.contentEl.empty();
    if (!this.answered) this.settle("cancel");
  }
  answer(result) {
    this.answered = true;
    this.settle(result);
    this.close();
  }
};
var DeleteTaskModal = class extends import_obsidian8.Modal {
  constructor(app, description, settle) {
    super(app);
    this.description = description;
    this.settle = settle;
    this.answered = false;
  }
  onOpen() {
    this.contentEl.addClass("tm-modal");
    this.titleEl.setText(t("\u5220\u9664\u4EFB\u52A1"));
    this.contentEl.createEl("p", {
      cls: "tm-modal__message",
      text: t("\u786E\u5B9A\u8981\u5220\u9664\u300C{description}\u300D\u5417\uFF1F\u8FD9\u4E00\u884C\u4F1A\u4ECE\u7B14\u8BB0\u91CC\u79FB\u9664\u3002", { description: this.description })
    });
    const buttons = this.contentEl.createDiv({ cls: "tm-modal__buttons" });
    new import_obsidian8.ButtonComponent(buttons).setButtonText(t("\u53D6\u6D88")).onClick(() => this.close());
    new import_obsidian8.ButtonComponent(buttons).setButtonText(t("\u5220\u9664")).setWarning().onClick(() => {
      this.answered = true;
      this.settle(true);
      this.close();
    });
  }
  onClose() {
    this.contentEl.empty();
    if (!this.answered) this.settle(false);
  }
};
function askDateConflict(app, startDate, dueDate) {
  return new Promise((resolve) => {
    new DateConflictModal(app, startDate, dueDate, resolve).open();
  });
}
function askDeleteTask(app, description) {
  return new Promise((resolve) => {
    new DeleteTaskModal(app, description, resolve).open();
  });
}

// src/modals/task-editor-modal.ts
var import_obsidian11 = require("obsidian");

// src/parser/task-writer.ts
var import_obsidian9 = require("obsidian");
var CHECKBOX_PREFIX = /^([ \t]*[-*][ \t]*\[[^\]]*\][ \t]*)/u;
var LEADING_INDENT = /^[ \t]*/u;
var TAG_TOKEN = /(?:^|\s)#[\p{L}\p{N}_/-]+/gu;
var PRIORITY_MARKERS2 = {
  ["critical" /* Critical */]: "\u{1F53A}",
  ["highest" /* Highest */]: "\u23EB",
  ["high" /* High */]: "\u{1F53C}",
  ["medium" /* Medium */]: "",
  ["low" /* Low */]: "\u{1F53D}",
  ["lowest" /* Lowest */]: "\u23EC",
  ["none" /* None */]: ""
};
function splitWithEol(content) {
  return {
    lines: content.split(/\r?\n/u),
    eols: content.match(/\r\n|\n/gu) ?? []
  };
}
function joinWithEol({ lines, eols }) {
  let result = lines[0] ?? "";
  for (let index = 1; index < lines.length; index += 1) {
    result += `${eols[index - 1] ?? "\n"}${lines[index]}`;
  }
  return result;
}
function removeLine(content, index) {
  content.lines.splice(index, 1);
  const eolIndex = index < content.eols.length ? index : content.eols.length - 1;
  content.eols.splice(eolIndex, 1);
}
function detectEol(content) {
  return content.includes("\r\n") ? "\r\n" : "\n";
}
function getIndent(line) {
  return LEADING_INDENT.exec(line)?.[0] ?? "";
}
function compactLine(line) {
  const indent = getIndent(line);
  const body = line.slice(indent.length).replace(/[ \t]{2,}/gu, " ").replace(/[ \t]+$/u, "");
  return `${indent}${body}`;
}
function appendLine(content, line) {
  if (content.length === 0) return `${line}${detectEol(content)}`;
  const separator = content.endsWith("\n") ? "" : detectEol(content);
  return `${content}${separator}${line}${detectEol(content)}`;
}
function getDateField(line, emoji) {
  const pattern = new RegExp(`${emoji}\\s*(\\d{4}-\\d{2}-\\d{2})`, "u");
  return pattern.exec(line)?.[1];
}
function removeTagToken(line, tag) {
  const name = tag.trim().replace(/^#+/u, "");
  if (name.length === 0) return line;
  const pattern = new RegExp(`(?:^|\\s)#${escapeRegExp(name)}(?![\\p{L}\\p{N}_/-])`, "giu");
  return line.replace(pattern, "");
}
function setTags(line, tags) {
  const indent = getIndent(line);
  const body = line.slice(indent.length).replace(TAG_TOKEN, "");
  const unique = [];
  const seen = /* @__PURE__ */ new Set();
  for (const tag of tags) {
    const name = tag.trim().replace(/^#+/u, "").toLowerCase();
    if (name.length === 0 || seen.has(name)) continue;
    seen.add(name);
    unique.push(name);
  }
  if (unique.length === 0) return compactLine(`${indent}${body}`);
  const rendered = unique.map((name) => `#${name}`).join(" ");
  return compactLine(`${indent}${body.trimEnd()} ${rendered}`);
}
function locateTaskLine(lines, task) {
  const preferred = task.lineNumber - 1;
  if (preferred >= 0 && preferred < lines.length && lines[preferred] === task.lineText) {
    return preferred;
  }
  const byExactText = lines.indexOf(task.lineText);
  if (byExactText !== -1) return byExactText;
  return lines.findIndex(
    (line) => CHECKBOX_PREFIX.test(line) && line.includes(task.description)
  );
}
async function editFileContent(app, file, transform) {
  let changed = false;
  await app.vault.process(file, (content) => {
    const next = transform(content);
    if (next === null || next === content) return content;
    changed = true;
    return next;
  });
  return changed;
}
async function editTaskLine(app, task, transform) {
  const target = app.vault.getAbstractFileByPath(task.filePath);
  if (!(target instanceof import_obsidian9.TFile)) {
    new import_obsidian9.Notice(t("\u627E\u4E0D\u5230\u6587\u4EF6\uFF1A{path}", { path: task.filePath }));
    return "missing";
  }
  let result = "missing";
  await editFileContent(app, target, (content) => {
    const split = splitWithEol(content);
    const index = locateTaskLine(split.lines, task);
    if (index === -1) return null;
    const next = transform(split.lines[index]);
    if (next === split.lines[index]) {
      result = "unchanged";
      return null;
    }
    if (next === null) removeLine(split, index);
    else split.lines[index] = next;
    result = "updated";
    return joinWithEol(split);
  });
  return result;
}
function replaceTaskDescription(line, description) {
  const prefixMatch = CHECKBOX_PREFIX.exec(line);
  if (!prefixMatch) return line;
  const prefix = prefixMatch[1];
  const rest = line.slice(prefix.length);
  const tokenPattern = new RegExp(INLINE_FIELD_TOKEN_SOURCE, "gu");
  const parts = [];
  let descriptionWritten = false;
  let cursor = 0;
  let match;
  while ((match = tokenPattern.exec(rest)) !== null) {
    if (rest.slice(cursor, match.index).trim() && !descriptionWritten) {
      parts.push(description);
      descriptionWritten = true;
    }
    parts.push(match[0]);
    cursor = match.index + match[0].length;
  }
  if (rest.slice(cursor).trim() && !descriptionWritten) {
    parts.push(description);
    descriptionWritten = true;
  }
  if (!descriptionWritten) parts.unshift(description);
  return `${prefix}${parts.join(" ")}`;
}
function setCheckboxMarker(line, marker) {
  const match = CHECKBOX_PREFIX.exec(line);
  if (match === null) return line;
  const prefix = match[1];
  return `${prefix.replace(/\[[^\]]*\]/u, `[${marker}]`)}${line.slice(prefix.length)}`;
}
function setPriority(line, priority) {
  const indent = getIndent(line);
  const body = line.slice(indent.length).replace(/⏫|🔼|🔽|⏬|🔺/gu, "");
  const marker = PRIORITY_MARKERS2[priority];
  if (!marker) return compactLine(`${indent}${body}`);
  const prefix = CHECKBOX_PREFIX.exec(body)?.[1];
  const withMarker = prefix ? body.replace(prefix, `${prefix}${marker} `) : `${marker} ${body}`;
  return compactLine(`${indent}${withMarker}`);
}
function setDateField(line, emoji, value) {
  const pattern = new RegExp(`\\s*${emoji}(?:\\s*\\d{4}-\\d{2}-\\d{2})?`, "gu");
  const stripped = line.replace(pattern, "");
  return value ? `${stripped} ${emoji} ${value}` : stripped;
}
function setIdentifierField(line, emoji, fieldName, value) {
  const stripped = line.replace(new RegExp(`\\s*${emoji}\\s*\\S+`, "gu"), "").replace(new RegExp(`\\b${fieldName}\\s*\\S+`, "giu"), "");
  return value ? `${stripped} ${emoji} ${value}` : stripped;
}
function setConflictTag(line, enabled) {
  const stripped = line.replace(/\s*#due-date-conflict\b/giu, "");
  return enabled ? `${stripped} #due-date-conflict` : stripped;
}
function insertLineUnderHeading(content, heading, line) {
  const split = splitWithEol(content);
  const { lines } = split;
  const headingPattern = new RegExp(`^${heading.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&")}$`, "u");
  const headingIndex = lines.findIndex((candidate) => headingPattern.test(candidate.trim()));
  if (headingIndex === -1) {
    return { success: false, error: t("\u627E\u4E0D\u5230\u6807\u9898\u300C{heading}\u300D", { heading }) };
  }
  const levelMatch = /^(#{1,6})/u.exec(lines[headingIndex]);
  if (!levelMatch) return { success: false, error: t("\u6807\u9898\u683C\u5F0F\u4E0D\u5408\u6CD5") };
  const level = levelMatch[1].length;
  let sectionEnd = headingIndex + 1;
  for (let index = headingIndex + 1; index < lines.length; index += 1) {
    const nextHeading = /^(#{1,6})\s/u.exec(lines[index]);
    if (nextHeading && nextHeading[1].length <= level) break;
    sectionEnd = index + 1;
  }
  let lastContentIndex = sectionEnd - 1;
  while (lastContentIndex > headingIndex && !lines[lastContentIndex].trim()) {
    lastContentIndex -= 1;
  }
  const insertIndex = lastContentIndex + 1;
  lines.splice(insertIndex, 0, line);
  split.eols.splice(insertIndex - 1, 0, detectEol(content));
  return { success: true, content: joinWithEol(split) };
}

// src/modals/tag-chips.ts
function hasTag(text, tag) {
  const name = tag.replace(/^#+/u, "").toLowerCase();
  return extractTags(text).some((entry) => entry.replace(/^#+/u, "") === name);
}
function addTagChips(host, options) {
  const chips = /* @__PURE__ */ new Map();
  if (options.suggestions.length === 0) {
    host.createSpan({ cls: "tm-tag-chips__empty", text: t("\u8FD8\u6CA1\u6709\u7528\u8FC7\u7684\u6807\u7B7E\uFF0C\u76F4\u63A5\u5728\u63CF\u8FF0\u91CC\u5199 #\u6807\u7B7E \u5373\u53EF\u3002") });
    return { refresh: () => void 0 };
  }
  for (const tag of options.suggestions) {
    const button = host.createEl("button", {
      cls: "tm-tag-chips__chip",
      text: tag,
      attr: { type: "button", "aria-pressed": "false" }
    });
    chips.set(tag, button);
    button.addEventListener("click", () => {
      const text = options.getText();
      options.setText(hasTag(text, tag) ? removeTagFromText(text, tag) : addTagToText(text, tag));
      refresh();
    });
  }
  function refresh() {
    const text = options.getText();
    for (const [tag, button] of chips) {
      const active = hasTag(text, tag);
      button.toggleClass("is-active", active);
      button.setAttribute("aria-pressed", String(active));
      button.setAttribute("title", active ? t("\u70B9\u4E00\u4E0B\u4ECE\u63CF\u8FF0\u91CC\u53BB\u6389") : t("\u70B9\u4E00\u4E0B\u52A0\u5230\u63CF\u8FF0\u91CC"));
    }
  }
  refresh();
  return { refresh };
}

// src/services/task-actions.ts
var import_obsidian10 = require("obsidian");
function notifyEditResult(result, task, message) {
  if (result === "missing") {
    new import_obsidian10.Notice(t("\u5728 {path}:{line} \u627E\u4E0D\u5230\u8BE5\u4EFB\u52A1\u884C", { path: task.filePath, line: task.lineNumber }));
    return;
  }
  if (result === "updated") new import_obsidian10.Notice(message);
}
function hasDateConflict(startDate, dueDate) {
  if (!startDate || !dueDate) return false;
  return startDate > dueDate;
}
async function toggleTaskStatus(app, settings, task) {
  const completionMarkers = settings.completionMarkers;
  const defaultCompleteMarker = completionMarkers[0] ?? "x";
  const trackCompletionDate = settings.trackCompletionDate;
  const today = todayIso();
  let wasCompleted = completionMarkers.includes(task.checkboxStatus.trim());
  const result = await editTaskLine(app, task, (line) => {
    const currentMarker = /\[([^\]]*)\]/u.exec(line)?.[1]?.trim() ?? "";
    wasCompleted = completionMarkers.includes(currentMarker);
    let next = setCheckboxMarker(line, wasCompleted ? " " : defaultCompleteMarker);
    if (trackCompletionDate) {
      next = wasCompleted ? next.replace(/\s*✅\s*\d{4}-\d{2}-\d{2}/u, "") : `${next} \u2705 ${today}`;
    }
    return next;
  });
  notifyEditResult(result, task, wasCompleted ? t("\u5DF2\u91CD\u65B0\u6253\u5F00") : t("\u4EFB\u52A1\u5DF2\u5B8C\u6210"));
}
async function cancelTask(app, settings, task) {
  const cancelledMarker = settings.cancelledMarkers[0] ?? "-";
  const result = await editTaskLine(app, task, (line) => setCheckboxMarker(line, cancelledMarker));
  notifyEditResult(result, task, t("\u4EFB\u52A1\u5DF2\u53D6\u6D88"));
}
async function startTask(app, settings, task) {
  const today = todayIso();
  const tag = gtdRulesOf(settings).inProgressTags[0] ?? "#doing";
  const result = await editTaskLine(app, task, (line) => {
    const withStartDate = line.includes("\u{1F6EB}") ? line : `${line} \u{1F6EB} ${today}`;
    return matchesAnyTag(withStartDate, [tag]) ? withStartDate : `${withStartDate} ${tag}`;
  });
  notifyEditResult(result, task, t("\u4EFB\u52A1\u5DF2\u5F00\u59CB"));
}
async function deleteTask(app, task) {
  const result = await editTaskLine(app, task, () => null);
  notifyEditResult(result, task, t("\u4EFB\u52A1\u5DF2\u5220\u9664"));
}
async function moveTaskToGtdState(app, settings, task, newState, resolveConflict) {
  const today = todayIso();
  const rules = gtdRulesOf(settings);
  const allStateTags = [...rules.waitingTags, ...rules.inProgressTags];
  const updates = {};
  let tagToAdd = "";
  let removeTags = [];
  let shouldComplete = false;
  switch (newState) {
    case "Waiting":
      tagToAdd = rules.waitingTags[0] ?? "";
      removeTags = [...rules.inProgressTags];
      break;
    case "In Progress":
      tagToAdd = rules.inProgressTags[0] ?? "";
      removeTags = [...rules.waitingTags];
      updates.startDate = today;
      break;
    case "To be Started":
      removeTags = [...allStateTags];
      break;
    case "Overdue":
      updates.dueDate = today;
      removeTags = [...rules.waitingTags];
      break;
    case "Done":
      shouldComplete = true;
      removeTags = [...allStateTags];
      break;
    case "Inbox":
      removeTags = [...allStateTags];
      updates.startDate = "";
      break;
  }
  const effectiveStart = updates.startDate ?? task.startDate;
  const effectiveDue = updates.dueDate ?? task.dueDate;
  let addConflictTag = false;
  if (hasDateConflict(effectiveStart, effectiveDue) && updates.startDate) {
    const choice = await resolveConflict(effectiveStart, effectiveDue);
    if (choice === "cancel") return;
    if (choice === "adjust-due") updates.dueDate = today;
    else addConflictTag = true;
  }
  if (task.gtdState === newState && updates.startDate === void 0 && updates.dueDate === void 0 && !shouldComplete && !addConflictTag) {
    return;
  }
  const completionMarker = settings.completionMarkers[0] ?? "x";
  const result = await editTaskLine(app, task, (line) => {
    const indent = getIndent(line);
    let body = line.slice(indent.length);
    for (const tag of removeTags) {
      body = removeTagToken(body, tag);
    }
    body = setConflictTag(body, false);
    if (tagToAdd && !body.toLowerCase().includes(tagToAdd.toLowerCase())) {
      body += ` ${tagToAdd}`;
    }
    if (addConflictTag) body = setConflictTag(body, true);
    if (shouldComplete) body = setCheckboxMarker(body, completionMarker);
    if (updates.startDate !== void 0) body = setDateField(body, "\u{1F6EB}", updates.startDate);
    if (updates.dueDate !== void 0) body = setDateField(body, "\u{1F4C5}", updates.dueDate);
    return compactLine(`${indent}${body}`);
  });
  if (result === "updated") new import_obsidian10.Notice(t("\u5DF2\u79FB\u52A8\u5230\u300C{state}\u300D", { state: newState }));
}
async function moveTaskToQuadrant(app, settings, task, newQuadrant) {
  if (task.quadrant === newQuadrant) return;
  const today = todayIso();
  const priority = settings.quadrantPriorities[newQuadrant] ?? "none" /* None */;
  const urgentSide = newQuadrant === "Q1" || newQuadrant === "Q3";
  const urgentDeadline = isoDateOffset(settings.urgentDaysRange - 1);
  const result = await editTaskLine(app, task, (line) => {
    const indent = getIndent(line);
    let body = setPriority(line.slice(indent.length), priority);
    const currentDue = getDateField(body, "\u{1F4C5}");
    if (urgentSide) {
      body = setDateField(body, "\u{1F4C5}", today);
    } else {
      if (currentDue !== void 0 && currentDue <= urgentDeadline) {
        body = setDateField(body, "\u{1F4C5}", "");
      }
    }
    return compactLine(`${indent}${body}`);
  });
  if (result === "updated") new import_obsidian10.Notice(t("\u5DF2\u79FB\u52A8\u5230 {quadrant}", { quadrant: newQuadrant }));
}

// src/modals/task-editor-modal.ts
var CONFLICT_TAG = "#due-date-conflict";
function sameTags(a, b) {
  const normalize = (list) => list.map((tag) => tag.replace(/^#+/u, "").toLowerCase()).sort().join("\n");
  return normalize(a) === normalize(b);
}
function oneLine(value) {
  return value.replace(/\s+/gu, " ").trim();
}
var TaskEditorModal = class extends import_obsidian11.Modal {
  constructor(host, task, defaults = {}) {
    super(host.app);
    this.host = host;
    this.task = task;
    this.defaults = defaults;
    this.isCreateMode = task === null;
  }
  onOpen() {
    this.contentEl.addClass("tm-modal");
    this.titleEl.setText(this.isCreateMode ? t("\u65B0\u5EFA\u4EFB\u52A1") : t("\u7F16\u8F91\u4EFB\u52A1"));
    const form = this.contentEl.createDiv({ cls: "tm-form" });
    const source = this.task;
    let description = this.isCreateMode ? (this.defaults.tags ?? []).join(" ") : source?.description ?? "";
    let priority = this.isCreateMode ? this.defaults.priority ?? "none" /* None */ : source?.priority ?? "none" /* None */;
    let startDate = this.isCreateMode ? this.defaults.startDate ?? "" : source?.startDate ?? "";
    let dueDate = this.isCreateMode ? this.defaults.dueDate ?? "" : source?.dueDate ?? "";
    let taskId = this.isCreateMode ? "" : source?.taskId ?? "";
    let dependsOn = this.isCreateMode ? "" : source?.dependsOn ?? "";
    let descriptionArea = null;
    const descriptionSetting = new import_obsidian11.Setting(form).setName(t("\u63CF\u8FF0")).setDesc(t("\u4EFB\u52A1\u5728\u7B14\u8BB0\u91CC\u53EA\u5360\u4E00\u884C\uFF0C\u6362\u884C\u4F1A\u88AB\u5E76\u6210\u4E00\u4E2A\u7A7A\u683C\u3002\u6807\u7B7E\u76F4\u63A5\u5199\u5728\u63CF\u8FF0\u91CC\uFF08\u5982 #\u5DE5\u4F5C\uFF09\uFF0C\u4E5F\u53EF\u4EE5\u70B9\u300C\u6807\u7B7E\u300D\u5C55\u5F00\u5019\u9009\u9009\u62E9\u3002"));
    descriptionSetting.settingEl.addClass("tm-form__row--stack");
    descriptionSetting.addTextArea((area) => {
      descriptionArea = area;
      area.setPlaceholder(t("\u4EFB\u52A1\u63CF\u8FF0"));
      area.setValue(description);
      area.inputEl.rows = 2;
      area.inputEl.addClass("tm-form__description");
      area.onChange((value) => {
        description = value;
        chips?.refresh();
      });
    });
    const tagMenu = form.createDiv({ cls: "tm-tag-menu" });
    const tagButton = tagMenu.createEl("button", {
      cls: "tm-btn tm-tag-menu__btn",
      text: t("\u6807\u7B7E"),
      attr: { type: "button", "aria-expanded": "false" }
    });
    tagButton.createSpan({ cls: "tm-tag-menu__chevron", text: "\u25BE" });
    const chipsHost = tagMenu.createDiv({ cls: "tm-tag-menu__panel" });
    const chips = addTagChips(chipsHost, {
      suggestions: this.knownTags(source),
      getText: () => descriptionArea?.inputEl.value ?? description,
      setText: (value) => {
        description = value;
        descriptionArea?.setValue(value);
      }
    });
    tagButton.addEventListener("click", () => {
      const open = !tagMenu.hasClass("is-open");
      tagMenu.toggleClass("is-open", open);
      tagButton.setAttribute("aria-expanded", String(open));
    });
    new import_obsidian11.Setting(form).setName(t("\u4F18\u5148\u7EA7")).addDropdown((dropdown) => {
      for (const level of [
        "none" /* None */,
        "lowest" /* Lowest */,
        "low" /* Low */,
        "medium" /* Medium */,
        "high" /* High */,
        "highest" /* Highest */,
        "critical" /* Critical */
      ]) {
        dropdown.addOption(level, priorityLabel(level));
      }
      dropdown.setValue(priority).onChange((value) => {
        priority = value;
      });
    });
    new import_obsidian11.Setting(form).setName(t("\u5F00\u59CB\u65E5\u671F")).addText((text) => {
      text.inputEl.type = "date";
      text.setValue(startDate).onChange((value) => {
        startDate = value;
      });
    });
    new import_obsidian11.Setting(form).setName(t("\u622A\u6B62\u65E5\u671F")).addText((text) => {
      text.inputEl.type = "date";
      text.setValue(dueDate).onChange((value) => {
        dueDate = value;
      });
    });
    let idText = null;
    new import_obsidian11.Setting(form).setName(t("\u4EFB\u52A1 ID")).setDesc(t("\u7528\u4E8E\u88AB\u5176\u4ED6\u4EFB\u52A1\u4F9D\u8D56")).addText((text) => {
      idText = text;
      text.setValue(taskId).onChange((value) => {
        taskId = value.trim();
      });
    }).addButton(
      (button) => button.setButtonText("\u{1F3B2}").setTooltip(t("\u968F\u673A\u751F\u6210 ID")).onClick(() => {
        taskId = generateShortId();
        idText?.setValue(taskId);
      })
    );
    new import_obsidian11.Setting(form).setName(t("\u4F9D\u8D56\u4EFB\u52A1")).addDropdown((dropdown) => {
      dropdown.addOption("", t("\u4E0D\u4F9D\u8D56"));
      for (const [id, label] of this.dependencyOptions(source?.taskId ?? "")) {
        dropdown.addOption(id, label);
      }
      dropdown.setValue(dependsOn).onChange((value) => {
        dependsOn = value;
      });
    });
    const buttons = this.contentEl.createDiv({ cls: "tm-modal__buttons" });
    new import_obsidian11.Setting(buttons).addButton((button) => button.setButtonText(t("\u53D6\u6D88")).onClick(() => this.close())).addButton(
      (button) => button.setButtonText(this.isCreateMode ? t("\u521B\u5EFA") : t("\u4FDD\u5B58")).setCta().onClick(() => {
        void this.submit({
          description,
          priority,
          startDate,
          dueDate,
          taskId,
          dependsOn
        });
      })
    );
  }
  onClose() {
    this.contentEl.empty();
  }
  /**
   * 标签候选：**这篇任务自己的标签**排最前（能一眼看到、也点得掉），
   * 后面接库里用得最多的那些。
   *
   * 只列库里**真正出现过**的标签，不预置、不猜：手打最容易打出「工作」与「工作项」
   * 这种并存变体，之后按标签筛就是两拨。截断到 40 个是有意的 ——
   * 候选排的价值在于「常用的那几个一眼就在」，把几百个标签全铺出来反而要翻长尾。
   */
  knownTags(source) {
    const counts = /* @__PURE__ */ new Map();
    for (const task of this.host.tasks) {
      for (const tag of task.tags) {
        if (tag === CONFLICT_TAG) continue;
        const name = tag.replace(/^#+/u, "").toLowerCase();
        if (name.length === 0) continue;
        counts.set(name, (counts.get(name) ?? 0) + 1);
      }
    }
    const own = (source?.tags ?? []).filter((tag) => tag !== CONFLICT_TAG).map((tag) => tag.replace(/^#+/u, "").toLowerCase());
    const popular = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([name]) => name);
    const ordered = [.../* @__PURE__ */ new Set([...own, ...popular])].slice(0, 40);
    return ordered.map((name) => `#${name}`);
  }
  /** 依赖候选：未完成、有 ID、且不是自己；按截止日由近到远 */
  dependencyOptions(selfId) {
    const options = [];
    const seen = /* @__PURE__ */ new Set();
    const candidates = this.host.tasks.filter(
      (task) => task.displayStatus !== "completed" && task.displayStatus !== "cancelled" && Boolean(task.taskId) && task.taskId !== selfId
    ).sort((a, b) => (a.dueDate ?? "9999-99-99").localeCompare(b.dueDate ?? "9999-99-99"));
    for (const candidate of candidates) {
      const id = candidate.taskId;
      if (id === void 0 || seen.has(id)) continue;
      seen.add(id);
      const due = candidate.dueDate ? t("\uFF08\u622A\u6B62 {date}\uFF09", { date: candidate.dueDate }) : "";
      options.push([id, `${id}${due}\uFF1A${candidate.description.slice(0, 40)}`]);
    }
    return options;
  }
  // ────────────────────────────── 提交 ──────────────────────────────
  async submit(updates) {
    const startDate = updates.startDate ?? "";
    const dueDate = updates.dueDate ?? "";
    if (hasDateConflict(startDate, dueDate)) {
      const choice = await askDateConflict(this.host.app, startDate, dueDate);
      if (choice === "cancel") return;
      if (choice === "adjust-due") {
        updates.dueDate = todayIso();
        new import_obsidian11.Notice(t("\u5DF2\u628A\u622A\u6B62\u65E5\u671F\u8C03\u6574\u4E3A\u4ECA\u5929"));
      } else {
        updates.conflictTag = true;
      }
    }
    const saved = this.isCreateMode ? await this.createTask(updates) : await this.saveTask(updates);
    if (!saved) return;
    this.host.onSaved();
    this.close();
  }
  async createTask(updates) {
    const text = oneLine(updates.description ?? "");
    const tags = extractTags(text);
    const name = stripTags(text);
    if (name.length === 0) {
      new import_obsidian11.Notice(t("\u8BF7\u586B\u5199\u4EFB\u52A1\u63CF\u8FF0"));
      return false;
    }
    const target = await this.resolveTargetFile();
    if (target === null) return false;
    let line = `- [ ] ${name}`;
    if (updates.priority !== void 0 && updates.priority !== "none" /* None */) {
      line = setPriority(line, updates.priority);
    }
    if (updates.dueDate) line = setDateField(line, "\u{1F4C5}", updates.dueDate);
    if (updates.startDate) line = setDateField(line, "\u{1F6EB}", updates.startDate);
    if (updates.taskId) line = setIdentifierField(line, "\u{1F194}", "id::", updates.taskId);
    if (updates.dependsOn) line = setIdentifierField(line, "\u26D4", "dependsOn::", updates.dependsOn);
    const stateTag = this.defaults.gtdState === "Waiting" ? "#waiting" : this.defaults.gtdState === "In Progress" ? "#doing" : "";
    const merged = [...tags, ...stateTag.length > 0 ? [stateTag] : []];
    if (merged.length > 0) line = setTags(line, merged);
    if (updates.conflictTag === true) line += ` ${CONFLICT_TAG}`;
    const heading = this.host.settings.newTaskTargetHeading;
    let failure;
    if (heading.length > 0) {
      const inserted = await editFileContent(this.host.app, target, (content) => {
        const result = insertLineUnderHeading(content, heading, line);
        if (!result.success) {
          failure = result.error;
          return null;
        }
        return result.content ?? null;
      });
      if (!inserted && failure !== void 0) {
        new import_obsidian11.Notice(t("\u65E0\u6CD5\u6DFB\u52A0\u4EFB\u52A1\uFF1A{reason}", { reason: failure }));
        return false;
      }
    } else {
      await editFileContent(this.host.app, target, (content) => appendLine(content, line));
    }
    new import_obsidian11.Notice(t("\u5DF2\u6DFB\u52A0\u5230 {path}", { path: target.path }));
    return true;
  }
  /**
   * 落点笔记：配了路径模板就用它（**不存在时按模板新建**），没配就用当前打开的笔记。
   *
   * 「当日日志还没写」是常态而不是异常，所以这里走的是「缺了就建」，
   * 而不是提示用户先自己去建一篇 —— 新建任务本来就该是一步的事。
   */
  async resolveTargetFile() {
    const explicit = this.isCreateMode ? this.defaults.filePath : void 0;
    if (explicit !== void 0 && explicit.length > 0) {
      const file = this.host.app.vault.getAbstractFileByPath(explicit);
      if (file instanceof import_obsidian11.TFile) return file;
    }
    const { newTaskTargetPath, newTaskTemplatePath } = this.host.settings;
    if (newTaskTargetPath.length > 0) {
      const path = resolvePlaceholders(newTaskTargetPath);
      try {
        return await ensureNote(this.host.app, path, { templatePath: newTaskTemplatePath });
      } catch {
        new import_obsidian11.Notice(t("\u65E0\u6CD5\u521B\u5EFA\u76EE\u6807\u7B14\u8BB0\uFF1A{path}", { path }));
        return null;
      }
    }
    const active = this.host.app.workspace.getActiveFile();
    if (active === null || active.extension !== "md") {
      new import_obsidian11.Notice(t("\u8BF7\u5148\u5728\u8BBE\u7F6E\u91CC\u6307\u5B9A\u76EE\u6807\u7B14\u8BB0\uFF0C\u6216\u6253\u5F00\u4E00\u4E2A Markdown \u6587\u4EF6"));
      return null;
    }
    return active;
  }
  async saveTask(updates) {
    const task = this.task;
    if (task === null) return false;
    const text = oneLine(updates.description ?? "");
    const tags = extractTags(text);
    const name = stripTags(text);
    if (name.length === 0) {
      new import_obsidian11.Notice(t("\u8BF7\u586B\u5199\u4EFB\u52A1\u63CF\u8FF0"));
      return false;
    }
    const currentName = stripTags(task.description);
    const result = await editTaskLine(this.host.app, task, (line) => {
      let next = line;
      if (name !== currentName) next = replaceTaskDescription(next, name);
      if (!sameTags(tags, task.tags)) {
        const keepConflict = new RegExp(`${CONFLICT_TAG}\\b`, "iu").test(next);
        next = setTags(next, keepConflict ? [...tags, CONFLICT_TAG] : tags);
      }
      if (updates.priority !== void 0 && updates.priority !== task.priority) {
        next = setPriority(next, updates.priority);
      }
      if (updates.dueDate !== void 0 && updates.dueDate !== (task.dueDate ?? "")) {
        next = setDateField(next, "\u{1F4C5}", updates.dueDate);
      }
      if (updates.startDate !== void 0 && updates.startDate !== (task.startDate ?? "")) {
        next = setDateField(next, "\u{1F6EB}", updates.startDate);
      }
      if (updates.taskId !== void 0 && updates.taskId !== (task.taskId ?? "")) {
        next = setIdentifierField(next, "\u{1F194}", "id::", updates.taskId);
      }
      if (updates.dependsOn !== void 0 && updates.dependsOn !== (task.dependsOn ?? "")) {
        next = setIdentifierField(next, "\u26D4", "dependsOn::", updates.dependsOn);
      }
      if (updates.conflictTag === true && !/#due-date-conflict\b/iu.test(next)) {
        next = `${next} #due-date-conflict`;
      }
      if (next === line) return line;
      return compactLine(next);
    });
    if (result === "missing") {
      new import_obsidian11.Notice(t("\u5728 {path}:{line} \u627E\u4E0D\u5230\u8BE5\u4EFB\u52A1\u884C", { path: task.filePath, line: task.lineNumber }));
      return false;
    }
    if (result === "updated") new import_obsidian11.Notice(t("\u4EFB\u52A1\u5DF2\u66F4\u65B0"));
    return true;
  }
};

// src/services/calendar-service.ts
function calendarItemLabel(type) {
  switch (type) {
    case "due":
      return t("\u622A\u6B62");
    case "start":
      return t("\u5F00\u59CB");
    case "scheduled":
      return t("\u8BA1\u5212");
    case "done":
      return t("\u5B8C\u6210");
    case "overdue":
      return t("\u903E\u671F");
    default:
      return t("\u8FDB\u884C\u4E2D");
  }
}
function calendarModeLabel(mode) {
  switch (mode) {
    case "week":
      return t("\u5468");
    case "list":
      return t("\u5217\u8868");
    default:
      return t("\u6708");
  }
}
function weekdayLabel(weekday) {
  switch (weekday) {
    case 0:
      return t("\u5468\u65E5");
    case 1:
      return t("\u5468\u4E00");
    case 2:
      return t("\u5468\u4E8C");
    case 3:
      return t("\u5468\u4E09");
    case 4:
      return t("\u5468\u56DB");
    case 5:
      return t("\u5468\u4E94");
    default:
      return t("\u5468\u516D");
  }
}
function localeTag() {
  return getLocale() === "zh" ? "zh-CN" : "en-US";
}
function calendarTitle(anchor, mode, firstDay) {
  const tag = localeTag();
  if (mode === "week") {
    const from = startOfWeek(anchor, firstDay);
    const to = addDays(from, 6);
    const sameYear = from.getFullYear() === to.getFullYear();
    const fromLabel = from.toLocaleDateString(tag, {
      year: sameYear ? void 0 : "numeric",
      month: "short",
      day: "numeric"
    });
    const toLabel = to.toLocaleDateString(tag, { year: "numeric", month: "short", day: "numeric" });
    return `${fromLabel} \u2013 ${toLabel}`;
  }
  return anchor.toLocaleDateString(tag, { year: "numeric", month: "long" });
}
function isInCalendarRange(dateIso, mode, anchor, firstDay) {
  const check = dateIso ? parseIso(dateIso) : null;
  if (check === null) return false;
  check.setHours(0, 0, 0, 0);
  if (mode === "week") {
    const from = startOfWeek(anchor, firstDay);
    const to = addDays(from, 6);
    return check >= from && check <= to;
  }
  const monthStart = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const monthEnd = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0);
  monthEnd.setHours(23, 59, 59, 999);
  return check >= monthStart && check <= monthEnd;
}
function monthGridDates(anchor, firstDay, showWeekends) {
  const monthStart = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const monthEnd = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0);
  const cursor = startOfWeek(monthStart, firstDay);
  const renderEnd = addDays(startOfWeek(monthEnd, firstDay), 6);
  const dates = [];
  for (let day = new Date(cursor); day <= renderEnd; day = addDays(day, 1)) {
    if (!showWeekends && isWeekend(day.getDay())) continue;
    dates.push(new Date(day));
  }
  return dates;
}
function weekDates(anchor, firstDay, showWeekends) {
  const from = startOfWeek(anchor, firstDay);
  const dates = [];
  for (let index = 0; index < 7; index += 1) {
    const day = addDays(from, index);
    if (!showWeekends && isWeekend(day.getDay())) continue;
    dates.push(day);
  }
  return dates;
}
function monthDates(anchor) {
  const monthStart = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const monthEnd = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0);
  const dates = [];
  for (let day = new Date(monthStart); day <= monthEnd; day = addDays(day, 1)) {
    dates.push(new Date(day));
  }
  return dates;
}
function extractDailyNoteDate(filePath) {
  return /(\d{4}-\d{2}-\d{2})/u.exec(filePath)?.[1];
}
function collectCalendarItems(tasks, options) {
  const byDate = {};
  const today = todayIso();
  const push = (dateKey, task, type) => {
    if (!byDate[dateKey]) byDate[dateKey] = [];
    byDate[dateKey].push({ task, type });
  };
  for (const task of tasks) {
    if (task.displayStatus === "completed") {
      if (task.doneDate) push(task.doneDate, task, "done");
      else if (task.dueDate) push(task.dueDate, task, "done");
      continue;
    }
    if (task.dueDate) {
      push(task.dueDate, task, task.displayStatus === "overdue" ? "overdue" : "due");
    }
    if (task.startDate && task.startDate !== task.dueDate) push(task.startDate, task, "start");
    if (task.scheduledDate) push(task.scheduledDate, task, "scheduled");
    if (task.displayStatus === "overdue" && task.dueDate && task.dueDate < today) {
      push(today, task, "overdue");
    }
    if (options.showInProcessTasks && task.displayStatus !== "cancelled" && task.startDate && task.dueDate && task.startDate < task.dueDate) {
      const start = parseIso(task.startDate);
      if (start !== null) {
        for (let day = addDays(start, 1); formatIso(day) < task.dueDate; day = addDays(day, 1)) {
          push(formatIso(day), task, "process");
        }
      }
    }
  }
  return byDate;
}
function buildCalendarSummary(tasks, mode, anchor, settings) {
  const today = todayIso();
  const inScope = (dateIso) => isInCalendarRange(dateIso, mode, anchor, settings.calendarFirstDayOfWeek);
  const scoped = tasks.filter((task) => [task.dueDate, task.startDate, task.scheduledDate, task.doneDate, extractDailyNoteDate(task.filePath)].some((date) => inScope(date)));
  const unique = new Map(scoped.map((task) => [task.id, task]));
  const values = [...unique.values()];
  const isDone = (task) => settings.completionMarkers.includes(task.checkboxStatus.trim());
  const isCancelled = (task) => settings.cancelledMarkers.includes(task.checkboxStatus.trim());
  const active = values.filter(
    (task) => !isDone(task) && !isCancelled(task) && task.displayStatus !== "completed" && task.displayStatus !== "cancelled"
  );
  return {
    total: values.length,
    done: values.filter((task) => task.displayStatus === "completed").length,
    due: active.filter((task) => Boolean(task.dueDate) && inScope(task.dueDate)).length,
    overdue: active.filter((task) => task.displayStatus === "overdue" && Boolean(task.dueDate) && task.dueDate < today).length,
    start: active.filter((task) => Boolean(task.startDate) && inScope(task.startDate)).length,
    scheduled: active.filter((task) => Boolean(task.scheduledDate) && inScope(task.scheduledDate)).length,
    recurrence: active.filter((task) => Boolean(task.recurrence)).length,
    dailyNotes: values.filter((task) => {
      const dailyDate = extractDailyNoteDate(task.filePath);
      return Boolean(dailyDate && inScope(dailyDate) && !task.dueDate && !task.startDate && !task.scheduledDate);
    }).length
  };
}

// src/panels/tooltip.ts
var OFFSET = 8;
var HoverTooltip = class {
  constructor() {
    this.el = null;
    this.doc = null;
  }
  show(anchor, lines) {
    if (lines.length === 0) return;
    const el = this.ensureElement(anchor.ownerDocument);
    el.empty();
    for (const line of lines) {
      el.createDiv({ cls: line.muted === true ? "tm-tooltip__line is-muted" : "tm-tooltip__line", text: line.text });
    }
    el.removeClass("is-hidden");
    this.position(el, anchor);
  }
  hide() {
    this.el?.addClass("is-hidden");
  }
  /** 视图关闭时调用：提示元素挂在 document 上，不清理就会留一个孤儿节点 */
  destroy() {
    this.el?.remove();
    this.el = null;
    this.doc = null;
  }
  ensureElement(doc) {
    if (this.el !== null && this.doc === doc) return this.el;
    this.destroy();
    this.doc = doc;
    this.el = doc.body.createDiv({ cls: "tm-tooltip is-hidden" });
    return this.el;
  }
  /** 默认贴在锚点上方；上方放不下就翻到下方，并夹在视口内 */
  position(el, anchor) {
    const win = anchor.ownerDocument.defaultView;
    const anchorRect = anchor.getBoundingClientRect();
    const ownRect = el.getBoundingClientRect();
    const viewportWidth = win?.innerWidth ?? 0;
    const viewportHeight = win?.innerHeight ?? 0;
    let top = anchorRect.top - ownRect.height - OFFSET;
    if (top < OFFSET) top = anchorRect.bottom + OFFSET;
    top = Math.min(top, Math.max(OFFSET, viewportHeight - ownRect.height - OFFSET));
    let left = anchorRect.left;
    if (left + ownRect.width > viewportWidth - OFFSET) {
      left = Math.max(OFFSET, viewportWidth - ownRect.width - OFFSET);
    }
    el.style.top = `${Math.round(top)}px`;
    el.style.left = `${Math.round(left)}px`;
  }
};

// src/panels/calendar-board.ts
var MAX_ITEMS_PER_DAY = 4;
var CalendarBoard = class {
  constructor(host, callbacks) {
    this.host = host;
    this.callbacks = callbacks;
    this.tooltip = new HoverTooltip();
    this.host.addClass("tm-calendar");
  }
  /** 视图关闭时调用：提示元素挂在 document 上，不清理会留下孤儿节点 */
  destroy() {
    this.tooltip.destroy();
  }
  /**
   * 收起悬停提示。切走日历（工作区页签切换、本视图换模式）时鼠标往往
   * 没离开条目，mouseleave 不会触发，由宿主视图在这些时机显式调用。
   */
  hideHover() {
    this.tooltip.hide();
  }
  render(options) {
    this.host.empty();
    this.tooltip.hide();
    this.renderToolbar(options);
    switch (options.mode) {
      case "week":
        this.renderWeek(options);
        return;
      case "list":
        this.renderList(options);
        return;
      default:
        this.renderMonth(options);
    }
  }
  renderToolbar(options) {
    const bar = this.host.createDiv({ cls: "tm-calendar__toolbar" });
    const modes = bar.createDiv({ cls: "tm-calendar__modes" });
    for (const mode of ["list", "month", "week"]) {
      const button = modes.createEl("button", {
        cls: `tm-calendar__mode${options.mode === mode ? " is-active" : ""}`,
        text: calendarModeLabel(mode),
        attr: { type: "button" }
      });
      button.addEventListener("click", () => this.callbacks.onModeChange(mode));
    }
    const nav = bar.createDiv({ cls: "tm-calendar__nav" });
    const prev = nav.createEl("button", { cls: "tm-calendar__nav-btn", text: "\u2190", attr: { type: "button" } });
    nav.createDiv({
      cls: "tm-calendar__title",
      text: calendarTitle(options.anchor, options.mode, options.settings.calendarFirstDayOfWeek)
    });
    const today = nav.createEl("button", { cls: "tm-calendar__nav-btn", text: t("\u4ECA\u5929"), attr: { type: "button" } });
    const next = nav.createEl("button", { cls: "tm-calendar__nav-btn", text: "\u2192", attr: { type: "button" } });
    prev.addEventListener("click", () => this.callbacks.onShift(-1));
    next.addEventListener("click", () => this.callbacks.onShift(1));
    today.addEventListener("click", () => this.callbacks.onToday());
    const summaryBtn = nav.createEl("button", {
      cls: `tm-calendar__nav-btn${options.summaryOpen ? " is-active" : ""}`,
      text: t("\u6C47\u603B"),
      attr: { type: "button" }
    });
    summaryBtn.addEventListener("click", () => this.callbacks.onToggleSummary());
    if (options.summaryOpen) this.renderSummary(bar, options.summary);
  }
  renderSummary(parent, summary) {
    const popup = parent.createDiv({ cls: "tm-calendar__summary" });
    const list = popup.createEl("ul");
    const rows = [
      ["\u2705", t("\u5DF2\u5B8C\u6210\uFF1A{done}/{total}", { done: summary.done, total: summary.total })],
      ["\u{1F4C5}", t("\u622A\u6B62\uFF1A{count}", { count: summary.due })],
      ["\u26A0\uFE0F", t("\u903E\u671F\uFF1A{count}", { count: summary.overdue })],
      ["\u{1F6EB}", t("\u5F00\u59CB\uFF1A{count}", { count: summary.start })],
      ["\u23F3", t("\u8BA1\u5212\uFF1A{count}", { count: summary.scheduled })],
      ["\u{1F501}", t("\u91CD\u590D\uFF1A{count}", { count: summary.recurrence })],
      ["\u{1F4DD}", t("\u65E5\u8BB0\uFF1A{count}", { count: summary.dailyNotes })]
    ];
    for (const [icon, text] of rows) {
      list.createEl("li", { text: `${icon} ${text}` });
    }
  }
  // ────────────────────────────── 月视图 ──────────────────────────────
  renderMonth(options) {
    const showWeekends = options.settings.showCalendarMonthWeekends;
    const visibleWeekdays = weekdayOrder(options.settings.calendarFirstDayOfWeek).filter((weekday) => showWeekends || !isWeekend(weekday));
    const wrap = this.host.createDiv({ cls: "tm-calendar__month" });
    if (!showWeekends) wrap.addClass("is-workweek");
    const heads = wrap.createDiv({ cls: "tm-calendar__heads" });
    for (const weekday of visibleWeekdays) {
      heads.createEl("div", {
        cls: `tm-calendar__head${isWeekend(weekday) ? " is-weekend" : ""}`,
        text: weekdayLabel(weekday)
      });
    }
    const grid = wrap.createDiv({ cls: "tm-calendar__grid" });
    const month = options.anchor.getMonth();
    for (const date of monthGridDates(options.anchor, options.settings.calendarFirstDayOfWeek, showWeekends)) {
      const iso = formatIso(date);
      const classes = ["tm-calendar__day"];
      if (isWeekend(date.getDay())) classes.push("is-weekend");
      if (date.getMonth() !== month) classes.push("is-outside");
      if (iso === options.today) classes.push("is-today");
      const dayEl = grid.createDiv({ cls: classes.join(" ") });
      dayEl.createDiv({ cls: "tm-calendar__date", text: String(date.getDate()) });
      const items = dayEl.createDiv({ cls: "tm-calendar__items" });
      const entries = options.itemsByDate[iso] ?? [];
      for (const entry of entries.slice(0, MAX_ITEMS_PER_DAY)) {
        this.renderItem(items, entry);
      }
      if (entries.length > MAX_ITEMS_PER_DAY) {
        items.createDiv({
          cls: "tm-calendar__more",
          text: t("\u8FD8\u6709 {count} \u9879", { count: entries.length - MAX_ITEMS_PER_DAY })
        });
      }
    }
  }
  // ────────────────────────────── 周视图 ──────────────────────────────
  renderWeek(options) {
    const showWeekends = options.settings.showCalendarWeekends;
    const wrap = this.host.createDiv({ cls: "tm-calendar__week" });
    const weekends = [];
    const weekdays = [];
    for (const date of weekDates(options.anchor, options.settings.calendarFirstDayOfWeek, true)) {
      (isWeekend(date.getDay()) ? weekends : weekdays).push(date);
    }
    const main = wrap.createDiv({ cls: "tm-calendar__week-main" });
    for (const date of weekdays) this.renderDayCard(main, date, options);
    if (!showWeekends) return;
    const aside = wrap.createDiv({ cls: "tm-calendar__weekend" });
    for (const date of weekends) this.renderDayCard(aside, date, options);
  }
  renderDayCard(host, date, options) {
    const iso = formatIso(date);
    const classes = ["tm-calendar__day", "tm-calendar__day--card"];
    if (isWeekend(date.getDay())) classes.push("is-weekend");
    if (iso === options.today) classes.push("is-today");
    const dayEl = host.createDiv({ cls: classes.join(" ") });
    dayEl.createDiv({
      cls: "tm-calendar__date",
      text: `${weekdayLabel(date.getDay())} ${date.getDate()}`
    });
    const items = dayEl.createDiv({ cls: "tm-calendar__items" });
    for (const entry of options.itemsByDate[iso] ?? []) {
      this.renderItem(items, entry);
    }
  }
  // ────────────────────────────── 列表视图 ──────────────────────────────
  renderList(options) {
    const list = this.host.createDiv({ cls: "tm-calendar__list" });
    const showEmptyDays = options.settings.calendarListShowFullMonth;
    for (const date of monthDates(options.anchor)) {
      const iso = formatIso(date);
      const entries = options.itemsByDate[iso] ?? [];
      if (!showEmptyDays && entries.length === 0) continue;
      const details = list.createEl("details", {
        cls: `tm-calendar__list-day${iso === options.today ? " is-today" : ""}`
      });
      if (iso === options.today) details.open = true;
      details.createEl("summary", {
        text: `${date.toLocaleDateString(void 0, { month: "short", day: "numeric", weekday: "short" })} (${entries.length})`
      });
      const body = details.createDiv({ cls: "tm-calendar__list-body" });
      if (entries.length === 0) {
        body.createDiv({ cls: "tm-calendar__item", text: t("\u65E0\u4EFB\u52A1") });
        continue;
      }
      for (const entry of entries) this.renderItem(body, entry);
    }
  }
  // ────────────────────────────── 条目 ──────────────────────────────
  renderItem(host, entry) {
    const { task, type } = entry;
    const linkTarget = task.sectionHeading ? `${task.filePath}#${task.sectionHeading}` : task.filePath;
    const item = host.createEl("a", {
      cls: `tm-calendar__item is-${type} internal-link`,
      text: `${calendarItemLabel(type)} ${task.description}`
    });
    item.setAttribute("href", linkTarget);
    item.setAttribute("data-href", linkTarget);
    item.addEventListener("mouseenter", () => {
      this.tooltip.show(item, [
        { text: `${calendarItemLabel(type)} \xB7 ${task.description}` },
        { text: `${task.filePath}:${task.lineNumber}`, muted: true }
      ]);
    });
    item.addEventListener("mouseleave", () => this.tooltip.hide());
    item.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.tooltip.hide();
      this.callbacks.onOpenTask(task);
    });
  }
};

// src/panels/filter-bar.ts
var SEARCH_DEBOUNCE_MS = 300;
var FilterBar = class {
  constructor(component, host, deps) {
    this.component = component;
    this.host = host;
    this.deps = deps;
    this.chipsEl = null;
    this.markerGroupEl = null;
    this.markerChipsEl = null;
    this.searchInput = null;
    this.presetSelect = null;
    this.sortSelect = null;
    this.countEl = null;
    this.clearBtn = null;
    this.searchTimer = null;
    this.dateControls = /* @__PURE__ */ new Map();
    this.host.addClass("tm-filter-bar");
    this.build();
    this.component.register(() => this.clearSearchTimer());
  }
  build() {
    this.buildStatusGroup();
    this.buildMarkerGroup();
    this.buildSearchGroup();
    this.dateControls.set("start", this.buildDateGroup("start"));
    this.dateControls.set("due", this.buildDateGroup("due"));
    this.buildSortGroup();
    this.buildSummary();
    this.update();
  }
  buildStatusGroup() {
    const group = this.host.createDiv({ cls: "tm-filter-group tm-filter-group--status" });
    group.createEl("label", { cls: "tm-filter-label", text: t("\u72B6\u6001") });
    const preset = group.createEl("select", {
      cls: "dropdown tm-filter-select",
      attr: { "aria-label": t("\u72B6\u6001\u9884\u8BBE") }
    });
    this.presetSelect = preset;
    for (const value of ["active-only", "hide-cancelled", "all"]) {
      preset.createEl("option", { value, text: statusPresetLabel(value) });
    }
    this.component.registerDomEvent(preset, "change", () => {
      this.deps.setStatuses(presetToStatuses(preset.value));
    });
    this.chipsEl = group.createDiv({ cls: "tm-chips" });
  }
  /**
   * 标记筛选：按方括号里的原始内容筛（`- [x]` 的 x、`- [-]` 的 -、未勾选的空）。
   *
   * 候选从**数据里实际出现过的标记**生成，而不是把设置里的配置列一遍：
   * 配置了却一个都没用到的标记，做成 chip 只会点了没反应。
   */
  buildMarkerGroup() {
    const group = this.host.createDiv({ cls: "tm-filter-group tm-filter-group--marker" });
    this.markerGroupEl = group;
    group.createEl("label", { cls: "tm-filter-label", text: t("\u6807\u8BB0") });
    this.markerChipsEl = group.createDiv({ cls: "tm-chips tm-chips--marker" });
  }
  buildSearchGroup() {
    const group = this.host.createDiv({ cls: "tm-filter-group tm-filter-group--search" });
    group.createEl("label", { cls: "tm-filter-label", text: t("\u641C\u7D22") });
    const input = group.createEl("input", {
      cls: "tm-filter-input",
      attr: { type: "search", placeholder: t("\u4EFB\u52A1\u63CF\u8FF0\u3001\u6587\u4EF6\u3001ID") }
    });
    this.searchInput = input;
    this.component.registerDomEvent(input, "input", () => this.scheduleSearch(input.value));
    this.component.registerDomEvent(input, "keydown", (evt) => {
      if (evt.key !== "Enter") return;
      evt.preventDefault();
      this.clearSearchTimer();
      this.deps.setSearch(input.value);
    });
  }
  /**
   * 日期区间：预设下拉 + **常显**的起止输入框。
   *
   * 常显而不是藏在某个模式里：选「本月」时也该看到具体是哪几天；
   * 手改任一端即自动切到「自定义区间」，不必先切模式再选日期。
   */
  buildDateGroup(field) {
    const group = this.host.createDiv({ cls: `tm-filter-group tm-filter-group--${field}` });
    group.createEl("label", { cls: "tm-filter-label", text: field === "start" ? t("\u5F00\u59CB\u65E5\u671F") : t("\u622A\u6B62\u65E5\u671F") });
    const select = group.createEl("select", {
      cls: "dropdown tm-filter-select",
      attr: { "aria-label": field === "start" ? t("\u6309\u5F00\u59CB\u65E5\u671F\u7B5B\u9009") : t("\u6309\u622A\u6B62\u65E5\u671F\u7B5B\u9009") }
    });
    for (const preset of DATE_PRESETS) {
      select.createEl("option", { value: preset, text: datePresetLabel(preset) });
    }
    const row = group.createDiv({ cls: "tm-date-range" });
    const from = row.createEl("input", {
      cls: "tm-filter-input tm-filter-input--date",
      attr: { type: "date", "aria-label": t("\u533A\u95F4\u8D77\u59CB\u65E5\u671F") }
    });
    row.createSpan({ cls: "tm-date-sep", text: "~" });
    const to = row.createEl("input", {
      cls: "tm-filter-input tm-filter-input--date",
      attr: { type: "date", "aria-label": t("\u533A\u95F4\u7ED3\u675F\u65E5\u671F") }
    });
    const commit = (preset) => {
      const range = {
        preset,
        start: from.value === "" ? null : from.value,
        end: to.value === "" ? null : to.value
      };
      if (field === "start") this.deps.setStartDate(range);
      else this.deps.setDueDate(range);
    };
    this.component.registerDomEvent(select, "change", () => commit(select.value));
    for (const input of [from, to]) {
      this.component.registerDomEvent(input, "change", () => commit("custom"));
    }
    return { group, select, from, to };
  }
  buildSortGroup() {
    const group = this.host.createDiv({ cls: "tm-filter-group tm-filter-group--sort" });
    group.createEl("label", { cls: "tm-filter-label", text: t("\u6392\u5E8F") });
    const select = group.createEl("select", {
      cls: "dropdown tm-filter-select",
      attr: { "aria-label": t("\u6392\u5E8F\u65B9\u5F0F") }
    });
    this.sortSelect = select;
    for (const mode of SORT_MODES) {
      select.createEl("option", { value: mode, text: sortModeLabel(mode) });
    }
    this.component.registerDomEvent(select, "change", () => {
      this.deps.setSortMode(select.value);
    });
  }
  buildSummary() {
    const group = this.host.createDiv({ cls: "tm-filter-group tm-filter-group--summary" });
    this.countEl = group.createDiv({ cls: "tm-filter-count" });
    const clear = group.createEl("button", {
      cls: "tm-filter-clear",
      text: t("\u6E05\u9664\u7B5B\u9009"),
      attr: { type: "button", title: t("\u6E05\u9664\u5168\u90E8\u7B5B\u9009\u6761\u4EF6\uFF0C\u663E\u793A\u6240\u6709\u4EFB\u52A1") }
    });
    this.clearBtn = clear;
    this.component.registerDomEvent(clear, "click", () => this.deps.clearFilters());
  }
  // ────────────────────────────── 同步 ──────────────────────────────
  /** 状态变化后调用：只同步，绝不重建 DOM */
  update() {
    const state = this.deps.getState();
    this.syncStatusChips(state.statuses);
    this.syncMarkerChips(state.markers);
    if (this.presetSelect !== null) this.presetSelect.value = detectStatusPreset(state.statuses);
    if (this.sortSelect !== null) this.sortSelect.value = this.deps.getSortMode();
    this.syncDateGroup(this.dateControls.get("start"), state.startDate);
    this.syncDateGroup(this.dateControls.get("due"), state.dueDate);
    if (this.searchInput !== null && this.searchInput.value !== state.search) {
      this.searchInput.value = state.search;
    }
    const counts = this.deps.getCounts();
    if (this.countEl !== null) {
      this.countEl.setText(t("{shown}/{total} \u4E2A\u4EFB\u52A1", { shown: counts.shown, total: counts.total }));
      this.countEl.toggleClass("tm-filter-count--empty", counts.shown === 0);
    }
    this.clearBtn?.toggleClass("is-hidden", !hasActiveFilter(state));
  }
  syncStatusChips(active) {
    this.renderChips(
      this.chipsEl,
      TASK_STATUSES.map((status) => ({
        value: status,
        label: statusLabel(status),
        active: active.includes(status),
        title: ""
      })),
      (value) => this.deps.setStatuses(toggle(this.deps.getState().statuses, value))
    );
  }
  syncMarkerChips(active) {
    const markers = this.deps.getAvailableMarkers();
    this.markerGroupEl?.toggleClass("is-hidden", markers.length <= 1);
    this.renderChips(
      this.markerChipsEl,
      markers.map((marker) => ({
        value: marker,
        label: markerLabel(marker),
        active: active.includes(marker),
        title: t("\u65B9\u62EC\u53F7\u5185\u5BB9\u662F {marker} \u7684\u4EFB\u52A1", { marker: markerLabel(marker) })
      })),
      (value) => this.deps.setMarkers(toggle(this.deps.getState().markers, value))
    );
  }
  /** chips 不是输入框，重建不会丢光标或输入法状态，所以每次都整体重画 */
  renderChips(host, chips, onToggle) {
    if (host === null) return;
    host.empty();
    for (const chip of chips) {
      const button = host.createEl("button", {
        cls: `tm-chip${chip.active ? " is-active" : ""}`,
        text: chip.label,
        attr: { type: "button", "aria-pressed": String(chip.active), title: chip.title }
      });
      this.component.registerDomEvent(button, "click", () => onToggle(chip.value));
    }
  }
  /**
   * 回填预设与日期。
   *
   * 正在编辑的那个输入框跳过：不跳的话每次 update 都会覆盖用户刚敲了一半的日期。
   */
  syncDateGroup(controls, range) {
    if (controls === void 0) return;
    const today = todayIso();
    controls.select.value = range.preset;
    const effective = range.preset === "custom" ? { start: range.start, end: range.end } : resolveDateRange(range, today);
    const doc = this.host.ownerDocument;
    const pairs = [
      [controls.from, effective.start],
      [controls.to, effective.end]
    ];
    for (const [input, value] of pairs) {
      if (input === doc.activeElement) continue;
      const next = value ?? "";
      if (input.value !== next) input.value = next;
    }
  }
  scheduleSearch(raw) {
    this.clearSearchTimer();
    const win = this.host.ownerDocument.defaultView;
    if (win === null) return;
    this.searchTimer = win.setTimeout(() => {
      this.searchTimer = null;
      this.deps.setSearch(raw);
    }, SEARCH_DEBOUNCE_MS);
  }
  clearSearchTimer() {
    if (this.searchTimer === null) return;
    this.host.ownerDocument.defaultView?.clearTimeout(this.searchTimer);
    this.searchTimer = null;
  }
};

// src/panels/task-card.ts
var import_obsidian12 = require("obsidian");
var TASK_DRAG_MIME = "text/tm-task-id";
var QUADRANTS3 = ["Q1", "Q2", "Q3", "Q4"];
var GTD_QUICK_TARGETS = [
  { state: "Inbox", short: "\u6536", label: t("\u6536\u4EF6\u7BB1") },
  { state: "In Progress", short: "\u8FDB", label: t("\u8FDB\u884C\u4E2D") },
  { state: "Waiting", short: "\u7B49", label: t("\u7B49\u5F85\u4E2D") }
];
async function renderTaskCard(host, task, context, callbacks) {
  const card = host.createDiv({ cls: `tm-card${task.blocked ? " tm-card--blocked" : ""}` });
  card.draggable = context.mode !== "list" && context.dragEnabled;
  card.dataset.taskId = task.id;
  card.addEventListener("dragstart", (event) => {
    event.dataTransfer?.setData(TASK_DRAG_MIME, task.id);
    card.addClass("is-dragging");
  });
  card.addEventListener("dragend", () => card.removeClass("is-dragging"));
  card.addEventListener("click", (event) => {
    if (event.target.closest(".tm-card__actions")) return;
    callbacks.onOpen(task);
  });
  const head = card.createDiv({ cls: "tm-card__head" });
  const titleEl = head.createDiv({ cls: "tm-card__title" });
  const file = context.app.vault.getAbstractFileByPath(task.filePath);
  if (file instanceof import_obsidian12.TFile && task.description.length > 0) {
    await import_obsidian12.MarkdownRenderer.render(
      context.app,
      task.description,
      titleEl,
      task.filePath,
      context.markdownComponent
    );
  } else {
    titleEl.setText(task.description || t("\u65E0\u63CF\u8FF0"));
  }
  head.createDiv({
    cls: `tm-badge tm-badge--${task.displayStatus}`,
    text: statusLabel(task.displayStatus)
  });
  renderChips(card, task);
  card.createDiv({ cls: "tm-card__meta", text: metaText(task, context) });
  renderActions(card, task, context, callbacks);
  return card;
}
function metaText(task, context) {
  const state = gtdStateLabel(task.gtdState);
  switch (context.noteMeta ?? "path") {
    case "hidden":
      return state;
    case "name":
      return `${noteNameOf(task.filePath)} \xB7 ${state}`;
    default:
      return `${task.filePath}:${task.lineNumber} \xB7 ${state}`;
  }
}
function renderChips(card, task) {
  const chips = card.createDiv({ cls: "tm-card__chips" });
  const push = (text, modifier = "") => {
    chips.createSpan({ cls: `tm-chip tm-chip--static${modifier}`, text });
  };
  if (task.priority !== "none" /* None */) {
    push(t("\u4F18\u5148\u7EA7 {level}", { level: priorityLabel(task.priority) }));
  }
  if (task.dueDate) push(t("\u622A\u6B62 {date}", { date: task.dueDate }));
  if (task.startDate) push(t("\u5F00\u59CB {date}", { date: task.startDate }));
  if (task.taskId) push(t("ID {id}", { id: task.taskId }));
  if (task.dependsOn) {
    push(
      task.blocked ? t("\u88AB {id} \u963B\u585E", { id: task.dependsOn }) : t("\u4F9D\u8D56 {id} \u5DF2\u5B8C\u6210", { id: task.dependsOn }),
      task.blocked ? " tm-chip--warning" : ""
    );
  }
  if (task.lineText.toLowerCase().includes("#due-date-conflict")) {
    push(t("\u65E5\u671F\u51B2\u7A81"), " tm-chip--conflict");
  }
}
function renderActions(card, task, context, callbacks) {
  const actions = card.createDiv({ cls: "tm-card__actions" });
  if (task.displayStatus === "completed") {
    addAction(actions, "\u21BA", t("\u91CD\u65B0\u6253\u5F00"), () => callbacks.onToggle(task));
  } else {
    addAction(actions, "\u2713", t("\u5B8C\u6210"), () => callbacks.onToggle(task));
    if (!task.startDate || task.displayStatus === "to-be-started") {
      addAction(actions, "\u25B6", t("\u5F00\u59CB"), () => callbacks.onStart(task));
    }
    addAction(actions, "\u2715", t("\u53D6\u6D88"), () => callbacks.onCancel(task));
  }
  addAction(actions, "\u270E", t("\u7F16\u8F91"), () => callbacks.onEdit(task));
  addAction(actions, "\u{1F5D1}", t("\u5220\u9664"), () => callbacks.onDelete(task));
  const quick = quickMovesFor(task, context.mode, context.gtdRules, callbacks);
  if (quick.length === 0) return;
  actions.createSpan({ cls: "tm-card__actions-sep", text: "|" });
  actions.createSpan({ cls: "tm-card__actions-label", text: t("\u79FB\u52A8\u5230") });
  for (const move of quick) {
    addAction(actions, move.text, move.title, move.run);
  }
}
function quickMovesFor(task, mode, rules, callbacks) {
  if (mode === "eisenhower") {
    return QUADRANTS3.filter((quadrant) => quadrant !== task.quadrant).map((quadrant) => ({
      text: quadrant.slice(1),
      title: t("\u79FB\u52A8\u5230 {quadrant}", { quadrant }),
      run: () => callbacks.onMoveQuadrant(task, quadrant)
    }));
  }
  if (mode === "gtd") {
    const current2 = gtdColumnOf(task, todayIso(), rules);
    return GTD_QUICK_TARGETS.filter((target) => target.state !== current2).map((target) => ({
      text: target.short,
      title: t("\u79FB\u52A8\u5230\u300C{state}\u300D", { state: target.label }),
      run: () => callbacks.onMoveGtd(task, target.state)
    }));
  }
  return [];
}
function addAction(host, text, title, onClick) {
  const button = host.createEl("button", {
    cls: "tm-card__action tm-btn",
    text,
    // 按钮上的字是 `✎` 这类符号，读屏拿不到含义，所以 title 同时当无障碍名用
    attr: { type: "button", title, "aria-label": title }
  });
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    onClick();
  });
}

// src/panels/panel-board.ts
var PanelBoard = class {
  constructor(host, app, callbacks) {
    this.host = host;
    this.app = app;
    this.callbacks = callbacks;
    /**
     * 渲染代次。
     *
     * 卡片里的 Markdown 是逐个 await 渲染的，所以一次渲染会跨越多个宏任务；
     * 这期间如果又来一次渲染（连点筛选、文件连续变动），两次渲染会往同一个宿主里
     * 交错插入卡片，出现重复与错位。代次号让旧的那次在每次 await 之后自行退出。
     */
    this.renderGeneration = 0;
    this.host.addClass("tm-board");
  }
  async render(grouping, options) {
    const generation = ++this.renderGeneration;
    this.host.empty();
    if (!options.loaded) {
      const loading = this.host.createDiv({ cls: "tm-empty" });
      loading.createEl("h3", { text: t("\u6B63\u5728\u5EFA\u7ACB\u4EFB\u52A1\u7D22\u5F15\u2026") });
      loading.createEl("p", { text: t("\u7D22\u5F15\u5728 Obsidian \u5E03\u5C40\u5C31\u7EEA\u540E\u5F00\u59CB\uFF0C\u5927\u5E93\u9700\u8981\u4E00\u70B9\u65F6\u95F4\u3002") });
      return;
    }
    const panels = grouping.sections ?? grouping.panels;
    if (panels.length === 0) {
      this.host.createDiv({ cls: "tm-empty", text: t("\u6CA1\u6709\u7B26\u5408\u5F53\u524D\u7B5B\u9009\u6761\u4EF6\u7684\u4EFB\u52A1") });
      return;
    }
    if (grouping.sections !== void 0) {
      const list = this.host.createDiv({ cls: "tm-sections" });
      for (const section of grouping.sections) {
        if (generation !== this.renderGeneration) return;
        await this.renderSection(list, section, options, generation);
      }
      return;
    }
    const grid = this.host.createDiv({
      cls: `tm-board__grid tm-board__grid--${grouping.grid}`
    });
    for (const panel of grouping.panels) {
      if (generation !== this.renderGeneration) return;
      await this.renderPanel(grid, panel, options, generation);
    }
  }
  /**
   * 分区：可折叠的分组标题 + 里面的笔记容器。
   *
   * 分区刻意**不做容器**（不套边框盒子）：分区里已经是容器了，再套一层，
   * 每格宽度要被三层 padding 挤掉。标题行承担「这是哪一组、有几篇」的信息，
   * 折叠状态与面板容器共用同一套 key。
   */
  async renderSection(list, section, options, generation) {
    const collapsed = options.collapsedKeys.has(section.key);
    const el = list.createDiv({ cls: `tm-section${collapsed ? " is-collapsed" : ""}` });
    el.dataset.panelKey = section.key;
    const head = el.createDiv({ cls: "tm-section__head" });
    head.createSpan({ cls: "tm-section__chevron", text: collapsed ? "\u25B8" : "\u25BE" });
    head.createEl("h3", { cls: "tm-section__title", text: section.title });
    head.createSpan({
      cls: "tm-section__count",
      text: String(section.panels.reduce((total, panel) => total + panel.tasks.length, 0))
    });
    head.addEventListener("click", () => this.callbacks.onToggleCollapse(section.key));
    const grid = el.createDiv({ cls: "tm-board__grid tm-board__grid--flow tm-section__body" });
    for (const panel of section.panels) {
      if (generation !== this.renderGeneration) return;
      await this.renderPanel(grid, panel, options, generation);
    }
  }
  async renderPanel(grid, panel, options, generation) {
    const collapsed = options.collapsedKeys.has(panel.key);
    const el = grid.createDiv({ cls: `tm-panel${collapsed ? " is-collapsed" : ""}` });
    el.dataset.panelKey = panel.key;
    if (panel.dropTarget !== void 0 && options.dragEnabled) {
      this.registerDropTarget(el, panel.dropTarget);
    }
    const head = el.createDiv({ cls: "tm-panel__head" });
    head.createSpan({ cls: "tm-panel__chevron", text: collapsed ? "\u25B8" : "\u25BE" });
    const titleWrap = head.createDiv({ cls: "tm-panel__titles" });
    titleWrap.createEl("h3", { cls: "tm-panel__title", text: panel.title });
    if (panel.subtitle) {
      titleWrap.createDiv({ cls: "tm-panel__subtitle", text: panel.subtitle });
    }
    const right = head.createDiv({ cls: "tm-panel__head-right" });
    if (panel.addDefaults !== void 0) {
      this.addPanelButton(right, "+", t("\u5728\u6B64\u5BB9\u5668\u65B0\u5EFA\u4EFB\u52A1"), () => this.callbacks.onAddTask(panel));
    }
    right.createSpan({ cls: "tm-panel__count", text: String(panel.tasks.length) });
    head.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      this.callbacks.onToggleCollapse(panel.key);
    });
    const body = el.createDiv({ cls: "tm-panel__body" });
    if (panel.tasks.length === 0) {
      body.createDiv({ cls: "tm-panel__empty", text: t("\u6682\u65E0\u4EFB\u52A1") });
      return;
    }
    for (const task of panel.tasks) {
      if (generation !== this.renderGeneration) return;
      await renderTaskCard(body, task, {
        app: this.app,
        markdownComponent: options.markdownComponent,
        mode: panel.dropTarget?.kind === "quadrant" ? "eisenhower" : panel.dropTarget?.kind === "gtd" ? "gtd" : "list",
        gtdRules: options.gtdRules,
        dragEnabled: options.dragEnabled,
        noteMeta: panel.noteMeta
      }, this.callbacks);
    }
  }
  /** 拖放落点：只有带 dropTarget 的容器接受投放（列表容器不接受） */
  registerDropTarget(el, target) {
    el.addClass("tm-panel--drop-target");
    el.addEventListener("dragover", (event) => {
      event.preventDefault();
      el.addClass("is-drop-over");
    });
    el.addEventListener("dragleave", (event) => {
      if (el.contains(event.relatedTarget)) return;
      el.removeClass("is-drop-over");
    });
    el.addEventListener("drop", (event) => {
      event.preventDefault();
      el.removeClass("is-drop-over");
      const taskId = event.dataTransfer?.getData(TASK_DRAG_MIME) ?? "";
      if (taskId.length === 0) return;
      this.callbacks.onDropTask(taskId, target);
    });
  }
  addPanelButton(host, text, title, onClick) {
    const button = host.createEl("button", {
      cls: "tm-panel__add tm-btn",
      text,
      attr: { type: "button", title }
    });
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      onClick();
    });
  }
};

// src/views/matrix-view.ts
var VIEW_TYPE_TASK_MATRIX = "task-matrix-view";
var MODES = ["list", "gtd", "eisenhower", "calendar"];
var FALLBACK_PANEL_MODE = "eisenhower";
function modeLabel(mode) {
  switch (mode) {
    case "gtd":
      return "GTD";
    case "eisenhower":
      return t("\u77E9\u9635");
    case "calendar":
      return t("\u65E5\u5386");
    default:
      return t("\u7B14\u8BB0\u5217\u8868");
  }
}
var MatrixView = class extends import_obsidian13.ItemView {
  constructor(leaf, host) {
    super(leaf);
    this.host = host;
    this.sortMode = "due-asc";
    this.filterState = null;
    this.calendarMode = "month";
    this.calendarAnchor = /* @__PURE__ */ new Date();
    this.calendarSummaryOpen = false;
    /**
     * 折叠的容器/分节 key：一份状态喂给所有渲染路径。
     *
     * 面板视图与甘特共用同一批 key（`folder:` / `gtd:` / `q:`），所以「在甘特里
     * 收起文件夹分组」与「在列表里收起同一个文件夹」是同一个状态，切视图不会变样。
     */
    this.collapsedKeys = /* @__PURE__ */ new Set();
    // 甘特自己的视图状态（粒度 / 分组 / 缩放锚点）
    this.ganttZoom = "day";
    this.ganttGrouping = "none";
    this.ganttNeedsScrollToToday = true;
    this.filterBar = null;
    this.filterHostEl = null;
    /** 筛选区是否收起（会话内状态：默认展开，每次打开视图都回到展开） */
    this.filterCollapsed = false;
    this.filterToggleBtn = null;
    this.board = null;
    this.calendar = null;
    this.gantt = null;
    this.boardHost = null;
    this.calendarHost = null;
    this.ganttHost = null;
    this.modeButtons = /* @__PURE__ */ new Map();
    /** 甘特这块主区的外壳（页签 + 两个子面板），只在甘特模式下显示 */
    this.ganttShell = null;
    this.mermaidHost = null;
    this.mermaid = null;
    /** 甘特区里的当前页签：时间轴 或 Mermaid 预览 */
    this.ganttView = "gantt";
    this.ganttViewButtons = /* @__PURE__ */ new Map();
    /**
     * 最近一次生成的甘特模型。
     *
     * Mermaid 预览与导出都从它重新生成（预览不是第二份真相），所以它必须跟着
     * 每一次 render 更新 —— 包括只切了页签、时间轴没画的那几次。
     */
    this.lastGanttModel = null;
    /** 根容器：甘特模式下挂 `tm-root--gantt`，工具栏的显隐全由这一个类切换 */
    this.rootEl = null;
    this.ganttToggleBtn = null;
    this.ganttZoomSelect = null;
    this.ganttGroupingSelect = null;
    this.collapseBtn = null;
    /**
     * 当前模式真实渲染出来的可折叠单元（容器 key / 甘特分节 key）。
     * 展开/收起按钮据此判断自己在哪个状态；为空表示这个模式没有可折叠的东西。
     */
    this.lastCollapsibleKeys = [];
    this.markdownComponent = null;
    const defaultView = host.settings.defaultView;
    this.activeTab = defaultView === "gantt" ? "gantt" : "panel";
    this.mode = defaultView === "gantt" ? FALLBACK_PANEL_MODE : defaultView;
  }
  getViewType() {
    return VIEW_TYPE_TASK_MATRIX;
  }
  getDisplayText() {
    return t("\u4EFB\u52A1\u77E9\u9635");
  }
  getIcon() {
    return pickViewIcon((0, import_obsidian13.getIconIds)());
  }
  // ────────────────────────────── 生命周期 ──────────────────────────────
  /**
   * 布局只搭一次：工具栏与筛选栏建好后不再重建，状态变化走 `update()`/类名同步。
   *
   * 用 `Promise.resolve()` 而不是 `async`：这里确实没有需要等待的东西，
   * 加个 `async` 只会让读的人以为有异步步骤。
   */
  onOpen() {
    const root = this.contentEl.createDiv({ cls: "tm-root" });
    this.rootEl = root;
    this.buildToolbar(root);
    this.buildFilterBar(root);
    this.buildBody(root);
    this.syncToolbar();
    this.render();
    this.registerEvent(
      this.app.workspace.on("active-leaf-change", () => this.calendar?.hideHover())
    );
    return Promise.resolve();
  }
  onClose() {
    this.releaseMarkdownComponent();
    this.calendar?.destroy();
    this.gantt?.destroy();
    this.filterBar = null;
    this.filterHostEl = null;
    this.filterToggleBtn = null;
    this.board = null;
    this.calendar = null;
    this.gantt = null;
    this.mermaid?.destroy();
    this.mermaid = null;
    this.boardHost = null;
    this.calendarHost = null;
    this.ganttHost = null;
    this.ganttShell = null;
    this.mermaidHost = null;
    this.lastGanttModel = null;
    this.rootEl = null;
    this.ganttToggleBtn = null;
    this.ganttZoomSelect = null;
    this.ganttGroupingSelect = null;
    this.modeButtons.clear();
    this.ganttViewButtons.clear();
    this.contentEl.empty();
    return Promise.resolve();
  }
  // ────────────────────────────── 布局 ──────────────────────────────
  buildToolbar(root) {
    const bar = root.createDiv({ cls: "tm-toolbar" });
    bar.createEl("h2", { cls: "tm-toolbar__title", text: t("\u4EFB\u52A1\u77E9\u9635") });
    const actions = bar.createDiv({ cls: "tm-toolbar__actions" });
    this.addButton(actions, t("\u65B0\u5EFA\u4EFB\u52A1"), () => this.openEditor(null, {}));
    this.addButton(actions, t("\u5237\u65B0"), () => this.host.requestRescan());
    const modes = actions.createDiv({
      cls: "tm-toolbar__modes tm-toolbar__panel-only",
      attr: { role: "group" }
    });
    for (const mode of MODES) {
      const button = modes.createEl("button", {
        cls: "tm-mode-btn",
        text: modeLabel(mode),
        attr: { type: "button" }
      });
      this.modeButtons.set(mode, button);
      this.registerDomEvent(button, "click", () => {
        if (this.activeTab === "panel" && this.mode === mode) return;
        this.switchToPanel(mode);
      });
    }
    const zoomField = actions.createDiv({ cls: "tm-toolbar__field tm-toolbar__gantt-only" });
    zoomField.createEl("label", { cls: "tm-toolbar__label", text: t("\u65F6\u95F4\u7C92\u5EA6") });
    const zoom = zoomField.createEl("select", {
      cls: "dropdown",
      attr: { "aria-label": t("\u65F6\u95F4\u7C92\u5EA6") }
    });
    this.ganttZoomSelect = zoom;
    for (const mode of [...ZOOM_LADDER].reverse()) {
      zoom.createEl("option", { value: mode, text: ganttZoomLabel(mode) });
    }
    this.registerDomEvent(zoom, "change", () => {
      this.ganttAnchor = void 0;
      this.ganttZoom = zoom.value;
      this.render();
    });
    const groupingField = actions.createDiv({ cls: "tm-toolbar__field tm-toolbar__gantt-only" });
    groupingField.createEl("label", { cls: "tm-toolbar__label", text: t("\u5206\u7EC4\u4F9D\u636E") });
    const grouping = groupingField.createEl("select", {
      cls: "dropdown",
      attr: { "aria-label": t("\u5206\u7EC4\u4F9D\u636E") }
    });
    this.ganttGroupingSelect = grouping;
    for (const mode of GANTT_GROUPINGS) {
      grouping.createEl("option", { value: mode, text: ganttGroupingLabel(mode) });
    }
    this.registerDomEvent(grouping, "change", () => {
      this.ganttGrouping = grouping.value;
      this.render();
    });
    const todayButton = this.addButton(
      actions,
      t("\u5B9A\u4F4D\u5230\u4ECA\u5929"),
      () => this.jumpGanttToToday(),
      "tm-toolbar__gantt-only"
    );
    todayButton.setAttribute("title", t("\u628A\u65F6\u95F4\u8F74\u590D\u4F4D\u5230\u4ECA\u5929\u7684\u4F4D\u7F6E"));
    this.ganttToggleBtn = this.addButton(
      actions,
      t("\u7518\u7279\u56FE\u6A21\u5F0F"),
      () => this.switchTab(this.activeTab === "gantt" ? "panel" : "gantt"),
      "tm-btn--toggle"
    );
    this.filterToggleBtn = this.addButton(actions, t("\u6536\u8D77\u7B5B\u9009"), () => this.toggleFilterBar());
    this.collapseBtn = this.addButton(actions, t("\u5168\u90E8\u6536\u8D77"), () => this.toggleAllCollapsed());
  }
  /** 收放筛选区：只切类名与按钮文字，不重渲染（筛选状态一个字都不动） */
  toggleFilterBar() {
    this.filterCollapsed = !this.filterCollapsed;
    this.applyFilterCollapsed();
  }
  applyFilterCollapsed() {
    this.filterHostEl?.toggleClass("is-hidden", this.filterCollapsed);
    this.filterToggleBtn?.setText(this.filterCollapsed ? t("\u5C55\u5F00\u7B5B\u9009") : t("\u6536\u8D77\u7B5B\u9009"));
    this.filterToggleBtn?.setAttribute("aria-expanded", String(!this.filterCollapsed));
  }
  buildFilterBar(root) {
    const hostEl = root.createDiv({ cls: "tm-filter-host" });
    this.filterHostEl = hostEl;
    this.filterBar = new FilterBar(this, hostEl, {
      getState: () => this.filterStateValue(),
      getSortMode: () => this.sortMode,
      getCounts: () => this.counts(),
      getAvailableMarkers: () => collectMarkers(this.host.getTasks(), this.host.settings),
      setStatuses: (statuses) => this.patchFilter({ statuses }),
      setMarkers: (markers) => this.patchFilter({ markers }),
      setSearch: (search) => this.patchFilter({ search }),
      setStartDate: (startDate) => this.patchFilter({ startDate }),
      setDueDate: (dueDate) => this.patchFilter({ dueDate }),
      setSortMode: (mode) => {
        this.sortMode = mode;
        this.render();
      },
      clearFilters: () => {
        this.filterState = defaultFilterState();
        this.render();
      }
    });
  }
  buildBody(root) {
    const body = root.createDiv({ cls: "tm-body" });
    this.boardHost = body.createDiv({ cls: "tm-board-host" });
    this.board = new PanelBoard(this.boardHost, this.host.app, {
      onOpen: (task) => void this.host.openTaskFile(task),
      onToggle: (task) => void this.runAction(() => toggleTaskStatus(this.host.app, this.host.settings, task)),
      onStart: (task) => void this.runAction(() => startTask(this.host.app, this.host.settings, task)),
      onCancel: (task) => void this.runAction(() => cancelTask(this.host.app, this.host.settings, task)),
      onEdit: (task) => this.openEditor(task, {}),
      onDelete: (task) => void this.confirmDelete(task),
      onMoveGtd: (task, state) => void this.runAction(
        () => moveTaskToGtdState(this.host.app, this.host.settings, task, state, (start, due) => askDateConflict(this.host.app, start, due))
      ),
      onMoveQuadrant: (task, quadrant) => void this.runAction(
        () => moveTaskToQuadrant(this.host.app, this.host.settings, task, quadrant)
      ),
      onToggleCollapse: (key) => this.toggleCollapse(key),
      onAddTask: (panel) => this.openEditor(null, panel.addDefaults ?? {}),
      onDropTask: (taskId, target) => void this.handleDrop(taskId, target)
    });
    this.calendarHost = body.createDiv({ cls: "tm-board-host is-hidden" });
    this.calendar = new CalendarBoard(this.calendarHost, {
      onOpenTask: (task) => void this.host.openTaskFile(task),
      onShift: (delta) => this.shiftCalendar(delta),
      onToday: () => {
        this.calendarAnchor = /* @__PURE__ */ new Date();
        this.render();
      },
      onModeChange: (mode) => {
        this.calendarMode = mode;
        this.render();
      },
      onToggleSummary: () => {
        this.calendarSummaryOpen = !this.calendarSummaryOpen;
        this.render();
      }
    });
    this.ganttShell = body.createDiv({ cls: "tm-gantt-shell is-hidden" });
    const ganttTabs = this.ganttShell.createDiv({
      cls: "tm-gantt-shell__tabs",
      attr: { role: "tablist" }
    });
    for (const view of GANTT_VIEWS) {
      const button = ganttTabs.createEl("button", {
        cls: "tm-gantt-shell__tab",
        text: ganttViewLabel(view),
        attr: { type: "button", role: "tab" }
      });
      this.ganttViewButtons.set(view, button);
      this.registerDomEvent(button, "click", () => this.switchGanttView(view));
    }
    this.ganttHost = this.ganttShell.createDiv({ cls: "tm-board-host" });
    this.gantt = new GanttBoard(this.ganttHost, this, {
      onOpenTask: (task) => void this.host.openNote(task.filePath),
      onEditTask: (task) => this.openGanttTaskEditor(task),
      onToggleSection: (key) => this.toggleCollapse(key),
      onZoomStep: (direction, anchor) => this.stepGanttZoom(direction, anchor),
      onSidebarWidthCommit: (width) => this.commitGanttSidebarWidth(width)
    });
    this.mermaidHost = this.ganttShell.createDiv({ cls: "tm-board-host is-hidden" });
    this.mermaid = new MermaidBoard(this, this.host.app, this.mermaidHost, {
      getSource: () => this.mermaidSource(),
      getOptions: () => this.mermaidOptions(),
      onOptionsChange: (patch) => this.patchMermaidOptions(patch),
      onExportCode: () => void this.copyMermaidCode(),
      onWriteToNote: () => this.pickMermaidTarget(),
      onExportImage: (payload) => void this.exportMermaidImage(payload)
    });
  }
  /** 切甘特区里的页签（时间轴 / Mermaid 预览） */
  switchGanttView(view) {
    if (this.ganttView === view) return;
    this.ganttView = view;
    this.render();
  }
  /**
   * 把时间轴复位到今天。
   *
   * 直接挪滚动位置，**不重渲染**：重渲染白算一遍布局、还会把缩放锚点丢掉。
   * 容器量不到宽度时（面板刚展开、或此刻停在 Mermaid 页签上）视图会记一笔、
   * 等 ResizeObserver 报出宽度再补 —— 从 Mermaid 页签点它同样有效。
   */
  jumpGanttToToday() {
    this.ganttAnchor = void 0;
    this.gantt?.scrollToToday();
    this.ganttNeedsScrollToToday = false;
  }
  /** 选面板模式：顺带把主区切回面板那一侧（点「列表」时不该还停在甘特上） */
  switchToPanel(mode) {
    this.mode = mode;
    this.activeTab = "panel";
    this.syncToolbar();
    this.render();
  }
  /**
   * 切到甘特。
   *
   * 进甘特时把视野落到今天（甘特的常态就是盯着最近这几周）；`display:none`
   * 会把滚动容器归零，所以每次进入都重新定位一次，不必保存上次的位置。
   */
  switchTab(tab) {
    if (this.activeTab === tab) return;
    this.activeTab = tab;
    if (tab === "gantt") {
      this.ganttAnchor = void 0;
      this.ganttNeedsScrollToToday = true;
    }
    this.syncToolbar();
    this.render();
  }
  /** Ctrl+滚轮：在粒度阶梯上走一档，并记住锚点把那天钉回原位 */
  stepGanttZoom(direction, anchor) {
    const index = ZOOM_LADDER.indexOf(this.ganttZoom);
    const next = index + direction;
    if (next < 0 || next >= ZOOM_LADDER.length) return;
    this.ganttZoom = ZOOM_LADDER[next] ?? this.ganttZoom;
    this.ganttAnchor = anchor ?? void 0;
    this.render();
  }
  addButton(host, label, onClick, cls = "") {
    const button = host.createEl("button", {
      cls: cls.length > 0 ? `tm-btn ${cls}` : "tm-btn",
      text: label,
      attr: { type: "button" }
    });
    this.registerDomEvent(button, "click", onClick);
    return button;
  }
  // ────────────────────────────── 渲染管道 ──────────────────────────────
  /**
   * 唯一的数据入口：索引 → 显示口径 → 筛选 → 排序 → 分组 → 画。
   *
   * 顺序有讲究：「显示口径」（设置里的截止日范围、远期开始）先于用户筛选生效，
   * 这样筛选栏里的计数与用户看到的容器内容永远一致。
   */
  render() {
    const all = this.host.getTasks();
    const today = todayIso();
    const settings = this.host.settings;
    const filtered = applyFilters(all, this.filterStateValue(), today);
    const visible = applyVisibilityRanges(filtered, settings, today);
    const ordered = sortTasks(visible, this.sortMode);
    this.releaseMarkdownComponent();
    const markdownComponent = this.getMarkdownComponent();
    const ganttActive = this.activeTab === "gantt";
    const calendarActive = !ganttActive && this.mode === "calendar";
    const showTimeline = ganttActive && this.ganttView === "gantt";
    const showMermaid = ganttActive && this.ganttView === "mermaid";
    if (!calendarActive) this.calendar?.hideHover();
    this.boardHost?.toggleClass("is-hidden", ganttActive || calendarActive);
    this.calendarHost?.toggleClass("is-hidden", !calendarActive);
    this.ganttShell?.toggleClass("is-hidden", !ganttActive);
    this.ganttHost?.toggleClass("is-hidden", !showTimeline);
    this.mermaidHost?.toggleClass("is-hidden", !showMermaid);
    if (ganttActive) {
      const model = this.buildGanttModel(filtered, today, settings);
      this.lastCollapsibleKeys = this.ganttGrouping === "none" || showMermaid ? [] : model.sections.map((section) => section.key);
      if (showTimeline) this.renderGanttTimeline(model, today, settings);
      if (showMermaid) this.mermaid?.update();
    } else if (calendarActive) {
      this.renderCalendar(filtered);
    } else {
      const grouping = buildPanels(ordered, this.mode, settings);
      this.lastCollapsibleKeys = [
        ...grouping.sections?.map((section) => section.key) ?? [],
        ...grouping.panels.map((panel) => panel.key)
      ];
      void this.board?.render(grouping, {
        collapsedKeys: this.collapsedKeys,
        markdownComponent,
        gtdRules: gtdRulesOf(settings),
        dragEnabled: settings.dragEnabled,
        loaded: this.host.isIndexReady()
      });
    }
    this.filterBar?.update();
    this.syncToolbar();
  }
  /**
   * 日历吃「用户筛过的」数据，但不吃「截止日显示范围」：日历自己是按区间看的，
   * 再套一层范围裁剪会出现「切到日历发现远期任务没了」这种莫名其妙的缺口。
   */
  renderCalendar(filtered) {
    const settings = this.host.settings;
    this.lastCollapsibleKeys = [];
    this.calendar?.render({
      mode: this.calendarMode,
      anchor: this.calendarAnchor,
      summaryOpen: this.calendarSummaryOpen,
      settings,
      itemsByDate: collectCalendarItems(filtered, {
        showInProcessTasks: settings.showCalendarInProcessTasks
      }),
      summary: buildCalendarSummary(filtered, this.calendarMode, this.calendarAnchor, settings),
      today: todayIso()
    });
  }
  /**
   * 甘特同样按「用户筛过的」数据画，不吃长期显示口径 —— 那两条是为了让面板
   * 不至于一次铺出上千张卡片，而甘特本来就是按时段看的，再裁一刀会出现
   * 「任务在列表里有、在甘特上找不到」这种对不上账的缺口。
   */
  /**
   * 当前筛选与分组下的甘特模型。
   *
   * 时间轴与 Mermaid 预览共用这一个出口：预览不是第二份数据，它是模型的一次投影，
   * 所以「切到预览页签」也必须重新算一遍模型（那次 render 不画时间轴）。
   */
  buildGanttModel(filtered, today, settings) {
    const allParsed = this.host.getTasks();
    const allKeys = new Set(allParsed.map((task) => `${task.filePath}:${task.lineNumber}`));
    const visibleKeys = new Set(filtered.map((task) => `${task.filePath}:${task.lineNumber}`));
    const ganttTasks = this.host.getGanttTasks().filter((task) => {
      const key = `${task.filePath}:${task.lineNumber}`;
      return visibleKeys.has(key) || !allKeys.has(key);
    });
    const model = buildGanttModel(ganttTasks, {
      grouping: this.ganttGrouping,
      collapsedKeys: this.collapsedKeys,
      today,
      axisRange: this.ganttAxisRange(today),
      settings,
      parsedByLine: new Map(allParsed.map((task) => [`${task.filePath}:${task.lineNumber}`, task]))
    });
    this.lastGanttModel = model;
    return model;
  }
  renderGanttTimeline(model, today, settings) {
    const scrolledToToday = this.gantt?.render({
      zoom: this.ganttZoom,
      grouping: this.ganttGrouping,
      model,
      today,
      anchor: this.ganttAnchor,
      colors: settings.ganttBarColors,
      sidebarWidth: settings.ganttSidebarWidth,
      offDays: this.offDaysFor(model, settings),
      scrollToToday: this.ganttNeedsScrollToToday
    });
    this.ganttAnchor = void 0;
    if (scrolledToToday === true) this.ganttNeedsScrollToToday = false;
  }
  /**
   * 任务列宽度落盘。
   *
   * 只在松手 / 键盘调整后调一次：拖动过程中由 `SplitResizer` 直接改 CSS 变量，
   * 每帧写盘等于把磁盘当草稿纸。落盘会触发一次重绘，但写进去的是同一个宽度，
   * 所以画面上没有跳动。
   */
  commitGanttSidebarWidth(width) {
    if (this.host.settings.ganttSidebarWidth === width) return;
    this.host.settings.ganttSidebarWidth = width;
    void this.host.persistSettings(false);
  }
  // ────────────────────────────── Mermaid 预览与导出 ──────────────────────────────
  /** 当前要展示 / 导出的 mermaid 全文（由最近一次甘特模型实时生成，不留缓存副本） */
  mermaidSource() {
    const model = this.lastGanttModel;
    if (model === null) return "```mermaid\ngantt\n```";
    return exportMermaid(model, {
      // 标题来自设置（预览栏里没有它这一项），其余选项就是预览栏上的控件
      title: this.host.settings.mermaidTitle,
      ...this.mermaidOptions(),
      /*
       * 节假日也在这儿算：它按**图跨到的年份**取，所以必须先有模型。
       * 与自绘甘特的灰色列读的是同一个函数 —— 图上画的与导出写的因此不可能走岔。
       */
      holidays: resolveHolidayDates(model.rangeStart, model.rangeEnd, this.host.settings)
    });
  }
  mermaidOptions() {
    const settings = this.host.settings;
    return {
      todayMarker: settings.mermaidTodayMarker,
      excludeWeekends: settings.mermaidExcludeWeekends,
      excludeDates: settings.mermaidExcludeDates,
      includeDates: settings.mermaidIncludeDates
    };
  }
  /** 选项只影响导出的文本，不必重扫全库：落盘后重绘，预览跟着重算 */
  patchMermaidOptions(patch) {
    const settings = this.host.settings;
    if (patch.todayMarker !== void 0) settings.mermaidTodayMarker = patch.todayMarker;
    if (patch.excludeWeekends !== void 0) settings.mermaidExcludeWeekends = patch.excludeWeekends;
    if (patch.excludeDates !== void 0) settings.mermaidExcludeDates = patch.excludeDates;
    if (patch.includeDates !== void 0) settings.mermaidIncludeDates = patch.includeDates;
    void this.host.persistSettings(false);
  }
  async copyMermaidCode() {
    const copied = await this.copyText(this.mermaidSource());
    new import_obsidian13.Notice(copied ? t("Mermaid \u4EE3\u7801\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F") : t("\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"));
  }
  /**
   * 图片落盘。
   *
   * 落点是 Obsidian 自己的附件目录（`services/image-export` 里决定），文件名带时间戳、
   * 重名自动加序号。写完之后顺手把路径复制进剪贴板：附件目录动辄几百个文件，
   * 手工翻找很难受；**复制失败不改判定**——文件已经写好了，那才是这次操作的主体。
   */
  async exportMermaidImage(payload) {
    try {
      const path = await writeMermaidImage(this.host.app, payload);
      const copied = await this.copyText(path);
      new import_obsidian13.Notice(
        copied ? t("\u5DF2\u5BFC\u51FA\u5E76\u590D\u5236\u8DEF\u5F84\uFF1A{path}", { path }) : t("\u5DF2\u5BFC\u51FA {path}\uFF08\u590D\u5236\u8DEF\u5F84\u5931\u8D25\uFF0C\u8BF7\u5230\u9644\u4EF6\u76EE\u5F55\u67E5\u627E\uFF09", { path })
      );
    } catch (error) {
      new import_obsidian13.Notice(
        t("\u5BFC\u51FA\u56FE\u7247\u5931\u8D25\uFF1A{message}", {
          message: error instanceof Error ? error.message : String(error)
        })
      );
    }
  }
  /** 剪贴板：权限在部分环境下会被拒，所以返回成败由调用方决定说什么 */
  async copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }
  pickMermaidTarget() {
    new MermaidTargetModal(this.host.app, (file) => void this.writeMermaidToNote(file)).open();
  }
  /** 落点标记之间替换；标记不在就整块追加到文末 —— 标记之外一个字不动 */
  async writeMermaidToNote(file) {
    const settings = this.host.settings;
    const markers = { start: settings.mermaidMarkerStart, end: settings.mermaidMarkerEnd };
    const result = await upsertMarkedBlock(this.host.app, file, {
      ...markers,
      block: wrapInMarkers(this.mermaidSource(), markers)
    });
    if (result === "missing") {
      new import_obsidian13.Notice(t("\u627E\u4E0D\u5230\u6587\u4EF6\uFF1A{path}", { path: file.path }));
      return;
    }
    new import_obsidian13.Notice(
      result === "updated" ? t("\u5DF2\u66F4\u65B0 {path} \u7684\u843D\u70B9\u6807\u8BB0\u4E4B\u95F4", { path: file.path }) : t("\u6CA1\u627E\u5230\u843D\u70B9\u6807\u8BB0\uFF0C\u5DF2\u8FFD\u52A0\u5230 {path} \u6587\u672B", { path: file.path })
    );
  }
  /**
   * 灰列（非工作日色带）。
   *
   * 与 Mermaid 导出的 excludes/includes 读同一个函数，所以「图上画的」与「导出写的」
   * 不可能走岔。**只在可视时间轴范围内画**：日历是按图跨到的年份整年取的（与 PM 一致），
   * 范围外的日子不进 DOM —— 否则一次渲染就要插入一堆画在视野外的矩形。
   */
  offDaysFor(model, settings) {
    return mergeContiguousDays(
      resolveNonWorkingDays(model.rangeStart, model.rangeEnd, settings)
    ).filter((band) => band.end >= model.rangeStart && band.start <= model.rangeEnd);
  }
  /** 筛选栏的起止日期一起撑开时间轴（gantt-model 那边是「只扩不缩」的并集） */
  ganttAxisRange(today) {
    const state = this.filterStateValue();
    const startRange = resolveDateRange(state.startDate, today);
    const dueRange = resolveDateRange(state.dueDate, today);
    const from = minIso(startRange.start, dueRange.start);
    const to = maxIso(startRange.end, dueRange.end);
    if (from === null && to === null) return void 0;
    return { start: from ?? today, end: to ?? today };
  }
  syncToolbar() {
    const ganttActive = this.activeTab === "gantt";
    this.rootEl?.toggleClass("tm-root--gantt", ganttActive);
    for (const [mode, button] of this.modeButtons) {
      button.toggleClass("is-active", mode === this.mode);
      button.setAttribute("aria-pressed", String(mode === this.mode));
    }
    if (this.ganttToggleBtn !== null) {
      this.ganttToggleBtn.setText(ganttActive ? t("\u9000\u51FA\u7518\u7279\u56FE\u6A21\u5F0F") : t("\u7518\u7279\u56FE\u6A21\u5F0F"));
      this.ganttToggleBtn.toggleClass("is-on", ganttActive);
    }
    this.ganttShell?.toggleClass("is-hidden", !ganttActive);
    for (const [view, button] of this.ganttViewButtons) {
      const on = ganttActive && view === this.ganttView;
      button.toggleClass("is-active", on);
      button.setAttribute("aria-selected", String(on));
    }
    if (this.ganttZoomSelect !== null) this.ganttZoomSelect.value = this.ganttZoom;
    if (this.ganttGroupingSelect !== null) this.ganttGroupingSelect.value = this.ganttGrouping;
    const hasCollapsibles = this.lastCollapsibleKeys.length > 0;
    if (this.collapseBtn !== null) {
      this.collapseBtn.toggleClass("is-hidden", !hasCollapsibles);
      this.collapseBtn.setText(this.isAllExpanded() ? t("\u5168\u90E8\u6536\u8D77") : t("\u5168\u90E8\u5C55\u5F00"));
    }
  }
  /** 只要还有一个单元是收起的，就不算全展开 */
  isAllExpanded() {
    return this.lastCollapsibleKeys.every((key) => !this.collapsedKeys.has(key));
  }
  filterStateValue() {
    this.filterState ?? (this.filterState = initialFilterState());
    return this.filterState;
  }
  patchFilter(patch) {
    this.filterState = { ...this.filterStateValue(), ...patch };
    this.render();
  }
  counts() {
    const all = this.host.getTasks();
    const today = todayIso();
    const visible = applyVisibilityRanges(
      applyFilters(all, this.filterStateValue(), today),
      this.host.settings,
      today
    );
    return { shown: visible.length, total: all.length };
  }
  /** 一个按钮走完两个方向：全展开时它收起，否则它展开 */
  toggleAllCollapsed() {
    if (this.isAllExpanded()) {
      for (const key of this.lastCollapsibleKeys) this.collapsedKeys.add(key);
    } else {
      this.collapsedKeys.clear();
    }
    this.render();
  }
  toggleCollapse(key) {
    if (this.collapsedKeys.has(key)) this.collapsedKeys.delete(key);
    else this.collapsedKeys.add(key);
    this.render();
  }
  shiftCalendar(delta) {
    const next = new Date(this.calendarAnchor);
    if (this.calendarMode === "week") next.setDate(next.getDate() + delta * 7);
    else next.setMonth(next.getMonth() + delta);
    this.calendarAnchor = next;
    this.render();
  }
  // ────────────────────────────── 动作 ──────────────────────────────
  /** 写操作统一收口：写完让插件重新索引，而不是本地猜结果 */
  async runAction(action) {
    await action();
    this.host.requestRescan();
  }
  openEditor(task, defaults) {
    const editorHost = {
      app: this.host.app,
      settings: this.host.settings,
      tasks: this.host.getTasks(),
      onSaved: () => this.host.requestRescan()
    };
    new TaskEditorModal(editorHost, task, defaults).open();
  }
  /**
   * 甘特里的「编辑任务」。
   *
   * 甘特解析器只产出它自己那套字段（`GanttTask`），而编辑界面要的是面板解析器的
   * `ParsedTask`（它认得标签、依赖、GTD 状态）。两者是同一条线上跑出来的，
   * 按 `文件:行号` 就能对上 —— 也正是甘特做 GTD/象限分组时用的同一个索引。
   *
   * 对不上时（理论上极少：面板解析器与甘特解析器认的行会略有出入）退回到「打开笔记」，
   * 总比右键点了没反应好；宁可多一步，也不能让人以为坏了。
   */
  openGanttTaskEditor(ganttTask) {
    const parsed = this.host.getTasks().find(
      (task) => task.filePath === ganttTask.filePath && task.lineNumber === ganttTask.lineNumber
    );
    if (parsed === void 0) {
      void this.host.openNote(ganttTask.filePath);
      return;
    }
    this.openEditor(parsed, {});
  }
  async confirmDelete(task) {
    const confirmed = await askDeleteTask(this.host.app, task.description);
    if (!confirmed) return;
    await this.runAction(() => deleteTask(this.host.app, task));
  }
  async handleDrop(taskId, target) {
    const task = this.host.getTasks().find((candidate) => candidate.id === taskId);
    if (task === void 0) return;
    if (target.kind === "gtd") {
      await this.runAction(
        () => moveTaskToGtdState(this.host.app, this.host.settings, task, target.state, (start, due) => askDateConflict(this.host.app, start, due))
      );
      return;
    }
    await this.runAction(
      () => moveTaskToQuadrant(this.host.app, this.host.settings, task, target.quadrant)
    );
  }
  // ────────────────────────────── 内联 Markdown ──────────────────────────────
  /**
   * 卡片内联 Markdown 的宿主组件。
   *
   * 每次重绘前卸载旧的：渲染器注册的监听器与子组件都挂在这个 Component 上，
   * 不卸载就会随刷新次数线性增长。
   */
  getMarkdownComponent() {
    if (this.markdownComponent === null) {
      this.markdownComponent = new import_obsidian13.Component();
      this.markdownComponent.load();
    }
    return this.markdownComponent;
  }
  releaseMarkdownComponent() {
    this.markdownComponent?.unload();
    this.markdownComponent = null;
  }
};

// src/main.ts
var REFRESH_DEBOUNCE_MS = 500;
var TaskMatrixPlugin = class extends import_obsidian14.Plugin {
  constructor() {
    super(...arguments);
    this.settings = DEFAULT_SETTINGS;
    this.tasks = [];
    /** 甘特视图的任务投影，与 tasks 同一次文件读取产出 */
    this.ganttTasks = [];
    this.indexReady = false;
    /** 索引代次：又发起了新扫描时，旧的那次结果直接丢弃 */
    this.refreshGeneration = 0;
    this.refreshTimer = null;
    /** null 表示「还没画过」，保证第一轮一定渲染 */
    this.lastSignature = null;
    this.shuttingDown = false;
  }
  async onload() {
    await this.loadSettings();
    this.applyUiLanguage();
    this.registerView(
      VIEW_TYPE_TASK_MATRIX,
      (leaf) => new MatrixView(leaf, this)
    );
    const icon = pickViewIcon((0, import_obsidian14.getIconIds)());
    this.addRibbonIcon(icon, t("\u6253\u5F00\u4EFB\u52A1\u77E9\u9635"), () => {
      void this.activateView();
    });
    this.addCommand({
      id: "open-view",
      name: t("\u6253\u5F00\u4EFB\u52A1\u77E9\u9635"),
      callback: () => {
        void this.activateView();
      }
    });
    this.addCommand({
      id: "refresh-view",
      name: t("\u91CD\u65B0\u626B\u63CF\u4EFB\u52A1"),
      callback: () => {
        void this.refreshTasks(true);
      }
    });
    this.addSettingTab(new TaskMatrixSettingTab(this.app, this, this));
    this.registerEvent(this.app.vault.on("create", (file) => this.handleVaultChange(file)));
    this.registerEvent(this.app.vault.on("modify", (file) => this.handleVaultChange(file)));
    this.registerEvent(this.app.vault.on("delete", (file) => this.handleVaultChange(file)));
    this.registerEvent(
      this.app.vault.on("rename", (file, oldPath) => this.handleVaultRename(file, oldPath))
    );
    this.app.workspace.onLayoutReady(() => {
      void this.refreshTasks();
    });
    this.register(() => this.clearRefreshTimer());
  }
  onunload() {
    this.shuttingDown = true;
    this.clearRefreshTimer();
    this.tasks = [];
  }
  // ────────────────────────────── 设置 ──────────────────────────────
  async loadSettings() {
    const saved = await this.loadData();
    this.settings = { ...DEFAULT_SETTINGS, ...saved ?? {} };
    this.settings.ganttBarColors = {
      ...DEFAULT_GANTT_BAR_COLORS,
      ...saved?.ganttBarColors ?? {}
    };
    this.settings.holidaySchedules = { ...saved?.holidaySchedules ?? {} };
  }
  /** 界面语言落到运行时；语言变了要重绘已打开的视图 */
  applyUiLanguage() {
    return applyLanguageSetting(this.settings.uiLanguage, detectLocale(import_obsidian14.moment.locale()));
  }
  /**
   * 落盘设置。
   *
   * `rescan` 决定要不要重建索引：扫描目录、标记、紧急天数这类改动会改变解析结果，
   * 必须重扫；而排序、分组层级这类只影响绘制，重扫一次纯属白读全库。
   */
  async persistSettings(rescan) {
    await this.saveData(this.settings);
    if (rescan) await this.refreshTasks();
    else this.redrawViews();
  }
  refreshViews() {
    this.redrawViews();
  }
  // ────────────────────────────── TaskMatrixHost ──────────────────────────────
  getTasks() {
    return this.tasks;
  }
  getGanttTasks() {
    return this.ganttTasks;
  }
  isIndexReady() {
    return this.indexReady;
  }
  requestRescan() {
    void this.refreshTasks();
  }
  requestRedraw() {
    this.redrawViews();
  }
  async openTaskFile(task) {
    await this.openNote(task.filePath);
  }
  /** 按路径打开笔记（甘特手里只有任务，没有 ParsedTask） */
  async openNote(path) {
    const file = this.app.vault.getAbstractFileByPath(path);
    if (!(file instanceof import_obsidian14.TFile)) {
      new import_obsidian14.Notice(t("\u627E\u4E0D\u5230\u6587\u4EF6\uFF1A{path}", { path }));
      return;
    }
    const leaf = this.app.workspace.getLeaf(true);
    await leaf.openFile(file);
  }
  // ────────────────────────────── 索引编排 ──────────────────────────────
  /**
   * 全量重扫。
   *
   * 代次号 + 卸载标志共同保证：过期的扫描结果绝不会写进状态，
   * 也不会把关闭后的视图再画一次。
   */
  async refreshTasks(showNotice = false) {
    const generation = ++this.refreshGeneration;
    const index = await collectIndex(this.app, this.settings);
    if (this.shuttingDown || generation !== this.refreshGeneration) return;
    this.tasks = index.tasks;
    this.ganttTasks = index.ganttTasks;
    this.indexReady = true;
    const signature = `${taskSignature(index.tasks)}
--
${ganttSignature(index.ganttTasks)}`;
    if (signature !== this.lastSignature) {
      this.lastSignature = signature;
      this.redrawViews();
    }
    if (showNotice) new import_obsidian14.Notice(t("\u5DF2\u5237\u65B0\uFF1A{count} \u4E2A\u4EFB\u52A1", { count: index.tasks.length }));
  }
  /** 设置变更后视图侧的筛选口径也会变，所以要强制重绘一次 */
  redrawViews() {
    for (const leaf of this.app.workspace.getLeavesOfType(VIEW_TYPE_TASK_MATRIX)) {
      const view = leaf.view;
      if (view instanceof MatrixView) view.render();
    }
  }
  handleVaultChange(file) {
    if (shouldRescanForVaultChange(file, this.settings)) this.scheduleRefresh();
  }
  handleVaultRename(file, oldPath) {
    if (shouldRescanForRename(file, oldPath, this.settings)) this.scheduleRefresh();
  }
  scheduleRefresh() {
    if (this.shuttingDown) return;
    this.clearRefreshTimer();
    const win = this.app.workspace.containerEl.ownerDocument.defaultView;
    if (win === null) {
      this.requestRescan();
      return;
    }
    this.refreshTimer = win.setTimeout(() => {
      this.refreshTimer = null;
      void this.refreshTasks();
    }, REFRESH_DEBOUNCE_MS);
  }
  clearRefreshTimer() {
    if (this.refreshTimer === null) return;
    this.app.workspace.containerEl.ownerDocument.defaultView?.clearTimeout(this.refreshTimer);
    this.refreshTimer = null;
  }
  async activateView() {
    const { workspace } = this.app;
    const existing = workspace.getLeavesOfType(VIEW_TYPE_TASK_MATRIX);
    const leaf = existing.length > 0 ? existing[0] : this.settings.openLocation === "sidebar" ? workspace.getRightLeaf(false) : workspace.getLeaf(true);
    if (leaf === null) return;
    await leaf.setViewState({ type: VIEW_TYPE_TASK_MATRIX, active: true });
    await workspace.revealLeaf(leaf);
  }
};
