'use strict';

const fs = require('fs');
const path = require('path');

const PR_DATA_FILE = path.resolve(__dirname, '../data', 'gh-pull-request.ndjson');

function outputPRDataAsTsv() {
  const languages = ['CoffeeScript', 'JavaScript'];
  const rows = filterLanguages(languages, readPRDataAsRows());
  const headers = getTabSeparatedValues(['Date', 'Language', '# PRs']);
  const tsvRows = rows.map(row => getTabSeparatedValues([
    `${row.year}Q${row.quarter}`,
    row.name,
    row.count,
  ]));
  /* eslint-disable no-console */
  console.log(headers);
  console.log(tsvRows.join('\n'));
  /* eslint-enable no-console */
}

function readPRDataAsRows() {
  const content = fs.readFileSync(PR_DATA_FILE).toString();
  const lines = content.split('\n');
  return lines
    .map(parseJSON)
    .filter(obj => !!obj);
}

function parseJSON(line) {
  try {
    return JSON.parse(line);
  } catch (err) {
    return null;
  }
}

function filterLanguages(languages, rows) {
  return rows.filter(row => languages.includes(row.name));
}

function getTabSeparatedValues(values) {
  return values.join('\t');
}

if (!module.parent) {
  outputPRDataAsTsv();
}
