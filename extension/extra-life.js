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
  },
);

// Set a replicant for the team's fundraising goal
extraLife.getTeam(TEAM_ID).then((teamInfo) => {
  fundGoalRep.value = teamInfo.fundraisingGoal;
});

function checkForDonations() {
  // Grab the last 10 donations from Extra Life
  extraLife.getTeamDonations(TEAM_ID, 10).then((donationResults) => {
    const elDonations = donationResults.records;
    const knownDonations = nodecg.readReplicant('donations');
    const newDonationsCheck = JSON.stringify(elDonations) !== JSON.stringify(knownDonations);

    if (newDonationsCheck === true) {
      nodecg.log.debug('New donations found');
      const settingsRep = nodecg.readReplicant('settings');
      // Get the new donations that aren't known by us yet
      const newDonations = elDonations.filter(({ donationID: id1 }) => !knownDonations.some(({ donationID: id2 }) => id2 === id1));

      // Update our known donations with what Extra Life sent
      donationRep.value = elDonations;
      extraLife.getTeam(TEAM_ID).then((teamInfoResults) => {
        // Update the team's total value and send out notifications
        totalRep.value = teamInfoResults.sumDonations;
        nodecg.sendMessage('donationAlert', newDonations);
        if (settingsRep.discordAlertsEnabled.value === true) {
          Object.values(newDonations).forEach((newDonation) => {
            nodecg.sendMessageToBundle('postDiscordMessage', 'nodecg-shout-dis', {
              title: 'New Extra Life Donation!',
              content: `$${newDonation.amount} from ${newDonation.displayName}!`,
              color: '#E8FF51',
              fields: [
                {
                  name: 'Donation Recipient',
                  value: newDonation.recipientName,
                },
              ],
              thumbnail: `https:${newDonation.avatarImageURL}`,
              timestamp: newDonation.createdDateUTC,
            }, (error, result) => {
              if (error) {
                nodecg.log.error(error);
                return;
              }
              nodecg.log.trace(result);
            });
          });
        }
      });
    }
  });
}

// Check for new donations on an interval
setInterval(() => {
  checkForDonations();
}, EL_UPDATE_INTERVAL * 1000);
