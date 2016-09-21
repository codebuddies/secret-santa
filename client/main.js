import '/imports/startup/client';
import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { Session } from 'meteor/session';
import moment from 'moment';

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

Template.registerHelper('selected', function(key, value) {
  return key == value ? 'selected' : '';
});

Template.registerHelper('isUpdateable', function(userId, role) {
  var loggedInUserId = Meteor.userId();

  return ((userId == loggedInUserId || (role === 'moderator' && (!Roles.userIsInRole( loggedInUserId, ['admin'])))) ? true : false);
});

Template.registerHelper('dispDate', function(date) {
  return moment(date).format('h:mm a \ Do MMM \'YY');
});

Template.registerHelper("isActorAdmin", function(actorId){
  return Roles.userIsInRole( actorId, ['admin']) ;
});

Template.registerHelper('equals', function (a, b) {
      return a === b;
});
