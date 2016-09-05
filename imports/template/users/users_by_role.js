import './users_by_role.html';

Template.usersByRole.onCreated(function(){
  this.subscribe("allUsers");
});

Template.usersByRole.helpers({
  currentRole: function(){
    return FlowRouter.getParam('role');
  },
  users:function(){
    return Meteor.users.find({roles:FlowRouter.getParam('role')});
  }
});
