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
  default: () => CustomWorkspacePlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian9 = require("obsidian");

// src/settings.ts
var import_obsidian2 = require("obsidian");

// src/i18n/en.ts
var en = {
  "\u6211\u7684\u5DE5\u4F5C\u53F0": "My Workspace",
  "\u6253\u5F00\u5DE5\u4F5C\u53F0": "Open workspace",
  "\u5207\u6362\u7F16\u8F91\u6A21\u5F0F": "Toggle edit mode",
  "\u7F16\u8F91\u6A21\u5F0F": "Edit mode",
  "\u5237\u65B0\u5DE5\u4F5C\u53F0": "Refresh workspace",
  "\u5B8C\u6210\u7F16\u8F91": "Finish editing",
  "\u6B63\u5728\u7F16\u8F91\u5DE5\u4F5C\u53F0": "Editing workspace",
  "\u6DFB\u52A0\u7EC4\u4EF6": "Add component",
  "\u4ED3\u5E93\u7EDF\u8BA1": "Vault stats",
  "\u4ECA\u65E5\u4EFB\u52A1": "Today's tasks",
  "\u5FEB\u901F\u8DF3\u8F6C": "Quick jump",
  "\u547D\u4EE4\u6309\u94AE": "Command buttons",
  "\u6BCF\u65E5\u5B57\u6570\u53D8\u5316": "Daily word change",
  "\u5199\u4F5C\u70ED\u529B\u56FE": "Writing heatmap",
  "\u53CC\u94FE\u7EDF\u8BA1\u56FE": "Internal link trend",
  "\u77E5\u8BC6\u5E93\u7ED3\u6784\u5206\u6790": "Knowledge base structure",
  "\u5FEB\u901F\u65B0\u5EFA": "Quick create",
  "Base \u89C6\u56FE": "Base view",
  "Dataview \u67E5\u8BE2": "Dataview query",
  "\u7B14\u8BB0": "Notes",
  "\u9644\u4EF6": "Attachments",
  "\u6587\u4EF6\u5939": "Folders",
  "\u6700\u8FD1\u65B0\u589E": "Recently created",
  "\u53EF\u8BFB\u5B57\u6570": "Readable words",
  "\u94FE\u63A5": "Links",
  "\u5B64\u7ACB\u7B14\u8BB0": "Orphan notes",
  "\u7A7A\u7B14\u8BB0": "Empty notes",
  "\u77ED\u7B14\u8BB0": "Short notes",
  "\u8FC7\u53BB 12 \u4E2A\u6708": "Past 12 months",
  "\u7BC7\u7B14\u8BB0": "notes",
  "\u65B0\u589E\u7B14\u8BB0\u4F18\u5148\u4F7F\u7528 created\uFF0C\u7F3A\u5931\u65F6\u4F7F\u7528\u6587\u4EF6\u521B\u5EFA\u65F6\u95F4": "New notes use the created property first, falling back to the file creation time",
  "\u6309\u7CFB\u7EDF\u4FEE\u6539\u65E5\u671F\u5F52\u7EC4\u5F53\u524D\u5B57\u6570": "Current word counts grouped by system modification date",
  "\u5B57\u6570": "Word count",
  "\u65B0\u589E\u7B14\u8BB0\u6570": "New notes",
  "\u5C11": "Less",
  "\u591A": "More",
  "\u5929": "days",
  "\u5DF2\u89E3\u6790\u5185\u90E8\u94FE\u63A5\u603B\u91CF": "Total resolved internal links",
  "\u6700\u8FD1 30 \u5929": "Last 30 days",
  "\u6BCF\u65E5\u51C0\u589E\u51CF": "Daily net change",
  "\u65E0\u53EF\u6BD4\u8F83\u6570\u636E": "No comparable data",
  "\u659C\u7EB9\u67F1\u6309 created \u4F30\u7B97\uFF1B\u8FDE\u7EED\u771F\u5B9E\u5FEB\u7167\u624D\u4EE3\u8868\u5B9E\u9645\u51C0\u53D8\u5316": "Striped bars are estimated from created; only consecutive real snapshots show actual net change",
  "\u865A\u7EBF\u6309 created \u4F30\u7B97\u7B14\u8BB0\u51FA\u73B0\u65F6\u95F4\uFF0C\u65E0\u6CD5\u8FD8\u539F\u94FE\u63A5\u5B9E\u9645\u6DFB\u52A0\u65E5\u671F": "The dashed line estimates when notes appeared from created; it cannot reconstruct when links were actually added",
  "\u6309\u4E00\u7EA7\u76EE\u5F55\u7EDF\u8BA1 Markdown \u7B14\u8BB0": "Markdown notes grouped by top-level folder",
  "\u6839\u76EE\u5F55": "Vault root",
  "\u7BC7": "notes",
  "\u5B57": "words",
  "\u4ECA\u5929": "Today",
  "\u9057\u7559": "Overdue",
  "\u6700\u8FD1\u5B8C\u6210": "Recently completed",
  "\u6682\u65E0\u5185\u5BB9": "Nothing here yet",
  "\u52A0\u8F7D\u4E2D\u2026": "Loading\u2026",
  "\u91CD\u8BD5": "Retry",
  "\u914D\u7F6E": "Configure",
  "\u5220\u9664": "Delete",
  "\u6807\u9898": "Title",
  "\u65E5\u671F": "Date",
  "\u56FE\u6807": "Icon",
  "\u663E\u793A\u540D": "Label",
  "\u547D\u4EE4": "Command",
  "\u8BF7\u9009\u62E9\u547D\u4EE4": "Select a command",
  "\u8981\u786E\u8BA4": "Require confirmation",
  "\u6DFB\u52A0\u6309\u94AE": "Add button",
  "\u6309\u94AE\u540D\u79F0": "Button label",
  "\u6A21\u677F\u6587\u4EF6": "Template file",
  "\u8BF7\u9009\u62E9\u6A21\u677F\u6587\u4EF6": "Select a template file",
  "\u76EE\u6807\u76EE\u5F55": "Destination folder",
  "\u6587\u4EF6\u540D\u6A21\u5F0F": "Filename pattern",
  "\u6807\u9898\u53D8\u91CF": "Title variable",
  "\u4EE3\u7801": "Code",
  "\u67E5\u8BE2\u4E0A\u4E0B\u6587\u7B14\u8BB0": "Query context note",
  "\u7559\u7A7A\u65F6\u4F7F\u7528\u5F53\u524D\u6D3B\u52A8\u7B14\u8BB0": "Leave blank to use the active note",
  "\u7B14\u8BB0\u8DEF\u5F84\uFF08\u53EF\u9009\uFF09": "Note path (optional)",
  "\u8BF7\u8F93\u5165 Dataview \u67E5\u8BE2\u4EE3\u7801": "Enter a Dataview query",
  "\u5F53\u524D Dataview \u7248\u672C\u4E0D\u652F\u6301\u67E5\u8BE2\u6E32\u67D3": "This Dataview version does not support query rendering",
  "\u627E\u4E0D\u5230\u67E5\u8BE2\u4E0A\u4E0B\u6587\u7B14\u8BB0": "Query context note not found",
  "\u8BF7\u5728\u7F16\u8F91\u6A21\u5F0F\u914D\u7F6E\u5E76\u8BD5\u8FD0\u884C\u67E5\u8BE2": "Configure and test the query in edit mode",
  "\u8BD5\u8FD0\u884C\u5E76\u4FDD\u5B58": "Test and save",
  "\u8BD5\u8FD0\u884C\u6210\u529F\uFF0C\u5DF2\u4FDD\u5B58\u3002": "Test succeeded and was saved.",
  "\u4E0A\u79FB": "Move up",
  "\u4E0B\u79FB": "Move down",
  "\u6574\u884C": "Full width",
  "\u534A\u884C": "Half width",
  "\u4E09\u5206\u4E4B\u4E00": "One third",
  "\u56DB\u5206\u4E4B\u4E00": "One quarter",
  "\u7EC4\u4EF6\u5BBD\u5EA6": "Component width",
  "\u663E\u793A\u6761\u6570": "Item limit",
  "\u76EE\u5F55": "Folder",
  "\u6807\u7B7E": "Tag",
  "Frontmatter \u5C5E\u6027\u540D": "Frontmatter property",
  "Frontmatter \u5C5E\u6027\u503C": "Frontmatter value",
  "\u7EDF\u8BA1\u65B9\u5F0F": "Metric",
  "\u7EDF\u8BA1\u8303\u56F4": "Range",
  "\u7EDF\u8BA1\u9879": "Statistics",
  "\u9700\u8981 Dataview \u63D2\u4EF6": "Requires the Dataview plugin",
  "\u9700\u8981 Templater \u63D2\u4EF6": "Requires the Templater plugin",
  "\u547D\u4EE4\u63A5\u53E3\u4E0D\u53EF\u7528": "Command interface unavailable",
  "\u5DF2\u5728\u8BBE\u7F6E\u91CC\u5173\u95ED\u811A\u672C\u6267\u884C": "Script execution is disabled in settings",
  "\u754C\u9762\u8BED\u8A00": "Interface language",
  "\u8DDF\u968F Obsidian": "Follow Obsidian",
  "\u4E2D\u6587": "Chinese",
  "\u82F1\u6587": "English",
  "\u6392\u7248\u5BC6\u5EA6": "Layout density",
  "\u5BBD\u677E": "Comfortable",
  "\u7D27\u51D1": "Compact",
  "\u542F\u52A8\u65F6\u81EA\u52A8\u6253\u5F00": "Open at startup",
  "\u81EA\u52A8\u6253\u5F00\u65B9\u5F0F": "Startup opening mode",
  "\u65B0\u6807\u7B7E\u9875": "New tab",
  "\u66FF\u6362\u5F53\u524D\u6807\u7B7E\u9875": "Replace current tab",
  "\u65E5\u5FD7\u76EE\u5F55": "Journal folder",
  "\u65E5\u671F\u683C\u5F0F": "Date format",
  "\u6392\u9664\u76EE\u5F55": "Excluded folders",
  "\u7A7A/\u77ED\u7B14\u8BB0\u9608\u503C": "Empty/short note threshold",
  "\u6700\u8FD1\u5929\u6570": "Recent days",
  "\u663E\u793A\u4F30\u7B97\u5386\u53F2": "Show estimated history",
  "\u5141\u8BB8\u6267\u884C\u81EA\u5B9A\u4E49\u811A\u672C": "Allow custom scripts",
  "\u811A\u672C\u53EF\u4EE5\u8BFB\u5199\u4F60\u7684 vault\uFF0C\u53EA\u8FD0\u884C\u4F60\u4FE1\u4EFB\u7684\u4EE3\u7801\u3002": "Scripts can read and write your vault. Only run code you trust.",
  "\u811A\u672C\u76EE\u5F55": "Script directory",
  "\u65B0\u5EFA\u811A\u672C": "New script",
  "\u5DF2\u65B0\u5EFA\u811A\u672C": "Script created",
  "\u5DE5\u4F5C\u53F0\u6570\u636E\u53EA\u5B58\u5728\u63D2\u4EF6\u76EE\u5F55\uFF1B\u6362\u673A\u5668\u6216\u5378\u8F7D\u524D\u8BF7\u81EA\u884C\u5907\u4EFD\u3002": "Workspace data only exists in the plugin directory. Back it up before moving devices or uninstalling.",
  "\u6E05\u7A7A\u5386\u53F2": "Clear history",
  "\u6E05\u7A7A": "Clear",
  "\u5C1A\u65E0\u547D\u4EE4\u6309\u94AE\uFF0C\u8BF7\u5728\u7F16\u8F91\u6A21\u5F0F\u914D\u7F6E\u3002": "No command buttons yet. Configure them in edit mode.",
  "\u5C1A\u65E0\u5FEB\u901F\u65B0\u5EFA\u6309\u94AE\uFF0C\u8BF7\u5728\u7F16\u8F91\u6A21\u5F0F\u914D\u7F6E\u3002": "No quick-create buttons yet. Configure them in edit mode.",
  "\u627E\u4E0D\u5230\u6A21\u677F\u6587\u4EF6": "Template file not found",
  "\u672A\u914D\u7F6E": "Not configured",
  "\u6253\u5F00": "Open",
  "Base \u6587\u4EF6": "Base file",
  "\u8BF7\u9009\u62E9 Base \u6587\u4EF6": "Select a Base file",
  "\u8BF7\u5728\u7F16\u8F91\u6A21\u5F0F\u9009\u62E9 Base \u6587\u4EF6": "Select a Base file in edit mode",
  "\u627E\u4E0D\u5230\u6240\u9009 Base \u6587\u4EF6": "The selected Base file was not found",
  "\u4ED3\u5E93\u4E2D\u6CA1\u6709 .base \u6587\u4EF6": "No .base files were found in the vault",
  "\u4EC5\u663E\u793A\u524D 500 \u9879": "Showing the first 500 items only",
  "\u641C\u7D22\u7B14\u8BB0\u2026": "Search notes\u2026",
  "\u6761\u7ED3\u679C": "results",
  "\u6CA1\u6709\u5339\u914D\u7B14\u8BB0": "No matching notes",
  "\u5173\u95ED": "Close",
  "\u672A\u77E5\u7EC4\u4EF6": "Unknown component",
  "\u8BF7\u8F93\u5165\u503C": "Enter a value",
  "\u968F\u673A\u4E66\u6458": "Random quote",
  "\u5E74\u5EA6\u65F6\u95F4\u7EBF": "Year timeline",
  "\u8BF7\u5728\u7F16\u8F91\u6A21\u5F0F\u914D\u7F6E\u76EE\u5F55\u4E0E\u6807\u7B7E": "Configure folder and tag in edit mode",
  "\u6682\u65E0\u4E66\u6458\u53EF\u663E\u793A": "No quotes to show",
  "\u7B14\u8BB0\u4E2D\u6CA1\u6709\u5339\u914D\u6807\u7B7E\u7684\u884C": "No lines with that tag in the note",
  "\u590D\u5236\u4E66\u6458": "Copy quote",
  "\u6362\u4E00\u6761": "Another one",
  "\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F": "Copied to clipboard",
  "\u5E74\u4EFD\uFF080 \u4E3A\u4ECA\u5E74\uFF09": "Year (0 = current)",
  "\u4ECA\u5929\u7EBF\u56FE\u6807": "Today-line icon",
  "\u4E8B\u4EF6\uFF08\u6708-\u65E5 + \u6807\u9898 + \u56FE\u6807\uFF09": "Events (month-day + title + icon)",
  "\u6DFB\u52A0\u4E8B\u4EF6": "Add event"
};

// src/services/date.ts
var import_obsidian = require("obsidian");
var moment = import_obsidian.moment;

// src/i18n/index.ts
var language = "auto";
function setLanguage(value) {
  language = value;
}
function t(key) {
  var _a;
  const current = language === "auto" ? moment.locale() : language;
  return current.toLowerCase().startsWith("zh") ? key : (_a = en[key]) != null ? _a : key;
}

