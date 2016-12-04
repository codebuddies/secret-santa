import { Meteor } from 'meteor/meteor';

Meteor.publish("allUsers", function () {

  if (Roles.userIsInRole(this.userId, ["admin","moderator"])) {
    return Meteor.users.find({}, {fields: {'createdAt':1, profile: 1, roles: 1, slack_username: 1, slack: 1, email: 1, duplicate: 1 }});
  }
  this.ready();

});

Meteor.publish( 'userInformationById', function(userId) {
  if (!userId) {
    return this.ready();
  }

  return Meteor.users.find({'_id':userId});

});

Meteor.publish(null, function(){
  if (!this.userId) {
    this.ready();
  }

  return Meteor.users.find({'_id':this.userId});
})
