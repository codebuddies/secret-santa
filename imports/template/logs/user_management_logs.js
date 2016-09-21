import'./user_management_logs.html';

import { LogsUserManagement } from '../../api/logs/user_management_logs.js';

Template.userManagementLogs.onCreated(function() {
    var instance = this;
    instance.flag = new ReactiveVar(false);
    instance.limit = new ReactiveVar(10);
    instance.autorun(function () {
      var limit = instance.limit.get();
      var subscription = instance.subscribe('allNotifications', limit);
    });

    instance.dispNotifications = function() {
      return LogsUserManagement.find({},{sort: {createdAt: -1}});
    }
});

Template.userManagementLogs.onRendered(function(){
    var instance = this;

       $('#flux').bind('scroll', function(){
           if($('#flux').scrollTop() + $('#flux').innerHeight()>=$('#flux')[0].scrollHeight){

             if(LogsUserManagement.find().count() === instance.limit.get()){
               instance.limit.set(instance.limit.get() + 5);
               $('body').addClass('stop-scrolling')
             }else {
               if(LogsUserManagement.find().count() < instance.limit.get()){
                 instance.flag.set(true);
               }
             }

           }
       });
});


Template.userManagementLogs.helpers({
  notifications:function(){
    return Template.instance().dispNotifications();
  },
  hasBeenSeen:function(){
    var userId = Meteor.userId();
    if (userId && !_.include(this.read, userId)) {
      return false;
    } else {
    return true;
    }
  }
});

Template.userManagementLogs.events({
  "click .markAsRead": function(event, template){
    Meteor.call('markAsRead', this._id, function(error, result) { });
  }
});