// src/settings.ts
var CustomWorkspaceSettingTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    this.containerEl.empty();
    new import_obsidian2.Setting(this.containerEl).setName(t("\u754C\u9762\u8BED\u8A00")).addDropdown((dropdown) => dropdown.addOption("auto", t("\u8DDF\u968F Obsidian")).addOption("zh", t("\u4E2D\u6587")).addOption("en", t("\u82F1\u6587")).setValue(this.plugin.config.language).onChange(async (value) => {
      this.plugin.config.language = value;
      setLanguage(this.plugin.config.language);
      await this.plugin.persist();
      this.display();
    }));
    new import_obsidian2.Setting(this.containerEl).setName(t("\u6392\u7248\u5BC6\u5EA6")).addDropdown((dropdown) => dropdown.addOption("comfortable", t("\u5BBD\u677E")).addOption("compact", t("\u7D27\u51D1")).setValue(this.plugin.config.density).onChange(async (value) => {
      this.plugin.config.density = value;
      await this.plugin.persist();
      this.plugin.refreshViews();
    }));
    new import_obsidian2.Setting(this.containerEl).setName(t("\u542F\u52A8\u65F6\u81EA\u52A8\u6253\u5F00")).addToggle((toggle) => toggle.setValue(this.plugin.config.autoOpen).onChange(async (value) => {
      this.plugin.config.autoOpen = value;
      await this.plugin.persist();
    }));
    new import_obsidian2.Setting(this.containerEl).setName(t("\u81EA\u52A8\u6253\u5F00\u65B9\u5F0F")).addDropdown((dropdown) => dropdown.addOption("new-tab", t("\u65B0\u6807\u7B7E\u9875")).addOption("replace", t("\u66FF\u6362\u5F53\u524D\u6807\u7B7E\u9875")).setValue(this.plugin.config.autoOpenMode).onChange(async (value) => {
      this.plugin.config.autoOpenMode = value;
      await this.plugin.persist();
    }));
    textSetting(this.containerEl, t("\u65E5\u5FD7\u76EE\u5F55"), this.plugin.config.journalFolder, async (value) => {
      this.plugin.config.journalFolder = value;
      await this.plugin.persist();
    });
    textSetting(this.containerEl, t("\u65E5\u671F\u683C\u5F0F"), this.plugin.config.dateFormat, async (value) => {
      this.plugin.config.dateFormat = value || "YYYY-MM-DD";
      await this.plugin.persist();
    });
    textSetting(this.containerEl, t("\u6392\u9664\u76EE\u5F55"), this.plugin.config.excludedFolders.join(", "), async (value) => {
      this.plugin.config.excludedFolders = value.split(",").map((item) => item.trim()).filter(Boolean);
      this.plugin.data.history = [];
      this.plugin.data.historyInitialized = false;
      this.plugin.index.invalidate();
      await this.plugin.persist();
      this.plugin.refreshViews();
    });
    numberSetting(this.containerEl, t("\u7A7A/\u77ED\u7B14\u8BB0\u9608\u503C"), this.plugin.config.shortNoteThreshold, async (value) => {
      this.plugin.config.shortNoteThreshold = value;
      this.plugin.index.invalidate();
      await this.plugin.persist();
    });
    numberSetting(this.containerEl, t("\u6700\u8FD1\u5929\u6570"), this.plugin.config.recentDays, async (value) => {
      this.plugin.config.recentDays = value;
      this.plugin.index.invalidate();
      await this.plugin.persist();
    });
    new import_obsidian2.Setting(this.containerEl).setName(t("\u663E\u793A\u4F30\u7B97\u5386\u53F2")).addToggle((toggle) => toggle.setValue(this.plugin.config.showEstimatedHistory).onChange(async (value) => {
      this.plugin.config.showEstimatedHistory = value;
      await this.plugin.persist();
      this.plugin.refreshViews();
    }));
    new import_obsidian2.Setting(this.containerEl).setName(t("\u5141\u8BB8\u6267\u884C\u81EA\u5B9A\u4E49\u811A\u672C")).setDesc(t("\u811A\u672C\u53EF\u4EE5\u8BFB\u5199\u4F60\u7684 vault\uFF0C\u53EA\u8FD0\u884C\u4F60\u4FE1\u4EFB\u7684\u4EE3\u7801\u3002")).addToggle((toggle) => toggle.setValue(this.plugin.config.allowScripts).onChange(async (value) => {
      this.plugin.config.allowScripts = value;
      await this.plugin.persist();
      await this.plugin.reloadScripts();
      this.plugin.refreshViews();
    }));
    new import_obsidian2.Setting(this.containerEl).setName(t("\u811A\u672C\u76EE\u5F55")).setDesc(this.plugin.scriptDirectory()).addButton((button) => button.setButtonText(t("\u65B0\u5EFA\u811A\u672C")).onClick(() => this.plugin.createScript()));
    new import_obsidian2.Setting(this.containerEl).setName(t("\u6E05\u7A7A\u5386\u53F2")).setDesc(t("\u5DE5\u4F5C\u53F0\u6570\u636E\u53EA\u5B58\u5728\u63D2\u4EF6\u76EE\u5F55\uFF1B\u6362\u673A\u5668\u6216\u5378\u8F7D\u524D\u8BF7\u81EA\u884C\u5907\u4EFD\u3002")).addButton((button) => button.setButtonText(t("\u6E05\u7A7A")).onClick(async () => {
      this.plugin.data.history = [];
      this.plugin.data.historyInitialized = true;
      await this.plugin.persist();
    }));
  }
};
function textSetting(container, name, value, change) {
  new import_obsidian2.Setting(container).setName(name).addText((text) => text.setValue(value).onChange(change));
}
function numberSetting(container, name, value, change) {
  new import_obsidian2.Setting(container).setName(name).addText((text) => text.setValue(String(value)).onChange(async (next) => {
    const parsed = Number(next);
    if (Number.isFinite(parsed) && parsed >= 0) await change(parsed);
  }));
}

// src/views/workspace-view.ts
var import_obsidian6 = require("obsidian");

// src/render/workspace-renderer.ts
var import_obsidian5 = require("obsidian");

// src/components/registry.ts
var import_obsidian4 = require("obsidian");

// src/params/parser.ts
function parseScriptMetadata(source, filename) {
  var _a, _b, _c, _d;
  const name = (_a = directive(source, "name")) != null ? _a : filename.replace(/\.js$/i, "");
  const icon = (_b = directive(source, "icon")) != null ? _b : "file-code";
  const description = (_c = directive(source, "desc")) != null ? _c : "";
  const params = [];
  for (const match of source.matchAll(/^\/\/\s*cw:param=([\w-]+):([^|\s]+)(?:\|(.*))?$/gm)) {
    const type = match[2];
    if (!isParamType(type)) continue;
    params.push({ key: match[1], type, defaultValue: parseDefault(type, (_d = match[3]) != null ? _d : "") });
  }
  return { name, icon, description, params };
}
function directive(source, key) {
  var _a, _b;
  return (_b = (_a = source.match(new RegExp(`^//\\s*cw:${key}=(.*)$`, "m"))) == null ? void 0 : _a[1]) == null ? void 0 : _b.trim();
}
function isParamType(type) {
  return ["text", "number", "boolean", "folder", "note", "tag"].includes(type) || /^select:.+/.test(type);
}
function parseDefault(type, value) {
  if (type === "number") return Number.isFinite(Number(value)) ? Number(value) : 0;
  if (type === "boolean") return value === "true";
  return value;
}
function renderFilenamePattern(pattern, title, formatDate) {
  return pattern.replace(/{{date(?::([^}]+))?}}/g, (_all, format) => formatDate(format != null ? format : "YYYY-MM-DD")).replaceAll("{{title}}", title).replace(/[\\/:*?"<>|]/g, "-").trim();
}

// src/services/script-runner.ts
async function runScript(body, context) {
  const execute = new Function("ctx", `return (async () => {
${body}
})()`);
  await execute(context);
}

// src/ui/detail-modal.ts
var import_obsidian3 = require("obsidian");

// src/metrics/note-filter.ts
function readFrontmatterValue(frontmatter, key) {
  let value = frontmatter;
  for (const part of key.split(".").filter(Boolean)) {
    if (typeof value !== "object" || value === null || Array.isArray(value)) return void 0;
    value = value[part];
  }
  return value;
}
function matchesValue(value, expected) {
  if (Array.isArray(value)) return value.some((item) => matchesValue(item, expected));
  if (value === null || value === void 0) return false;
  if (typeof value === "string") return value.toLocaleLowerCase() === expected.toLocaleLowerCase();
  if (typeof value === "number" || typeof value === "boolean") return value.toString().toLocaleLowerCase() === expected.toLocaleLowerCase();
  return false;
}
function matchesNoteFilter(note, filter) {
  var _a, _b, _c, _d, _e;
  const folder = (_a = filter.folder) == null ? void 0 : _a.replace(/^\/+|\/+$/g, "");
  if (folder && !note.path.startsWith(`${folder}/`)) return false;
  const tag = filter.tag ? `#${filter.tag.replace(/^#/, "")}`.toLocaleLowerCase() : "";
  if (tag && !note.tags.some((item) => item.toLocaleLowerCase() === tag)) return false;
  const key = (_c = (_b = filter.frontmatterKey) == null ? void 0 : _b.trim()) != null ? _c : "";
  const expected = (_e = (_d = filter.frontmatterValue) == null ? void 0 : _d.trim()) != null ? _e : "";
  if (key && !matchesValue(readFrontmatterValue(note.frontmatter, key), expected)) return false;
  return true;
}
function filterNotePaths(paths, query) {
  const needle = query.trim().toLocaleLowerCase();
  return needle ? paths.filter((path) => path.toLocaleLowerCase().includes(needle)) : paths;
}

// src/ui/detail-modal.ts
var DetailModal = class extends import_obsidian3.Modal {
  constructor(app, title, paths, plugin) {
    super(app);
    this.title = title;
    this.paths = paths;
    this.plugin = plugin;
    this.cleanups = [];
  }
  onOpen() {
    this.setTitle(`${this.title} (${this.paths.length.toLocaleString()})`);
    const search = this.contentEl.createEl("input", { cls: "cw-modal-search", type: "search", placeholder: t("\u641C\u7D22\u7B14\u8BB0\u2026"), attr: { "aria-label": t("\u641C\u7D22\u7B14\u8BB0\u2026") } });
    const status = this.contentEl.createDiv({ cls: "cw-modal-note" });
    const list = this.contentEl.createDiv({ cls: "cw-modal-list" });
    let rowCleanups = [];
    const draw = () => {
      for (const cleanup of rowCleanups) cleanup();
      rowCleanups = [];
      list.empty();
      const matches = filterNotePaths(this.paths, search.value);
      status.setText(matches.length > 500 ? `${matches.length.toLocaleString()} \xB7 ${t("\u4EC5\u663E\u793A\u524D 500 \u9879")}` : `${matches.length.toLocaleString()} ${t("\u6761\u7ED3\u679C")}`);
      if (!matches.length) {
        list.createDiv({ text: t("\u6CA1\u6709\u5339\u914D\u7B14\u8BB0"), cls: "cw-empty" });
        return;
      }
      for (const path of matches.slice(0, 500)) {
        const file = this.plugin.index.find(path);
        if (file) {
          const item = list.createEl("button", { text: path, cls: "cw-modal-list__item" });
          const open = () => {
            this.close();
            void this.plugin.app.workspace.getLeaf(false).openFile(file);
          };
          item.addEventListener("click", open);
          rowCleanups.push(() => item.removeEventListener("click", open));
        } else list.createDiv({ text: path, cls: "cw-modal-list__item is-static" });
      }
    };
    search.addEventListener("input", draw);
    this.cleanups.push(() => search.removeEventListener("input", draw), () => {
      for (const cleanup of rowCleanups) cleanup();
    });
    draw();
    const footer = this.contentEl.createDiv({ cls: "cw-modal-footer" });
    const close = footer.createEl("button", { text: t("\u5173\u95ED"), cls: "mod-cta" });
    this.listen(close, () => this.close());
  }
  onClose() {
    for (const cleanup of this.cleanups) cleanup();
    this.cleanups = [];
    this.contentEl.empty();
  }
  listen(element, callback) {
    element.addEventListener("click", callback);
    this.cleanups.push(() => element.removeEventListener("click", callback));
  }
};

// src/metrics/analytics.ts
function localDateKey(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function resolveCreatedDate(value, fallbackTimestamp) {
  const fallback = localDateKey(fallbackTimestamp);
  if (typeof value !== "string" && typeof value !== "number") return fallback;
  const match = String(value).trim().match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:\D|$)/);
  if (!match) return fallback;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsed = new Date(year, month - 1, day);
  if (parsed.getFullYear() !== year || parsed.getMonth() !== month - 1 || parsed.getDate() !== day) return fallback;
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
function aggregateHeatmap(notes, now, days = 365) {
  var _a, _b;
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - Math.max(0, days - 1));
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  const startKey = localDateKey(start.getTime());
  const endKey = localDateKey(end.getTime());
  const values = /* @__PURE__ */ new Map();
  for (const note of notes) {
    const createdDate = resolveCreatedDate(note.frontmatterCreated, note.ctime);
    if (createdDate >= startKey && createdDate <= endKey) {
      const createdDay = (_a = values.get(createdDate)) != null ? _a : { date: createdDate, notes: 0, words: 0 };
      createdDay.notes += 1;
      values.set(createdDate, createdDay);
    }
    if (note.mtime >= start.getTime() && note.mtime <= end.getTime()) {
      const modifiedDate = localDateKey(note.mtime);
      const modifiedDay = (_b = values.get(modifiedDate)) != null ? _b : { date: modifiedDate, notes: 0, words: 0 };
      modifiedDay.words += note.words;
      values.set(modifiedDate, modifiedDay);
    }
  }
  return [...values.values()].sort((a, b) => a.date.localeCompare(b.date));
}
function aggregateTopFolders(notes) {
  var _a;
  const folders = /* @__PURE__ */ new Map();
  for (const note of notes) {
    const slash = note.path.indexOf("/");
    const name = slash < 0 ? "" : note.path.slice(0, slash);
    const metric2 = (_a = folders.get(name)) != null ? _a : { name, notes: 0, words: 0, paths: [] };
    metric2.notes += 1;
    metric2.words += note.words;
    metric2.paths.push(note.path);
    folders.set(name, metric2);
  }
  return [...folders.values()].sort((a, b) => b.notes - a.notes || b.words - a.words || a.name.localeCompare(b.name));
}
function activityLevel(count, maximum) {
  if (count <= 0 || maximum <= 0) return 0;
  return Math.min(5, Math.max(1, Math.ceil(count / maximum * 5)));
}
function linePath(values, maximum, width = 100, height = 48) {
  if (!values.length) return "";
  const denominator = Math.max(1, values.length - 1);
  const ceiling = Math.max(1, maximum);
  return values.map((value, index) => `${index ? "L" : "M"} ${(index / denominator * width).toFixed(2)} ${(height - value / ceiling * height).toFixed(2)}`).join(" ");
}
function linePathRange(values, maximum, from, to, width = 100, height = 48) {
  if (!values.length || from < 0 || to < from || from >= values.length) return "";
  const last = Math.min(to, values.length - 1);
  const denominator = Math.max(1, values.length - 1);
  const ceiling = Math.max(1, maximum);
  const commands = [];
  for (let index = from; index <= last; index += 1) {
    commands.push(`${index === from ? "M" : "L"} ${(index / denominator * width).toFixed(2)} ${(height - values[index] / ceiling * height).toFixed(2)}`);
  }
  return commands.join(" ");
}
function areaPath(values, maximum, width = 100, height = 48) {
  const line = linePath(values, maximum, width, height);
  return line ? `${line} L ${width} ${height} L 0 ${height} Z` : "";
}

