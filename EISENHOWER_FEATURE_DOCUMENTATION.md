# Eisenhower Matrix Feature Documentation

## Overview
This document captures all the changes made to implement the Eisenhower Matrix (四象限) drag-and-drop feature in the Obsidian Kanban plugin.

## Key Files Modified

### 1. DragDropApp.tsx - Main Drop Handler
**Location**: `src/DragDropApp.tsx`

**Key Changes**:
- Line 94: Use `originalPath` instead of `getPath()` for drag path
  ```typescript
  const dragPath = dragEntityData.originalPath || dragEntity.getPath();
  ```

- Lines 105-150: Added Eisenhower quadrant drop detection and handling
  ```typescript
  const isEisenhowerTarget =
    dropEntityData.type === 'eisenhower-quadrant' || !!dropEntityData.isEisenhower;

  if (isEisenhowerTarget && dragEntityData.type === DataTypes.Item) {
    // Resolve view and window
    const targetWin = dragEntityData.win || dropEntityData.win || win;
    const view = plugin.getKanbanView(dragEntity.scopeId, targetWin);
    const stateManager = plugin.stateManagers.get(view.file);
    const boardModifiers = getBoardModifiers(view, stateManager);

    // Get item and quadrant data
    const item = getEntityFromPath(stateManager.state, dragPath) as Item;
    const { isImportant, isUrgent } = dropEntityData;

    // Update item based on quadrant
    const updatedItem = handleEisenhowerDrop(
      item,
      { isImportant, isUrgent },
      stateManager,
      boardModifiers
    );

    applyEisenhowerUpdate(item, updatedItem, dragPath, boardModifiers);
    return;
  }
  ```

### 2. EisenhowerLane.tsx - Quadrant Component
**Location**: `src/components/Eisenhower/EisenhowerLane.tsx`

**Key Features**:
- Each quadrant is wrapped in a `Droppable` component with:
  - `type: 'eisenhower-quadrant'`
  - `isImportant` and `isUrgent` flags
  - `accepts: [DataTypes.Item]`

- Items are wrapped with `ExplicitPathContext.Provider` to preserve their original path:
  ```typescript
  <ExplicitPathContext.Provider key={boardView + item.id} value={item.originalPath}>
    <DraggableItem
      item={item}
      itemIndex={item.originalPath[1]}
      shouldMarkItemsComplete={false}
      isStatic={false}
      originalPath={item.originalPath}
    />
  </ExplicitPathContext.Provider>
  ```

### 3. EisenhowerView.tsx - Main View Component
**Location**: `src/components/Eisenhower/EisenhowerView.tsx`

**Key Features**:
- Collects all items from all lanes with their original paths
- Classifies items into 4 quadrants using `classifyEisenhower()`
- Creates virtual lanes for each quadrant
- Passes `isImportant`, `isUrgent`, and `colorClass` to each `EisenhowerLane`

### 4. eisenhowerClassifier.ts - Classification Logic
**Location**: `src/helpers/eisenhowerClassifier.ts`

**Key Functions**:
- `classifyEisenhower(items)`: Classifies items into quadrants based on:
  - Priority (from metadata or title emojis)
  - Due date (within 3 days = urgent)

- `getTaskPriority(item)`: Extracts priority from:
  - `metadata.priority`
  - Inline metadata priority field
  - Title emojis (🔺, ⏫, 🔼, 🔽, ⏬)

- `isTaskUrgent(item)`: Checks if due date is within 3 days

### 5. eisenhowerDragHandlers.ts - Drop Handlers
**Location**: `src/helpers/eisenhowerDragHandlers.ts`

**Key Functions**:
- `handleEisenhowerDrop(item, dropData, stateManager, boardModifiers)`: Updates item based on quadrant
  - **Q1 (Important & Urgent)**: Add ⏫ emoji, set high priority, ensure due date
  - **Q2 (Important & Not Urgent)**: Add ⏫ emoji, set high priority, remove urgent dates
  - **Q3 (Not Important & Urgent)**: Remove priority emoji, ensure due date
  - **Q4 (Not Important & Not Urgent)**: Remove priority emoji, remove urgent dates

- `applyEisenhowerUpdate(item, updatedItem, path, boardModifiers)`: Applies updates to board

### 6. DragOverlay.tsx - Visual Feedback
**Location**: `src/dnd/components/DragOverlay.tsx`

**Key Change**:
- Line 345: Use `originalPath` for Eisenhower items to show correct content
  ```typescript
  const path = overlayData.originalPath || entity.getPath();
  const data = getEntityFromPath(stateManager.state, path);
  ```

### 7. EntityManager.ts - Hitbox Registration
**Location**: `src/dnd/managers/EntityManager.ts`

**Key Changes**:
- Added debug logging for scroll observer registration

