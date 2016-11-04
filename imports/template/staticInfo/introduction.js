import { Meteor } from 'meteor/meteor';

import './introduction.html';

Template.introduction.onCreated(function() {
  var instance = this;
  instance.totalUser = new ReactiveVar(0);
  instance.totalTimezone = new ReactiveVar(0);
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

  });
});

Template.introduction.helpers({
  totalNumberOfParticipants: function(){
    return Template.instance().totalUser.get();
  },
  totalNumberOfUniqueTimezone: function(){
    return Template.instance().totalTimezone.get();
  }
});
