'use strict';
const nodecg = require('./util/nodecg-api-context').get();
const mpd = require('mpd');
const mpdCmd = mpd.cmd;

var mpdConfig = nodecg.bundleConfig.mpd || {};
let currentVolume = nodecg.Replicant('mpd:currentVolume', { defaultValue: 0 });
let targetVolumeRep = nodecg.Replicant('mpd:targetVolume', {
	defaultValue: {
		'foreground': mpdConfig.defaultVolume,
		'background': mpdConfig.defaultVolume
	}
});
let targetVolume = targetVolumeRep.value;
var fadeInterval;
var connected = false;
const musicScenes = [
	'break',
	'postshow',
	'preshow'
]

// Stores song data to be displayed on layouts.
var songData = nodecg.Replicant('songData', {
	defaultValue: {
		'title': 'No Track Playing',
		'playing': false
	},
	persistent: false
});

// Set up connection to MPD server.
var client;
connect();
function connect() {
	client = mpd.connect({
		host: mpdConfig.address || 'localhost',
		port: mpdConfig.port || 6600
	});

	// Set up events.
	client.on('connect', onConnect);
	client.on('ready', onReady);
	client.on('end', onEnd);
	client.on('error', onError);
	client.on('system-player', onSystemPlayer);
	client.on('system-mixer', onSystemMixer);
}

var currentScene = nodecg.Replicant('obs:programScene');
currentScene.on('change', (newVal, oldVal) => {
	newVal = newVal ? newVal['name'].toLowerCase() : undefined;
	oldVal = oldVal ? oldVal['name'].toLowerCase() : undefined;

	// Start music
	if (oldVal) {
		musicScenes.forEach((scene) => {
			if (newVal.includes(scene)) {
				fadeTo('foreground');
				return
			} else if (songData.value.playing) {
				fadeTo('background');
				return;
			}
		});
	}
});

// Listen for NodeCG messages from dashboard/layouts.
nodecg.listenFor('pausePlaySong', () => {
	if (songData.value.playing) {
		fadeOut();
	} else {
		currentVolume.value = 0;
		fadeTo('background');
	}
});
nodecg.listenFor('skipSong', skipSong);

function onConnect() {
	connected = true;
	nodecg.log.info('MPD connection successful.');
}

function onReady() {
	client.sendCommand('listplaylists', (err, msg) => {
		var playlists = mpd.parseArrayMessage(msg);
		nodecg.Replicant('mpd:playlists', playlists);
	});
	client.sendCommand('status', (err, msg) => {
		var status = mpd.parseKeyValueMessage(msg);

		// If the current playlist has songs in it, we assume the MPD player is already set up correctly.
		if (status.playlistlength <= 0) {
			nodecg.log.info('Doing initial MPD configuration.');
			client.sendCommand('add /');    // Add all songs to play queue.
			client.sendCommand('repeat 1'); // Set player to repeat.
			shufflePlaylist();              // Shuffle the music.
			client.sendCommand('play');     // Play songs.
		}

		// Always set volume on connection just in case, but we need to wait a little for some reason (probably for playback to commence).
		// setTimeout(setVolume, 2000);

		// Shuffle the playlist every 6 hours.
		// (We're only playing music in intermissions; doesn't need to be frequent).
		setInterval(shufflePlaylist, 21600000);

		updatePlaybackStatus();
		updateCurrentSong();
	});
}

function onEnd() {
	connected = false;
	nodecg.log.warn('MPD connection lost, retrying in 5 seconds.');
	setTimeout(connect, 5000);
}

function onError(err) {
	nodecg.log.warn('MPD connection error:', err);
}

// Update stuff when the player status changes.
function onSystemPlayer() {
	updatePlaybackStatus();
	updateCurrentSong();
}

// Update the currentVolume var when the volume is changed externally
function onSystemMixer() {
	client.sendCommand(mpdCmd("status", []), function(err, result) {
		if (err) nodecg.log.info(err);
		const status = mpd.parseKeyValueMessage(result);
		currentVolume.value = status.volume;
	});
}

// Used to update the replicant to say if there is a song playing or not.
function updatePlaybackStatus() {
	client.sendCommand('status', (err, msg) => {
		var status = mpd.parseKeyValueMessage(msg);
		if (status.state !== 'play') {
			songData.value.playing = false;
			songData.value.title = 'No Track Playing';
		}	else {
			songData.value.playing = true;
		}
	});
}

// Used to update the replicant to include the title/artist.
function updateCurrentSong() {
	client.sendCommand('currentsong', (err, msg) => {
		var currentSong = mpd.parseKeyValueMessage(msg);
		var songTitle = currentSong.Title+' - '+currentSong.Artist;
		if (songTitle !== songData.value.title && songData.value.playing)
			songData.value.title = songTitle;
	});
}

// Can be used to skip to the next song.
function skipSong() {
	client.sendCommand('next');
}

// Used to shuffle the currently playing list *correctly*.
// Actual shuffle is the same *every time* so let's add some randomness here!
function shufflePlaylist() {
	var random = Math.floor(Math.random()*Math.floor(20));
	for (var i = 0; i < random; i++)
		client.sendCommand('shuffle');
}

// Used to set the player volume to whatever the variable is set to.
function setVolume() {
	client.sendCommand('setvol '+currentVolume.value)
}

// Used to fade out and pause the song.
function fadeOut() {
	if (!connected) return;

	clearInterval(fadeInterval);
	// currentVolume.value = volume;
	// setVolume();

	function loop() {
		currentVolume.value--;
		setVolume();
		if (currentVolume.value <= 0) {
			clearInterval(fadeInterval);
			client.sendCommand('pause 1');
		}
	}

	fadeInterval = setInterval(loop, 40);
}

// Used to unpause and fade in the song.
function fadeTo(target) {
	if (!connected) return;

	clearInterval(fadeInterval);
	client.sendCommand('pause 0');
	setVolume();

	function loop() {
		if (currentVolume.value > targetVolume[target]) {
			currentVolume.value--;
		} else {
			currentVolume.value++;
		}
		setVolume();
		if (currentVolume.value == targetVolume[target]) {
			clearInterval(fadeInterval);
		}
	}

	fadeInterval = setInterval(loop, 10);
}
