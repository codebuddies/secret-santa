//packages
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';


//all the template
import '../../template';


FlowRouter.notFound = {

    action: function() {
      BlazeLayout.render('layout', { main: 'notFound' });
    }
};



FlowRouter.route('/', {
  name: 'landing',
  action() {
    BlazeLayout.render('layout', { main: 'landing' });
  },
});

FlowRouter.route('/user/:userId', {
  name: 'user profile',
  action() {
    BlazeLayout.render('layout', { main: 'profile' });
  },
});

FlowRouter.route('/fl/manage-user', {
  name: 'manage user',
  action() {
    BlazeLayout.render('layout', { main: 'isModerator', targetTemplate: 'manageUser' });
  },
});

FlowRouter.route('/fl/users/:role', {
  name: 'user by role',
  action() {
    BlazeLayout.render('layout', { main: 'isModerator', targetTemplate: 'usersByRole' });
  },
});
FlowRouter.route('/fl/user/:userId', {
  name: 'single user',
  action() {
    BlazeLayout.render('layout', { main: 'isModerator', targetTemplate: 'singleUser' });
  },
});

FlowRouter.route('/fl/dashboard/', {
  name: 'dashboard',
  action() {
    BlazeLayout.render('layout', { main: 'isModerator', targetTemplate: 'dashboard' });
  },
});

FlowRouter.route('/fl/activities/user-management', {
  name: 'user management activity',
  action() {
    BlazeLayout.render('layout', { main: 'isModerator', targetTemplate: 'userManagementLogs' });
  },
});
