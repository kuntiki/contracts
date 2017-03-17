// Import Meteor functionality
import { Template } from 'meteor/templating';

// Import api: collections,
import { Customers } from '../../../api/customers/customers.js'; 

import './customer.html';  // HTML template

Template.customer.helpers({
    // Reactive variable to show/hide create form in the template
    isEditingCustomer: function(){
        return Session.get('editedCustomerId') === this._id;
    },
});

Template.customer.events({
    // If user clicks on edit, then show form
    'click a.edit': function(event, template) {
        event.preventDefault();
        Session.set('editedCustomerId', this._id);
    },
    // If user clicks on cancel, the hide form
    'click a.cancel': function(event, template) {
        event.preventDefault();
        Session.set('editedCustomerId', null);
    },
    // If user submits form, insert customer
    'submit form.customer-edit': function(event, template) {
        event.preventDefault();
        var customerName = template.$('input[name=name]').val();
        if (customerName.length) {
            Customers.update(this._id, { $set: { name: customerName }});
            Session.set('editedCustomerId', null);
        }
    },
    // If user clicks on (x), remove customer from DB
    'click a.remove': function(event, template) {
        event.preventDefault();
        // TODO: check there are no contracts before removing a customer
        Customers.remove(this._id);
    },
});