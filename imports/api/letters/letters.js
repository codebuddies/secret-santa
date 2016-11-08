//package
import { Mongo } from 'meteor/mongo';


export const Letters = new Mongo.Collection('letters');

Letters.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
