'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'goalsapp-secret',

  GOOGLE_ID:        'app-id',
  GOOGLE_SECRET:    'secret',

  FACEBOOK_ID:      '754220301289665',
  FACEBOOK_SECRET:  '41860e58c256a3d7ad8267d3c1939a4a',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
