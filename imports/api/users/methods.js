import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

import { LogsUserManagement } from '../logs/user_management_logs.js';

let IMPF = function (actor,subject,current,past){
      let incident = {};
      if(current === "inactive"){
        if(past === "user"){
          incident.action = "blocked";
          incident.matter = "none";
          incident.icon = "fa-ban";
          return incident;

        }else{
          incident.action = "revoked";
          incident.matter = "’s " + past + " privileges. & blocked "
          incident.icon = "fa-ban";
          return incident;

        }
      }
      if(current === "user"){
        if(past ==="inactive"){
          incident.action = "unblocked";
          incident.matter = "none";
          incident.icon = "fa-bell";
          return incident;

        }else{
          incident.action = "revoked";
          incident.matter = "’s " + past + " privileges. ";
          incident.icon = "fa-exclamation-circle";
          return incident;

        }
      }
      if(current !== "user" && current !=="inactive"){
        if(past === "inactive"){
          incident.action = "unblocked";
          incident.matter = " & granted " +  current + " privileges. ";
          incident.icon = "fa-bell";
          return incident;

        }else if(past === "user"){
          incident.action = "granted";
          incident.matter = " " + current + " privileges. ";
          incident.icon = "fa-bell";
          return incident;
        }else{
          incident.action = "revoked";
          incident.matter = "’s " + past + " privileges, & granted " + current + " privileges. ";
          incident.icon = "fa-exclamation-circle";
          return incident;

        }
      }

}

Meteor.methods({
  updateRoles: function (subjectId, subjectUsername, current, past) {
    const actor = Meteor.user()
    if (!actor || !Roles.userIsInRole(actor, ['admin','moderator'])) {
      throw new Meteor.Error(403, "Access denied")
    }

    if(current === "inactive"){
      Meteor.users.update({ _id: subjectId }, {$set: { "services.resume.loginTokens" : [] }});
      Roles.setUserRoles(subjectId, current);
    }else{

      Roles.setUserRoles(subjectId, current);
    }

    const incident = IMPF(actor.username, subjectUsername , current, past);
    const notification = {
      actorId : actor._id,
      actorUsername : actor.username,
      subjectId : subjectId,
      subjectUsername : subjectUsername,
      createdAt : new Date(),
      currentStatus: current,
      pastStatus: past,
      read:[actor._id],
      action : incident.action,
      matter : incident.matter,
      icon : incident.icon,
      type : "role update",
    }
    LogsUserManagement.insert(notification);

    return true;
  }
})
