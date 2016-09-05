import { Meteor } from 'meteor/meteor';

Meteor.publish("allUsers", function () {

  if (Roles.userIsInRole(this.userId, ["admin","moderator"])) {
    return Meteor.users.find({}, {fields: {'createdAt':1, profile: 1, roles: 1, username: 1}});
  }
  this.ready();

});
