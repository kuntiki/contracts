// Import Meteor functionality
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

// Import api: collections,
import { Contracts } from '../../../api/contracts/contracts.js'; 
import { Customers } from '../../../api/customers/customers.js';

import './contract.js'; // this component is used in the template
import './contracts-list.html'; // HTML template

Template.contracts_list.helpers({
    // Reactive var to show/hide create form in the template
    isCreatingContract: function() {
        return Session.get('isCreatingContract');
    },
    // Fetch contracts from database
    contracts: function() {
        return Contracts.find();
    },
    // Fetch customers from database
    customers: function() {
        return Customers.find();
    },
});

Template.contracts_list.events({
    // If user clicks on create, then show form
    'click a.create': function(event, template) {
        event.preventDefault();
        Session.set('isCreatingContract', true);
    },
    // If user clicks on cancel, then hide form
    'click a.cancel': function(event, template) {
        event.preventDefault();
        Session.set('isCreatingContract', false);
    },
    // If user submits form, insert contract
    'submit form.create-customer': function(event, template) {
        event.preventDefault();
        // Get customer name from input, use template.$ to make sure we're getting it from this template and not sw else in the page
        var customerName = template.$('input[name=name]').val();
        Customers.insert({name: customerName}, function(error, _id){
            // If it doesn't work roll back
            if (error) {
                alert(error);
                Session.set('isCreatingContract', true);
                Tracker.afterFlush(function(){
                    template.$('input[name=name]').val(customerName);
                });
            }
        });
        Session.set('isCreatingContract', false);
    },
});