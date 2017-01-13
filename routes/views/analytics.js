var keystone = require('keystone');
var async = require('async');
var moment = require('moment');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'analytics';
	locals.data = {
	};

	// Render the view
	view.render('analytics',
        {
            layout: 'analytics',
            helpers:
            {
                formatDate: function(datetime) {
                    console.log(datetime);
                    return moment(datetime).format();
                }
            }
        });
};
