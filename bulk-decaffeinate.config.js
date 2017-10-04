'use strict';

const path = require('path');

module.exports = {
  decaffeinateArgs: [
    '--loose',
    '--disallow-invalid-constructors',
  ],
  jscodeshiftScripts: [
    path.join(process.env.HOME, 'datafox/jscodemods/decaffeinate/fix-existential-conditional-assignment.js'),
    path.join(process.env.HOME, 'datafox/jscodemods/decaffeinate/fix-for-of-statement.js'),
    path.join(process.env.HOME, 'datafox/jscodemods/decaffeinate/fix-implicit-return-assignment.js'),
    path.join(process.env.HOME, 'datafox/jscodemods/decaffeinate/fix-multi-assign-class-export.js'),
    path.join(process.env.HOME, 'datafox/jscodemods/decaffeinate/remove-coffeelint-directives.js'),
    path.join(process.env.HOME, 'datafox/jscodemods/transforms/use-strict.js'),
  ],
};
