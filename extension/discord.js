/* eslint-disable func-names */
const Discord = require('discord.js');
const nodecg = require('./util/nodecg-api-context').get();

const client = new Discord.Client();
const voiceRoster = nodecg.Replicant(
  'tds:voiceRoster',
  {
    defaultValue: {},
    persistent: false,
  },
);
const activeChannelRep = nodecg.Replicant('tds:activeChannel');

const addVoiceMember = function (guildMember) {
  // Skip user if they're a bot
  if (guildMember.user.bot) return;
  const memberAvatar = guildMember.user.avatarURL;
  const memberID = guildMember.user.id;
  const memberName = guildMember.displayName;

  const newMember = {
    speaking: false,
    avatar: memberAvatar,
    id: memberID,
    nickname: memberName,
  };
  voiceRoster.value[memberID] = newMember;
};

const removeVoiceMember = function (memberID) {
  delete voiceRoster.value[memberID];
};

// eslint-disable-next-line no-extend-native
Array.prototype.remove = function (key, value) {
  const index = this.findIndex((obj) => obj[key] === value);
  return index >= 0 ? [
    ...this.slice(0, index),
    ...this.slice(index + 1),
  ] : this;
};

client.on('ready', () => {
  nodecg.log.info('Discord bot is ready');
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(nodecg.bundleConfig.discordToken);
nodecg.log.info('Discord bot has logged in');

client.on('message', (message) => {
  // If the message is "ding"
  if (message.content === 'ding') {
    // Send "dong" to the same channel
    message.channel.send('dong ( ͡° ͜ʖ ͡°)');
  }
});

client.on('message', (message) => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!message.guild) return;

  // Leave the voice channel if prompted
  if (message.content === '/leave') {
    message.member.voiceChannel.leave();
    message.reply('I have left the channel');
  }

  if (message.content === '/join') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voiceChannel) {
      const { voiceChannel } = message.member;
      activeChannelRep.value = voiceChannel.id;

      voiceChannel.join()
        .then((connection) => { // Connection is an instance of VoiceConnection
          message.reply('I have successfully connected to the channel!');
          nodecg.log.info(`I'm currently in ${voiceChannel.id}`);
          const channelList = voiceChannel.members;

          // eslint-disable-next-line no-restricted-syntax
          for (const [snowflake, guildMember] of channelList) {
            addVoiceMember(guildMember);
          }

          connection.on('speaking', (user, speaking) => {
            const speakerID = user.id;

            // Change the user's speaking state in the Replicant based on... y'know.
            if (speaking) {
              voiceRoster.value[speakerID].speaking = true;
            } else {
              voiceRoster.value[speakerID].speaking = false;
            }
          });
        })
        .catch(nodecg.log.error);
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
  const newChannel = newMember.voiceChannel;
  const oldChannel = oldMember.voiceChannel;

  if (newChannel && newChannel.id === activeChannelRep.value) {
    addVoiceMember(newMember);
  } else if (oldChannel && oldChannel.id === activeChannelRep.value) {
    removeVoiceMember(oldMember.id);
  } else {
    nodecg.log.warn("User wasn't coming or going, so...");
  }
});
