Template.dialog_rooms.helpers({
	isDialog: function () {
		return Rooms.find({$or:[{users:{$in:[Meteor.userId()]}}, {owner:Meteor.userId()}]}).fetch();
	},
	getCurrentRoom: function () {
		var roomData = Rooms.find({$or:[{users:{$in:[Meteor.userId()]}}, {owner:Meteor.userId()}]}).fetch();

		if(roomData.length > 0)
		{
			return Rooms.findOne({"_id":roomData[0]._id}).users;
		}else{
			return false;
		}
	},
	getOwner: function ( userId ) {
		var tempData = Meteor.users.findOne({ '_id': userId});
		if(tempData)
		{
			return tempData.username;	
		}else{
			return '';
		}
	}
});
Template.dialog_rooms.events({
    'click .leave': function () {
    	console.log($('.leave').data('leave'));
    }
});