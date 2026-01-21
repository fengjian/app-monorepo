import {
  backgroundClass,
  backgroundMethod,
} from '@onekeyhq/shared/src/background/backgroundDecorators';
import type { IWalletBanner } from '@onekeyhq/shared/types/walletBanner';

import ServiceBase from './ServiceBase';

@backgroundClass()
class ServiceWalletBanner extends ServiceBase {
  constructor({ backgroundApi }: { backgroundApi: any }) {
    super({ backgroundApi });
  }

  @backgroundMethod()
  async fetchWalletBanner({ accountId }: { accountId?: string }) {
    void accountId;
    return [];
  }

  @backgroundMethod()
  async updateClosedForeverBanners({
    bannerId,
    closedForever,
  }: {
    bannerId: string;
    closedForever: boolean;
  }) {
    await this.backgroundApi.simpleDb.walletBanner.updateClosedForeverBanners({
      bannerId,
      closedForever,
    });
  }

  @backgroundMethod()
  async getClosedForeverBanners() {
    return this.backgroundApi.simpleDb.walletBanner.getClosedForeverBanners();
  }

  @backgroundMethod()
  async getLocalTopBanners() {
    return this.backgroundApi.simpleDb.walletBanner.getTopBanners();
  }

  @backgroundMethod()
  async updateLocalTopBanners({
    topBanners,
    limit = 3,
  }: {
    topBanners: IWalletBanner[];
    limit?: number;
  }) {
    void topBanners;
    void limit;
  }
}

export default ServiceWalletBanner;
