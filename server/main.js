import '/imports/startup/server';
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  SyncedCron.start();
});
