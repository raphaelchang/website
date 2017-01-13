/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var babelify = require('babelify');
var browserify = require('browserify-middleware');
var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Handle 404 errors
keystone.set('404', function(req, res, next) {
    res.notfound();
});

// Handle other errors
keystone.set('500', function(err, req, res, next) {
    var title, message;
    if (err instanceof Error) {
        message = err.message;
        err = err.stack;
    }
    console.log(message);
    res.err(err, title, message);
});

// Import Route Controllers
var routes = {
    views: importRoutes('./views'),
    api: importRoutes('./api')
};

// Setup Route Bindings
exports = module.exports = function (app) {
    // Views
    app.use('/analytics/js', browserify('./client/scripts/analytics', {
        transform: [babelify.configure({
            plugins: ['object-assign'],
        })],
    }));
    app.get('/', routes.views.index);
    app.get('/api/page/:slug', keystone.middleware.api, routes.api.pages.get);
    app.get('/analytics', middleware.requireUser, routes.views.analytics);
    app.post('/api/analytics/session/create', keystone.middleware.api, routes.api.analytics.createSession);
    app.post('/api/analytics/page-visit/create', keystone.middleware.api, routes.api.analytics.createPageVisit);
    app.get('/api/analytics/session/list', [keystone.middleware.api, middleware.requireUser], routes.api.analytics.getSessionList);
    app.get('/api/analytics/page-visit/rank', [keystone.middleware.api, middleware.requireUser], routes.api.analytics.getPageRank);
};
