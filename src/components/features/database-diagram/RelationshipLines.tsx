import React, { memo } from 'react';
import { PositionedTable, Relationship } from './types';

interface RelationshipLinesProps {
    tables: PositionedTable[];
    relationships: Relationship[];
    scale: number;
}

const TABLE_WIDTH = 250;
const ROW_HEIGHT = 40;
const HEADER_HEIGHT = 50;

export const RelationshipLines = memo(function RelationshipLines({ tables, relationships, scale }: RelationshipLinesProps) {
    if (!relationships || tables.length === 0) return null;

    return (
        <svg className="absolute inset-0 pointer-events-none w-full h-full overflow-visible" style={{ zIndex: 0 }}>
            <defs>
                <marker
                    id="arrowhead-rel"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                >
                    <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                </marker>
            </defs>
            {relationships.map((rel, i) => {
                const fromTable = tables.find(t => t.name === rel.fromTable);
                const toTable = tables.find(t => t.name === rel.toTable);

                if (!fromTable || !toTable) return null;

                const fromColIndex = fromTable.columns.findIndex(c => c.name === rel.fromColumn);
                const toColIndex = toTable.columns.findIndex(c => c.name === rel.toColumn);

                // Calculate anchor points
                // Start: Right side of From Table
                const startX = fromTable.x + TABLE_WIDTH;
                const startY = fromTable.y + HEADER_HEIGHT + (fromColIndex !== -1 ? fromColIndex * ROW_HEIGHT : 0) + (ROW_HEIGHT / 2);

                // End: Left side of To Table
                const endX = toTable.x;
                const endY = toTable.y + HEADER_HEIGHT + (toColIndex !== -1 ? toColIndex * ROW_HEIGHT : 0) + (ROW_HEIGHT / 2);

                // Bezier Curve Logic
                // Adjust curvature based on distance
                const dist = Math.abs(endX - startX);
                const controlOffset = Math.max(dist * 0.5, 50);

                const controlPointX1 = startX + controlOffset;
                const controlPointX2 = endX - controlOffset;

                return (
                    <g key={`${rel.fromTable}-${rel.fromColumn}-${rel.toTable}-${rel.toColumn}-${i}`}>
                        <path
                            d={`M ${startX} ${startY} C ${controlPointX1} ${startY}, ${controlPointX2} ${endY}, ${endX} ${endY}`}
                            fill="none"
                            stroke="#64748b"
                            strokeWidth={2}
                            markerEnd="url(#arrowhead-rel)"
                            className="transition-colors duration-300 hover:stroke-blue-500 opacity-60"
                        />
                        {/* Connection Dots */}
                        <circle cx={startX} cy={startY} r="3" fill="#3b82f6" />
                        <circle cx={endX} cy={endY} r="3" fill="#3b82f6" />
                    </g>
                );
            })}
        </svg>
    );
});
