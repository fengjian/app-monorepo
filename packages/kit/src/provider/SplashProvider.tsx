/* eslint-disable global-require */
import type { PropsWithChildren } from 'react';

import { Splash } from '@onekeyhq/components';
export const useDisplaySplash = () => true;

export function SplashProvider({ children }: PropsWithChildren<unknown>) {
  const displaySplash = useDisplaySplash();
  return displaySplash ? <Splash>{children}</Splash> : null;
}