// src/quotes/parser.ts
function formatBookName(fileName) {
  return `\u300A${fileName.replace(/^【.*?】/, "").trim()}\u300B`;
}
function matchingQuoteLines(text, tag) {
  if (!tag) return [];
  return text.split(/\r?\n/).filter((line) => line.includes(tag));
}
function cleanQuoteText(raw) {
  const cleaned = raw.replace(/#[^\s#]+/g, "").replace(/\[.*?::.*?\]/g, "").replace(/^[#\-*\s>]+/, "").replace(/\s{2,}/g, " ").trim();
  return cleaned || raw.trim();
}
function randomOf(items) {
  return items.length ? items[Math.floor(Math.random() * items.length)] : void 0;
}

// src/ui/classes.ts
function svgClasses(...tokens) {
  return tokens;
}

// src/history/history.ts
function upsertSnapshot(history, snapshot) {
  return [...history.filter((item) => item.date !== snapshot.date), snapshot].sort((a, b) => a.date.localeCompare(b.date));
}
function estimateHistory(notes) {
  const dates = [...new Set(notes.map((note) => note.created))].sort();
  return dates.map((date) => {
    const present = notes.filter((note) => note.created <= date);
    return { date, notes: present.length, words: present.reduce((sum, note) => sum + note.words, 0), links: present.reduce((sum, note) => sum + note.links, 0), estimated: true };
  });
}
function parseLocalDate(value) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : null;
}
function localDateKey2(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function dailyWordChanges(history, endDate, days = 30) {
  const end = parseLocalDate(endDate);
  if (!end || days < 1) return [];
  const sorted = [...history].sort((a, b) => a.date.localeCompare(b.date));
  const start = new Date(end);
  start.setDate(start.getDate() - days);
  const totals = [];
  let snapshotIndex = 0;
  let latest;
  for (let offset = 0; offset <= days; offset += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + offset);
    const key = localDateKey2(date);
    while (snapshotIndex < sorted.length && sorted[snapshotIndex].date <= key) {
      latest = sorted[snapshotIndex];
      snapshotIndex += 1;
    }
    totals.push(latest ? { date: key, words: latest.words, estimated: Boolean(latest.estimated), exact: latest.date === key } : null);
  }
  return totals.slice(1).map((current, index) => {
    var _a;
    const previous = totals[index];
    const date = (_a = current == null ? void 0 : current.date) != null ? _a : localDateKey2(new Date(start.getFullYear(), start.getMonth(), start.getDate() + index + 1));
    if (!current || !previous) return { date, words: null, estimated: true };
    return { date, words: current.words - previous.words, estimated: current.estimated || previous.estimated || !current.exact || !previous.exact };
  });
}

// src/components/registry.ts
function paramString(value, fallback = "") {
  return typeof value === "string" || typeof value === "number" || typeof value === "boolean" ? String(value) : fallback;
}
function paramNumber(value, fallback) {
  if (typeof value !== "string" && typeof value !== "number") return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}
