import ExpoModulesCore

public class WalrusMemoryTrackerModule: Module {
  public func definition() -> ModuleDefinition {
    Name("WalrusMemoryTracker")

    Function("hello") {
      return "Hello world! 👋"
    }
  }
}
