var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Image Model
 * ==========
 */

var Image = new keystone.List('Image', {
        sortable: true,
	map: { name: 'image' },
});

var storage = new keystone.Storage({
        adapter: keystone.Storage.Adapters.FS,
        fs: {
            path: keystone.expandPath('public/images'), // required; path where the files should be stored
            publicPath: '/images/', // path where files will be served
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

Image.add({
        image: { type: Types.File,
        storage: storage,
            //format: function(item, file) {
                    //return '<img src="/images/thumbnails/' + file.filename + '" style="max-width: 300px">'
            //},
        },
        url: { type: Types.Url,
            noedit: true,
            watch: true,
            value: function() {
                return this.image.url;
            }
        }
});

Image.schema.pre('remove', function(next) {
        this.image.remove();
        next();
});

Image.defaultColumns = 'url';
Image.register();
