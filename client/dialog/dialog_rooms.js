Template.dialog_rooms.helpers({
	isDialog: function () {
		var result = Rooms.find({$or:[{users:{$in:[Meteor.userId()]}}, {owner:Meteor.userId()}]}).fetch();
		// console.log(result.length > 0 && result[0].status == "begin");
		// 
		if(result.length > 0)
		{
			switch(result[0].status){
				case "begin":
					Router.go( 'game', { _id: result[0]._id} );
				break;
				case "waitting":
					return result;
				break;
			}
		}
	},
	isOwner: function ( inOwnerId ) {
		return inOwnerId == Meteor.userId();
	},
	getCurrentRoom: function () {
		var roomData = Rooms.find({$or:[{users:{$in:[Meteor.userId()]}}, {owner:Meteor.userId()}]}).fetch();
		
		if(roomData.length > 0 )
		{
			var result = Rooms.findOne({"_id":roomData[0]._id}).users;
			return _.without(result, roomData[0].owner);
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
    'click .leave': function (event, temp) {
    	Meteor.call('removeRooms', $('.leave').data('leave'), Meteor.userId());
    },
    'click .begin': function (event, temp) {
    	//鎖owner才可以開

    	Meteor.call('beginRooms', $('.begin').data('begin'));
    }
});