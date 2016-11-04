import { Meteor } from 'meteor/meteor';

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
