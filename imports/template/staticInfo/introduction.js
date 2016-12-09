import { Meteor } from 'meteor/meteor';

import './introduction.html';

Template.introduction.onCreated(function() {
  var instance = this;
  instance.totalUser = new ReactiveVar(0);
  instance.totalTimezone = new ReactiveVar(0);
  instance.totalGiftSent = new ReactiveVar(0);
  instance.totalGiftReceived = new ReactiveVar(0);
  this.autorun(() => {


    Meteor.call('totalNumberOfParticipants',function(error, result) {
        if(error){
          console.log("error", error);
        }
        if(result){
          instance.totalUser.set(result);
        }
    });

    Meteor.call('totalNumberOfUniqueTimezone',function(error, result) {
        if(error){
          console.log("error", error);
        }
        if(result){
          instance.totalTimezone.set(result);
        }
    });

    Meteor.call("totalGiftSent", function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
         instance.totalGiftSent.set(result);
      }
    });

    Meteor.call("totalGiftReceived", function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
         instance.totalGiftReceived.set(result);
      }
    });

  });
});

Template.introduction.helpers({
  totalNumberOfParticipants: function(){
    return Template.instance().totalUser.get();
  },
  totalNumberOfUniqueTimezone: function(){
    return Template.instance().totalTimezone.get();
  },
  totalGiftSent: function(){
    return Template.instance().totalGiftSent.get();
  },
  totalGiftReceived: function(){
    return Template.instance().totalGiftReceived.get();
  }
});
