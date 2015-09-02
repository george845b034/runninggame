Session.setDefault('registerError', '');

Template.register.onRendered(function () {
	Session.set('registerError', '');
});

Template.register.helpers({
	showError: function () {
		return Session.get('registerError');
	}
});

Template.register.events({
	'submit form': function (event) {
		event.preventDefault();
		var username = $('input[data="username"]').val();
		var email = $('input[data="email"]').val();
		var password = $('input[data="password"]').val();

		Accounts.createUser({
            username: username,
            email: email,
            password: password
        }, function(error){
        	if(error != undefined)
			{
				console.log(error);
				Session.set('registerError', error.reason);
			}else{
        		Router.go('main');
			}
        });
	}
});

Template.login.events({
	'submit form': function (event) {
		event.preventDefault();
		var email = $('input[data="email"]').val();
		var password = $('input[data="password"]').val();
		
		Meteor.loginWithPassword(email,password, function(error){
			if(error != undefined)
			{
				console.log(error);
			}else{
        		Router.go('main');
			}
        });
	}
});

Template.logout.events({
	'click .logout': function (event) {
		event.preventDefault();
		Meteor.logout();
	}
});