# Eisenhower Matrix 实现踩坑总结

## 项目概述
在 Obsidian Kanban 插件中实现 Eisenhower Matrix（四象限）视图，允许用户按照重要性和紧急性对任务进行分类和拖拽管理。

## 核心架构问题

### 1. 视图组件选择错误 ❌

**问题**：最初创建自定义的 `EisenhowerLane` 组件
**后果**：
- 无法复用 Kanban 现有的拖放逻辑
- 需要重新实现所有拖放功能
- 导致各种不兼容问题

**正确做法**：必须使用原始的 `DraggableLane` 组件
```typescript
// ❌ 错误
<EisenhowerLane lane={lane} ... />

// ✅ 正确
<DraggableLane lane={lane} ... />
```

### 2. Lane 类型设置错误 ❌

**问题**：Lane 的 `type` 设置为 `DataTypes.Lane`，无法与普通 lane 区分
**后果**：DragDropApp 无法识别 Eisenhower 象限，走普通 lane 的拖放逻辑

**正确做法**：设置自定义类型
```typescript
const lane: Lane = {
  type: 'eisenhower-quadrant' as any,  // 必须是自定义类型
  data: {
    title: '重要且紧急',
    isImportant: true,
    isUrgent: true,
  },
  // ...
};
```

### 3. 数据结构设计错误 ❌

**问题**：`isImportant` 和 `isUrgent` 放在错误的层级
**后果**：DragDropApp 无法正确读取象限属性

**正确结构**：
```typescript
lane.data.isImportant = true;   // ✅ 在 lane.data 中
lane.data.isUrgent = true;      // ✅ 在 lane.data 中

// ❌ 不要这样做：
lane.isImportant = true;        // 错误位置
```

## 拖放系统问题

### 4. Droppable 组件 data 属性被覆盖 ❌

**问题**：在 `EisenhowerLane` 中手动设置 `Droppable` 的 `data` 属性
**后果**：覆盖了 lane 对象的原始数据，导致类型检测失败

**错误代码**：
```typescript
// ❌ 不要手动设置 data
<Droppable
  data={{
    type: 'eisenhower-quadrant',
    isImportant: props.isImportant,
    // ...
  }}
>
```

**正确做法**：
```typescript
// ✅ 直接传递整个 lane 对象
<Droppable data={props.lane}>
```

### 5. originalPath 处理错误 ❌

**问题**：Eisenhower 视图中的 item 是从原始 lane 克隆的，但没有保留原始路径
**后果**：更新时无法找到正确的 item 位置

**正确做法**：
```typescript
// 收集 items 时必须保留 originalPath
const allItemsWithPaths = boardData.children.flatMap((lane, laneIndex) =>
  lane.children.map((item, itemIndex) => ({
    ...item,
    originalPath: [laneIndex, itemIndex],  // ✅ 必须保留
  }))
);

// 在 DraggableItem 中使用
<DraggableItem
  item={item}
  itemIndex={item.originalPath[1]}  // 使用原始索引
  originalPath={item.originalPath}  // 传递原始路径
/>
```

### 6. React Key 导致的状态问题 ❌

**问题**：使用静态 key（`boardView + item.id`）导致组件在更新后不重新挂载
**后果**：拖拽只能工作一次，后续拖拽失败

**错误做法**：
```typescript
// ❌ 静态 key，组件复用但不更新状态
<DraggableItem key={boardView + item.id} />
```

**尝试过的修复**（也不完美）：
```typescript
// ⚠️ 包括状态的 key，会导致频繁重新挂载
const itemStateKey = `${item.id}-${item.data.title}-${item.data.metadata.priority}`;
<DraggableItem key={boardView + itemStateKey} />
```

**最佳方案**：确保组件在数据更新时能正确响应，使用原始 `DraggableLane` 避免这个问题

## 视图渲染问题

### 7. 布局样式错误 ❌

**问题**：使用内联样式和错误的容器结构
**后果**：Eisenhower 网格布局错乱

**错误代码**：
```typescript
// ❌ 使用内联样式
<div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
```

**正确做法**：使用 CSS 类
```typescript
// ✅ 在 styles.less 中定义样式
<div className={c('eisenhower-lane')}>
```

### 8. LaneHeader 干扰拖放检测 ❌

**问题**：在自定义 `EisenhowerLane` 中使用 `LaneHeader` 组件
**后果**：LaneHeader 注册了自己的 hitbox，干扰象限的拖放检测

**错误做法**：
```typescript
// ❌ 使用 LaneHeader
<EisenhowerLane>
  <LaneHeader ... />  // 会注册额外的 hitbox
  <Droppable ... />
</EisenhowerLane>
```

**正确做法**：使用完整的 `DraggableLane`，它已经包含了正确的拖放逻辑

## 分类逻辑问题

### 9. 优先级判断逻辑不完整 ❌

