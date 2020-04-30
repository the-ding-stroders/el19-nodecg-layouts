'use strict';
const nodecg = require('./util/nodecg-api-context').get();
const request = require('request');

const GAME_LIST_URL = nodecg.bundleConfig.gameListUrl;
const twitchGames = nodecg.Replicant('tds:twitchGames');

getGameList();

function getGameList() {
  request(GAME_LIST_URL, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      let games;
      try {
        games = JSON.parse(body);
      } catch (e) {
        nodecg.log.error('Could not parse game list, response not valid JSON:\n\t', body);
        return;
      }

      twitchGames.value = games;
    } else {
      let msg = 'Could not update game list, unknown error';
      if (error) {
        msg = `Could not update game list:\n${error.message}`;
      } else if (response) {
        msg = `Could not update game list, response code ${response.statusCode}`;
      }
      nodecg.log.error(msg);
      return msg;
    }
  })
}
