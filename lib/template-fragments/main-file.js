const fs = require('fs');
const path = require('path');

const FRAGMENT_PATH = './index.js';
let HEADER = `const {buildDevice} = require('neeo-sdk');`;
let BODY = '';
let FOOTER = '';

module.exports = {
  generate(state) {
    BODY += `buildDevice('${state.projectName}')`
  },

  appendToHeader(str) {
    HEADER += `\n ${str}`;
  },

  appendToBody(str) {
    BODY += `\n ${str}`;
  },

  appendToFooter(str) {
    FOOTER += `\n ${str}`;
  },

  flush(state) {
    fs.writeFileSync(
      path.resolve(state.projectPath, FRAGMENT_PATH),
      `${HEADER}\n${BODY}\n${FOOTER}`
    );
  }
};
