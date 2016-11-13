import './dashboard.html';
import { ReactiveMethod } from 'meteor/simple:reactive-method';

Template.dashboard.helpers({
  unreadUserManagementLogCount:function(){
    return ReactiveMethod.call('unreadUserManagementLogCount');
  },
  unreadReportCount:function(){
    return ReactiveMethod.call('unreadReportCount');
  }
});
