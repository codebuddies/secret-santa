import './profile.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'


Template.profile.onCreated(function(){
  this.subscribe("userInformationById", FlowRouter.getParam('userId'));
});

Template.profile.helpers({
    userInfo: function(){
      return Meteor.users.findOne({'_id':FlowRouter.getParam('userId')});
    }
})
