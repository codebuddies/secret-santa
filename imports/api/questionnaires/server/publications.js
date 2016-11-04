import { Meteor } from 'meteor/meteor';
import { Questionnaires  } from '../questionnaires.js';


Meteor.publish("questionnaireByUserId", function(userId){
  check(userId, String);
  return Questionnaires.find({'user.id': userId});
});
