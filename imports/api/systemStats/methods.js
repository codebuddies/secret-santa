import { Meteor } from 'meteor/meteor';

import { Letters } from '../letters/letters.js';

Meteor.methods({
  totalNumberOfParticipants:function(){
    return Meteor.users.find({duplicate: { $exists: false}}).count() -1 ;
  }
});

Meteor.methods({
  totalNumberOfUniqueTimezone:function(){
    const cursor = Meteor.users.aggregate([
                      {$group: { _id: "$profile.time_zone_label" } },
                   ]);

    return cursor.length -1 || 0;
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
