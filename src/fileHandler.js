import fs from 'fs';

var fileHandler = {
	readJSON: (filename, opts) => {
		return new Promise(async (resolve, reject) => {
			try {
				var data = await fileHandler.readFile(filename, opts);
				var obj = JSON.parse(data);
			} catch(e) {
				return reject(e);
			}

			resolve(obj);
		});
	},
	readFile: function(filename, opts) {
		return new Promise((resolve, reject) => {

			var args = [ filename ];

			if (opts)
				args.push(opts);

			args.push((err, data) => {
				if (err)
					return reject(err);

				resolve(data);
			});

			fs.readFile.apply(this, args);
		});
	},
	writeFile: function(filename, data, opts) {
		return new Promise((resolve, reject) => {

			var args = [ filename, data ];

			if (opts)
				args.push(opts);

			args.push((err, data) => {
				if (err)
					return reject(err);

				resolve(data);
			});

			fs.writeFile.apply(this, args);
		});
	}
};

export default fileHandler;
