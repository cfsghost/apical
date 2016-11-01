import path from 'path';
import fs from 'fs';
import fse from 'fs-extra';
import events from 'events';
import pug from 'pug';
import fileHandler from './fileHandler';
import marked from 'marked';

export default class Apical extends events.EventEmitter {

	constructor(filename) {
		super();

		this.filename = filename;
		this.source = {};
	}

	setSource(filename) {
		this.filename = filename;

		return this;
	}

	_generateDocument(template, outputPath) {

		return new Promise(async (resolve, reject) => {

			this.emit('console', 'Loading source ' + this.filename);
			// Load specific file
			try {
				this.source = await fileHandler.readJSON(this.filename);
			} catch(e) {
				return reject(e);
			}

			// Generate API documentation
			var themePath = path.join(__dirname, '..', 'themes', template || 'apical');
			var themeConfigFile = path.join(themePath, 'theme.json');
			var settings = {};
			this.emit('console', 'Loading theme configuration ' + themeConfigFile);
			try {
				settings = await fileHandler.readJSON(themeConfigFile);
			} catch(e) {
				return reject(e);
			}

			// Render
			var entryPath = path.join(themePath, settings.entry);
			this.emit('console', 'Loading theme ' + entryPath);

			// Rendering markdown
			var renderer = new marked.Renderer();
//			renderer.code = function(code, lang) {
//				return '<code c></code>';
//			};
			marked.setOptions({
				renderer: renderer,
				gfm: true,
				tables: true,
				breaks: true,
				smartLists: true
			});
			this.source.groups.forEach((group) => {
				group.desc = marked(group.desc);
			});

			try {
				this.emit('console', 'Rendering ...');
				var html = pug.renderFile(entryPath, {
					name: this.source.name,
					desc: marked(this.source.desc),
					groups: this.source.groups,
					definitions: this.source.definitions
				});
			} catch(e) {
				return reject(e);
			}

			// Write to file
			this.emit('console', 'Saving to ' + outputPath);
			var output = path.join(outputPath, 'index.html');
			try {
				await fileHandler.writeFile(output, html);
			} catch(e) {
				return reject(e);
			}

			// Copying assets
			if (settings.assets) {
				var assetsPath = path.join(themePath, settings.assets);
				var targetPath = path.join(outputPath, settings.assets);
				fse.copy(assetsPath, targetPath, (err) => {
					if (err)
						return reject(err);

					resolve();
				});

				return;
			}

			resolve();
		});
	}

	generateDocument(template, outputPath) {
		this._generateDocument(template, outputPath)
			.then(() => {
				this.emit('complete');
			})
			.catch((e) => {
				this.emit('error', e);
			});
		return this;
	}
};
