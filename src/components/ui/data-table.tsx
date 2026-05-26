import React, { useState } from "react";
import { cn } from "../utils";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface DataColumn<T = Record<string, unknown>> {
  id: string;
  label: React.ReactNode;
  numeric?: boolean;
  sortable?: boolean;
  minWidth?: number;
  accessor: (row: T) => React.ReactNode;
}

interface DataTableProps<T = Record<string, unknown>> {
  columns: DataColumn<T>[];
  rows: T[];
  onRowTap?: (row: T, index: number) => void;
  sortAscending?: boolean;
  sortColumnIndex?: number;
  onSort?: (columnIndex: number, ascending: boolean) => void;
  showCheckboxColumn?: boolean;
  selectedRows?: number[];
  onSelectRow?: (index: number, selected: boolean) => void;
  onSelectAll?: (selected: boolean) => void;
  headingRowColor?: string;
  dataRowColor?: string;
  dividerThickness?: number;
  className?: string;
}

// ─── DataTable ────────────────────────────────────────────────────────────────
export function DataTable<T = Record<string, unknown>>({
  columns,
  rows,
  onRowTap,
  sortAscending = true,
  sortColumnIndex,
  onSort,
  showCheckboxColumn = false,
  selectedRows = [],
  onSelectRow,
  onSelectAll,
  headingRowColor,
  dataRowColor,
  dividerThickness = 1,
  className,
}: DataTableProps<T>) {
  const allSelected = selectedRows.length === rows.length && rows.length > 0;
  const someSelected = selectedRows.length > 0 && !allSelected;

  return (
    <div className={cn("w-full overflow-x-auto rounded-xl border border-border", className)}>
      <table className="w-full text-xs border-collapse">
        {/* Header */}
        <thead>
          <tr
            style={{
              backgroundColor: headingRowColor || undefined,
              borderBottom: `${dividerThickness}px solid hsl(var(--border))`,
            }}
            className={!headingRowColor ? "bg-muted/50" : ""}
          >
            {showCheckboxColumn && (
              <th className="px-3 py-3 w-8">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => { if (el) el.indeterminate = someSelected; }}
                  onChange={(e) => onSelectAll?.(e.target.checked)}
                  className="cursor-pointer accent-primary"
                />
              </th>
            )}
            {columns.map((col, i) => (
              <th
                key={col.id}
                className={cn(
                  "px-4 py-3 font-semibold tracking-wide text-muted-foreground text-left",
                  col.numeric ? "text-right" : "",
                  col.sortable ? "cursor-pointer select-none hover:text-foreground transition-colors" : ""
                )}
                style={{ minWidth: col.minWidth }}
                onClick={col.sortable ? () => onSort?.(i, sortColumnIndex === i ? !sortAscending : true) : undefined}
              >
                <span className="flex items-center gap-1">
                  {col.label}
                  {col.sortable && sortColumnIndex === i && (
                    <span className="text-primary">{sortAscending ? "↑" : "↓"}</span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {rows.map((row, rowIdx) => {
            const isSelected = selectedRows.includes(rowIdx);
            return (
              <tr
                key={rowIdx}
                onClick={() => onRowTap?.(row, rowIdx)}
                className={cn(
                  "transition-colors",
                  onRowTap ? "cursor-pointer hover:bg-accent/40" : "",
                  isSelected ? "bg-primary/10" : ""
                )}
                style={{
                  backgroundColor: !isSelected && dataRowColor ? dataRowColor : undefined,
                  borderBottom: `${dividerThickness}px solid hsl(var(--border))`,
                }}
              >
                {showCheckboxColumn && (
                  <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => onSelectRow?.(rowIdx, e.target.checked)}
                      className="cursor-pointer accent-primary"
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={col.id}
                    className={cn("px-4 py-2.5 text-foreground/90", col.numeric ? "text-right" : "")}
                  >
                    {col.accessor(row)}
                  </td>
                ))}
              </tr>
            );
          })}
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (showCheckboxColumn ? 1 : 0)}
                className="text-center py-10 text-muted-foreground"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
