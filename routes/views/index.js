var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.data = {
            projects_list: []
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Page').model.findOne({
			state: 'published',
			slug: 'home',
		}).populate('author');

		q.exec(function (err, result) {
			locals.data.home = result;
			next(err);
		});
        });
        
        view.on('init', function (next) {

		var q = keystone.list('Page').model.findOne({
			state: 'published',
			slug: 'projects',
		}).populate('author');

		q.exec(function (err, result) {
			locals.data.projects = result;
			next(err);
		});
        });
        
        view.on('init', function (next) {

		var q = keystone.list('Page').model.findOne({
			state: 'published',
			slug: 'contact',
		}).populate('author');

		q.exec(function (err, result) {
			locals.data.contact = result;
			next(err);
		});
        });

        view.on('init', function (next) {

		keystone.list('Project').model.find().sort('sortOrder').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.projects_list = results;
                        next(err);

		});
	});

	// Render the view
	view.render('index');
};