var STAT_KEYS = ["notes", "attachments", "folders", "recent", "words", "links", "orphans", "empty", "short"];
var DEFAULT_STAT_KEYS = ["notes", "attachments", "folders", "recent", "words", "links", "orphans", "empty"];
var STAT_LABELS = {
  notes: "\u7B14\u8BB0",
  attachments: "\u9644\u4EF6",
  folders: "\u6587\u4EF6\u5939",
  recent: "\u6700\u8FD1\u65B0\u589E",
  words: "\u53EF\u8BFB\u5B57\u6570",
  links: "\u94FE\u63A5",
  orphans: "\u5B64\u7ACB\u7B14\u8BB0",
  empty: "\u7A7A\u7B14\u8BB0",
  short: "\u77ED\u7B14\u8BB0"
};
function selectedStats(value) {
  if (!Array.isArray(value)) return [...DEFAULT_STAT_KEYS];
  const selected = value.filter((item) => typeof item === "string" && STAT_KEYS.includes(item));
  return selected;
}
function metric(container, label, value, paths, plugin, host) {
  const button = container.createEl("button", { cls: "cw-metric" });
  button.createSpan({ cls: "cw-metric__value", text: value.toLocaleString() });
  button.createSpan({ cls: "cw-metric__label", text: label });
  if (paths.length) {
    button.addClass("is-clickable");
    host.registerDomEvent(button, "click", () => new DetailModal(plugin.app, label, paths, plugin).open());
  }
}
var vaultStats = {
  id: "builtin/vault-stats",
  name: "\u4ED3\u5E93\u7EDF\u8BA1",
  icon: "database",
  description: "",
  params: [],
  async render(container, block, host, plugin) {
    const data = await plugin.index.metrics();
    await plugin.recordHistory(data);
    const grid = container.createDiv({ cls: "cw-metrics" });
    const selected = selectedStats(block.params.items);
    if (selected.includes("notes")) metric(grid, t("\u7B14\u8BB0"), data.notes, data.notePaths, plugin, host);
    if (selected.includes("attachments")) metric(grid, t("\u9644\u4EF6"), data.attachments, data.attachmentPaths, plugin, host);
    if (selected.includes("folders")) metric(grid, t("\u6587\u4EF6\u5939"), data.folders, data.folderPaths, plugin, host);
    if (selected.includes("recent")) metric(grid, t("\u6700\u8FD1\u65B0\u589E"), data.recent, data.recentPaths, plugin, host);
    if (selected.includes("words")) metric(grid, t("\u53EF\u8BFB\u5B57\u6570"), data.words, data.notePaths, plugin, host);
    if (selected.includes("links")) metric(grid, t("\u94FE\u63A5"), data.links, data.linkedPaths, plugin, host);
    if (selected.includes("orphans")) metric(grid, t("\u5B64\u7ACB\u7B14\u8BB0"), data.orphanPaths.length, data.orphanPaths, plugin, host);
    if (selected.includes("empty")) metric(grid, t("\u7A7A\u7B14\u8BB0"), data.emptyPaths.length, data.emptyPaths, plugin, host);
    if (selected.includes("short")) metric(grid, t("\u77ED\u7B14\u8BB0"), data.shortPaths.length, data.shortPaths, plugin, host);
  }
};
var quickJump = {
  id: "builtin/quick-jump",
  name: "\u5FEB\u901F\u8DF3\u8F6C",
  icon: "files",
  description: "",
  params: [
    { key: "limit", type: "number", defaultValue: 8 },
    { key: "folder", type: "folder", defaultValue: "" },
    { key: "tag", type: "tag", defaultValue: "" },
    { key: "frontmatterKey", type: "text", defaultValue: "" },
    { key: "frontmatterValue", type: "text", defaultValue: "" }
  ],
  async render(container, block, host, plugin) {
    const files = plugin.index.recentNotes(paramNumber(block.params.limit, 8), {
      folder: paramString(block.params.folder),
      tag: paramString(block.params.tag),
      frontmatterKey: paramString(block.params.frontmatterKey),
      frontmatterValue: paramString(block.params.frontmatterValue)
    });
    if (!files.length) {
      container.createDiv({ text: t("\u6682\u65E0\u5185\u5BB9"), cls: "cw-empty" });
      return;
    }
    for (const file of files) {
      const button = container.createEl("button", { cls: "cw-note-link" });
      button.createSpan({ text: file.basename, cls: "cw-note-link__title" });
      button.createEl("time", { text: moment(file.stat.mtime).format("MM-DD HH:mm"), cls: "cw-note-link__time" });
      host.registerDomEvent(button, "click", () => void plugin.app.workspace.getLeaf(false).openFile(file));
    }
  }
};
var commandButtons = {
  id: "builtin/command-buttons",
  name: "\u547D\u4EE4\u6309\u94AE",
  icon: "command",
  description: "",
  params: [],
  async render(container, block, host, plugin) {
    if (!plugin.commands.available()) {
      unavailable(container, t("\u547D\u4EE4\u63A5\u53E3\u4E0D\u53EF\u7528"));
      return;
    }
    const buttons = Array.isArray(block.params.buttons) ? block.params.buttons : [];
    if (!buttons.length) {
      container.createDiv({ text: t("\u5C1A\u65E0\u547D\u4EE4\u6309\u94AE\uFF0C\u8BF7\u5728\u7F16\u8F91\u6A21\u5F0F\u914D\u7F6E\u3002"), cls: "cw-empty" });
      return;
    }
    const wrapper = container.createDiv({ cls: "cw-actions cw-actions--command" });
    for (const definition of buttons) {
      const command = paramString(definition.command);
      const known = plugin.commands.list().some((item) => item.id === command);
      const label = paramString(definition.label).trim() || command;
      const button = wrapper.createEl("button", { text: label, cls: "cw-action-button cw-action-button--command" });
      if (definition.icon) (0, import_obsidian4.setIcon)(button.createSpan({ cls: "cw-button-icon" }), paramString(definition.icon));
      button.disabled = !known;
      host.registerDomEvent(button, "click", () => {
        var _a;
        if (definition.confirm && !((_a = container.ownerDocument.defaultView) == null ? void 0 : _a.confirm(label))) return;
        plugin.commands.execute(command);
      });
    }
  }
};
var templater = {
  id: "builtin/quick-create",
  name: "\u5FEB\u901F\u65B0\u5EFA",
  icon: "file-plus",
  description: "",
  params: [],
  async render(container, block, host, plugin) {
    const api = plugin.bridge.templater();
    if (!api) {
      unavailable(container, t("\u9700\u8981 Templater \u63D2\u4EF6"));
      return;
    }
    const buttons = Array.isArray(block.params.buttons) ? block.params.buttons : [];
    if (!buttons.length) {
      container.createDiv({ text: t("\u5C1A\u65E0\u5FEB\u901F\u65B0\u5EFA\u6309\u94AE\uFF0C\u8BF7\u5728\u7F16\u8F91\u6A21\u5F0F\u914D\u7F6E\u3002"), cls: "cw-empty" });
      return;
    }
    const wrapper = container.createDiv({ cls: "cw-actions cw-actions--create" });
    for (const definition of buttons) {
      const label = paramString(definition.label).trim() || t("\u5FEB\u901F\u65B0\u5EFA");
      const button = wrapper.createEl("button", { text: label, cls: "cw-action-button cw-action-button--create" });
      host.registerDomEvent(button, "click", () => {
        const templatePath = paramString(definition.template);
        const template = plugin.bridge.templaterTemplate(templatePath);
        if (!template) {
          new import_obsidian4.Notice(`${t("\u627E\u4E0D\u5230\u6A21\u677F\u6587\u4EF6")}: ${templatePath || t("\u672A\u914D\u7F6E")}`);
          return;
        }
        const filename = renderFilenamePattern(paramString(definition.filename, "{{date:YYYY-MM-DD}}"), paramString(definition.title), (format) => moment().format(format));
        void api.create_new_note_from_template(template, paramString(definition.folder), filename, true).catch((error) => new import_obsidian4.Notice(error instanceof Error ? error.message : String(error)));
      });
    }
  }
};
var dataview = {
  id: "builtin/dataview",
  name: "Dataview \u67E5\u8BE2",
  icon: "table",
  description: "",
  params: [
    { key: "code", type: "text", defaultValue: "" },
    { key: "source", type: "note", defaultValue: "" }
  ],
  async render(container, block, host, plugin) {
    var _a, _b;
    const api = plugin.bridge.dataview();
    if (!api) {
      unavailable(container, t("\u9700\u8981 Dataview \u63D2\u4EF6"));
      return;
    }
    const code = paramString(block.params.code);
    if (!code.trim()) {
      unavailable(container, t("\u8BF7\u5728\u7F16\u8F91\u6A21\u5F0F\u914D\u7F6E\u5E76\u8BD5\u8FD0\u884C\u67E5\u8BE2"));
      return;
    }
    const configuredSource = paramString(block.params.source);
    const source = configuredSource && plugin.index.find(configuredSource) ? configuredSource : (_b = (_a = plugin.app.workspace.getActiveFile()) == null ? void 0 : _a.path) != null ? _b : "";
    await plugin.bridge.renderDataview(code, source, container, host);
  }
};
var recentCreated = {
  id: "builtin/recent-created",
  name: "\u6700\u8FD1\u65B0\u589E",
  icon: "sparkles",
  description: "",
  params: [
    { key: "days", type: "number", defaultValue: 30 },
    { key: "limit", type: "number", defaultValue: 20 },
    { key: "folder", type: "folder", defaultValue: "" },
    { key: "tag", type: "tag", defaultValue: "" },
    { key: "frontmatterKey", type: "text", defaultValue: "" },
    { key: "frontmatterValue", type: "text", defaultValue: "" }
  ],
  async render(container, block, host, plugin) {
    const files = plugin.index.recentCreatedNotes(paramNumber(block.params.limit, 20), paramNumber(block.params.days, 30), {
      folder: paramString(block.params.folder),
      tag: paramString(block.params.tag),
      frontmatterKey: paramString(block.params.frontmatterKey),
      frontmatterValue: paramString(block.params.frontmatterValue)
    });
    if (!files.length) {
      container.createDiv({ text: t("\u6682\u65E0\u5185\u5BB9"), cls: "cw-empty" });
      return;
    }
    for (const { file, created } of files) {
      const button = container.createEl("button", { cls: "cw-note-link" });
      button.createSpan({ text: file.basename, cls: "cw-note-link__title" });
      button.createEl("time", { text: moment(created).format("YYYY-MM-DD HH:mm"), cls: "cw-note-link__time" });
      host.registerDomEvent(button, "click", () => void plugin.app.workspace.getLeaf(false).openFile(file));
    }
  }
};
var baseView = {
  id: "builtin/base",
  name: "Base \u89C6\u56FE",
  icon: "layout-list",
  description: "",
  params: [{ key: "file", type: "note", defaultValue: "" }],
  async render(container, block, host, plugin) {
    var _a, _b;
    const path = paramString(block.params.file);
    const file = plugin.index.find(path);
    if (!path) {
      unavailable(container, t("\u8BF7\u5728\u7F16\u8F91\u6A21\u5F0F\u9009\u62E9 Base \u6587\u4EF6"));
      return;
    }
    if (!file || file.extension !== "base") {
      unavailable(container, t("\u627E\u4E0D\u5230\u6240\u9009 Base \u6587\u4EF6"));
      return;
    }
    const preview = container.createDiv({ cls: "cw-base-preview" });
    await import_obsidian4.MarkdownRenderer.render(plugin.app, `![[${path}]]`, preview, (_b = (_a = plugin.app.workspace.getActiveFile()) == null ? void 0 : _a.path) != null ? _b : "", host);
    const open = container.createEl("button", { text: t("\u6253\u5F00"), cls: "cw-link-button" });
    host.registerDomEvent(open, "click", () => void plugin.app.workspace.getLeaf(false).openFile(file));
  }
};
var randomQuote = {
  id: "builtin/random-quote",
  name: "\u968F\u673A\u4E66\u6458",
  icon: "quote",
  description: "",
  params: [
    { key: "folder", type: "folder", defaultValue: "" },
    { key: "tag", type: "tag", defaultValue: "" }
  ],
  async render(container, block, host, plugin) {
    var _a;
    const folder = paramString(block.params.folder).replace(/^\/+|\/+$/g, "");
    const rawTag = paramString(block.params.tag).replace(/^#/, "");
    if (!folder || !rawTag) {
      unavailable(container, t("\u8BF7\u5728\u7F16\u8F91\u6A21\u5F0F\u914D\u7F6E\u76EE\u5F55\u4E0E\u6807\u7B7E"));
      return;
    }
    const tag = `#${rawTag}`;
    const wrap = container.createDiv({ cls: "cw-quote" });
    const root = plugin.app.vault.getAbstractFileByPath(folder);
    const pages = [];
    const stack = root instanceof import_obsidian4.TFolder ? [root] : [];
    while (stack.length) {
      const node = stack.pop();
      if (!node) continue;
      if (node instanceof import_obsidian4.TFolder) {
        stack.push(...node.children);
        continue;
      }
      if (!(node instanceof import_obsidian4.TFile) || node.extension !== "md") continue;
      const cache = plugin.app.metadataCache.getFileCache(node);
      if (matchesNoteFilter({ path: node.path, tags: cache ? (_a = (0, import_obsidian4.getAllTags)(cache)) != null ? _a : [] : [], frontmatter: cache == null ? void 0 : cache.frontmatter }, { tag: rawTag })) pages.push(node);
    }
    const draw = async () => {
      wrap.empty();
      const page = randomOf(pages);
      if (!page) {
        wrap.createDiv({ text: t("\u6682\u65E0\u4E66\u6458\u53EF\u663E\u793A"), cls: "cw-empty" });
        return;
      }
      const raw = randomOf(matchingQuoteLines(await plugin.app.vault.cachedRead(page), tag));
      if (!raw) {
        wrap.createDiv({ text: t("\u7B14\u8BB0\u4E2D\u6CA1\u6709\u5339\u914D\u6807\u7B7E\u7684\u884C"), cls: "cw-empty" });
        return;
      }
      const quote = cleanQuoteText(raw);
      const source = formatBookName(page.name);
      const body = wrap.createDiv({ cls: "cw-quote__body" });
      const quoteBlock = body.createEl("blockquote");
      quoteBlock.createEl("p", { text: quote });
      const sourceLine = quoteBlock.createEl("p");
      sourceLine.appendText("\u2014 ");
      sourceLine.createEl("em", { text: source });
      const tools = wrap.createDiv({ cls: "cw-quote__tools" });
      const copy = tools.createEl("button", { cls: "cw-quote__btn", attr: { "aria-label": t("\u590D\u5236\u4E66\u6458") } });
      (0, import_obsidian4.setIcon)(copy, "copy");
      host.registerDomEvent(copy, "click", () => {
        var _a2;
        void ((_a2 = wrap.ownerDocument.defaultView) == null ? void 0 : _a2.navigator.clipboard.writeText(`${quote}

\u2014 ${source}`));
        new import_obsidian4.Notice(t("\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F"));
      });
      const refresh = tools.createEl("button", { cls: "cw-quote__btn", attr: { "aria-label": t("\u6362\u4E00\u6761") } });
      (0, import_obsidian4.setIcon)(refresh, "refresh-cw");
      host.registerDomEvent(refresh, "click", () => void draw());
    };
    await draw();
  }
};
var yearTimeline = {
  id: "builtin/year-timeline",
  name: "\u5E74\u5EA6\u65F6\u95F4\u7EBF",
  icon: "timeline",
  description: "",
  params: [
    { key: "year", type: "number", defaultValue: 0 },
    { key: "todayIcon", type: "text", defaultValue: "\u{1F469}\u200D\u{1F4BB}" }
  ],
  async render(container, block, _host, _plugin) {
    const now = /* @__PURE__ */ new Date();
    const year = paramNumber(block.params.year, 0) || now.getFullYear();
    const todayIcon = paramString(block.params.todayIcon, "\u{1F469}\u200D\u{1F4BB}") || "\u{1F469}\u200D\u{1F4BB}";
    const isLeap = year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
    const daysOfYear = isLeap ? 366 : 365;
    const monthDays = Array.from({ length: 12 }, (_, month) => new Date(year, month + 1, 0).getDate());
    const dayOf = (date) => Math.floor((date.getTime() - new Date(year, 0, 0).getTime()) / 864e5);
    const todayX = year === now.getFullYear() ? dayOf(now) * 10 : null;
    const todayLabel = year === now.getFullYear() ? `${now.getMonth() + 1}/${now.getDate()}` : String(year);
    const svg = container.createSvg("svg", { cls: "cw-yt", attr: { viewBox: `0 -50 ${daysOfYear * 10} 150`, role: "img", "aria-label": `${t("\u5E74\u5EA6\u65F6\u95F4\u7EBF")} ${year}` } });
    let x = 0;
    monthDays.forEach((days, month) => {
      const bar = svg.createSvg("rect", { cls: "cw-yt__bar", attr: { x: String(x), width: String(days * 10), height: "25" } });
      bar.classList.add(`cw-yt__bar--${month % 4}`);
      const label = svg.createSvg("text", { cls: "cw-yt__label", attr: { x: String(x + 8), y: "80" } });
      label.appendChild(container.ownerDocument.createTextNode(`${year}-${String(month + 1).padStart(2, "0")}`));
      x += days * 10;
    });
    if (todayX !== null) {
      svg.createSvg("rect", { cls: "cw-yt__today", attr: { x: String(todayX), y: "10", width: "6", height: "15" } }).setAttribute("aria-label", todayLabel);
      const icon = svg.createSvg("text", { cls: "cw-yt__icon", attr: { x: String(todayX), y: "0", "text-anchor": "middle" } });
      icon.appendChild(container.ownerDocument.createTextNode(todayIcon));
    }
    const events = Array.isArray(block.params.events) ? block.params.events : [];
    for (const event of events) {
      const dateText = paramString(event.date).trim();
      const match = /^(\d{1,2})[-/](\d{1,2})$/.exec(dateText);
      if (!match) continue;
      const date = new Date(year, Number(match[1]) - 1, Number(match[2]));
      const title = paramString(event.title).trim();
      const icon = paramString(event.icon).trim() || "\u{1F6A9}";
      const node = svg.createSvg("text", { cls: "cw-yt__event", attr: { x: String(dayOf(date) * 10), y: "-3", "text-anchor": "middle" } });
      if (title !== "") node.setAttribute("aria-label", title);
      node.appendChild(container.ownerDocument.createTextNode(icon));
    }
  }
};
var wordsTrend = {
  id: "builtin/trends",
  name: "\u6BCF\u65E5\u5B57\u6570\u53D8\u5316",
  icon: "chart-no-axes-column-increasing",
  description: "",
  params: [],
  async render(container, _block, _host, plugin) {
    var _a;
    const metrics = await plugin.index.metrics();
    await plugin.recordHistory(metrics);
    const history = plugin.config.showEstimatedHistory ? plugin.data.history : plugin.data.history.filter((point) => !point.estimated);
    const points = dailyWordChanges(history, moment().format("YYYY-MM-DD"), 30);
    const available = points.filter((point) => point.words !== null);
    if (!available.length) {
      container.createDiv({ text: t("\u6682\u65E0\u5185\u5BB9"), cls: "cw-empty" });
      return;
    }
    const max = Math.max(...available.map((point) => Math.abs(point.words)), 1);
    const summary = container.createDiv({ cls: "cw-analytics-summary" });
    summary.createSpan({ text: t("\u6700\u8FD1 30 \u5929") });
    summary.createSpan({ text: t("\u6BCF\u65E5\u51C0\u589E\u51CF") });
    const frame = container.createDiv({ cls: "cw-chart-frame" });
    const yAxis = frame.createDiv({ cls: "cw-chart-y-axis" });
    yAxis.createSpan({ text: `+${max.toLocaleString()}` });
    yAxis.createSpan({ text: "0" });
    yAxis.createSpan({ text: `\u2212${max.toLocaleString()}` });
    const plot = frame.createDiv({ cls: "cw-chart-plot" });
    const chart = plot.createDiv({ cls: "cw-chart" });
    for (const point of points) {
      const value = (_a = point.words) != null ? _a : 0;
      const classes = ["cw-chart__bar", value < 0 ? "is-negative" : "is-positive"];
      if (point.estimated) classes.push("is-estimated");
      if (point.words === null) classes.push("is-missing");
      const column = chart.createDiv({ cls: "cw-chart__column" });
      const bar = column.createDiv({ cls: classes.join(" ") });
      bar.style.setProperty("--cw-bar-height", `${Math.abs(value) / max * 50}%`);
      const label = point.words === null ? t("\u65E0\u53EF\u6BD4\u8F83\u6570\u636E") : `${value >= 0 ? "+" : "\u2212"}${Math.abs(value).toLocaleString()}`;
      column.setAttr("title", `${point.date}: ${label}`);
      column.ariaLabel = `${point.date}: ${label}`;
    }
    const xAxis = plot.createDiv({ cls: "cw-chart-x-axis" });
    xAxis.createSpan({ text: points[0].date.slice(5) });
    xAxis.createSpan({ text: points[Math.floor(points.length / 2)].date.slice(5) });
    xAxis.createSpan({ text: points[points.length - 1].date.slice(5) });
    if (points.some((point) => point.estimated)) container.createDiv({ text: t("\u659C\u7EB9\u67F1\u6309 created \u4F30\u7B97\uFF1B\u8FDE\u7EED\u771F\u5B9E\u5FEB\u7167\u624D\u4EE3\u8868\u5B9E\u9645\u51C0\u53D8\u5316"), cls: "cw-analytics-note" });
  }
};
var activityHeatmap = {
  id: "builtin/activity-heatmap",
  name: "\u5199\u4F5C\u70ED\u529B\u56FE",
  icon: "calendar-days",
  description: "",
  params: [{ key: "metric", type: "select:\u5B57\u6570,\u65B0\u589E\u7B14\u8BB0\u6570", defaultValue: "\u5B57\u6570" }],
  async render(container, block, _host, plugin) {
    var _a;
    const data = await plugin.index.metrics();
    const useNotes = paramString(block.params.metric, "\u5B57\u6570") === "\u65B0\u589E\u7B14\u8BB0\u6570";
    const values = new Map(data.heatmap.map((day) => [day.date, useNotes ? day.notes : day.words]));
    const maximum = Math.max(0, ...values.values());
    const total = [...values.values()].reduce((sum, value) => sum + value, 0);
    const summary = container.createDiv({ cls: "cw-analytics-summary" });
    summary.createSpan({ text: t("\u8FC7\u53BB 12 \u4E2A\u6708") });
    summary.createSpan({ text: `${total.toLocaleString()} ${useNotes ? t("\u7BC7\u7B14\u8BB0") : t("\u5B57")}` });
    const explanation = useNotes ? t("\u65B0\u589E\u7B14\u8BB0\u4F18\u5148\u4F7F\u7528 created\uFF0C\u7F3A\u5931\u65F6\u4F7F\u7528\u6587\u4EF6\u521B\u5EFA\u65F6\u95F4") : t("\u6309\u7CFB\u7EDF\u4FEE\u6539\u65E5\u671F\u5F52\u7EC4\u5F53\u524D\u5B57\u6570");
    const unit = useNotes ? t("\u7BC7") : t("\u5B57");
    const grid = container.createDiv({ cls: `cw-heatmap${block.span === 3 ? " cw-heatmap--square" : ""}`, attr: { role: "img", "aria-label": explanation } });
    const end = moment().startOf("day");
    const start = end.clone().subtract(364, "days");
    for (let index = 0; index < start.day(); index += 1) grid.createSpan({ cls: "cw-heatmap__blank", attr: { "aria-hidden": "true" } });
    for (let index = 0; index < 365; index += 1) {
      const date = start.clone().add(index, "days").format("YYYY-MM-DD");
      const count = (_a = values.get(date)) != null ? _a : 0;
      grid.createSpan({ cls: `cw-heatmap__day cw-heatmap__day--${activityLevel(count, maximum)}`, attr: { title: `${date}: ${count.toLocaleString()} ${unit}`, "aria-label": `${date}: ${count.toLocaleString()} ${unit}` } });
    }
    const footer = container.createDiv({ cls: "cw-heatmap-legend" });
    footer.createSpan({ text: t("\u5C11") });
    for (let level = 1; level <= 5; level += 1) footer.createSpan({ cls: `cw-heatmap__day cw-heatmap__day--${level}`, attr: { "aria-hidden": "true" } });
    footer.createSpan({ text: t("\u591A") });
    container.createDiv({ text: explanation, cls: "cw-analytics-note" });
  }
};
var linkTrend = {
  id: "builtin/link-trend",
  name: "\u53CC\u94FE\u7EDF\u8BA1\u56FE",
  icon: "link-2",
  description: "",
  params: [{ key: "range", type: "select:90,180,365", defaultValue: "365" }],
  async render(container, block, _host, plugin) {
    const metrics = await plugin.index.metrics();
    await plugin.recordHistory(metrics);
    const range = Math.max(1, paramNumber(block.params.range, 365));
    const cutoff = moment().subtract(range - 1, "days").format("YYYY-MM-DD");
    const history = (plugin.config.showEstimatedHistory ? plugin.data.history : plugin.data.history.filter((point) => !point.estimated)).filter((point) => point.date >= cutoff);
    if (!history.length) {
      container.createDiv({ text: t("\u6682\u65E0\u5185\u5BB9"), cls: "cw-empty" });
      return;
    }
    const values = history.map((point) => point.links);
    const maximum = Math.max(1, ...values);
    const last = history[history.length - 1];
    const summary = container.createDiv({ cls: "cw-analytics-summary" });
    summary.createSpan({ text: `${range} ${t("\u5929")}` });
    summary.createSpan({ text: last.links.toLocaleString() });
    const frame = container.createDiv({ cls: "cw-link-chart-frame" });
    const yAxis = frame.createDiv({ cls: "cw-link-chart-y" });
    yAxis.createSpan({ text: maximum.toLocaleString() });
    yAxis.createSpan({ text: Math.round(maximum / 2).toLocaleString() });
    yAxis.createSpan({ text: "0" });
    const plot = frame.createDiv({ cls: "cw-link-chart-plot" });
    const svg = plot.createSvg("svg", { cls: "cw-link-chart", attr: { viewBox: "0 0 100 48", preserveAspectRatio: "none", role: "img", "aria-label": t("\u5DF2\u89E3\u6790\u5185\u90E8\u94FE\u63A5\u603B\u91CF") } });
    svg.createSvg("line", { cls: "cw-link-chart__grid", attr: { x1: "0", y1: "0", x2: "100", y2: "0" } });
    svg.createSvg("line", { cls: "cw-link-chart__grid", attr: { x1: "0", y1: "24", x2: "100", y2: "24" } });
    svg.createSvg("line", { cls: "cw-link-chart__grid", attr: { x1: "0", y1: "48", x2: "100", y2: "48" } });
    svg.createSvg("path", { cls: "cw-link-chart__area", attr: { d: areaPath(values, maximum) } });
    let lastEstimated = -1;
    history.forEach((point, index) => {
      if (point.estimated) lastEstimated = index;
    });
    if (lastEstimated >= 0) svg.createSvg("path", { cls: svgClasses("cw-link-chart__line", "is-estimated"), attr: { d: linePathRange(values, maximum, 0, lastEstimated) } });
    const actualStart = Math.max(0, history.findIndex((point) => !point.estimated) - 1);
    if (history.some((point) => !point.estimated)) svg.createSvg("path", { cls: "cw-link-chart__line", attr: { d: linePathRange(values, maximum, actualStart, history.length - 1) } });
    svg.createSvg("circle", { cls: "cw-link-chart__point", attr: { cx: "100", cy: String(48 - last.links / maximum * 48), r: "1.2" } });
    const xAxis = plot.createDiv({ cls: "cw-link-chart-x" });
    xAxis.createSpan({ text: history[0].date.slice(5) });
    xAxis.createSpan({ text: last.date.slice(5) });
    if (history.some((point) => point.estimated)) container.createDiv({ text: t("\u865A\u7EBF\u6309 created \u4F30\u7B97\u7B14\u8BB0\u51FA\u73B0\u65F6\u95F4\uFF0C\u65E0\u6CD5\u8FD8\u539F\u94FE\u63A5\u5B9E\u9645\u6DFB\u52A0\u65E5\u671F"), cls: "cw-analytics-note" });
  }
};
var structureAnalysis = {
  id: "builtin/structure",
  name: "\u77E5\u8BC6\u5E93\u7ED3\u6784\u5206\u6790",
  icon: "folders",
  description: "",
  params: [],
  async render(container, _block, host, plugin) {
    const data = await plugin.index.metrics();
    if (!data.topFolders.length) {
      container.createDiv({ text: t("\u6682\u65E0\u5185\u5BB9"), cls: "cw-empty" });
      return;
    }
    container.createDiv({ text: t("\u6309\u4E00\u7EA7\u76EE\u5F55\u7EDF\u8BA1 Markdown \u7B14\u8BB0"), cls: "cw-analytics-note cw-analytics-note--top" });
    const maximum = Math.max(1, ...data.topFolders.map((folder) => folder.notes));
    const grid = container.createDiv({ cls: "cw-structure" });
    for (const folder of data.topFolders) {
      const label = folder.name || t("\u6839\u76EE\u5F55");
      const row = grid.createEl("button", { cls: "cw-structure__row", attr: { "aria-label": `${label}: ${folder.notes} ${t("\u7BC7")}` } });
      (0, import_obsidian4.setIcon)(row.createSpan({ cls: "cw-structure__icon" }), "folder");
      const content = row.createSpan({ cls: "cw-structure__content" });
      const heading = content.createSpan({ cls: "cw-structure__heading" });
      heading.createSpan({ text: label, cls: "cw-structure__name" });
      const figures = heading.createSpan({ cls: "cw-structure__figures" });
      figures.createSpan({ text: `${folder.notes.toLocaleString()} ${t("\u7BC7")}` });
      figures.createSpan({ text: `${new Intl.NumberFormat(void 0, { notation: "compact", maximumFractionDigits: 1 }).format(folder.words)} ${t("\u5B57")}` });
      const track = content.createSpan({ cls: "cw-structure__track" });
      const bar = track.createSpan({ cls: "cw-structure__bar" });
      bar.style.setProperty("--cw-structure-width", `${folder.notes / maximum * 100}%`);
      (0, import_obsidian4.setIcon)(row.createSpan({ cls: "cw-structure__chevron" }), "chevron-right");
      host.registerDomEvent(row, "click", () => new DetailModal(plugin.app, label, folder.paths, plugin).open());
    }
  }
};
var todayTasks = {
  id: "builtin/today-tasks",
  name: "\u4ECA\u65E5\u4EFB\u52A1",
  icon: "list-checks",
  description: "",
  params: [],
  async render(container, _block, host, plugin) {
    await plugin.renderTasks(container, host);
  }
};
var BUILTINS = [vaultStats, todayTasks, quickJump, recentCreated, commandButtons, wordsTrend, activityHeatmap, linkTrend, structureAnalysis, templater, baseView, dataview, randomQuote, yearTimeline];
function builtinDefinitions() {
  return BUILTINS;
}
function builtinById(id) {
  return BUILTINS.find((definition) => definition.id === id);
}
function componentName(definition) {
  var _a;
  const names = {
    "builtin/vault-stats": t("\u4ED3\u5E93\u7EDF\u8BA1"),
    "builtin/today-tasks": t("\u4ECA\u65E5\u4EFB\u52A1"),
    "builtin/quick-jump": t("\u5FEB\u901F\u8DF3\u8F6C"),
    "builtin/command-buttons": t("\u547D\u4EE4\u6309\u94AE"),
    "builtin/trends": t("\u6BCF\u65E5\u5B57\u6570\u53D8\u5316"),
    "builtin/activity-heatmap": t("\u5199\u4F5C\u70ED\u529B\u56FE"),
    "builtin/link-trend": t("\u53CC\u94FE\u7EDF\u8BA1\u56FE"),
    "builtin/structure": t("\u77E5\u8BC6\u5E93\u7ED3\u6784\u5206\u6790"),
    "builtin/quick-create": t("\u5FEB\u901F\u65B0\u5EFA"),
    "builtin/base": t("Base \u89C6\u56FE"),
    "builtin/dataview": t("Dataview \u67E5\u8BE2"),
    "builtin/recent-created": t("\u6700\u8FD1\u65B0\u589E"),
    "builtin/random-quote": t("\u968F\u673A\u4E66\u6458"),
    "builtin/year-timeline": t("\u5E74\u5EA6\u65F6\u95F4\u7EBF")
  };
  return (_a = names[definition.id]) != null ? _a : definition.name;
}
function scriptDefinition(filename, name, icon, description, params) {
  return { id: `script/${filename}`, name, icon, description, params, async render(container, block, host, plugin) {
    if (!plugin.config.allowScripts) {
      unavailable(container, t("\u5DF2\u5728\u8BBE\u7F6E\u91CC\u5173\u95ED\u811A\u672C\u6267\u884C"));
      return;
    }
    const body = await plugin.readScript(filename);
    await runScript(body, {
      app: plugin.app,
      container,
      params: block.params,
      moment,
      component: host,
      size: { width: container.clientWidth, height: container.clientHeight }
    });
  } };
}
function addParamSetting(parent, definition, block, onChange) {
  var _a, _b;
  const labels = {
    limit: t("\u663E\u793A\u6761\u6570"),
    days: t("\u6700\u8FD1\u5929\u6570"),
    folder: t("\u76EE\u5F55"),
    tag: t("\u6807\u7B7E"),
    frontmatterKey: t("Frontmatter \u5C5E\u6027\u540D"),
    frontmatterValue: t("Frontmatter \u5C5E\u6027\u503C"),
    metric: t("\u7EDF\u8BA1\u65B9\u5F0F"),
    range: t("\u7EDF\u8BA1\u8303\u56F4")
  };
  const optionLabels = { "\u5B57\u6570": t("\u5B57\u6570"), "\u65B0\u589E\u7B14\u8BB0\u6570": t("\u65B0\u589E\u7B14\u8BB0\u6570") };
  const setting = new import_obsidian4.Setting(parent).setName((_a = labels[definition.key]) != null ? _a : definition.key);
  const value = (_b = block.params[definition.key]) != null ? _b : definition.defaultValue;
  if (definition.type === "boolean") setting.addToggle((toggle) => toggle.setValue(Boolean(value)).onChange(async (next) => {
    block.params[definition.key] = next;
    await onChange();
  }));
  else if (definition.type === "number") setting.addText((text) => text.setValue(paramString(value, "0")).onChange(async (next) => {
    const parsed = Number(next);
    if (Number.isFinite(parsed)) {
      block.params[definition.key] = parsed;
      await onChange();
    }
  }));
  else if (definition.type.startsWith("select:")) setting.addDropdown((dropdown) => {
    var _a2;
    for (const option of definition.type.slice(7).split(",")) dropdown.addOption(option, (_a2 = optionLabels[option]) != null ? _a2 : option);
    dropdown.setValue(paramString(value)).onChange(async (next) => {
      block.params[definition.key] = next;
      await onChange();
    });
  });
  else setting.addText((text) => text.setValue(paramString(value)).setPlaceholder(t("\u8BF7\u8F93\u5165\u503C")).onChange(async (next) => {
    block.params[definition.key] = next;
    await onChange();
  }));
}
function unavailable(container, message) {
  container.createDiv({ text: message, cls: "cw-unavailable" });
}

// src/workspace/layout.ts
function moveItem(items, index, offset) {
  const target = index + offset;
  if (index < 0 || index >= items.length || target < 0 || target >= items.length) return [...items];
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}
function moveBlock(blocks, index, offset) {
  return moveItem(blocks, index, offset);
}
function moveBlockTo(blocks, from, to) {
  if (from < 0 || from >= blocks.length || to < 0 || to >= blocks.length || from === to) return [...blocks];
  const next = [...blocks];
  const [block] = next.splice(from, 1);
  next.splice(to, 0, block);
  return next;
}

// src/render/workspace-renderer.ts
var WorkspaceRenderer = class extends import_obsidian5.Component {
  constructor(plugin, container, editing) {
    super();
    this.plugin = plugin;
    this.container = container;
    this.editing = editing;
  }
  async render() {
    var _a;
    const scroller = (_a = this.container.closest(".view-content")) != null ? _a : this.container;
    const scrollTop = scroller.scrollTop;
    if (this.scope) {
      this.removeChild(this.scope);
      this.scope.unload();
    }
    this.scope = new import_obsidian5.Component();
    this.addChild(this.scope);
    this.container.empty();
    this.container.toggleClass("is-editing", this.editing());
    if (this.editing()) this.container.createDiv({ text: t("\u6B63\u5728\u7F16\u8F91\u5DE5\u4F5C\u53F0"), cls: "cw-edit-banner" });
    for (const [index, block] of this.plugin.data.workspace.blocks.entries()) this.renderBlock(block, index, this.scope);
    if (this.editing()) this.renderAdd(this.scope);
    scroller.scrollTop = scrollTop;
  }
  renderBlock(block, index, scope) {
    var _a, _b;
    const card = this.container.createDiv({ cls: `cw-block cw-span-${block.span}` });
    const definition = this.plugin.definition(block.componentId);
    const header = card.createDiv({ cls: "cw-block__header" });
    const title = header.createDiv({ cls: "cw-block__title" });
    if (definition) (0, import_obsidian5.setIcon)(title.createSpan({ cls: "cw-block__icon" }), definition.icon);
    const titleText = title.createSpan({ text: block.title || (definition ? componentName(definition) : t("\u672A\u77E5\u7EC4\u4EF6")), cls: "cw-block__name" });
    const body = card.createDiv({ cls: "cw-block__body" });
    body.createDiv({ text: t("\u52A0\u8F7D\u4E2D\u2026"), cls: "cw-loading" });
    let child;
    let previewGeneration = 0;
    const renderPreview = async () => {
      const generation = ++previewGeneration;
      if (child) {
        scope.removeChild(child);
        child.unload();
      }
      body.empty();
      const renderTarget = body.createDiv({ cls: "cw-preview-render" });
      child = new import_obsidian5.Component();
      scope.addChild(child);
      if (!definition) {
        renderTarget.createDiv({ text: t("\u672A\u77E5\u7EC4\u4EF6"), cls: "cw-unavailable" });
        return;
      }
      try {
        await definition.render(renderTarget, block, child, this.plugin);
      } catch (error) {
        if (generation !== previewGeneration) return;
        renderTarget.empty();
        const detail = error instanceof Error ? `${error.message}${error.stack ? `
${error.stack.split("\n").slice(1, 3).join("\n")}` : ""}` : String(error);
        renderTarget.createEl("pre", { text: block.componentId.startsWith("script/") ? `${block.componentId.slice(7)}
${detail}` : detail, cls: "cw-error" });
        const retry = renderTarget.createEl("button", { text: t("\u91CD\u8BD5") });
        scope.registerDomEvent(retry, "click", () => void renderPreview());
      }
    };
    if (this.editing()) {
      this.renderControls(header, card, block, index, (_a = definition == null ? void 0 : definition.params) != null ? _a : [], scope, renderPreview, titleText, definition ? componentName(definition) : t("\u672A\u77E5\u7EC4\u4EF6"));
      this.registerDrag(card, title, block, index, scope);
    }
    const ViewIntersectionObserver = (_b = card.ownerDocument.defaultView) == null ? void 0 : _b.IntersectionObserver;
    if (!ViewIntersectionObserver) {
      void renderPreview();
      return;
    }
    const observer = new ViewIntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        void renderPreview();
      }
    }, { rootMargin: "160px" });
    observer.observe(card);
    scope.register(() => observer.disconnect());
  }
  renderControls(header, card, block, index, params, scope, refreshPreview, titleText, defaultTitle) {
    const controls = header.createDiv({ cls: "cw-block__controls" });
    const button = (icon, label, action) => {
      const element = controls.createEl("button", { attr: { "aria-label": label, title: label } });
      (0, import_obsidian5.setIcon)(element, icon);
      scope.registerDomEvent(element, "click", action);
      return element;
    };
    button("arrow-up", t("\u4E0A\u79FB"), () => void this.move(index, -1));
    button("arrow-down", t("\u4E0B\u79FB"), () => void this.move(index, 1));
    const widths = controls.createDiv({ cls: "cw-width-options", attr: { "aria-label": t("\u7EC4\u4EF6\u5BBD\u5EA6") } });
    const widthOptions = [[3, t("\u56DB\u5206\u4E4B\u4E00"), "25%"], [4, t("\u4E09\u5206\u4E4B\u4E00"), "33%"], [6, t("\u534A\u884C"), "50%"], [12, t("\u6574\u884C"), "100%"]];
    for (const [span, label, bar] of widthOptions) {
      const option = widths.createEl("button", { cls: block.span === span ? "is-active" : "", attr: { "aria-label": label, title: label } });
      option.createSpan({ cls: "cw-width-option__bar", attr: { style: `width:${bar}` } });
      scope.registerDomEvent(option, "click", () => void this.setSpan(block, span));
    }
    button("settings-2", t("\u914D\u7F6E"), () => this.toggleConfig(card, block, params, scope, refreshPreview, titleText, defaultTitle));
    button("trash-2", t("\u5220\u9664"), () => void this.remove(index));
  }
  registerDrag(card, handle, block, index, scope) {
    const clearDragState = () => {
      this.draggedIndex = void 0;
      card.removeClass("is-dragging");
      for (const element of Array.from(this.container.querySelectorAll(".cw-block.is-drag-over"))) element.classList.remove("is-drag-over");
    };
    handle.draggable = true;
    handle.addClass("cw-drag-handle");
    scope.registerDomEvent(handle, "dragstart", (event) => {
      var _a;
      this.draggedIndex = index;
      card.addClass("is-dragging");
      (_a = event.dataTransfer) == null ? void 0 : _a.setData("text/plain", block.id);
      if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
    });
    scope.registerDomEvent(handle, "dragend", clearDragState);
    scope.registerDomEvent(card, "dragover", (event) => {
      if (this.draggedIndex === void 0) return;
      event.preventDefault();
      if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
      card.addClass("is-drag-over");
    });
    scope.registerDomEvent(card, "dragleave", () => card.removeClass("is-drag-over"));
    scope.registerDomEvent(card, "drop", (event) => {
      event.preventDefault();
      const from = this.draggedIndex;
      clearDragState();
      if (from !== void 0) void this.moveTo(from, index);
    });
  }
  toggleConfig(card, block, params, scope, refreshPreview, titleText, defaultTitle) {
    const existing = card.querySelector(".cw-block__config");
    if (existing) {
      void this.render();
      return;
    }
    const config = card.createDiv({ cls: "cw-block__config" });
    new import_obsidian5.Setting(config).setName(t("\u6807\u9898")).addText((text) => {
      var _a;
      return text.setValue((_a = block.title) != null ? _a : "").onChange(async (value) => {
        block.title = value || void 0;
        titleText.setText(block.title || defaultTitle);
        await this.plugin.persist();
      });
    });
    if (block.componentId === "builtin/vault-stats") {
      this.renderStatsEditor(config, block, refreshPreview);
      return;
    }
    if (block.componentId === "builtin/command-buttons") {
      this.renderCommandEditor(config, block, refreshPreview);
      return;
    }
    if (block.componentId === "builtin/quick-create") {
      this.renderQuickCreateEditor(config, block, refreshPreview);
      return;
    }
    if (block.componentId === "builtin/base") {
      this.renderBaseEditor(config, block, refreshPreview);
      return;
    }
    if (block.componentId === "builtin/dataview") {
      this.renderDataviewEditor(config, block, scope, refreshPreview);
      return;
    }
    if (block.componentId === "builtin/year-timeline") {
      this.renderTimelineEditor(config, block, refreshPreview);
      return;
    }
    for (const param of params) addParamSetting(config, param, block, async () => {
      await this.plugin.persist();
      await refreshPreview();
    });
  }
  renderStatsEditor(container, block, refreshPreview) {
    const selected = new Set(selectedStats(block.params.items));
    const group = container.createDiv({ cls: "cw-stats-editor" });
    group.createEl("h4", { text: t("\u7EDF\u8BA1\u9879") });
    for (const [key, label] of Object.entries(STAT_LABELS)) {
      new import_obsidian5.Setting(group).setName(t(label)).addToggle((toggle) => toggle.setValue(selected.has(key)).onChange(async (enabled) => {
        if (enabled) selected.add(key);
        else selected.delete(key);
        block.params.items = [...selected];
        await this.plugin.persist();
        await refreshPreview();
      }));
    }
  }
  renderCommandEditor(container, block, refreshPreview) {
    const values = Array.isArray(block.params.buttons) ? block.params.buttons.filter((value) => typeof value === "object" && value !== null && !Array.isArray(value)) : [];
    const draw = () => {
      var _a;
      (_a = container.querySelector(".cw-command-editor")) == null ? void 0 : _a.remove();
      const editor = container.createDiv({ cls: "cw-command-editor" });
      values.forEach((value, index) => {
        const row = editor.createDiv({ cls: "cw-command-editor__row" });
        new import_obsidian5.Setting(row).setName(t("\u663E\u793A\u540D")).addText((text) => text.setValue(typeof value.label === "string" ? value.label : "").onChange(async (next) => {
          value.label = next;
          await this.plugin.persist();
          await refreshPreview();
        }));
        new import_obsidian5.Setting(row).setName(t("\u547D\u4EE4")).addDropdown((dropdown) => {
          dropdown.addOption("", t("\u8BF7\u9009\u62E9\u547D\u4EE4"));
          for (const command of this.plugin.commands.list()) dropdown.addOption(command.id, command.name);
          dropdown.setValue(typeof value.command === "string" ? value.command : "").onChange(async (next) => {
            value.command = next;
            await this.plugin.persist();
            await refreshPreview();
          });
        });
        new import_obsidian5.Setting(row).setName(t("\u8981\u786E\u8BA4")).addToggle((toggle) => toggle.setValue(value.confirm === true).onChange(async (next) => {
          value.confirm = next;
          await this.plugin.persist();
          await refreshPreview();
        }));
        new import_obsidian5.Setting(row).addButton((button) => button.setIcon("arrow-up").setTooltip(t("\u4E0A\u79FB")).setDisabled(index === 0).onClick(async () => {
          values.splice(0, values.length, ...moveItem(values, index, -1));
          block.params.buttons = values;
          await this.plugin.persist();
          await refreshPreview();
          draw();
        })).addButton((button) => button.setIcon("arrow-down").setTooltip(t("\u4E0B\u79FB")).setDisabled(index === values.length - 1).onClick(async () => {
          values.splice(0, values.length, ...moveItem(values, index, 1));
          block.params.buttons = values;
          await this.plugin.persist();
          await refreshPreview();
          draw();
        })).addButton((button) => button.setButtonText(t("\u5220\u9664")).onClick(async () => {
          values.splice(index, 1);
          block.params.buttons = values;
          await this.plugin.persist();
          await refreshPreview();
          draw();
        }));
      });
      new import_obsidian5.Setting(editor).addButton((button) => button.setButtonText(t("\u6DFB\u52A0\u6309\u94AE")).setCta().onClick(async () => {
        values.push({ label: "", command: "", confirm: false });
        block.params.buttons = values;
        await this.plugin.persist();
        await refreshPreview();
        draw();
      }));
    };
    draw();
  }
  renderQuickCreateEditor(container, block, refreshPreview) {
    const values = Array.isArray(block.params.buttons) ? block.params.buttons.filter((value) => typeof value === "object" && value !== null && !Array.isArray(value)) : [];
    const draw = () => {
      var _a;
      (_a = container.querySelector(".cw-create-editor")) == null ? void 0 : _a.remove();
      const editor = container.createDiv({ cls: "cw-create-editor" });
      values.forEach((value, index) => {
        const row = editor.createDiv({ cls: "cw-command-editor__row" });
        new import_obsidian5.Setting(row).setName(t("\u6309\u94AE\u540D\u79F0")).addText((text) => text.setValue(typeof value.label === "string" ? value.label : "").onChange(async (next) => {
          value.label = next;
          await this.plugin.persist();
          await refreshPreview();
        }));
        new import_obsidian5.Setting(row).setName(t("\u6A21\u677F\u6587\u4EF6")).addDropdown((dropdown) => {
          const current = typeof value.template === "string" ? value.template : "";
          const files = this.plugin.bridge.templaterTemplates();
          dropdown.addOption("", t("\u8BF7\u9009\u62E9\u6A21\u677F\u6587\u4EF6"));
          if (current && !files.some((file) => file.path === current)) dropdown.addOption(current, current);
          for (const file of files) dropdown.addOption(file.path, file.path);
          dropdown.setValue(current).onChange(async (next) => {
            value.template = next;
            await this.plugin.persist();
            await refreshPreview();
          });
        });
        new import_obsidian5.Setting(row).setName(t("\u76EE\u6807\u76EE\u5F55")).addText((text) => text.setValue(typeof value.folder === "string" ? value.folder : "").onChange(async (next) => {
          value.folder = next;
          await this.plugin.persist();
          await refreshPreview();
        }));
        new import_obsidian5.Setting(row).setName(t("\u6587\u4EF6\u540D\u6A21\u5F0F")).addText((text) => text.setValue(typeof value.filename === "string" ? value.filename : "{{date:YYYY-MM-DD}} {{title}}").onChange(async (next) => {
          value.filename = next;
          await this.plugin.persist();
          await refreshPreview();
        }));
        new import_obsidian5.Setting(row).setName(t("\u6807\u9898\u53D8\u91CF")).addText((text) => text.setValue(typeof value.title === "string" ? value.title : "").onChange(async (next) => {
          value.title = next;
          await this.plugin.persist();
          await refreshPreview();
        }));
        new import_obsidian5.Setting(row).addButton((button) => button.setIcon("arrow-up").setTooltip(t("\u4E0A\u79FB")).setDisabled(index === 0).onClick(async () => {
          values.splice(0, values.length, ...moveItem(values, index, -1));
          block.params.buttons = values;
          await this.plugin.persist();
          await refreshPreview();
          draw();
        })).addButton((button) => button.setIcon("arrow-down").setTooltip(t("\u4E0B\u79FB")).setDisabled(index === values.length - 1).onClick(async () => {
          values.splice(0, values.length, ...moveItem(values, index, 1));
          block.params.buttons = values;
          await this.plugin.persist();
          await refreshPreview();
          draw();
        })).addButton((button) => button.setButtonText(t("\u5220\u9664")).onClick(async () => {
          values.splice(index, 1);
          block.params.buttons = values;
          await this.plugin.persist();
          await refreshPreview();
          draw();
        }));
      });
      new import_obsidian5.Setting(editor).addButton((button) => button.setButtonText(t("\u6DFB\u52A0\u6309\u94AE")).setCta().onClick(async () => {
        values.push({ label: "", template: "", folder: "", filename: "{{date:YYYY-MM-DD}} {{title}}", title: "" });
        block.params.buttons = values;
        await this.plugin.persist();
        await refreshPreview();
        draw();
      }));
    };
    draw();
  }
  renderBaseEditor(container, block, refreshPreview) {
    const files = this.plugin.app.vault.getFiles().filter((file) => file.extension === "base").sort((a, b) => a.path.localeCompare(b.path));
    if (!files.length) {
      container.createDiv({ text: t("\u4ED3\u5E93\u4E2D\u6CA1\u6709 .base \u6587\u4EF6"), cls: "cw-unavailable" });
      return;
    }
    new import_obsidian5.Setting(container).setName(t("Base \u6587\u4EF6")).addDropdown((dropdown) => {
      dropdown.addOption("", t("\u8BF7\u9009\u62E9 Base \u6587\u4EF6"));
      for (const file of files) dropdown.addOption(file.path, file.path);
      dropdown.setValue(typeof block.params.file === "string" ? block.params.file : "").onChange(async (value) => {
        block.params.file = value;
        await this.plugin.persist();
        await refreshPreview();
      });
    });
  }
  renderDataviewEditor(container, block, scope, refreshPreview) {
    let draft = typeof block.params.code === "string" ? block.params.code : "";
    let draftSource = typeof block.params.source === "string" ? block.params.source : "";
    new import_obsidian5.Setting(container).setName(t("\u67E5\u8BE2\u4E0A\u4E0B\u6587\u7B14\u8BB0")).setDesc(t("\u7559\u7A7A\u65F6\u4F7F\u7528\u5F53\u524D\u6D3B\u52A8\u7B14\u8BB0")).addText((text) => text.setValue(draftSource).setPlaceholder(t("\u7B14\u8BB0\u8DEF\u5F84\uFF08\u53EF\u9009\uFF09")).onChange((value) => {
      draftSource = value.trim();
    }));
    const area = container.createEl("textarea", { cls: "cw-code-input", attr: { rows: "8", "aria-label": t("\u4EE3\u7801") } });
    area.value = draft;
    scope.registerDomEvent(area, "input", () => {
      draft = area.value;
    });
    const preview = container.createDiv({ cls: "cw-dataview-preview" });
    let testChild;
    new import_obsidian5.Setting(container).addButton((button) => button.setButtonText(t("\u8BD5\u8FD0\u884C\u5E76\u4FDD\u5B58")).setCta().onClick(async () => {
      var _a;
      preview.empty();
      if (!this.plugin.bridge.dataview()) {
        preview.setText(t("\u9700\u8981 Dataview \u63D2\u4EF6"));
        return;
      }
      if (!draft.trim()) {
        preview.setText(t("\u8BF7\u8F93\u5165 Dataview \u67E5\u8BE2\u4EE3\u7801"));
        return;
      }
      if (draftSource && !this.plugin.index.find(draftSource)) {
        preview.setText(t("\u627E\u4E0D\u5230\u67E5\u8BE2\u4E0A\u4E0B\u6587\u7B14\u8BB0"));
        return;
      }
      if (testChild) {
        scope.removeChild(testChild);
        testChild.unload();
      }
      testChild = new import_obsidian5.Component();
      scope.addChild(testChild);
      const source = draftSource || ((_a = this.plugin.app.workspace.getActiveFile()) == null ? void 0 : _a.path) || "";
      try {
        await this.plugin.bridge.renderDataview(draft, source, preview, testChild);
        block.params.code = draft;
        block.params.source = draftSource;
        await this.plugin.persist();
        await refreshPreview();
        preview.createDiv({ text: t("\u8BD5\u8FD0\u884C\u6210\u529F\uFF0C\u5DF2\u4FDD\u5B58\u3002"), cls: "cw-success" });
      } catch (error) {
        preview.createEl("pre", { text: error instanceof Error ? error.message : String(error), cls: "cw-error" });
      }
    }));
  }
  renderAdd(scope) {
    const section = this.container.createDiv({ cls: "cw-add" });
    section.createEl("h3", { text: t("\u6DFB\u52A0\u7EC4\u4EF6") });
    for (const definition of this.plugin.definitions()) {
      const button = section.createEl("button", { text: componentName(definition) });
      const icon = button.createSpan({ cls: "cw-button-icon" });
      (0, import_obsidian5.setIcon)(icon, definition.icon);
      scope.registerDomEvent(button, "click", () => void this.plugin.addBlock(definition));
    }
  }
  renderTimelineEditor(container, block, refreshPreview) {
    const values = Array.isArray(block.params.events) ? block.params.events.filter((value) => typeof value === "object" && value !== null && !Array.isArray(value)) : [];
    const draw = () => {
      var _a;
      (_a = container.querySelector(".cw-timeline-editor")) == null ? void 0 : _a.remove();
      const editor = container.createDiv({ cls: "cw-timeline-editor" });
      new import_obsidian5.Setting(editor).setName(t("\u5E74\u4EFD\uFF080 \u4E3A\u4ECA\u5E74\uFF09")).addText((text) => text.setValue(String(typeof block.params.year === "number" ? block.params.year : 0)).onChange(async (next) => {
        const parsed = Number(next);
        block.params.year = Number.isFinite(parsed) ? parsed : 0;
        await this.plugin.persist();
        await refreshPreview();
      }));
      new import_obsidian5.Setting(editor).setName(t("\u4ECA\u5929\u7EBF\u56FE\u6807")).addText((text) => text.setValue(typeof block.params.todayIcon === "string" ? block.params.todayIcon : "\u{1F469}\u200D\u{1F4BB}").onChange(async (next) => {
        block.params.todayIcon = next;
        await this.plugin.persist();
        await refreshPreview();
      }));
      editor.createEl("h4", { text: t("\u4E8B\u4EF6\uFF08\u6708-\u65E5 + \u6807\u9898 + \u56FE\u6807\uFF09") });
      values.forEach((value, index) => {
        const row = editor.createDiv({ cls: "cw-command-editor__row" });
        new import_obsidian5.Setting(row).setName(t("\u65E5\u671F")).addText((text) => text.setValue(typeof value.date === "string" ? value.date : "").setPlaceholder("05-01").onChange(async (next) => {
          value.date = next;
          await this.plugin.persist();
          await refreshPreview();
        }));
        new import_obsidian5.Setting(row).setName(t("\u6807\u9898")).addText((text) => text.setValue(typeof value.title === "string" ? value.title : "").onChange(async (next) => {
          value.title = next;
          await this.plugin.persist();
          await refreshPreview();
        }));
        new import_obsidian5.Setting(row).setName(t("\u56FE\u6807")).addText((text) => text.setValue(typeof value.icon === "string" ? value.icon : "").setPlaceholder("\u{1F6A9}").onChange(async (next) => {
          value.icon = next;
          await this.plugin.persist();
          await refreshPreview();
        }));
        new import_obsidian5.Setting(row).addButton((button) => button.setButtonText(t("\u5220\u9664")).onClick(async () => {
          values.splice(index, 1);
          block.params.events = values;
          await this.plugin.persist();
          await refreshPreview();
          draw();
        }));
      });
      new import_obsidian5.Setting(editor).addButton((button) => button.setButtonText(t("\u6DFB\u52A0\u4E8B\u4EF6")).setCta().onClick(async () => {
        values.push({ date: "", title: "", icon: "\u{1F6A9}" });
        block.params.events = values;
        await this.plugin.persist();
        await refreshPreview();
        draw();
      }));
    };
    draw();
  }
  async move(index, offset) {
    this.plugin.data.workspace.blocks = moveBlock(this.plugin.data.workspace.blocks, index, offset);
    await this.persist();
  }
  async moveTo(from, to) {
    this.plugin.data.workspace.blocks = moveBlockTo(this.plugin.data.workspace.blocks, from, to);
    await this.persist();
  }
  async setSpan(block, span) {
    block.span = span;
    await this.persist();
  }
  async remove(index) {
    this.plugin.data.workspace.blocks.splice(index, 1);
    await this.persist();
  }
  async persist() {
    await this.plugin.persist();
    await this.render();
  }
};

