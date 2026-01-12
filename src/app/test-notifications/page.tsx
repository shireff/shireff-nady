"use client";

import React from "react";
import { useFCM } from "@/hooks/useFCM";

export default function NotificationTestPage() {
    const { permission, requestPermission, token } = useFCM();

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-2xl w-full space-y-6">
                <div className="glass-card p-8">
                    <h1 className="text-3xl font-black mb-6">🔔 Notification Test</h1>

                    <div className="space-y-4">
                        <div className="p-4 bg-blue-500/10 rounded-lg">
                            <p className="text-sm font-bold text-blue-500 mb-1">Permission Status</p>
                            <p className="text-2xl font-black">{permission}</p>
                        </div>

                        {permission === "default" && (
                            <button
                                onClick={requestPermission}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-bold transition-colors"
                            >
                                Request Permission
                            </button>
                        )}

                        {permission === "granted" && token && (
                            <div className="p-4 bg-green-500/10 rounded-lg">
                                <p className="text-sm font-bold text-green-500 mb-1">FCM Token</p>
                                <p className="text-xs font-mono break-all">{token}</p>
                            </div>
                        )}

                        {permission === "denied" && (
                            <div className="p-4 bg-red-500/10 rounded-lg">
                                <p className="text-sm font-bold text-red-500">Permission Denied</p>
                                <p className="text-xs mt-2">Please enable notifications in your browser settings.</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                        <p className="text-xs font-bold mb-2">Instructions:</p>
                        <ol className="text-xs space-y-1 list-decimal list-inside">
                            <li>Click "Request Permission" button</li>
                            <li>Allow notifications when prompted</li>
                            <li>Check browser console for detailed logs</li>
                            <li>Verify token appears above</li>
                            <li>Check backend logs for token registration</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}
