import { useCallback, useMemo } from 'react';

import { EAppUpdateStatus, EUpdateStrategy } from '@onekeyhq/shared/src/appUpdate';
import { ETranslations } from '@onekeyhq/shared/src/locale';
import { useAppUpdatePersistAtom } from '@onekeyhq/kit-bg/src/states/jotai/atoms';
import { useIntl } from 'react-intl';

export const isAutoUpdateStrategy = (_updateStrategy: EUpdateStrategy) => false;

export const isShowAppUpdateUIWhenUpdating = (_params: {
  updateStrategy: EUpdateStrategy;
  updateStatus: EAppUpdateStatus;
}) => false;

export const isForceUpdateStrategy = (_updateStrategy: EUpdateStrategy) => false;

export const useAppChangeLog = () => useMemo(() => undefined, []);

export const useDownloadPackage = () => {
  const noopAsync = useCallback(async (..._args: unknown[]) => {}, []);
  const noopAction = useCallback((..._args: unknown[]) => {}, []);
  return {
    installPackage: noopAsync,
    downloadPackage: noopAsync,
    verifyPackage: noopAsync,
    verifyASC: noopAsync,
    downloadASC: noopAsync,
    manualInstallPackage: noopAction,
    showSilentUpdateDialog: noopAction,
    showUpdateInCompleteDialog: noopAction,
  };
};

export const useAppUpdateInfo = (_isFullModal = false, _autoCheck = true) => {
  const { formatMessage } = useIntl();
  const [appUpdateInfo] = useAppUpdatePersistAtom();
  const noopAsync = useCallback(async () => ({ isNeedUpdate: false }), []);
  const noopAction = useCallback(() => {}, []);
  const data = useMemo(
    () => ({
      ...appUpdateInfo,
      status: EAppUpdateStatus.done,
      updateStrategy: EUpdateStrategy.manual,
    }),
    [appUpdateInfo],
  );
  return useMemo(
    () => ({
      isNeedUpdate: false,
      updateFileType: undefined,
      data,
      onUpdateAction: noopAction,
      toUpdatePreviewPage: noopAction,
      onViewReleaseInfo: noopAction,
      checkForUpdates: noopAsync,
      title: formatMessage({ id: ETranslations.update_update_now }),
    }),
    [data, formatMessage, noopAction, noopAsync],
  );
};
