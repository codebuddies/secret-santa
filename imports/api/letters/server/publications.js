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


Meteor.publish("pinboard", function(limit, itemFilter){
  check(limit, Number);
  check(itemFilter, String);


  let query = new Object();
  let projection = new Object();

  switch (itemFilter) {
    case 'santa':
        query = {'gift.sent': true};
        projection.fields = {"gift.sent" : 1, 'gift.sent_details':1, "gift.sent_at" : 1, "santa._id":1 };
      break;
    case 'user':
        query = {'gift.received': true};
        projection.fields = {"gift.received" : 1, "gift.received_details" : 1, "gift.received_at" : 1, "user.firstname" : 1, "user.time_zone":1, "user.avatar":1};
      break;
    default:

  }

  projection.limit = limit;

  let options = new Object();
  options.reactive=false;

  // console.log(query,projection,options);
  
  return Letters.find(query, projection, options);

});
