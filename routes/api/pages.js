var async = require('async'),
    keystone = require('keystone');

var Page = keystone.list('Page');
var PageVisit = keystone.list('PageVisit');

/**
 ** List Pages
 **/
exports.list = function(req, res) {
    Page.model.find(function(err, items) {

        if (err) return res.apiError('database error', err);

        res.apiResponse({
            pages: items
        });

    });
}

/**
 ** Get Page by slug
 **/
exports.get = function(req, res) {
    Page.model.findOne({slug: req.params.slug}).exec(function(err, item) {

        if (err) return res.apiError('database error', err);
        if (!item) return res.apiError('not found');

        var newVisit = new PageVisit.model({
                sessionId: req.query.sessionId,
                time: new Date(),
                pageSlug: req.query.hash,
                pageLoad: true
        });
         
        newVisit.save(function(err) {
            if (err) return res.apiError('error', err);
            res.apiResponse({
                page: item
            });
        });

    });
}

