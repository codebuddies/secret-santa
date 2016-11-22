import { Meteor } from 'meteor/meteor';

import { Letters } from '../letters/letters.js';

Meteor.methods({
  totalNumberOfParticipants:function(){
    return Meteor.users.find().count();
  }
});

Meteor.methods({
  totalNumberOfUniqueTimezone:function(){
    const cursor = Meteor.users.aggregate([
                      {$group: { _id: "$profile.time_zone", count: {$sum: 1 }  } },
                      {$group: { _id: null, count: {$sum: "$count" }} },
                   ]);

    return cursor[0].count || 0;
  }
});

Meteor.methods({
  totalGiftSent:function(){
    const count = Letters.find({"gift.sent":true}).count();
    return count || 0;
  }
});

Meteor.methods({
  totalGiftReceived:function(){
    const count = Letters.find({"gift.received":true}).count();
    return count || 0;
  }
});
