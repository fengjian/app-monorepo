import { memo, useMemo } from 'react';

import { Stack } from '@onekeyhq/components';
import { WALLET_TYPE_HD } from '@onekeyhq/shared/src/consts/dbConsts';

import { useActiveAccount } from '../../../states/jotai/contexts/accountSelector';
import { HomeTokenListProviderMirror } from '../components/HomeTokenListProvider/HomeTokenListProviderMirror';
import { WalletActions } from '../components/WalletActions';

import { HomeOverviewContainer } from './HomeOverviewContainer';

function BaseHomeHeaderContainer() {
  const {
    activeAccount: { wallet },
  } = useActiveAccount({
    num: 0,
  });

  const isWalletNotBackedUp = useMemo(() => {
    if (wallet && wallet.type === WALLET_TYPE_HD && !wallet.backuped) {
      return true;
    }
    return false;
  }, [wallet]);


  return (
    <HomeTokenListProviderMirror>
      <Stack
        testID="Wallet-Tab-Header"
        gap="$5"
        p="$5"
        bg="$bgApp"
        $gtLg={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        pointerEvents="box-none"
      >
        <Stack gap="$2.5" flex={1}>
          <HomeOverviewContainer />
        </Stack>
        {isWalletNotBackedUp ? null : (
          <WalletActions
            $gtLg={{
              pt: 0,
            }}
          />
        )}
      </Stack>
    </HomeTokenListProviderMirror>
  );
}

export const HomeHeaderContainer = memo(BaseHomeHeaderContainer);
