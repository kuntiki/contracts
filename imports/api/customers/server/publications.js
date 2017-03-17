import { Meteor } from 'meteor/meteor';

import { Customers } from '../customers.js';

Meteor.publish('customers', function(){
    return Customers.find({}, {sort: {name: 1}});
});