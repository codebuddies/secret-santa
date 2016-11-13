import './list_of_reported_users.html';
import { Reports } from '../../api/reports/reports.js';

Template.listOfReportedLetters.onCreated(function() {
    var instance = this;
    instance.flag = new ReactiveVar(false);
    instance.limit = new ReactiveVar(10);
    instance.autorun(function () {
      var limit = instance.limit.get();
      var subscription = instance.subscribe('allReports', limit);
    });

    instance.dispNotifications = function() {
      return Reports.find({},{sort: {createdAt: -1}});
    }
});

Template.listOfReportedLetters.onRendered(function(){
    var instance = this;

       $('#flux').bind('scroll', function(){
           if($('#flux').scrollTop() + $('#flux').innerHeight()>=$('#flux')[0].scrollHeight){

             if(Reports.find().count() === instance.limit.get()){
               instance.limit.set(instance.limit.get() + 5);
               $('body').addClass('stop-scrolling')
             }else {
               if(Reports.find().count() < instance.limit.get()){
                 instance.flag.set(true);
               }
             }

           }
       });
});


Template.listOfReportedLetters.helpers({
  reports:function(){
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

Template.listOfReportedLetters.events({
  "click .reportMarkAsRead": function(event, template){

    Meteor.call('reportMarkAsRead', this._id, function(error, result) { });
  }
});
