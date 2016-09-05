import { Meteor } from 'meteor/meteor';
import { LogsUserManagement } from '../user_management_logs.js';

Meteor.publish("allNotifications", function (limit) {

  if (Roles.userIsInRole(this.userId, ["admin","moderator"])) {
    return LogsUserManagement.find({},{sort: {createdAt: -1}},{limit:limit});
  }

  this.ready();
});
