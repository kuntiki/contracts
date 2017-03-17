import { Mongo } from 'meteor/mongo';

// Define collection of customers
export const Customers = new Mongo.Collection('customers');