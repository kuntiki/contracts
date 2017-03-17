import { Customers } from '../../api/customers/customers.js';
import { Contracts } from '../../api/contracts/contracts.js';

Meteor.startup(() => {
    if (Customers.find().count() === 0) {
        [
            { 
                name: "Estrella International Energy Services",
                contractIds: [],    
            },
            { 
                name: "Biomax",
                contractIds: [],
            },
        ].forEach(function (customer) {
            Customers.insert(customer);
        });

        var customer1 = Customers.find().fetch()[0];

        var contract = {
            name: "EULA",
            signedDate: new Date(2015, 6, 30),
            comments: "Standard EULA",
            customerId: customer1._id,
            appendixIds: [],
        };
        contractId = Contracts.insert(contract);

        Customers.update( {id: customer1._id}, {$addToSet: {contractIds: contractId}});
    }
});