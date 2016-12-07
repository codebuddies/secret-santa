import './my_profile.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'
import { Letters } from '../../api/letters/letters.js';

Template.myProfile.onCreated(function(){
  this.subscribe("myLetter");
});

Template.myProfile.helpers({
  userInfo: function(){

    return Meteor.users.findOne({'_id': Meteor.userId()});
  },
  letter: function(){

    return Letters.findOne({'user.id': Meteor.userId() });
  }
})
