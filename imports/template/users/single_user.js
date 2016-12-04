import './single_user.html';
import {Bert} from 'meteor/themeteorchef:bert';

Template.singleUser.onCreated(function(){
  this.subscribe("allUsers");
});


Template.singleUser.helpers({
  getUser:function(){
    var userId = FlowRouter.getParam('userId');

    if (Roles.userIsInRole(userId, ['admin'])) {
      return ;
    } else {
      return Meteor.users.find({_id:userId});
    }

  },
});

Template.singleUser.events({
  "change #authorization": function(event, template){
    var currentAuthorization = template.find('#authorization').value;
    var pastAuthorization =  this.roles[0];
    var userId = this._id;
    var slack_username = this.slack_username;
    Meteor.call("updateRoles",this._id,this.slack_username,currentAuthorization,pastAuthorization, function(error, result) {
      if(error){
        Bert.alert( error.reason, 'danger', 'growl-top-right' );
      }
      if(result){
        Bert.alert( 'Role updated', 'success', 'growl-top-right' );
      }

    });
  },
});
