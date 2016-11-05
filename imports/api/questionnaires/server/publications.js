import { Meteor } from 'meteor/meteor';
import { Questionnaires  } from '../questionnaires.js';


Meteor.publish("questionnaireByUserId", function(userId){
  check(userId, String);
  return Questionnaires.find({'user.id': userId});
});

Meteor.publish("MyAssignedQuestionnaire", function(){

  return Questionnaires.find({'secret_buddy.id': this.userId});

});
