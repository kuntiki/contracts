import { Meteor } from 'meteor/meteor';

import { Contracts } from '../contracts.js';

Meteor.publish('contracts', function(){
    return Contracts.find({}, {sort: {signedDate: 1}});
});