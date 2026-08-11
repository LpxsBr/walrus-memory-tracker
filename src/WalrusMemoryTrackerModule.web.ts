import { registerWebModule, NativeModule } from 'expo';

class WalrusMemoryTrackerModule extends NativeModule<{}> {
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(WalrusMemoryTrackerModule, 'WalrusMemoryTrackerModule');
