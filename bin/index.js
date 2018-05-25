#!/usr/bin/env node

const program = require('commander');
const prompts = require('../lib/prompts');
const commands = require('../lib/commands');

program
  .version('0.1.0')
  .command('create-driver')
  .action(function (options, cmd) {
    prompts.deviceNamePrompt()
      .then(state => prompts.discoverablePrompt())
      .then(state => commands.createProject(state));
  })

  program.parse(process.argv)
