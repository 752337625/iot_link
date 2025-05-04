export interface MachineBaseInfo {
  [key: string]: string;
  hostName?: string;
  systemOs?: string;
  textAlign?: string;
  osArchitecture?: string;
  processorCount?: string;
  sysRunTime?: string;
  remoteIp?: string;
  localIp?: string;
  frameworkDescription?: string;
}

export interface MachineUseInfo {
  freeRam?: string;
  usedRam?: string;
  totalRam?: string;
  ramRate?: string;
  cpuRate?: string;
  startTime?: string;
  runTime?: string;
}
export interface MachineServerDisk {
  diskName?: string;
  typeName?: string;
  totalFree?: number;
  totalSize?: number;
  used?: number;
  availableFreeSpace?: number;
  availablePercent?: number;
}
