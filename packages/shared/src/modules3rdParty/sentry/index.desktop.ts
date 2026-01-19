import type { ComponentType } from 'react';
import type { FallbackRender } from '@sentry/react';

export const initSentry = () => {};

export const nativeCrash = () => {};

export const addBreadcrumb = (_args: any) => {};

export const captureException = (_error: unknown) => {};

export const setUser = (_user: unknown) => {};

export const navigationIntegration = {
  registerNavigationContainer: (_ref: unknown) => {},
};

export const withSentryHOC = (
  Component: ComponentType<any>,
  _errorBoundaryFallback?: FallbackRender,
): ComponentType<any> => Component;