// src/views/workspace-view.ts
var WORKSPACE_VIEW_TYPE = "cw-workspace";
var CustomWorkspaceView = class extends import_obsidian6.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.editing = false;
  }
  getViewType() {
    return WORKSPACE_VIEW_TYPE;
  }
  getDisplayText() {
    return t("\u6211\u7684\u5DE5\u4F5C\u53F0");
  }
  getIcon() {
    return "home";
  }
  async onOpen() {
    this.contentEl.addClass("cw-root", `cw-density-${this.plugin.config.density}`);
    this.addAction("refresh-cw", t("\u5237\u65B0\u5DE5\u4F5C\u53F0"), () => void this.refreshWorkspace());
    this.modeAction = this.addAction("pencil", t("\u7F16\u8F91\u6A21\u5F0F"), () => this.toggleEditing());
    this.modeAction.addClass("cw-mode-toggle");
    this.renderer = new WorkspaceRenderer(this.plugin, this.contentEl, () => this.editing);
    this.addChild(this.renderer);
    await this.renderer.render();
  }
  async onClose() {
    this.renderer = void 0;
    this.modeAction = void 0;
    this.contentEl.empty();
  }
  async refresh() {
    var _a;
    await ((_a = this.renderer) == null ? void 0 : _a.render());
  }
  async refreshWorkspace() {
    this.plugin.index.invalidate();
    await this.plugin.reloadScripts();
    await this.refresh();
  }
  toggleEditing() {
    this.editing = !this.editing;
    this.updateModeAction();
    void this.refresh();
  }
  updateModeAction() {
    if (!this.modeAction) return;
    (0, import_obsidian6.setIcon)(this.modeAction, this.editing ? "check" : "pencil");
    const label = this.editing ? t("\u5B8C\u6210\u7F16\u8F91") : t("\u7F16\u8F91\u6A21\u5F0F");
    this.modeAction.setAttribute("aria-label", label);
    this.modeAction.setAttribute("title", label);
    this.modeAction.toggleClass("is-editing", this.editing);
  }
};

