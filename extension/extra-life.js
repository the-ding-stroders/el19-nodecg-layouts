'use strict';
const nodecg = require('./util/nodecg-api-context').get();
const extraLife = require('extra-life');
const TEAM_ID = nodecg.bundleConfig.teamID;

const totalRep = nodecg.Replicant('total');
const donationRep = nodecg.Replicant(
  'donations',
  {
    defaultValue: [],
    persistent: false
  }
);

// donationRep.on('change', (newValue, oldValue) => {
//   console.log(JSON.stringify(newValue));
// })

function checkForDonations() {
  extraLife.getTeamDonations(TEAM_ID, 10).then(donations => {
    let newDonations = JSON.stringify(donations.records) !== JSON.stringify(donationRep.value);
    if (newDonations) {
      donationRep.value = donations.records;
      extraLife.getTeam(TEAM_ID).then(teamInfo => {
        totalRep.value = teamInfo.sumDonations;
        nodecg.sendMessage('donation');
      })
    }
  })
}

setInterval(function () {
  checkForDonations()
}, 10000)