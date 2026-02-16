/**
 * SWR Configuration Provider
 */

'use client';

import { SWRConfig } from 'swr';
import { ReactNode } from 'react';

interface SWRProviderProps {
  children: ReactNode;
}

export default function SWRProvider({ children }: SWRProviderProps) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 0, // Disable auto-refresh by default
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: true,
        errorRetryCount: 3,
        errorRetryInterval: 5000,
        dedupingInterval: 2000,
        focusThrottleInterval: 5000,
        onError: (error, key) => {
          console.error(`SWR Error for ${key}:`, error);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
