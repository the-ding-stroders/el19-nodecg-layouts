'use strict';
const nodecgAPIContext = require('./util/nodecg-api-context');

module.exports = function(nodecg) {
    // Store a reference to this NodeCG API context in a place where other libs can easily access it.
    // This must be done before any other files are `require`d.
    nodecgAPIContext.set(nodecg);
    nodecg.Replicant('schedule', 'tds-2020-layouts', {
        defaultValue: []
    });
    nodecg.Replicant('currentCharities', 'tds-2020-layouts', {
        defaultValue: []
    });

    // Run Webpack builders
    require('./webpack-dashboard');
    require('./webpack-graphics');

    // Other extension files we need to load.
    // require('./obs');
    // require('./discord');
    // require('./donations');
    require('./extra-life');
    require('./twitch');
    require('./music');
}