**问题**：只考虑了部分优先级来源
**应该考虑的优先级来源**：
1. `metadata.priority` 数值
2. `metadata.inlineMetadata` 中的 priority 字段
3. Title 中的优先级 emoji（🔺, ⏫, 🔼, 🔽, ⏬）

**正确做法**：
```typescript
function getTaskPriority(item: Item): EisenhowerPriority {
  // 1. 检查 metadata.priority
  if (item.data.metadata.priority) {
    return mapToEisenhower(item.data.metadata.priority);
  }

  // 2. 检查 inlineMetadata
  if (item.data.metadata.inlineMetadata) {
    const priorityMeta = item.data.metadata.inlineMetadata.find(
      m => m.key.toLowerCase() === 'priority'
    );
    if (priorityMeta) {
      return mapToEisenhower(priorityMeta.value);
    }
  }

  // 3. 检查 title emoji
  const title = item.data.title;
  for (const icon of ['🔺', '⏫', '🔼', '🔽', '⏬']) {
    if (title.includes(icon)) {
      return mapIconToPriority(icon);
    }
  }

  return EisenhowerPriority.None;
}
```

### 10. 紧急度判断不准确 ❌

**问题**：简单的日期判断没有考虑边界情况
**正确做法**：
```typescript
function isTaskUrgent(item: Item): boolean {
  const taskDate = item.data.metadata.date;
  if (!taskDate) return false;

  const mDate = moment(taskDate);
  if (!mDate.isValid()) return false;

  const urgentDays = 3;  // 可配置
  const threeDaysLater = moment().add(urgentDays, 'days').endOf('day');

  // 包括今天和未来3天，以及所有过期任务
  return mDate.isBefore(threeDaysLater) || mDate.isSame(threeDaysLater, 'day');
}
```

## 拖放处理问题

### 11. DragDropApp 检测逻辑错误 ❌

**问题**：检测 Eisenhower 目标的逻辑不完整
**正确做法**：
```typescript
// DragDropApp.tsx handleDrop()
const dropEntityData = dropEntity.getData();

// 多种检测方式
const isEisenhowerTarget =
  dropEntityData.type === 'eisenhower-quadrant' ||  // 类型匹配
  !!(dropEntityData as any).isEisenhower ||          // 标记匹配
  !!(dropEntityData.data?.isImportant !== undefined); // 数据特征匹配

if (isEisenhowerTarget && dragEntityData.type === DataTypes.Item) {
  // 处理 Eisenhower 拖放
  const isImportant = dropEntityData.data?.isImportant;
  const isUrgent = dropEntityData.data?.isUrgent;
  // ...
}
```

### 12. 元数据更新逻辑问题 ❌

**问题**：更新 item 时没有正确处理所有相关字段
**正确做法**：
```typescript
function handleEisenhowerDrop(item, dropData, stateManager, boardModifiers) {
  // 必须更新的字段：
  // 1. title - 添加/移除优先级 emoji
  // 2. titleRaw - 原始标题
  // 3. titleSearch - 搜索用的标题
  // 4. metadata.priority - 优先级值
  // 5. metadata.date - 日期
  // 6. metadata.dateStr - 日期字符串
  // 7. metadata.isImportant - 重要标记
  // 8. metadata.isUrgent - 紧急标记

  const updatedItem: Partial<Item> = {
    ...item,
    data: {
      ...item.data,
      title: newTitle,
      titleRaw: newTitleRaw,
      titleSearch: newTitleSearch,
      metadata: {
        ...item.data.metadata,
        priority: newPriority,
        date: newDate,
        dateStr: newDateStr,
        isImportant: dropData.isImportant,
        isUrgent: dropData.isUrgent,
      },
    },
  };

  return updatedItem;
}
```

## CSS 样式问题

### 13. 网格布局错误 ❌

**问题**：没有正确实现 2x2 网格布局
**正确 CSS**：
```less
// styles.less
.eisenhower-view {
  // 容器样式
}

.eisenhower-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 16px;
  height: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
}

.eisenhower-lane {
  // 象限样式
  border: 2px solid;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;

  &.quadrant-q1 {
    border-color: #ff6b6b;
    background-color: rgba(255, 107, 107, 0.1);
  }

  &.quadrant-q2 {
    border-color: #4ecdc4;
    background-color: rgba(78, 205, 196, 0.1);
  }

  &.quadrant-q3 {
    border-color: #ffe66d;
    background-color: rgba(255, 230, 109, 0.1);
  }

  &.quadrant-q4 {
    border-color: #95e1d3;
    background-color: rgba(149, 225, 211, 0.1);
  }
}
```

## 实现路线图（正确顺序）

### 第一阶段：核心结构
1. ✅ 创建 `EisenhowerView.tsx` 使用 `DraggableLane`
2. ✅ 设置 lane 的 `type: 'eisenhower-quadrant'`
3. ✅ 在 `lane.data` 中设置 `isImportant` 和 `isUrgent`
4. ✅ 实现分类逻辑 `eisenhowerClassifier.ts`

