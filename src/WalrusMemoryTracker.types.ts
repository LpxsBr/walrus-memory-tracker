import { NativeModule } from 'expo';

export type MemoryInfo = {
    device_totalMemory      : number
    device_availableMemory  : number
    device_usedMemory       : number
    process_totalMemory     : number
    process_freeMemory      : number
    process_usedMemory      : number
    process_pss             : number
};

export declare class WalrusMemoryTrackerModule
  extends NativeModule<{}> {
  hello(): string;

  getMemoryInfo(): Promise<MemoryInfo>;
}