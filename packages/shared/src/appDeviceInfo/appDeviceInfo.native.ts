import appGlobals from '../appGlobals';
import type { IAppDeviceInfo, IAppDeviceInfoData } from './types';

const fixedDeviceInfo: IAppDeviceInfoData = {
  displayName: 'OneKey Device',
  device: {
    type: 'mobile',
    vendor: 'OneKey',
    model: 'Generic',
    name: 'OneKey',
  },
  os: {
    name: 'Unknown',
    version: '0',
  },
  cpu: {
    architecture: undefined,
  },
  browser: {
    name: undefined,
    version: undefined,
    versionMajor: undefined,
    type: undefined,
    engine: undefined,
    engineVersion: undefined,
    ua: undefined,
  },
};

const appDeviceInfo: IAppDeviceInfo = {
  getDeviceInfo: async () => {
    return fixedDeviceInfo;
  },
};

if (process.env.NODE_ENV !== 'production') {
  appGlobals.$$appDeviceInfo = appDeviceInfo;
}

export default appDeviceInfo;
