"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, ZoomIn, ZoomOut, Download, Database } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { SchemaData, PositionedTable } from './types';
import { TableNode } from './TableNode';
import { RelationshipLines } from './RelationshipLines';

interface DiagramContainerProps {
    data: SchemaData;
    projectId: string;
}

export default function DiagramContainer({ data, projectId }: DiagramContainerProps) {
    const [tables, setTables] = useState<PositionedTable[]>([]);
    const [scale, setScale] = useState(1);
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // Dragging State
    // We keep track of "which table is being dragged" and "where the drag started"
    const draggingRef = useRef<{
        active: boolean;
        tableName: string | null;
        startX: number;
        startY: number;
        initialTableX: number;
        initialTableY: number;
        isPanning: boolean;
        panStartX: number;
        panStartY: number;
        initialPanX: number;
        initialPanY: number;
    }>({
        active: false,
        tableName: null,
        startX: 0,
        startY: 0,
        initialTableX: 0,
        initialTableY: 0,
        isPanning: false,
        panStartX: 0,
        panStartY: 0,
        initialPanX: 0,
        initialPanY: 0
    });

    // Initialization: Layout
    useEffect(() => {
        if (!data?.tables) return;

        // Auto-Layout Algorithm (Grid)
        // In a real app we might use dagre or elkjs for optimized layout
        const cols = Math.ceil(Math.sqrt(data.tables.length));
        const xSpacing = 350;
        const ySpacing = 300;

        const initialTables = data.tables.map((table, index) => ({
            ...table,
            x: (index % cols) * xSpacing + 100,
            y: Math.floor(index / cols) * ySpacing + 100
        }));

        setTables(initialTables);
    }, [data]);

    // Global Mouse Handlers for Dragging
    // This ensures smooth dragging even if cursor moves fast
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const state = draggingRef.current;
            if (!state.active) return;

            if (state.isPanning) {
                const dx = e.clientX - state.panStartX;
                const dy = e.clientY - state.panStartY;
                setPanOffset({
                    x: state.initialPanX + dx,
                    y: state.initialPanY + dy
                });
                return;
            }

            if (state.tableName) {
                // Dragging a table
                // Delta must be divided by scale to match canvas coordinate system
                const dx = (e.clientX - state.startX) / scale;
                const dy = (e.clientY - state.startY) / scale;

                // Optimization: We could use requestAnimationFrame here if this is too heavy
                // But since we are updating React state which triggers re-render of lines, 
                // we rely on React's batching. For 20-50 tables this is usually fine.
                setTables(prev => prev.map(t => {
                    if (t.name === state.tableName) {
                        return {
                            ...t,
                            x: state.initialTableX + dx,
                            y: state.initialTableY + dy
                        };
                    }
                    return t;
                }));
            }
        };

        const handleMouseUp = () => {
            draggingRef.current.active = false;
            draggingRef.current.tableName = null;
            draggingRef.current.isPanning = false;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [scale]); // Re-bind if scale changes to ensure delta calculation uses new scale

    const handleTableDragStart = useCallback((e: React.MouseEvent, tableName: string) => {
        e.stopPropagation(); // Prevent panning
        // Find current table pos
        const table = tables.find(t => t.name === tableName);
        if (!table) return;

        draggingRef.current = {
            active: true,
            tableName,
            startX: e.clientX,
            startY: e.clientY,
            initialTableX: table.x,
            initialTableY: table.y,
            isPanning: false,
            panStartX: 0,
            panStartY: 0,
            initialPanX: 0,
            initialPanY: 0
        };
    }, [tables]);

    const handlePanStart = useCallback((e: React.MouseEvent) => {
        // Only pan if clicking on background (svg or div)
        if ((e.target as HTMLElement).tagName !== 'DIV' && (e.target as HTMLElement).tagName !== 'svg') return;

        draggingRef.current = {
            active: true,
            tableName: null,
            startX: 0,
            startY: 0,
            initialTableX: 0,
            initialTableY: 0,
            isPanning: true,
            panStartX: e.clientX,
            panStartY: e.clientY,
            initialPanX: panOffset.x,
            initialPanY: panOffset.y
        };
    }, [panOffset]);


    const handleExport = () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `schema-${projectId}.json`;
        a.click();
    };

    return (
        <div className="flex flex-col h-screen bg-[#0f172a] text-white overflow-hidden font-sans select-none">
            {/* Header */}
            <header className="flex flex-col md:flex-row items-center justify-between px-4 md:px-6 py-4 border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md z-50 gap-4 md:gap-0">
                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
                    <Link href={`/projects/${projectId}`}>
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                            <ArrowLeft size={18} className="mr-2" /> <span className="hidden sm:inline">Back</span>
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-lg md:text-xl font-bold flex items-center gap-2">
                            <Database size={20} className="text-blue-500" />
                            <span className="truncate max-w-[150px] sm:max-w-none">DB Diagrams</span>
                        </h1>
                        <p className="text-[10px] md:text-xs text-slate-500 font-mono mt-0.5">{data.type} • {data.tables.length} Tables</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
                    <div className="bg-slate-800 rounded-lg p-1 flex items-center mr-0 md:mr-4">
                        <button onClick={() => setScale(s => Math.max(0.2, s - 0.1))} className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors"><ZoomOut size={16} /></button>
                        <span className="w-10 md:w-12 text-center text-[10px] md:text-xs text-slate-400 font-mono">{Math.round(scale * 100)}%</span>
                        <button onClick={() => setScale(s => Math.min(2, s + 0.1))} className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors"><ZoomIn size={16} /></button>
                    </div>

                    <Button onClick={handleExport} variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs md:text-sm px-3 md:px-4">
                        <Download size={14} className="mr-2" /> <span className="hidden sm:inline">Export JSON</span><span className="sm:hidden">Export</span>
                    </Button>
                </div>
            </header>

            {/* Canvas */}
            <div
                ref={containerRef}
                className="flex-1 w-full h-full relative bg-[#0f172a] overflow-hidden cursor-move"
                onMouseDown={handlePanStart}
                style={{
                    backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: `${panOffset.x}px ${panOffset.y}px`
                }}
            >
                {/* Transform Container */}
                <div
                    className="absolute origin-top-left w-full h-full will-change-transform"
                    style={{
                        transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${scale})`
                    }}
                >
                    <RelationshipLines tables={tables} relationships={data.relationships} scale={scale} />

                    {tables.map(table => (
                        <TableNode
                            key={table.name}
                            table={table}
                            scale={scale}
                            onDragStart={handleTableDragStart}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
