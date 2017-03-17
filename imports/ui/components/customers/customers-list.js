// Import Meteor functionality
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

// Import api: collections,
import { Customers } from '../../../api/customers/customers.js'; 

import './customer.js'; // this component is used in the template
import './customers-list.html'; // HTML template

// TODO: move on created to the page
// Subscribe to customer data
Template.customers_list.onCreated(function customersListOnCreated() {
    this.autorun(() => {
        this.subscribe('customers');
        this.subscribe('contracts');
    });
});

Template.customers_list.helpers({
    // Reactive variable to show/hide create form in the template
    isCreatingCustomer: function(){
        return Session.get('isCreatingCustomer');
    },
    // Fetch customers
    customers: function(){
        return Customers.find();
    },
});

Template.customers_list.events({
    // If user clicks on create, then show form
    'click a.create': function(event, template) {
        event.preventDefault();
        Session.set('isCreatingCustomer', true);
    },
    // If user clicks on cancel, the hide form
    'click a.cancel': function(event, template) {
        event.preventDefault();
        Session.set('isCreatingCustomer', false);
    },
    // If user submits form, insert customer
    'submit form.create-customer': function(event, template) {
        event.preventDefault();
        // Get customer name from input, use template.$ to make sure we're getting it from this template and not sw else in the page
        var customerName = template.$('input[name=name]').val();
        Customers.insert({name: customerName}, function(error, _id){
            // If it doesn't work roll back
            if (error) {
                alert(error);
                Session.set('isCreatingCustomer', true);
                Tracker.afterFlush(function(){
                    template.$('input[name=name]').val(customerName);
                });
            }
        });
        Session.set('isCreatingCustomer', false);
    },
});