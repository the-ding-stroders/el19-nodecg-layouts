'use strict';
const nodecg = require('./util/nodecg-api-context').get();
const OBSUtility = require('nodecg-utility-obs');
const obs = new OBSUtility(nodecg);
const layoutRep = nodecg.Replicant('tds:streamlayout', { defaultValue: {} });
const streamerRep = nodecg.Replicant('tds:streamers');

obs.on('error', err => {
	nodecg.log.error('OBS socket error:', err);
});

obs.on('ConnectionOpened', () => {
	updateLayout(); // Perform initial update
	nodecg.listenFor('updateStreamPosition', positionData => {
		const newPos = positionData.position;
		const newUrl = positionData.streamer.url;
		const streamerName = positionData.streamer.name;

		let tempLayoutRep = JSON.parse(JSON.stringify(layoutRep.value));

		// Loop through the streamer sources...
		for (let [key, value] of Object.entries(layoutRep.value)) {
			// If this source is using the URL we're updating, move what's in the
			// desired slot to where we're at now, then put the updated URL there
			if (value.url === newUrl) {
				tempLayoutRep[key] = tempLayoutRep[newPos];
				break;
			}
		}

		// Now add the URL we're updating to its new home
		tempLayoutRep[newPos] = {
			name: streamerName,
			url: newUrl
		};
		layoutRep.value = tempLayoutRep;
		updateLayout();
	});

	nodecg.listenFor('switchAudio', target => {
		switchAudioTo(target);
	});
});

const updateLayout = function() {
	let tempStreamerRep = JSON.parse(JSON.stringify(streamerRep.value));

	for (let [key, value] of Object.entries(layoutRep.value)) {
		const sourceName = 'streamer-rtmp-'+key;

		// Get the source's current settings,
		// so we can update the URL only if it doesn't match
		obs.send('GetSourceSettings', {
				sourceName: sourceName
			})
			.then(settings => {
				if (settings.sourceSettings.input !== value.url) {
					obs.send('SetSourceSettings', {
						sourceName: sourceName,
						sourceSettings: {
							"clear_on_media_end": false,
							"input": value.url,
							"is_local_file": false,
							"restart_on_activate": false
						}
					});
				}
			});

		// Update the streamer replicant so the dashboard knows who's where
		tempStreamerRep[value.name].position = parseInt(key);
	}
	streamerRep.value = tempStreamerRep;
	nodecg.sendMessage('layoutUpdated', true);
}

const switchAudioTo = function(target) {
	const newAudio = !target.audio;
	let tempLayoutRep = JSON.parse(JSON.stringify(layoutRep.value));
	let tempStreamerRep = JSON.parse(JSON.stringify(streamerRep.value));
	nodecg.log.info(JSON.stringify(streamerRep.value));
	nodecg.log.info(newAudio);

	// Cycle through the layout temp, setting the target's audio
	// based on the `target.audio` bool. Mute everyone else.
	for (let [key, value] of Object.entries(tempLayoutRep)) {
		if (value.name === target.name) {
			nodecg.log.info('unmute');
			obs.send('SetMute', {
				source: 'streamer-rtmp-'+key,
				mute: !newAudio
			});
			// Update the target's audio value in the temp variable
			tempStreamerRep[value.name].audio = newAudio;
		} else {
			nodecg.log.info('mute');
			obs.send('SetMute', {
				source: 'streamer-rtmp-'+key,
				mute: true
			});
		}
	}

	// Cycle through the streamer temp variable,
	// setting everyone else's audio value to false.
	for (let [key, streamer] of Object.entries(tempStreamerRep)) {
		if (streamer.name !== target.name) {
			streamer.audio = false;
		}
	}

	// Send streamer temp values to its replicant
	streamerRep.value = tempStreamerRep;
	nodecg.log.info(JSON.stringify(streamerRep.value));
	nodecg.sendMessage('audioUpdated', true);
}
