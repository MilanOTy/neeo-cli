const fs = require('fs');
const path = require('path');

const FRAGMENT_PATH = './lib/discovery.js';
const REQUIRES = `const discovery = require('./lib/discovery')`;
const USAGE = `.enableDiscovery(discovery.MESSAGES, discovery.findDevices);`;
const IMPLEMENTATION = `const MESSAGES = {
  headerText: 'Find Devices',
  description: 'Please make sure your devices(s) are switched on/discoverable and are on the same network.'
};

module.exports = {
  findDevices() {
    return new Promise((resolve, reject) {
      // Add your logic to find devices on the network and return them
    });
  },

  messages: MESSAGES
};
`;

module.exports = {
  create(state, mainFile) {
    fs.writeFileSync(
      path.resolve(state.projectPath, FRAGMENT_PATH),
      IMPLEMENTATION
    );

    mainFile.appendToHeader(REQUIRES);
    mainFile.appendToBody(USAGE);
  }
};
