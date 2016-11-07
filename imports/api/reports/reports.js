import { Mongo } from 'meteor/mongo';

export const Reports = new Mongo.Collection("reports");

Reports.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
