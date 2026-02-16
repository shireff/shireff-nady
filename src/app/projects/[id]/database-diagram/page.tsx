import React from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

// Dynamic import for DatabaseDiagramViewer with loading state
const DatabaseDiagramViewer = dynamic(
    () => import('@/components/features/DatabaseDiagramViewer'),
    {
        loading: () => (
            <div className="h-screen w-full bg-[#0f172a] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                    <p className="text-slate-400 text-sm">Loading diagram...</p>
                </div>
            </div>
        )
    }
);

// Allow 5 minutes cache or revalidate on demand
export const revalidate = 300;

async function getDiagram(id: string) {
    // Force IPv4 for server-side fetching to avoid Node 17+ IPv6 resolution issues with 'localhost'
    let apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';


    try {
        console.log(`[DatabaseDiagram] Fetching from: ${apiUrl}/projects/${id}/database-diagram`);
        const res = await fetch(`${apiUrl}/projects/${id}/database-diagram`, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json'
            }
        });


        if (!res.ok) {
            if (res.status === 404) return null;
            const text = await res.text();
            throw new Error(`Failed to fetch diagram: ${res.status} ${text}`);
        }

        const json = await res.json();
        console.log(`[DatabaseDiagram] JSON Success:`, json.success);
        return json.databaseDiagram || json.data; // Support both formats (legacy data or new databaseDiagram)
    } catch (error) {
        console.error("Error fetching database diagram:", error);
        return null;
    }
}

export default async function DatabaseDiagramPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const diagramData = await getDiagram(id);

    if (!diagramData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white space-y-4">
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200">
                    Failed to load database diagram specification.
                </div>
                <p className="text-slate-500 text-sm">Project ID: {id}</p>
            </div>
        );
    }

    return (
        <div className="h-screen w-full bg-[#0f172a]">
            <DatabaseDiagramViewer data={diagramData} projectId={id} />
        </div>
    );
}
