'use strict';
const nodecg = require('./util/nodecg-api-context').get();

const twitchApi = nodecg.extensions['lfg-twitchapi'];
const twitchGames = nodecg.Replicant('tds:twitchGames');

nodecg.listenFor('searchTwitchCategories', (value, ack) => {
    twitchApi.get('/search/games?query=' + encodeURIComponent(value)).then(response => {
        if (response.statusCode !== 200) {
            ack(response.body.error + response.body.message);
        }
        ack(null, response.body.games)
    }).catch(err => {
        ack(err);
    });
})
