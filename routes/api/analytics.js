var async = require('async'),
    keystone = require('keystone');

var Session = keystone.list('Session');
var PageVisit = keystone.list('PageVisit');

/**
 ** Create session
 **/
exports.createSession = function(req, res) {
    req.body.ip = req.connection.remoteAddress;
    req.body.time = new Date();
    var item = new Session.model(),
        data = (req.method == 'POST') ? req.body : req.query;
    item.getUpdateHandler(req).process(data, function(err) {

        if (err) return res.apiError('error', err);

        res.apiResponse({
            post: item
        });

    });
}

/**
 ** Create page visit
 **/
exports.createPageVisit = function(req, res) {
    req.body.time = new Date();
    req.body.pageLoad = false;
    PageVisit.model.find().where('sessionId', req.body.sessionId).limit(1).exec(function(err, posts) {
        if (posts.length == 0)
        {
            req.body.pageLoad = true;
        }
        var item = new PageVisit.model(),
            data = (req.method == 'POST') ? req.body : req.query;
        item.getUpdateHandler(req).process(data, function(err) {
            if (err) return res.apiError('error', err);
            res.apiResponse({
            });
        });
    });
}

exports.getSessionList = function(req, res) {
    var where = {};
    if (req.query.month != undefined && req.query.year != undefined)
    {
        var start = new Date(req.query.year, req.query.month - 1, 1);
        var end = new Date((req.query.month == 12 ? req.query.year + 1 : req.query.year), req.query.month % 12, 0);
        where = {time: {$gte: start, $lt: end}};
    }
    Session.model.find(where).sort('-time').lean().exec(function (err, results) {

        if (err) return res.apiError('error', err);

        async.each(results, function (session, next) {
            PageVisit.model.count().where({'sessionId':  session._id, 'pageLoad': true}).exec(function (err, count) {
                session.visitCount = count;
                next(err);
            });

        }, function (err) {
            if (err) return res.apiError('error', err);
            res.apiResponse({
                sessions: results 
            });
        });
    });
}

exports.getPageRank = function(req, res) {
    PageVisit.model.aggregate([
            {$match:{pageLoad: true}},
            {$group:{ _id: '$pageSlug', total: { $sum: 1 } } },
            {$sort:{ "total": -1}}
            ])
        .exec(
                function (err, result) {
                    res.apiResponse({
                        pages: result
                    });
                }
             );
}
