import { Mongo } from 'meteor/mongo';

export const Gifts = new Mongo.Collection("gifts");

Gifts.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
