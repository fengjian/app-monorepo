import { useCallback, useEffect } from 'react';

import backgroundApiProxy from '@onekeyhq/kit/src/background/instance/backgroundApiProxy';
import {
  usePasswordAtom,
  usePasswordPersistAtom,
  useSystemIdleLockSupport,
} from '@onekeyhq/kit-bg/src/states/jotai/atoms';
import platformEnv from '@onekeyhq/shared/src/platformEnv';

const LastActivityTracker = () => {
  const [{ enableSystemIdleLock, appLockDuration }] = usePasswordPersistAtom();
  const [{ unLock }] = usePasswordAtom();
  const [supportSystemIdle] = useSystemIdleLockSupport();

  useEffect(() => {
    return undefined;
  }, []);

  const extHandleSystemIdle = useCallback(
    (state: 'idle' | 'locked' | 'active') => {
      if (state === 'idle' || state === 'locked') {
        void backgroundApiProxy.servicePassword.lockApp();
      }
    },
    [],
  );

  // idle event trigger
  useEffect(() => {
    if (supportSystemIdle && enableSystemIdleLock && unLock) {
      if (platformEnv.isExtension) {
        chrome.idle.setDetectionInterval(appLockDuration * 60);
        chrome.idle.onStateChanged.addListener(extHandleSystemIdle);
      }

      if (platformEnv.isDesktop) {
        globalThis?.desktopApi?.setSystemIdleTime(appLockDuration * 60, () => {
          void backgroundApiProxy.servicePassword.lockApp();
        });
      }
    } else {
      if (platformEnv.isExtension) {
        chrome.idle.onStateChanged.removeListener(extHandleSystemIdle);
      }
      if (platformEnv.isDesktop) {
        globalThis?.desktopApi?.setSystemIdleTime(0); // set 0 to disable
      }
    }
  }, [
    appLockDuration,
    enableSystemIdleLock,
    extHandleSystemIdle,
    supportSystemIdle,
    unLock,
  ]);
  return null;
};

export default LastActivityTracker;
