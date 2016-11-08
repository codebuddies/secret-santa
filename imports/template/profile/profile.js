import './profile.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'
import { Letters } from '../../api/letters/letters.js';

Template.profile.onCreated(function(){
  this.subscribe("userInformationById", FlowRouter.getParam('userId'));
  this.subscribe("myLetter", FlowRouter.getParam('userId'));
});

Template.profile.helpers({
  userInfo: function(){
    return Meteor.users.findOne({'_id':FlowRouter.getParam('userId')});
  },
  letter: function(){
    return Letters.findOne({'user.id':FlowRouter.getParam('userId')});
  }
})