// src/types.ts
var DEFAULT_SETTINGS = {
  language: "auto",
  density: "comfortable",
  autoOpen: true,
  autoOpenMode: "new-tab",
  journalFolder: "",
  dateFormat: "YYYY-MM-DD",
  excludedFolders: [],
  shortNoteThreshold: 10,
  recentDays: 7,
  showEstimatedHistory: true,
  allowScripts: false
};
var DEFAULT_DATA = {
  version: 5,
  settings: DEFAULT_SETTINGS,
  workspace: { blocks: [
    { id: "default-stats", componentId: "builtin/vault-stats", span: 12, params: {} },
    { id: "default-tasks", componentId: "builtin/today-tasks", span: 12, params: {} },
    { id: "default-jump", componentId: "builtin/quick-jump", span: 12, params: { limit: 8 } },
    { id: "default-commands", componentId: "builtin/command-buttons", span: 12, params: { buttons: [] } }
  ] },
  history: [],
  historyInitialized: false
};
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function mergeSettings(value) {
  if (!isRecord(value)) return { ...DEFAULT_SETTINGS };
  const result = { ...DEFAULT_SETTINGS };
  if (["auto", "zh", "en"].includes(String(value.language))) result.language = value.language;
  if (["comfortable", "compact"].includes(String(value.density))) result.density = value.density;
  if (typeof value.autoOpen === "boolean") result.autoOpen = value.autoOpen;
  if (["new-tab", "replace"].includes(String(value.autoOpenMode))) result.autoOpenMode = value.autoOpenMode;
  if (typeof value.journalFolder === "string") result.journalFolder = value.journalFolder;
  if (typeof value.dateFormat === "string" && value.dateFormat) result.dateFormat = value.dateFormat;
  if (Array.isArray(value.excludedFolders)) result.excludedFolders = value.excludedFolders.filter((x) => typeof x === "string");
  if (typeof value.shortNoteThreshold === "number" && value.shortNoteThreshold >= 0) result.shortNoteThreshold = value.shortNoteThreshold;
  if (typeof value.recentDays === "number" && value.recentDays > 0) result.recentDays = value.recentDays;
  if (typeof value.showEstimatedHistory === "boolean") result.showEstimatedHistory = value.showEstimatedHistory;
  if (typeof value.allowScripts === "boolean") result.allowScripts = value.allowScripts;
  return result;
}
function migrateData(value) {
  if (!isRecord(value)) return structuredClone(DEFAULT_DATA);
  const workspace = isRecord(value.workspace) && Array.isArray(value.workspace.blocks) ? { blocks: value.workspace.blocks.filter(isBlock).filter((block) => block.componentId !== "builtin/graph").map(migrateBlock) } : structuredClone(DEFAULT_DATA.workspace);
  const sourceVersion = typeof value.version === "number" ? value.version : 0;
  const storedHistory = Array.isArray(value.history) ? value.history.filter(isSnapshot) : [];
  const history = sourceVersion < 4 ? storedHistory.filter((point) => !point.estimated) : storedHistory;
  return {
    version: 5,
    settings: mergeSettings(value.settings),
    workspace,
    history,
    historyInitialized: sourceVersion < 4 ? false : typeof value.historyInitialized === "boolean" ? value.historyInitialized : history.length > 0
  };
}
function migrateBlock(block) {
  var _a, _b, _c, _d;
  if (block.componentId === "builtin/note-health") return { ...block, componentId: "builtin/vault-stats", params: { ...block.params, items: ["orphans", "empty", "short"] } };
  if (block.componentId === "builtin/quick-create" && !Array.isArray(block.params.buttons)) {
    return { ...block, params: { buttons: [{
      label: "\u5FEB\u901F\u65B0\u5EFA",
      template: (_a = block.params.template) != null ? _a : "",
      folder: (_b = block.params.folder) != null ? _b : "",
      filename: (_c = block.params.filename) != null ? _c : "{{date:YYYY-MM-DD}} {{title}}",
      title: (_d = block.params.title) != null ? _d : ""
    }] } };
  }
  return block;
}
function isBlock(value) {
  return isRecord(value) && typeof value.id === "string" && typeof value.componentId === "string" && [3, 4, 6, 12].includes(Number(value.span)) && isRecord(value.params);
}
function isSnapshot(value) {
  return isRecord(value) && typeof value.date === "string" && typeof value.notes === "number" && typeof value.links === "number" && typeof value.words === "number";
}

