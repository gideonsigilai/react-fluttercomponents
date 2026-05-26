import React, { useState, useRef, useCallback } from "react";
import { cn } from "../utils";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ReorderableListProps<T> {
  items: T[];
  onReorder: (items: T[]) => void;
  itemBuilder: (item: T, index: number, isDragging: boolean) => React.ReactNode;
  keyExtractor: (item: T) => string;
  proxyDecorator?: (child: React.ReactNode) => React.ReactNode;
  padding?: string;
  className?: string;
}

// ─── ReorderableListView ──────────────────────────────────────────────────────
export function ReorderableListView<T>({
  items,
  onReorder,
  itemBuilder,
  keyExtractor,
  proxyDecorator,
  padding,
  className,
}: ReorderableListProps<T>) {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const itemsRef = useRef(items);
  itemsRef.current = items;

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (targetIndex: number) => {
    if (draggingIndex === null || draggingIndex === targetIndex) {
      setDraggingIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newItems = [...itemsRef.current];
    const [removed] = newItems.splice(draggingIndex, 1);
    newItems.splice(targetIndex, 0, removed);
    onReorder(newItems);
    setDraggingIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className={cn("flex flex-col", padding, className)}>
      {items.map((item, index) => {
        const isDragging = index === draggingIndex;
        const isDragOver = index === dragOverIndex;
        const key = keyExtractor(item);

        return (
          <div
            key={key}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={() => handleDrop(index)}
            onDragEnd={handleDragEnd}
            className={cn(
              "transition-all duration-150 group",
              isDragging ? "opacity-40 scale-95" : "opacity-100",
              isDragOver && !isDragging ? "border-t-2 border-primary" : ""
            )}
          >
            <div className="flex items-center gap-2">
              {/* Drag handle */}
              <div className="cursor-grab active:cursor-grabbing p-1 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="9" cy="5" r="1" fill="currentColor" />
                  <circle cx="9" cy="12" r="1" fill="currentColor" />
                  <circle cx="9" cy="19" r="1" fill="currentColor" />
                  <circle cx="15" cy="5" r="1" fill="currentColor" />
                  <circle cx="15" cy="12" r="1" fill="currentColor" />
                  <circle cx="15" cy="19" r="1" fill="currentColor" />
                </svg>
              </div>
              <div className="flex-1">
                {itemBuilder(item, index, isDragging)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
