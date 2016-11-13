import { Meteor } from 'meteor/meteor';
import { Reports } from '../reports.js';

Meteor.publish("allReports", function (limit) {

  if (Roles.userIsInRole(this.userId, ["admin","moderator"])) {
    return Reports.find({},{sort: {createdAt: -1}},{limit:limit});
  }

  this.ready();
});
