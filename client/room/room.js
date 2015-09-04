Template.room.helpers({
	showUsername: function () {
		return Session.get('registerError');
	},
	getRooms: function () {
		return Rooms.find();
	},
	getOwner: function ( userId ) {
		var tempData = Meteor.users.findOne({ '_id': userId});
		if(tempData)
		{
			return tempData.username;	
		}else{
			return '';
		}
	},
	getCount: function () {
		var i = 0;
		return ++i;
	}
});

Template.room.events({
    'click #newroom': function () {
	    var name = $('[data="roomname"]').val();
    	
    	if(!Meteor.call('addRooms', name))
    	{
    		console.log('已經有局了');
    	}
    }
});