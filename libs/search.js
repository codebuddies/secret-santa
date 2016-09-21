"use strict";

RegExp.escape = function(query) {
  return query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};


Meteor.users.search = function(query) {
  var cleanQueryString = RegExp.escape(query);
  var insensitiveCleanQueryString = new RegExp(cleanQueryString, "i");
  return Meteor.users.find({$or: [ {'email':{ $regex:insensitiveCleanQueryString}},{'username':{ $regex:insensitiveCleanQueryString}}] });
};
