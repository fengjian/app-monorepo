import {
  EAppUpdateStatus,
  EUpdateStrategy,
} from '@onekeyhq/shared/src/appUpdate';
import {
  backgroundClass,
  backgroundMethod,
} from '@onekeyhq/shared/src/background/backgroundDecorators';
import platformEnv from '@onekeyhq/shared/src/platformEnv';

import { appUpdatePersistAtom } from '../states/jotai/atoms';

import ServiceBase from './ServiceBase';

const getDefaultAppUpdateInfo = () => ({
  latestVersion: platformEnv.version,
  jsBundleVersion: platformEnv.bundleVersion,
  updateStrategy: EUpdateStrategy.manual,
  updateAt: 0,
  summary: '',
  status: EAppUpdateStatus.done,
  jsBundle: undefined,
  previousAppVersion: undefined,
  downloadedEvent: undefined,
  lastUpdateDialogShownAt: undefined,
});

@backgroundClass()
class ServiceAppUpdate extends ServiceBase {
  constructor({ backgroundApi }: { backgroundApi: any }) {
    super({ backgroundApi });
  }

  @backgroundMethod()
  async fetchConfig() {
    return undefined;
  }

  @backgroundMethod()
  async getAppLatestInfo(_forceUpdate = false) {
    return undefined;
  }

  @backgroundMethod()
  async getUpdateStatus() {
    const appInfo = await appUpdatePersistAtom.get();
    return appInfo.status;
  }

  @backgroundMethod()
  async refreshUpdateStatus() {
    return undefined;
  }

  @backgroundMethod()
  async isNeedSyncAppUpdateInfo(_forceUpdate = false) {
    return false;
  }

  @backgroundMethod()
  public async downloadPackage() {
    await appUpdatePersistAtom.set(getDefaultAppUpdateInfo());
  }

  @backgroundMethod()
  updateErrorText(_status: EAppUpdateStatus, _errorText: string) {
    void appUpdatePersistAtom.set(getDefaultAppUpdateInfo());
  }

  @backgroundMethod()
  public async downloadPackageFailed(_e?: { message: string }) {
    await appUpdatePersistAtom.set(getDefaultAppUpdateInfo());
  }

  @backgroundMethod()
  public async updateDownloadedEvent(_downloadedEvent: unknown) {
    await appUpdatePersistAtom.set(getDefaultAppUpdateInfo());
  }

  @backgroundMethod()
  public async updateDownloadUrl(_downloadUrl: string) {
    return undefined;
  }

  @backgroundMethod()
  public async getDownloadEvent() {
    return undefined;
  }

  @backgroundMethod()
  public async getUpdateInfo() {
    return appUpdatePersistAtom.get();
  }

  @backgroundMethod()
  public async verifyPackage() {
    await appUpdatePersistAtom.set(getDefaultAppUpdateInfo());
  }

  @backgroundMethod()
  public async verifyASC() {
    await appUpdatePersistAtom.set(getDefaultAppUpdateInfo());
  }

  @backgroundMethod()
  public async downloadASC() {
    await appUpdatePersistAtom.set(getDefaultAppUpdateInfo());
  }

  @backgroundMethod()
  public async verifyASCFailed(_e?: { message: string }) {
    await appUpdatePersistAtom.set(getDefaultAppUpdateInfo());
  }

  @backgroundMethod()
  public async verifyPackageFailed(_e?: { message: string }) {
    await appUpdatePersistAtom.set(getDefaultAppUpdateInfo());
  }

  @backgroundMethod()
  public async downloadASCFailed(_e?: { message: string }) {
    await appUpdatePersistAtom.set(getDefaultAppUpdateInfo());
  }

  @backgroundMethod()
  public async readyToInstall() {
    await appUpdatePersistAtom.set(getDefaultAppUpdateInfo());
  }

  @backgroundMethod()
  public async reset() {
    await appUpdatePersistAtom.set(getDefaultAppUpdateInfo());
  }

  @backgroundMethod()
  public async resetToManualInstall() {
    await appUpdatePersistAtom.set(getDefaultAppUpdateInfo());
  }

  @backgroundMethod()
  public async resetToInComplete() {
    await appUpdatePersistAtom.set(getDefaultAppUpdateInfo());
  }

  @backgroundMethod()
  public async updateLastDialogShownAt() {
    await appUpdatePersistAtom.set((prev) => ({
      ...getDefaultAppUpdateInfo(),
      lastUpdateDialogShownAt: Date.now(),
      updateAt: prev.updateAt,
    }));
  }

  @backgroundMethod()
  public async clearLastDialogShownAt() {
    await appUpdatePersistAtom.set((prev) => ({
      ...getDefaultAppUpdateInfo(),
      updateAt: prev.updateAt,
    }));
  }

  @backgroundMethod()
  public async clearCache() {
    await appUpdatePersistAtom.set(getDefaultAppUpdateInfo());
  }

  @backgroundMethod()
  public async fetchChangeLog() {
    return undefined;
  }

  @backgroundMethod()
  public async fetchAppUpdateInfo(_forceUpdate = false) {
    await appUpdatePersistAtom.set(getDefaultAppUpdateInfo());
    return appUpdatePersistAtom.get();
  }
}

export default ServiceAppUpdate;
