//package
import { Mongo } from 'meteor/mongo';


export const Questionnaires = new Mongo.Collection('questionnaires');

Questionnaires.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
