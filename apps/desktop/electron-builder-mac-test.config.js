/* eslint-disable no-template-curly-in-string */
const baseElectronBuilderConfig = require('./electron-builder-base.config');
const macConfig = require('./electron-builder.config');

module.exports = {
  ...baseElectronBuilderConfig,
  dmg: {
    ...(macConfig.dmg || {}),
    sign: false,
  },
  mac: {
    ...(macConfig.mac || {}),
    provisioningProfile: undefined,
    hardenedRuntime: false,
    gatekeeperAssess: false,
  },
};
