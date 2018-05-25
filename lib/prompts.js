const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const state = require('./state');

module.exports.deviceNamePrompt = function () {
  return inquirer.prompt({
    type: 'input',
    name: 'projectName',
    message: 'Please enter a project name:',
    validate(input) {
       if (!input) {
         return 'Please enter a project name';
       }

       const projectPath = path.resolve(process.cwd(), input);

       if (fs.existsSync(projectPath)) {
         return `Project path "${projectPath}" already exists, please pick a different project name`;
       }

       return true;
    }
  }).then((answers) => {
    state.projectName = answers.projectName;
    state.projectPath = path.resolve(process.cwd(), answers.projectName);
    return state;
  });
};

module.exports.discoverablePrompt = function () {
  return inquirer.prompt({
    type: 'confirm',
    name: 'isDiscoverable',
    message: 'Will you driver be discoverable?'
  }).then((answers) => {
    state.isDiscoverable = answers.isDiscoverable;
    return state;
  });
};
