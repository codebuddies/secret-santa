import { Meteor } from 'meteor/meteor';
import { Letters  } from '../letters.js';


Meteor.publish("letterByUserId", function(userId){
  check(userId, String);
  return Letters.find({'user.id': userId});
});

Meteor.publish("assignedLetter", function(){

  return Letters.find({'secret_santa.id': this.userId});

});

Meteor.publish("myLetter", function(){

  return Letters.find({'user.id': this.userId});

});

Meteor.publish("letterById", function(letterId){
  check(letterId, String);
  
  return Letters.find({'_id': letterId});
});
