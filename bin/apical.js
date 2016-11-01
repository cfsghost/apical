#!/usr/bin/env node

var argv = require('yargs')
	.usage('apical ' + require('../package.json').version + '\n' +
			'Usage: apical <command> [source file] -o [output]')
	.command('gen-doc', 'Generate API documentation')
	.alias('o', 'output')
	.describe('o', 'Output path')
	.demand(2, [ 'o' ])
	.argv;
var path = require('path');

var Apical = require('../lib/apical.js').default;
var apical = new Apical()
	.setSource(path.join(process.cwd(), argv._[1]));

apical.on('console', function(data) {
	console.log(data);
});

apical.on('error', function(e) {
	console.error(e);
});

apical.generateDocument('apical', path.join(process.cwd(), argv.o));
