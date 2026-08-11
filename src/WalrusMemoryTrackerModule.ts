import { NativeModule, requireNativeModule } from 'expo';

declare class WalrusMemoryTrackerModule extends NativeModule<{}> {
  hello(): string;
}

export default requireNativeModule<WalrusMemoryTrackerModule>('WalrusMemoryTracker');