// src/services/command-service.ts
var CommandService = class {
  constructor(app) {
    this.app = app;
  }
  registry() {
    return this.app.commands;
  }
  available() {
    var _a;
    return typeof ((_a = this.registry()) == null ? void 0 : _a.executeCommandById) === "function";
  }
  list() {
    var _a, _b;
    return Object.values((_b = (_a = this.registry()) == null ? void 0 : _a.commands) != null ? _b : {}).sort((a, b) => a.name.localeCompare(b.name));
  }
  execute(id) {
    var _a, _b;
    (_b = (_a = this.registry()) == null ? void 0 : _a.executeCommandById) == null ? void 0 : _b.call(_a, id);
  }
};

// src/services/plugin-bridge.ts
var import_obsidian7 = require("obsidian");

// src/params/template-path.ts
function cleanPath(path) {
  return path.trim().replace(/\\/g, "/").replace(/^\/+|\/+$/g, "").replace(/\/{2,}/g, "/");
}
function templatePathCandidates(input, templateFolder = "") {
  const path = cleanPath(input);
  const folder = cleanPath(templateFolder);
  if (!path) return [];
  const withExtension = path.toLowerCase().endsWith(".md") ? path : `${path}.md`;
  const candidates = [withExtension];
  if (folder && withExtension !== folder && !withExtension.startsWith(`${folder}/`)) candidates.push(`${folder}/${withExtension}`);
  return [...new Set(candidates)];
}

// src/services/plugin-bridge.ts
var PluginBridge = class {
  constructor(app) {
    this.app = app;
  }
  plugins() {
    var _a, _b;
    return (_b = (_a = this.app.plugins) == null ? void 0 : _a.plugins) != null ? _b : {};
  }
  dataview() {
    var _a;
    const plugin = this.plugins().dataview;
    return typeof ((_a = plugin == null ? void 0 : plugin.api) == null ? void 0 : _a.executeJs) === "function" ? plugin.api : void 0;
  }
  /**
   * 按代码形态自动分流：TABLE/LIST/TASK/CALENDAR/FROM 开头是 dataview 查询，
   * 走 tryQueryMarkdown → MarkdownRenderer（普通 markdown，无需处理器）；
   * 其余按 DataviewJS 走官方 executeJs。失败抛错，由调用方展示。
   */
  async renderDataview(code, source, container, host) {
    const api = this.dataview();
    if (!api) throw new Error(t("\u9700\u8981 Dataview \u63D2\u4EF6"));
    if (/^\s*(TABLE|LIST|TASK|CALENDAR|FROM)\b/i.test(code)) {
      if (typeof api.tryQueryMarkdown !== "function") throw new Error(t("\u5F53\u524D Dataview \u7248\u672C\u4E0D\u652F\u6301\u67E5\u8BE2\u6E32\u67D3"));
      const markdown = await api.tryQueryMarkdown(code, source);
      container.empty();
      await import_obsidian7.MarkdownRenderer.render(this.app, markdown, container, source, host);
      host.registerDomEvent(container, "click", (event) => {
        var _a;
        const target = event.target instanceof HTMLElement ? event.target : null;
        const anchor = target == null ? void 0 : target.closest("a.internal-link");
        if (!(anchor instanceof HTMLAnchorElement)) return;
        const href = (_a = anchor.dataset.href) != null ? _a : anchor.getAttribute("href");
        if (!href) return;
        event.preventDefault();
        let path = href;
        try {
          path = decodeURIComponent(href);
        } catch (e) {
        }
        void this.app.workspace.openLinkText(path, source, false);
      });
      return;
    }
    await api.executeJs(code, container, host, source);
  }
  templater() {
    var _a;
    const plugin = this.plugins()["templater-obsidian"];
    return typeof ((_a = plugin == null ? void 0 : plugin.templater) == null ? void 0 : _a.create_new_note_from_template) === "function" ? plugin.templater : void 0;
  }
  templaterTemplate(path) {
    var _a;
    const plugin = this.plugins()["templater-obsidian"];
    const folder = typeof ((_a = plugin == null ? void 0 : plugin.settings) == null ? void 0 : _a.templates_folder) === "string" ? plugin.settings.templates_folder : "";
    for (const candidate of templatePathCandidates(path, folder)) {
      const file = this.app.vault.getAbstractFileByPath((0, import_obsidian7.normalizePath)(candidate));
      if (file instanceof import_obsidian7.TFile && file.extension === "md") return file;
    }
    return null;
  }
  templaterTemplates() {
    var _a;
    const plugin = this.plugins()["templater-obsidian"];
    const folder = typeof ((_a = plugin == null ? void 0 : plugin.settings) == null ? void 0 : _a.templates_folder) === "string" ? (0, import_obsidian7.normalizePath)(plugin.settings.templates_folder) : "";
    return this.app.vault.getMarkdownFiles().filter((file) => !folder || file.path === folder || file.path.startsWith(`${folder}/`)).sort((a, b) => a.path.localeCompare(b.path));
  }
};

// src/services/vault-index.ts
var import_obsidian8 = require("obsidian");

