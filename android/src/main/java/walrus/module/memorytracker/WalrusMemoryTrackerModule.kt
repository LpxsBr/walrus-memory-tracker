package walrus.module.memorytracker

import android.app.ActivityManager
import android.content.Context
import android.os.Debug
import android.util.Log

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
class WalrusMemoryTrackerModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("WalrusMemoryTracker")

    Function("hello") {
      "Hello world! 👋"
    }

    Function ("getMemoryInfo") {
      val memoryInfo = Debug.MemoryInfo()
      
      Debug.getMemoryInfo(memoryInfo)

      val context = appContext.reactContext
                ?: throw IllegalStateException("React context is not available")

      Log.d("WalrusMemoryTrackerModule", "Memory info: totalPss=${memoryInfo.totalPss}, dalvikPss=${memoryInfo.dalvikPss}, nativePss=${memoryInfo.nativePss}, otherPss=${memoryInfo.otherPss}")

      val activityManager = context.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
      val memoryInfoDevice = ActivityManager.MemoryInfo()
      activityManager.getMemoryInfo(memoryInfoDevice)

      val totalMemory = memoryInfoDevice.totalMem
      val availableMemory = memoryInfoDevice.availMem

      mapOf(
        "device_totalMemory" to totalMemory / (1024.0 * 1024.0), // Convert to MB
        "device_availableMemory" to availableMemory / (1024.0 * 1024.0), // Convert to MB
        "device_usedMemory" to (totalMemory - availableMemory) / (1024.0 * 1024.0), // Convert to MB
        "process_totalMemory" to memoryInfo.totalPss / 1024.0, // Convert to MB
        "process_freeMemory" to memoryInfo.dalvikPss / 1024.0, // Convert to MB
        "process_usedMemory" to memoryInfo.nativePss / 1024.0, // Convert to MB
        "process_pss"       to memoryInfo.otherPss / 1024.0 // Convert to MB
      )
    }
  }
}
