const fs = require('fs');
const path = require('path');
const {cp, exec} = require('shelljs');
const TemplateFragments = require('./template-fragments');
const TEMPLATE_PATH = path.resolve(__dirname, '..', 'template', '*');

module.exports.createProject = function (state) {
  return createProjectDirectory(state)
    .then(() => copyTemplate(state))
    .then(() => generateFragements(state))
    .then(() => initPackage(state))
    .then(() => installDependencies(state))
    .then(() => console.log('Successfully created project! Use "neeo serve" to start your development server'));
};

function createProjectDirectory(state) {
  console.log('Creating project directory at %s', state.projectPath);

  return new Promise ((resolve, reject) => {
    fs.mkdir(state.projectPath, (error) => {
      if (error) {
        return reject(error);
      }

      resolve();
    });
  });
}

function copyTemplate(state) {
  console.log('Creating project template at %s', state.projectPath);

  try {
    cp('-Rf', TEMPLATE_PATH, state.projectPath);
    return Promise.resolve();
  } catch(e) {
    return Promise.reject(e);
  }
}

function generateFragements(state) {
  console.log('Generating project code at %s', state.projectPath);

  TemplateFragments.mainFile.generate(state);

  if (state.isDiscoverable) {
    TemplateFragments.discovery.create(state, TemplateFragments.mainFile);
  }

  TemplateFragments.mainFile.flush(state);
}

function initPackage(state) {
  console.log('Initialising project');
  exec(`npm init ${state.projectName} --yes`, { cwd: state.projectPath, silent: true });
}

function installDependencies(state) {
  console.log('Installing project dependencies');
  exec('npm i neeo-sdk --save', { cwd: state.projectPath });
}