### 8. ScrollManager.ts - Scroll Handling
**Location**: `src/dnd/managers/ScrollManager.ts`

**Key Changes**:
- Added support for Eisenhower view scroll handling

### 9. New Type Definitions
**Location**: `src/types/priority.ts`

**New Types**:
```typescript
export enum EisenhowerPriority {
  None = 0,
  Low = 1,
  Medium = 2,
  High = 3,
  Highest = 4,
}

export const EISENHOWER_PRIORITY_ICON_MAP = {
  '⏫': EisenhowerPriority.High,
  '🔺': EisenhowerPriority.Highest,
  '🔼': EisenhowerPriority.Medium,
  '🔽': EisenhowerPriority.Low,
  '⏬': EisenhowerPriority.Lowest,
};
```

### 10. Styles
**Location**: `src/styles.less`

**New Classes**:
- `.eisenhower-view`
- `.eisenhower-grid`
- `.eisenhower-lane`
- `.quadrant-q1`, `.quadrant-q2`, `.quadrant-q3`, `.quadrant-q4`
- `.quadrant-subtitle`, `.quadrant-description`

## Data Flow

### When dragging an item to a quadrant:

1. **Drag Start**: `DraggableItem` is clicked and dragged
   - Hitbox is registered via `EntityManager`

2. **Drag Move**: `DragManager.calculateDragIntersect()` detects intersections
   - Uses `getBestIntersect()` to find best drop target

3. **Drag End**: `DragManager.dragEnd()` emits 'dragEnd' event

4. **SortManager.handleDragEnd()**:
   - If `isSorting` is true (item is sortable): triggers normal drop flow
   - If `isSorting` is false (Eisenhower items): enters early return branch

5. **DragDropApp.handleDrop()**:
   - Checks if `dropEntityData.type === 'eisenhower-quadrant'`
   - If yes, calls `handleEisenhowerDrop()`
   - Updates item title (add/remove priority emoji)
   - Updates item metadata (priority, due date, isImportant, isUrgent)
   - Calls `applyEisenhowerUpdate()` to persist changes

### Quadrant Classification Logic:

**Q1 (Important & Urgent)** - "Do First"
- Priority: High (⏫)
- Due: Within 3 days or today

**Q2 (Important & Not Urgent)** - "Schedule"
- Priority: High (⏫)
- Due: None or beyond 3 days

**Q3 (Not Important & Urgent)** - "Delegate"
- Priority: None
- Due: Within 3 days or today

**Q4 (Not Important & Not Urgent)** - "Don't Do"
- Priority: None
- Due: None or beyond 3 days

## Important Implementation Details

### 1. Original Path Preservation
Items in Eisenhower view are **clones** from original lanes. The `originalPath` property preserves:
```typescript
originalPath: [laneIndex, itemIndex]
```
This allows updates to be applied to the correct item in the original board data.

### 2. ExplicitPathContext
Used to override the entity path for drag operations:
```typescript
<ExplicitPathContext.Provider value={item.originalPath}>
  <DraggableItem ... />
</ExplicitPathContext.Provider>
```

### 3. Entity Data Structure
Each quadrant has this data structure:
```typescript
{
  type: 'eisenhower-quadrant',
  isImportant: boolean,
  isUrgent: boolean,
  laneId: string,
  accepts: [DataTypes.Item],
  win: Window
}
```

### 4. No Sortable Wrapping
Eisenhower items are NOT wrapped in `Sortable` component, so:
- `isSorting` remains `false` in SortManager
- Drop is handled via the `isEisenhowerTarget` check in DragDropApp

## Settings

### New Settings Added:
- `eisenhower-urgent-days`: Number of days to consider "urgent" (default: 3)

## Commits Reference

- `245cc42`: Eisenhower View added
- `2cca140`: Eisenhower view added
- `e2ad834`: Eisenhower view fix (final working version)

Base commit before Eisenhower: `8501981` (version 2.0.51)

---

## How to Re-apply This Feature

1. **Copy all new files** from the Eisenhower commits:
   - `src/components/Eisenhower/*`
   - `src/helpers/eisenhowerClassifier.ts`
   - `src/helpers/eisenhowerDragHandlers.ts`
   - `src/types/priority.ts`

2. **Apply changes to existing files**:
   - `src/DragDropApp.tsx`: Add Eisenhower drop handling
   - `src/dnd/components/DragOverlay.tsx`: Use originalPath for overlay
   - `src/components/types.ts`: Add Eisenhower-related types
   - `src/styles.less`: Add Eisenhower styles

3. **Update settings**:
   - Add `eisenhower-urgent-days` to Settings.ts

4. **Update parsers**:
   - Add Eisenhower priority hydration in hydrateBoard.ts

5. **Build and test**
