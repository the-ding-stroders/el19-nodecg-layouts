/* eslint-disable global-require */
const nodecg = require('./util/nodecg-api-context').get();

nodecg.Replicant('settings', 'tds-2020-layouts', {
  defaultValue: {
    discordAlertsEnabled: {
      name: 'Discord Alerts Enabled',
      description: 'Whether Discord alerts should be active',
      value: true,
    },
    donationDisplayTime: {
      name: 'Donation Display (Milliseconds)',
      description: 'Amount of time (in milliseconds) to display donation alerts',
      value: 5000,
    },
    idleScreenMsg: {
      name: 'Idle Screen Message',
      description: 'Message to display on the idle screen',
      value: 'Be Right Back...',
    },
  },
});
