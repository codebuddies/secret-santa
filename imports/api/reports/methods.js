import { Meteor } from 'meteor/meteor';
import { Reports } from './reports.js';

Meteor.methods({
  unreadReportCount:function(){
    return Reports.find({'read':{$ne:this.userId}}).count();
  }
});

Meteor.methods({
  reportMarkAsRead:function(reportId){
    Reports.update({ _id: reportId },
                              {$push: { read: this.userId } });

  },
});
