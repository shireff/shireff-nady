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
        if (!data?.tables || data.tables.length === 0) return;

        // Constants
        const TABLE_WIDTH = 300;
        const X_SPACING = 380;
        const Y_SPACING = 300;

        // 1. Build Graph & Connectivity
        const tableMap = new Map(data.tables.map(t => [t.name, t]));
        const adj = new Map<string, string[]>(); // Directed
        const undirectedAdj = new Map<string, string[]>(); // Undirected for components

        data.tables.forEach(t => {
            adj.set(t.name, []);
            undirectedAdj.set(t.name, []);
        });

        // Build adjacency
        const validTables = new Set(data.tables.map(t => t.name));
        data.relationships.forEach(rel => {
            if (validTables.has(rel.fromTable) && validTables.has(rel.toTable)) {
                adj.get(rel.fromTable)?.push(rel.toTable);
                undirectedAdj.get(rel.fromTable)?.push(rel.toTable);
                undirectedAdj.get(rel.toTable)?.push(rel.fromTable);
            }
        });

        // 2. Identify Components (BFS)
        const visited = new Set<string>();
        const components: string[][] = [];

        for (const table of data.tables) {
            if (!visited.has(table.name)) {
                const component: string[] = [];
                const q = [table.name];
                visited.add(table.name); // Mark start node as visited immediately

                while (q.length > 0) {
                    const u = q.shift()!;
                    component.push(u);
                    const neighbors = undirectedAdj.get(u) || [];
                    for (const v of neighbors) {
                        if (!visited.has(v)) {
                            visited.add(v);
                            q.push(v);
                        }
                    }
                }
                components.push(component);
            }
        }

        // Sort: Largest first (Main Graph)
        components.sort((a, b) => b.length - a.length);

        // Helper: Hierarchical Layout for a component
        const layoutComponent = (nodes: string[], startX: number, startY: number) => {
            const nodesSet = new Set(nodes);
            const localResults: { name: string; x: number; y: number }[] = [];

            // Calculate In-Degrees within Component using Directed edges
            const localInDegree = new Map<string, number>();
            nodes.forEach(n => localInDegree.set(n, 0));

            data.relationships.forEach(rel => {
                if (nodesSet.has(rel.fromTable) && nodesSet.has(rel.toTable)) {
                    localInDegree.set(rel.toTable, (localInDegree.get(rel.toTable) || 0) + 1);
                }
            });

            // Find Roots (In-Degree 0)
            let roots = nodes.filter(n => localInDegree.get(n) === 0);
            if (roots.length === 0 && nodes.length > 0) {
                // Cycle or no clear root: pick min in-degree or just first
                roots = [nodes[0]];
            }

            // Assign Levels (BFS)
            const levels = new Map<string, number>();
            const visitedInLayout = new Set<string>();
            const queue = [...roots];

            roots.forEach(r => {
                levels.set(r, 0);
                visitedInLayout.add(r);
            });

            // Process hierarchy
            while (queue.length > 0) {
                const u = queue.shift()!;
                const currentLevel = levels.get(u)!;

                const children = adj.get(u)?.filter(n => nodesSet.has(n)) || [];
                for (const v of children) {
                    if (!visitedInLayout.has(v)) {
                        visitedInLayout.add(v);
                        levels.set(v, currentLevel + 1);
                        queue.push(v);
                    }
                }
            }

            // Handle unvisited nodes (cycles/disconnected parts that are "connected" in undirected but not reachable via directed from chosen root)
            nodes.forEach(n => {
                if (!visitedInLayout.has(n)) levels.set(n, 0);
            });

            // Group by Level
            const levelGroups = new Map<number, string[]>();
            nodes.forEach(n => {
                const lvl = levels.get(n) || 0;
                if (!levelGroups.has(lvl)) levelGroups.set(lvl, []);
                levelGroups.get(lvl)!.push(n);
            });

            // Position Nodes
            let maxW = 0;
            let maxH = 0;
            const sortedLevels = Array.from(levelGroups.keys()).sort((a, b) => a - b);

            // Calculate max width for centering
            sortedLevels.forEach(lvl => {
                const count = levelGroups.get(lvl)!.length;
                maxW = Math.max(maxW, count * X_SPACING);
            });

            sortedLevels.forEach(lvl => {
                const rowNodes = levelGroups.get(lvl)!;
                const rowWidth = rowNodes.length * X_SPACING;
                const rowStartX = startX + (maxW - rowWidth) / 2; // Center row

                rowNodes.forEach((nodeName, idx) => {
                    localResults.push({
                        name: nodeName,
                        x: rowStartX + idx * X_SPACING,
                        y: startY + lvl * Y_SPACING
                    });
                });
                maxH = Math.max(maxH, (lvl + 1) * Y_SPACING);
            });

            return { positions: localResults, width: maxW, height: maxH };
        };

        // 3. Orchestrate Global Layout
        const finalPositions: PositionedTable[] = [];
        const mainComponent = components[0] || [];
        const otherComponents = components.slice(1);

        // A. Layout Main Graph
        const mainLayout = layoutComponent(mainComponent, 0, 0);
        mainLayout.positions.forEach(p => {
            // Center Main Graph somewhat
            finalPositions.push({ ...tableMap.get(p.name)!, x: p.x + 50, y: p.y + 100 });
        });

        // B. Layout Peripheral (Isolated & Small Islands)
        let peripheralY = mainLayout.height + 250; // Gap below main graph
        const PERIPHERAL_START_X = 50;
        const PERIPHERAL_COLS = 5;

        let islandX = PERIPHERAL_START_X;
        let islandY = peripheralY;

        // Separate truly isolated (size 1) from small connected clusters
        const isolatedNodes: string[] = [];
        const smallIslands: string[][] = [];

        otherComponents.forEach(c => {
            if (c.length === 1) isolatedNodes.push(c[0]);
            else smallIslands.push(c);
        });

        // Place Small Islands first
        smallIslands.forEach(island => {
            const result = layoutComponent(island, islandX, islandY);
            result.positions.forEach(p => {
                finalPositions.push({ ...tableMap.get(p.name)!, x: p.x, y: p.y });
            });
            // Move formatted cursor
            islandX += result.width + 100;
            if (islandX > 1500) { // Wrap if too wide
                islandX = PERIPHERAL_START_X;
                islandY += result.height + 150;
            }
        });

        // Adjust Y for isolated grid if we added islands
        if (smallIslands.length > 0) {
            // Find max Y from islands (approx from current islandY because exact maxY is harder without tracking)
            // But good enough approximation:
            islandY += 200;
        }

        // Place Isolated Nodes (Grid)
        isolatedNodes.forEach((nodeName, idx) => {
            const row = Math.floor(idx / PERIPHERAL_COLS);
            const col = idx % PERIPHERAL_COLS;

            finalPositions.push({
                ...tableMap.get(nodeName)!,
                x: PERIPHERAL_START_X + col * (TABLE_WIDTH + 50),
                y: islandY + row * 250 // Slightly tighter Y for grid
            });
        });

        setTables(finalPositions);
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
