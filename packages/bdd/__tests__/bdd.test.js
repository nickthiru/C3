'use strict';

const bdd = require('..');
const assert = require('assert').strict;

assert.strictEqual(bdd(), 'Hello from bdd');
console.info('bdd tests passed');
