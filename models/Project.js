var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Project Model
 * ==========
 */

var Project = new keystone.List('Project', {
        sortable: true,
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});
var storage = new keystone.Storage({
        adapter: keystone.Storage.Adapters.FS,
        fs: {
            path: keystone.expandPath('public/images/thumbnails'), // required; path where the files should be stored
            publicPath: '/images/thumbnails/', // path where files will be served
            generateFilename: function(file, i){
                return file.originalname;
            },
            whenExists: 'overwrite',
        },
        schema:
        {
              size: true,
              mimetype: true,
              path: false,
              originalname: false,
              url: true
        }
});

Project.add({
	title: { type: String, required: true },
        slug: { type: String },
        thumbnail: { type: Types.File,
        storage: storage,
            //format: function(item, file) {
                    //return '<img src="/images/thumbnails/' + file.filename + '" style="max-width: 300px">'
            //},
        },
	description: {
	    type: Types.Html, wysiwyg: false, height: 200
	},
        doubleHeight: { type: Types.Boolean },
        doubleWidth: { type: Types.Boolean},
        smallTitle: { type: Types.Boolean}
});

Project.defaultColumns = 'title';
Project.register();
