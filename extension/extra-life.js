const extraLife = require('extra-life');
const nodecg = require('./util/nodecg-api-context').get();

const TEAM_ID = nodecg.bundleConfig.teamID;
const EL_UPDATE_INTERVAL = nodecg.bundleConfig.elUpdateInterval;

const totalRep = nodecg.Replicant('total');
const fundGoalRep = nodecg.Replicant('fundraisingGoal');
const donationRep = nodecg.Replicant(
  'donations',
  {
    defaultValue: [],
    persistent: false,
  },
);

// Set a replicant for the team's fundraising goal
extraLife.getTeam(TEAM_ID).then((teamInfo) => {
  fundGoalRep.value = teamInfo.fundraisingGoal;
});

function checkForDonations() {
  extraLife.getTeamDonations(TEAM_ID, 10).then((donations) => {
    const newDonations = JSON.stringify(donations.records) !== JSON.stringify(donationRep.value);
    if (newDonations) {
      donationRep.value = donations.records;
      extraLife.getTeam(TEAM_ID).then((teamInfo) => {
        totalRep.value = teamInfo.sumDonations;
        nodecg.sendMessage('donationAlert');
      });
    }
  });
}

// Check for new donations on an interval
setInterval(() => {
  checkForDonations();
}, EL_UPDATE_INTERVAL * 1000);
