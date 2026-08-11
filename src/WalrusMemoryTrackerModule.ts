import { NativeModule, requireNativeModule } from 'expo';
import { MemoryInfo } from './WalrusMemoryTracker.types';

declare class WalrusMemoryTrackerModule extends NativeModule<{}> {
  hello(): string;
  getMemoryInfo(): Promise<MemoryInfo>;
}

export default requireNativeModule<WalrusMemoryTrackerModule>('WalrusMemoryTracker');
