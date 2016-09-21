import { Mongo } from 'meteor/mongo';

export const LogsUserManagement = new Mongo.Collection("user-management-logs");

LogsUserManagement.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
