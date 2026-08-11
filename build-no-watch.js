#!/usr/bin/env node
const { spawnSync } = require('child_process');
const path = require('path');

const result = spawnSync('npx', ['tsc', '--build', path.join(__dirname, 'tsconfig.json')], {
  stdio: 'inherit',
  shell: true
});

process.exit(result.status ?? 0);
