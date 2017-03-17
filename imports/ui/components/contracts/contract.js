// Import Meteor functionality
import { Template } from 'meteor/templating';

// Import api: collections,
import { Contracts } from '../../../api/contracts/contracts.js'; 
import { Customers } from '../../../api/customers/customers.js';

import './contract.html';  // HTML Template

Template.contract.helpers({
    // Customer name for the contract
    customer: function() {
        console.log(Customers.find({_id: {$eq: this.customerId}}));
        return Customers.find({_id: this.customerId});
    },
});