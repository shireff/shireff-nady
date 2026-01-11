import React, { memo, useState, useCallback, useEffect } from 'react';
import { PositionedTable } from './types';
import { Table as TableIcon, Move, Key, Database } from 'lucide-react';

interface TableNodeProps {
    table: PositionedTable;
    scale: number;
    onDragStart: (e: React.MouseEvent, tableName: string) => void;
    // We don't pass onDrag here because Dragging needs to be global on window to avoid cursors slipping
}

export const TableNode = memo(function TableNode({ table, scale, onDragStart }: TableNodeProps) {

    return (
        <div
            className="absolute flex flex-col w-[250px] bg-[#1e293b] border border-slate-700 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm bg-opacity-90 transition-shadow hover:shadow-blue-500/20"
            style={{
                left: table.x,
                top: table.y,
                // We do strictly controlled Top/Left. No transform translate for the table container itself relative to canvas.
            }}
        >
            {/* Header / Drag Handle */}
            <div
                className="px-4 py-3 bg-gradient-to-r from-blue-900/40 to-slate-900/40 border-b border-slate-700 cursor-grab active:cursor-grabbing flex items-center justify-between group select-none"
                onMouseDown={(e) => onDragStart(e, table.name)}
            >
                <div className="font-bold text-sm text-slate-200 flex items-center gap-2 truncate">
                    <TableIcon size={14} className="text-blue-400 shrink-0" />
                    <span className="truncate" title={table.name}>{table.name}</span>
                </div>
                <Move size={12} className="text-slate-600 group-hover:text-slate-400" />
            </div>

            {/* Columns */}
            <div className="divide-y divide-slate-800/50 bg-[#0f172a]/50">
                {table.columns.map((col, idx) => (
                    <div key={idx} className="px-4 py-2 flex items-center justify-between text-xs hover:bg-slate-800/80 transition-colors group/col">
                        <div className="flex items-center gap-2 overflow-hidden">
                            {col.isPrimaryKey && <div title="Primary Key"><Key size={10} className="text-amber-500 shrink-0" /></div>}
                            {col.isForeignKey && <div title={`Foreign Key -> ${col.references?.table || '?'}`}><Key size={10} className="text-blue-400 shrink-0" /></div>}
                            <span className={`truncate ${col.isPrimaryKey ? 'font-bold text-amber-100' : 'text-slate-300'}`} title={col.name}>
                                {col.name}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500 font-mono text-[10px] ml-2 shrink-0">{col.type}</span>
                            {col.isNullable === false && <span className="text-[8px] text-red-400 font-bold" title="Not Null">*</span>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});
