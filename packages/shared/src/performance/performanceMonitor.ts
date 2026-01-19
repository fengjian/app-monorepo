/**
 * Performance Monitoring - Main Entry
 *
 * This module provides the main entry point for initializing performance monitoring.
 * It should be called at the very beginning of the application, before other imports.
 *
 * Usage:
 *   import { initPerformanceMonitoring } from '@onekeyhq/shared/src/performance/performanceMonitor';
 *   await initPerformanceMonitoring({ platform: 'web' });
 *   // ... rest of the app imports
 */

import type { IPerfEvent } from './reporter/types';

export interface IPerformanceMonitoringOptions {
  platform: IPerfEvent['platform'];
  serverUrl?: string;
  timeout?: number;
  collectMemory?: boolean;
  collectFPS?: boolean;
  collectJSBlock?: boolean;
  memoryInterval?: number;
}

/**
 * Check if performance monitoring is enabled
 */
export function isPerfMonitoringEnabled(): boolean {
  return false;
}

/**
 * Initialize performance monitoring
 *
 * This function:
 * 1. Connects to the performance server via WebSocket
 * 2. Installs global hooks for reporting
 * 3. Starts system metrics collection (memory, FPS)
 *
 * @param options Configuration options
 * @returns Promise that resolves to true if connected, false otherwise
 */
export async function initPerformanceMonitoring(
  options: IPerformanceMonitoringOptions,
): Promise<boolean> {
  void options;
  return false;
  return false;
}

/**
 * Stop performance monitoring
 */
export function stopPerformanceMonitoring() {
  return;
}

// Re-export types and utilities
export type { IPerfEvent } from './reporter/types';
export {
  initPerfReporter,
  getPerfReporter,
  closePerfReporter,
} from './reporter';
export {
  startMemoryCollection,
  stopMemoryCollection,
} from './collectors/memoryCollector';
export {
  startFPSCollection,
  stopFPSCollection,
} from './collectors/fpsCollector';
