import { Meteor } from 'meteor/meteor';
import { LogsUserManagement } from '../logs/user_management_logs.js';
Meteor.methods({
  markAsRead:function(notificationId){

    LogsUserManagement.update({ _id: notificationId },
                              {$push: { read: this.userId } });

  },
});

Meteor.methods({
  unreadUserManagementLogCount : function(){
    return LogsUserManagement.find({'read':{$ne:this.userId}}).count();
  }
});