### 第二阶段：拖放逻辑
5. ✅ 在 `DragDropApp.tsx` 中添加 Eisenhower 检测
6. ✅ 实现 `eisenhowerDragHandlers.ts`
7. ✅ 确保 `originalPath` 正确传递
8. ✅ 处理元数据更新逻辑

### 第三阶段：UI 完善
9. ✅ 添加网格样式到 `styles.less`
10. ✅ 添加翻译到 `en.ts` 和 `zh-cn.ts`
11. ✅ 添加视图切换菜单
12. ✅ 添加设置项（紧急天数）

### 第四阶段：测试和修复
13. ⏳ 测试拖放功能
14. ⏳ 测试分类准确性
15. ⏳ 测试多次拖放
16. ⏳ 测试视图切换

## 关键要点总结

### 必须遵守的原则
1. **始终使用原始组件**：使用 `DraggableLane` 而不是自定义组件
2. **正确的类型标记**：`lane.type` 必须是唯一标识符
3. **数据层级正确**：象限属性在 `lane.data` 中
4. **保留原始路径**：所有 items 必须保留 `originalPath`
5. **完整的元数据更新**：更新 item 时要更新所有相关字段

### 常见错误模式
- ❌ 自定义组件导致逻辑重复
- ❌ 类型混淆导致检测失败
- ❌ 路径丢失导致更新失败
- ❌ 元数据不完整导致状态不一致
- ❌ 样式错误导致布局错乱

## 调试技巧

### Console 日志
```typescript
// EisenhowerView 渲染
console.log('[Eisenhower] Classification result:', {
  q1: result.q1.items.length,
  q2: result.q2.items.length,
  q3: result.q3.items.length,
  q4: result.q4.items.length,
});

// 拖放检测
console.log('[DEBUG] Drop Check:', {
  isEisenhowerTarget,
  dropType: dropEntityData.type,
  dragType: dragEntityData.type,
});

// Eisenhower 处理
console.log('[Eisenhower Drop] Processing:', {
  isImportant,
  isUrgent,
  dropDataKeys: Object.keys(dropData),
});
```

### 检查清单
- [ ] lane.type 是 'eisenhower-quadrant' 而不是 'lane'
- [ ] lane.data 包含 isImportant 和 isUrgent
- [ ] items 有 originalPath 属性
- [ ] DraggableItem 使用 originalPath[1] 作为 index
- [ ] DragDropApp 能正确检测 Eisenhower 目标
- [ ] 元数据更新包含所有必要字段

## 下次会话起点

下次实现应该直接从**使用 DraggableLane 的正确实现**开始：

```typescript
// EisenhowerView.tsx - 正确模板
import { DraggableLane } from 'src/components/Lane/Lane';

export function EisenhowerView({ stateManager }: EisenhowerViewProps) {
  // ... 分类逻辑

  const eisenhowerLanes: Lane[] = [
    {
      id: 'eisenhower-q1',
      type: 'eisenhower-quadrant' as any,  // ✅ 关键
      data: {
        title: t('Important & Urgent'),
        isImportant: true,  // ✅ 关键
        isUrgent: true,     // ✅ 关键
      },
      children: classified.q1.items,
      // ...
    },
    // ... 其他象限
  ];

  return (
    <ScrollContainer className={c('eisenhower-view')}>
      <div className={c('eisenhower-grid')}>
        {eisenhowerLanes.map((lane, index) => (
          <DraggableLane  // ✅ 使用原始组件
            key={lane.id}
            lane={lane}
            laneIndex={index}
            shouldMarkItemsComplete={false}
            isStatic={false}
          />
        ))}
      </div>
    </ScrollContainer>
  );
}
```

## 参考文件

### 核心文件
- `src/components/Eisenhower/EisenhowerView.tsx` - 主视图组件
- `src/helpers/eisenhowerClassifier.ts` - 分类逻辑
- `src/helpers/eisenhowerDragHandlers.ts` - 拖放处理
- `src/DragDropApp.tsx` - 拖放检测和路由

### 配置文件
- `src/styles.less` - 样式定义
- `src/lang/locale/en.ts` - 英文翻译
- `src/lang/locale/zh-cn.ts` - 中文翻译
- `src/Settings.ts` - 设置项定义

### 类型定义
- `src/types/eisenhower.d.ts` - Eisenhower 类型
- `src/types/priority.ts` - 优先级类型

## Git 提交历史参考

- `8501981` - Eisenhower 实现前的干净版本 (2.0.51)
- `e2ad834` - 之前工作的版本（有问题可参考）
- 当前版本 - 正在重做中

---

**文档版本**: 1.0
**最后更新**: 2025-01-11
**状态**: 进行中，等待下一次会话继续实现
