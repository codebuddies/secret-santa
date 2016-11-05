import { Kadira } from 'meteor/meteorhacks:kadira';
import './register-api.js';

//
//
// process.env.MAIL_URL = Meteor.settings.private.email.emailProvider.SMTP;
if (Meteor.settings.private.production) {
    Kadira.connect(Meteor.settings.private.kadira.appId, Meteor.settings.private.kadira.appSecret);
}
