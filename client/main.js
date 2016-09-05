import '/imports/startup/client';
import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { Session } from 'meteor/session';

Meteor.startup(function () {
  TAPi18n.setLanguage('en')
    .done(function () {
      //console.log("success");
    })
    .fail(function (error_message) {
      console.log(error_message);
    });
});

Template.registerHelper('userSearchQuery',function(){
    return Session.get("userSearchQuery");
});

Template.registerHelper('searchMode',function(){
    return Session.get("searchMode");
});
