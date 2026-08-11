package walrus.module.memorytracker

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class WalrusMemoryTrackerModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("WalrusMemoryTracker")

    Function("hello") {
      "Hello world! 👋"
    }
  }
}
