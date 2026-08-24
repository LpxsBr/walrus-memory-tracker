import ExpoModulesCore
import Darwin

public class WalrusMemoryTrackerModule: Module {
  public func definition() -> ModuleDefinition {
    Name("WalrusMemoryTracker")

    Function("hello") {
      return "Hello world! 👋"
    }

    Function("getMemoryInfo") {
      return getMemoryInfo()
    }
  }

  private func getMemoryInfo() -> [String: Double] {
    let deviceTotalMemory = Double(ProcessInfo.processInfo.physicalMemory)
    let processMemory = getProcessMemory()

    return [
      "device_totalMemory": deviceTotalMemory / 1024.0 / 1024.0,

      // iOS não possui um equivalente direto ao Android availMem.
      "device_availableMemory": 0,

      "device_usedMemory": 0,

      "process_totalMemory": processMemory / 1024.0 / 1024.0,

      "process_freeMemory": 0,

      "process_usedMemory": processMemory / 1024.0 / 1024.0,

      "process_pss": processMemory / 1024.0 / 1024.0
    ]
  }

  private func getProcessMemory() -> UInt64 {
    var info = task_vm_info_data_t()
    var count = mach_msg_type_number_t(
      MemoryLayout<task_vm_info_data_t>.size
        / MemoryLayout<integer_t>.size
    )

    let result = withUnsafeMutablePointer(to: &info) {
      $0.withMemoryRebound(
        to: integer_t.self,
        capacity: Int(count)
      ) {
        task_info(
          mach_task_self_,
          task_flavor_t(TASK_VM_INFO),
          $0,
          &count
        )
      }
    }

    if result == KERN_SUCCESS {
      return UInt64(info.phys_footprint)
    }

    return 0
  }
}