// src/metrics/text.ts
function stripFrontmatter(input) {
  var _a;
  const lines = input.replace(/^FEFF/, "").split(/\r?\n/);
  if (((_a = lines[0]) == null ? void 0 : _a.trimEnd()) !== "---") return input;
  for (let i = 1; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (/^-{3,}$/.test(line) || /^\.{3,}$/.test(line)) return lines.slice(i + 1).join("\n");
  }
  return input;
}
function stripMarkdown(input) {
  return stripFrontmatter(input).replace(/\r\n?/g, "\n").replace(/^```[\s\S]*?^```[ \t]*$/gm, "").replace(/<!--[^]*?-->/g, "").replace(/`[^`]*`/g, "").replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/!\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, "$1").replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, "$2 $1").replace(/^\s*[^\p{L}\p{N}]+\s*$/gmu, "").replace(/^[>#*+\-\d.)\s]+/gm, "").trim();
}
function countReadableWords(input) {
  var _a, _b, _c, _d;
  const text = stripMarkdown(input);
  const cjk = (_b = (_a = text.match(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/gu)) == null ? void 0 : _a.length) != null ? _b : 0;
  const nonCjk = text.replace(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/gu, " ");
  const words = (_d = (_c = nonCjk.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)) == null ? void 0 : _c.length) != null ? _d : 0;
  return cjk + words;
}

// src/metrics/aggregate.ts
function aggregateMetrics(notes, attachmentPaths, folderPaths, now, recentDays, shortThreshold) {
  const cutoffKey = resolveCreatedDate(void 0, now - Math.max(1, recentDays) * 864e5);
  const isRecent = (note) => resolveCreatedDate(note.frontmatterCreated, note.ctime) >= cutoffKey;
  return {
    notes: notes.length,
    attachments: attachmentPaths.length,
    folders: folderPaths.length,
    recent: notes.filter(isRecent).length,
    words: notes.reduce((sum, note) => sum + note.words, 0),
    links: notes.reduce((sum, note) => sum + note.outgoing, 0),
    notePaths: notes.map((note) => note.path),
    attachmentPaths,
    folderPaths,
    recentPaths: notes.filter(isRecent).map((note) => note.path),
    linkedPaths: notes.filter((note) => note.outgoing > 0).map((note) => note.path),
    orphanPaths: notes.filter((note) => note.outgoing === 0 && note.incoming === 0).map((note) => note.path),
    emptyPaths: notes.filter((note) => note.words === 0).map((note) => note.path),
    shortPaths: notes.filter((note) => note.words <= shortThreshold).map((note) => note.path),
    heatmap: aggregateHeatmap(notes, now),
    topFolders: aggregateTopFolders(notes)
  };
}

// src/services/vault-index.ts
var VaultIndex = class {
  constructor(app, excluded, recentDays, threshold) {
    this.app = app;
    this.excluded = excluded;
    this.recentDays = recentDays;
    this.threshold = threshold;
  }
  invalidate() {
    this.metricsPromise = void 0;
  }
  included(path) {
    return !this.excluded().some((folder) => path === folder || path.startsWith(`${folder}/`));
  }
  async metrics() {
    var _a;
    (_a = this.metricsPromise) != null ? _a : this.metricsPromise = this.compute();
    return this.metricsPromise;
  }
  async compute() {
    var _a;
    const markdown = this.app.vault.getMarkdownFiles().filter((file) => this.included(file.path));
    const incoming = /* @__PURE__ */ new Map();
    const resolved = this.app.metadataCache.resolvedLinks;
    for (const targets of Object.values(resolved)) for (const [path, count] of Object.entries(targets)) incoming.set(path, ((_a = incoming.get(path)) != null ? _a : 0) + count);
    const notes = await Promise.all(markdown.map(async (file) => {
      var _a2, _b;
      const cache = this.app.metadataCache.getFileCache(file);
      const frontmatter = cache == null ? void 0 : cache.frontmatter;
      const raw = await this.app.vault.cachedRead(file);
      const body = (cache == null ? void 0 : cache.frontmatterPosition) ? raw.slice(cache.frontmatterPosition.end.offset) : raw;
      return {
        path: file.path,
        ctime: file.stat.ctime,
        mtime: file.stat.mtime,
        frontmatterCreated: frontmatter == null ? void 0 : frontmatter.created,
        words: countReadableWords(body),
        outgoing: Object.values((_a2 = resolved[file.path]) != null ? _a2 : {}).reduce((sum, count) => sum + count, 0),
        incoming: (_b = incoming.get(file.path)) != null ? _b : 0
      };
    }));
    const files = this.app.vault.getFiles().filter((file) => this.included(file.path));
    const attachmentPaths = files.filter((file) => file.extension !== "md").map((file) => file.path);
    const folderPaths = [...new Set(files.map((file) => {
      var _a2;
      return (_a2 = file.parent) == null ? void 0 : _a2.path;
    }).filter((path) => Boolean(path)))];
    return aggregateMetrics(notes, attachmentPaths, folderPaths, Date.now(), this.recentDays(), this.threshold());
  }
  recentNotes(limit, filter = {}) {
    return this.app.vault.getMarkdownFiles().filter((file) => {
      var _a;
      if (!this.included(file.path)) return false;
      const cache = this.app.metadataCache.getFileCache(file);
      return matchesNoteFilter({ path: file.path, tags: cache ? (_a = (0, import_obsidian8.getAllTags)(cache)) != null ? _a : [] : [], frontmatter: cache == null ? void 0 : cache.frontmatter }, filter);
    }).sort((a, b) => b.stat.mtime - a.stat.mtime).slice(0, limit);
  }
  find(path) {
    const file = this.app.vault.getAbstractFileByPath(path);
    return file instanceof import_obsidian8.TFile ? file : null;
  }
  /**
   * 最近新增笔记：created 取 frontmatter.created（解析失败回退文件 ctime），
   * 限定最近 days 天内、按 created 倒序、截取 limit 条。支持与快速跳转同款的筛选。
   */
  recentCreatedNotes(limit, days, filter = {}) {
    var _a, _b;
    const cutoff = Date.now() - Math.max(1, days) * 864e5;
    const matched = [];
    for (const file of this.app.vault.getMarkdownFiles()) {
      if (!this.included(file.path)) continue;
      const cache = this.app.metadataCache.getFileCache(file);
      if (!matchesNoteFilter({ path: file.path, tags: cache ? (_a = (0, import_obsidian8.getAllTags)(cache)) != null ? _a : [] : [], frontmatter: cache == null ? void 0 : cache.frontmatter }, filter)) continue;
      const raw = (_b = cache == null ? void 0 : cache.frontmatter) == null ? void 0 : _b.created;
      let created = file.stat.ctime;
      if (typeof raw === "string" || typeof raw === "number") {
        const parsed = moment(raw).valueOf();
        if (Number.isFinite(parsed) && parsed > 0) created = parsed;
      }
      if (created >= cutoff) matched.push({ file, created });
    }
    return matched.sort((a, b) => b.created - a.created).slice(0, Math.max(1, limit));
  }
};

// src/tasks/parser.ts
var DATE_MARKERS = {
  "\u{1F4C5}": "due",
  "\u23F3": "scheduled",
  "\u{1F6EB}": "start",
  "\u2705": "done",
  "\u2795": "created"
};
function parseTaskLine(line) {
  var _a, _b;
  const match = line.match(/^\s*-\s+\[([ xX])\]\s+(.+)$/);
  if (!match) return null;
  const text = match[2];
  const task = { text, completed: match[1].toLowerCase() === "x", tags: [], fields: {} };
  for (const [marker, field] of Object.entries(DATE_MARKERS)) {
    const date = (_a = text.match(new RegExp(`${marker}\\s*(\\d{4}-\\d{2}-\\d{2})`))) == null ? void 0 : _a[1];
    if (date && isIsoDate(date)) task[field] = date;
  }
  task.priority = (_b = text.match(/[🔺⏫🔼🔽⏬]/u)) == null ? void 0 : _b[0];
  task.tags = [...text.matchAll(/(?:^|\s)#([\p{L}\p{N}_/-]+)/gu)].map((item) => item[1]);
  for (const item of text.matchAll(/([\p{L}\p{N}_-]+)::\s*([^\s].*?)(?=\s+[\p{L}\p{N}_-]+::|$)/gu)) task.fields[item[1]] = item[2].trim();
  return task;
}
function isIsoDate(value) {
  const date = /* @__PURE__ */ new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
function assignedDate(task, fileDate) {
  var _a, _b, _c;
  return (_c = (_b = (_a = task.due) != null ? _a : task.scheduled) != null ? _b : task.start) != null ? _c : fileDate;
}
function classifyTask(task, fileDate, today, recentCutoff) {
  if (task.completed) return task.done && task.done >= recentCutoff && task.done <= today ? "completed" : null;
  const date = assignedDate(task, fileDate);
  if (date === today) return "today";
  if (date && date < today) return "overdue";
  return null;
}

// src/main.ts
var CustomWorkspacePlugin = class extends import_obsidian9.Plugin {
  constructor() {
    super(...arguments);
    this.data = structuredClone(DEFAULT_DATA);
    this.config = this.data.settings;
    this.commands = new CommandService(this.app);
    this.bridge = new PluginBridge(this.app);
    this.index = new VaultIndex(this.app, () => this.config.excludedFolders, () => this.config.recentDays, () => this.config.shortNoteThreshold);
    this.scripts = /* @__PURE__ */ new Map();
    this.alive = false;
    this.saveChain = Promise.resolve();
    this.historyChain = Promise.resolve();
  }
  async onload() {
    this.alive = true;
    this.data = migrateData(await this.loadData());
    this.config = this.data.settings;
    setLanguage(this.config.language);
    await this.ensureScriptDirectory();
    await this.reloadScripts();
    this.registerView(WORKSPACE_VIEW_TYPE, (leaf) => new CustomWorkspaceView(leaf, this));
    this.addRibbonIcon("home", t("\u6253\u5F00\u5DE5\u4F5C\u53F0"), () => void this.openWorkspace(false));
    this.addCommand({ id: "open-workspace", name: t("\u6253\u5F00\u5DE5\u4F5C\u53F0"), callback: () => void this.openWorkspace(false) });
    this.addCommand({ id: "toggle-edit-mode", name: t("\u5207\u6362\u7F16\u8F91\u6A21\u5F0F"), checkCallback: (checking) => {
      var _a;
      const view = (_a = this.app.workspace.getLeavesOfType(WORKSPACE_VIEW_TYPE)[0]) == null ? void 0 : _a.view;
      if (!(view instanceof CustomWorkspaceView)) return false;
      if (!checking) view.toggleEditing();
      return true;
    } });
    this.addSettingTab(new CustomWorkspaceSettingTab(this.app, this));
    const viewWindow = this.app.workspace.containerEl.ownerDocument.defaultView;
    let refreshTimer;
    const invalidate = () => {
      this.index.invalidate();
      if (refreshTimer !== void 0) viewWindow == null ? void 0 : viewWindow.clearTimeout(refreshTimer);
      refreshTimer = viewWindow == null ? void 0 : viewWindow.setTimeout(() => {
        refreshTimer = void 0;
        if (this.alive) this.refreshViews();
      }, 250);
    };
    this.register(() => {
      if (refreshTimer !== void 0) viewWindow == null ? void 0 : viewWindow.clearTimeout(refreshTimer);
    });
    this.registerEvent(this.app.vault.on("create", invalidate));
    this.registerEvent(this.app.vault.on("delete", invalidate));
    this.registerEvent(this.app.vault.on("rename", invalidate));
    this.registerEvent(this.app.vault.on("modify", invalidate));
    this.registerEvent(this.app.metadataCache.on("changed", invalidate));
    this.app.workspace.onLayoutReady(() => {
      if (this.alive && this.config.autoOpen && !this.app.workspace.getLeavesOfType(WORKSPACE_VIEW_TYPE).length) void this.openWorkspace(true);
    });
  }
  onunload() {
    this.alive = false;
  }
  async persist() {
    this.data.settings = this.config;
    this.saveChain = this.saveChain.then(() => this.saveData(this.data));
    await this.saveChain;
  }
  definition(id) {
    var _a;
    return (_a = builtinById(id)) != null ? _a : this.scripts.get(id);
  }
  definitions() {
    return [...builtinDefinitions(), ...this.config.allowScripts ? this.scripts.values() : []];
  }
  async addBlock(definition) {
    const params = Object.fromEntries(definition.params.map((param) => [param.key, param.defaultValue]));
    const block = { id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`, componentId: definition.id, span: 12, params };
    this.data.workspace.blocks.push(block);
    await this.persist();
    this.refreshViews();
  }
  refreshViews() {
    for (const leaf of this.app.workspace.getLeavesOfType(WORKSPACE_VIEW_TYPE)) if (leaf.view instanceof CustomWorkspaceView) void leaf.view.refresh();
  }
  async openWorkspace(automatic) {
    const existing = this.app.workspace.getLeavesOfType(WORKSPACE_VIEW_TYPE)[0];
    if (existing) {
      if (!automatic) await this.app.workspace.revealLeaf(existing);
      return;
    }
    const leaf = this.config.autoOpenMode === "replace" ? this.app.workspace.getLeaf(false) : this.app.workspace.getLeaf("tab");
    await leaf.setViewState({ type: WORKSPACE_VIEW_TYPE, active: true });
    if (!automatic || this.config.autoOpenMode === "new-tab") await this.app.workspace.revealLeaf(leaf);
  }
  scriptDirectory() {
    var _a;
    return (0, import_obsidian9.normalizePath)(`${(_a = this.manifest.dir) != null ? _a : `${this.app.vault.configDir}/plugins/${this.manifest.id}`}/data`);
  }
  async ensureScriptDirectory() {
    const adapter = this.app.vault.adapter;
    const directory = this.scriptDirectory();
    if (!await adapter.exists(directory)) await adapter.mkdir(directory);
    const readme = (0, import_obsidian9.normalizePath)(`${directory}/README.md`);
    if (!await adapter.exists(readme)) await adapter.write(readme, "# Custom Workspace scripts\n\nPlace trusted `.js` files here. Scripts can read and write your vault and are not sandboxed.\n");
  }
  async reloadScripts() {
    this.scripts.clear();
    const listing = await this.app.vault.adapter.list(this.scriptDirectory());
    for (const path of listing.files.filter((file) => file.endsWith(".js"))) {
      const filename = path.split("/").pop();
      if (!filename) continue;
      try {
        const source = await this.app.vault.adapter.read(path);
        const meta = parseScriptMetadata(source, filename);
        this.scripts.set(`script/${filename}`, scriptDefinition(filename, meta.name, meta.icon, meta.description, meta.params));
      } catch (e) {
      }
    }
  }
  async readScript(filename) {
    return this.app.vault.adapter.read((0, import_obsidian9.normalizePath)(`${this.scriptDirectory()}/${filename}`));
  }
  async createScript() {
    const adapter = this.app.vault.adapter;
    let index = 1;
    let filename = "my-component.js";
    while (await adapter.exists((0, import_obsidian9.normalizePath)(`${this.scriptDirectory()}/${filename}`))) {
      index += 1;
      filename = `my-component-${index}.js`;
    }
    const source = `// cw:name=My component
// cw:icon=file-code
// cw:desc=A trusted local component
// cw:param=title:text|Hello

const { container, params } = ctx;
container.createEl("p", { text: String(params.title) });
`;
    await adapter.write((0, import_obsidian9.normalizePath)(`${this.scriptDirectory()}/${filename}`), source);
    await this.reloadScripts();
    new import_obsidian9.Notice(`${t("\u5DF2\u65B0\u5EFA\u811A\u672C")}: ${filename}`);
  }
  async renderTasks(container, host) {
    if (!this.config.journalFolder) {
      container.createDiv({ text: t("\u6682\u65E0\u5185\u5BB9"), cls: "cw-empty" });
      return;
    }
    const today = moment().format("YYYY-MM-DD");
    const cutoff = moment().subtract(this.config.recentDays - 1, "days").format("YYYY-MM-DD");
    const tasks = [];
    const files = this.app.vault.getMarkdownFiles().filter((file) => file.path.startsWith(`${this.config.journalFolder}/`));
    for (const file of files) {
      const parsedDate = moment(file.basename, this.config.dateFormat, true);
      const fileDate = parsedDate.isValid() ? parsedDate.format("YYYY-MM-DD") : void 0;
      const lines = (await this.app.vault.cachedRead(file)).split(/\r?\n/);
      lines.forEach((line, index) => {
        const task = parseTaskLine(line);
        if (!task) return;
        const group = classifyTask(task, fileDate, today, cutoff);
        if (group) tasks.push({ file, line: index, text: task.text, group });
      });
    }
    for (const group of ["today", "overdue", "completed"]) {
      const section = container.createDiv({ cls: "cw-task-group" });
      section.createEl("h4", { text: group === "today" ? t("\u4ECA\u5929") : group === "overdue" ? t("\u9057\u7559") : t("\u6700\u8FD1\u5B8C\u6210") });
      const matching = tasks.filter((task) => task.group === group);
      if (!matching.length) section.createDiv({ text: t("\u6682\u65E0\u5185\u5BB9"), cls: "cw-empty" });
      for (const task of matching) {
        const button = section.createEl("button", { text: task.text, cls: "cw-task" });
        host.registerDomEvent(button, "click", () => void this.openTask(task));
      }
    }
  }
  async openTask(task) {
    const leaf = this.app.workspace.getLeaf(false);
    await leaf.openFile(task.file);
    const view = leaf.view;
    if (view instanceof import_obsidian9.MarkdownView) {
      view.editor.setCursor({ line: task.line, ch: 0 });
      view.editor.scrollIntoView({ from: { line: task.line, ch: 0 }, to: { line: task.line, ch: task.text.length } }, true);
    }
  }
  async recordHistory(metrics) {
    const operation = this.historyChain.then(() => this.writeHistory(metrics));
    this.historyChain = operation.catch(() => void 0);
    await operation;
  }
  async writeHistory(metrics) {
    const today = moment().format("YYYY-MM-DD");
    let rebuilt = false;
    if (!this.data.historyInitialized) {
      const files = this.app.vault.getMarkdownFiles().filter((file) => !this.config.excludedFolders.some((folder) => file.path === folder || file.path.startsWith(`${folder}/`)));
      const notes = await Promise.all(files.map(async (file) => {
        var _a, _b;
        const cache = this.app.metadataCache.getFileCache(file);
        const raw = await this.app.vault.cachedRead(file);
        const body = (cache == null ? void 0 : cache.frontmatterPosition) ? raw.slice(cache.frontmatterPosition.end.offset) : raw;
        return {
          created: resolveCreatedDate((_a = cache == null ? void 0 : cache.frontmatter) == null ? void 0 : _a.created, file.stat.ctime),
          words: countReadableWords(body),
          links: Object.values((_b = this.app.metadataCache.resolvedLinks[file.path]) != null ? _b : {}).reduce((sum, value) => sum + value, 0)
        };
      }));
      const actual = this.data.history.filter((point) => !point.estimated);
      const actualDates = new Set(actual.map((point) => point.date));
      const estimated = estimateHistory(notes).filter((point) => point.date < today && !actualDates.has(point.date));
      this.data.history = [...estimated, ...actual].sort((a, b) => a.date.localeCompare(b.date));
      this.data.historyInitialized = true;
      rebuilt = true;
    }
    const current = this.data.history.find((point) => point.date === today);
    if (current && !current.estimated && current.notes === metrics.notes && current.links === metrics.links && current.words === metrics.words) {
      if (rebuilt) await this.persist();
      return;
    }
    this.data.history = upsertSnapshot(this.data.history, { date: today, notes: metrics.notes, links: metrics.links, words: metrics.words });
    await this.persist();
  }
};
