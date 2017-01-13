var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Session Model
 * ==========
 */

var Session = new keystone.List('Session');

Session.add({
        ip: { type: String, required: true, initial: false },
        time: { type: Types.Datetime, default: Date.now },
        referrer: { type: Types.Url }
});

Session.defaultColumns = 'ip, time';
Session.register();
