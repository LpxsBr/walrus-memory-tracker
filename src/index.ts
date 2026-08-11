// Reexport the native module. On web, it will be resolved to WalrusMemoryTrackerModule.web.ts
// and on native platforms to WalrusMemoryTrackerModule.ts
export { default } from './WalrusMemoryTrackerModule';
export * from './WalrusMemoryTracker.types';
