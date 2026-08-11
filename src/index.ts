// Reexport the native module. On web, it will be resolved to WalrusMemoryTrackerModule.web.ts
// and on native platforms to WalrusMemoryTrackerModule.ts
import { NativeModule, requireNativeModule } from 'expo';
import type { MemoryInfo } from './WalrusMemoryTracker.types';

export declare class WalrusMemoryTrackerModule
  extends NativeModule<{}> {
  hello(): string;
  getMemoryInfo(): Promise<MemoryInfo>;
}

export default requireNativeModule<WalrusMemoryTrackerModule>(
  'WalrusMemoryTracker'
);