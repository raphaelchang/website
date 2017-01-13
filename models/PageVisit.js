var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PageVisit Model
 * ==========
 */

var PageVisit = new keystone.List('PageVisit');

PageVisit.add({
        sessionId: { type: Types.Key, required: true, initial: false },
        time: { type: Types.Datetime, default: Date.now },
        pageSlug: { type: String },
        pageLoad: { type: Types.Boolean }
});

PageVisit.defaultColumns = 'sessionId, time, pageSlug, pageLoad';
PageVisit.register();
