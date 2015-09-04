if (Meteor.isServer) {

	Meteor.publish('users', function(){
	    return Meteor.users.find();
	});

	Meteor.publish('rooms', function(){
	    return Rooms.find();
	});

	Meteor.startup(function () {
    	Accounts.config({ loginExpirationInDays : 1 });
	});


	Meteor.methods({
		addRooms:function( inRoomName ){
			
			if(Rooms.find({$or:[{users:{$in:[Meteor.userId()]}}, {owner:Meteor.userId()}]}).count() == 0)
	    	{
	    		try{
	    			return Rooms.insert({
		    			name : inRoomName,
		    			owner : Meteor.userId(),
		    			users : [],
		    			creatTime : new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000))
		    		});
	    		}catch(exception){
	    			return exception;
	    		}
	    	}else{
	    		return false;
	    	}
		},
		removeRooms:function( inRoomid ){

    		try{
    			return Rooms.remove({_id : inRoomid});
    		}catch(exception){
    			return exception;
    		}
		}
	});
}