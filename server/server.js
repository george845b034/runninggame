if (Meteor.isServer) {

	Meteor.publish('users', function(){
	    return Meteor.users.find();
	});

	Meteor.startup(function () {
    	Accounts.config({ loginExpirationInDays : 1 });
	});

}