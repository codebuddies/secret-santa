import './users_by_role.html';

Template.usersByRole.helpers({
  currentRole: function(){
    return FlowRouter.getParam('role');
  },
  users:function(){
    return Meteor.users.find({roles:FlowRouter.getParam('role')});
  }
});
