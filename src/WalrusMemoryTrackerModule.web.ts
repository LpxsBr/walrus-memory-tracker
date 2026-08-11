import { registerWebModule, NativeModule } from 'expo';

class WalrusMemoryTrackerModule extends NativeModule<{}> {
  hello() {
    return 'Hello world! 👋';
  }
  getMemoryInfo() {
    return Promise.resolve({
      device_totalMemory      : 0,
      device_availableMemory  : 0,
      device_usedMemory       : 0,
      process_totalMemory     : 0,
      process_freeMemory      : 0,
      process_usedMemory      : 0,
      process_pss             : 0,
    });
  }
}

export default registerWebModule(WalrusMemoryTrackerModule, 'WalrusMemoryTrackerModule');
