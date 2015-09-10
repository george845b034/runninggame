if (Meteor.isServer) {

	var percentObj = {};

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
		    			users : [Meteor.userId()],
		    			status : 'waitting',
		    			creatTime : new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000))
		    		});
	    		}catch(exception){
	    			return exception;
	    		}
	    	}else{
	    		return false;
	    	}
		},
		removeRooms:function( inRoomId, inOwnerId ){

    		try{
    			var result = Rooms.remove({$and: [{_id : inRoomId}, {owner : inOwnerId}]});
    			if(!result)
    			{
    				return Rooms.update({}, {$pull: {users: inOwnerId}}, {multi: true});
    			}else{
    				return result;
    			}

    		}catch(exception){
    			return exception;
    		}
		},
		joinRooms:function( inRoomId, inUserId ){

    		if(Rooms.find({$or:[{users:{$in:[Meteor.userId()]}}, {owner:Meteor.userId()}]}).count() == 0)
	    	{
	    		try{
	    			Rooms.update({ "_id" : inRoomId }, { "$push" : {"users" : inUserId}});
	    		}catch(exception){
	    			return exception;
	    		}
	    	}else{
	    		return false;
	    	}
		},
		beginRooms:function( inRoomId ){

    		try{
    			Rooms.update({ "_id" : inRoomId, $where: '(this.users.length > 1)' }, { "$set" : {"status" : "begin"}});
    		}catch(exception){
    			return exception;
    		}
		},
		userRun:function( ){

    		try{
    			Meteor.users.update({ "_id" : Meteor.userId() }, { "$set" : {"profile.status" : "runonce"}});
    		}catch(exception){
    			return exception;
    		}
		},
		userRunStop:function( ){

    		try{
    			Meteor.users.update({ "_id" : Meteor.userId() }, { "$set" : {"profile.status" : ""}});
    		}catch(exception){
    			return exception;
    		}
		},
		addPercent:function( inRoomId ){

			if(Rooms.find({_id: this._id, status: 'stop' }).fetch().length > 0)return false;

			if(percentObj.hasOwnProperty(Meteor.userId()))
			{
				if(percentObj[Meteor.userId()] >= 100)
				{
					try{
		    			Rooms.update({ "_id" : inRoomId }, { "$set" : {"status" : "stop", "winer": Meteor.user().username}});
		    		}catch(exception){
		    			return exception;
		    		}
				}else{
					percentObj[Meteor.userId()] += 1;
				}
			}else{
				percentObj[Meteor.userId()] = 1;
			}
    		try{
    			Meteor.users.update({ "_id" : Meteor.userId() }, { "$set" : {"profile.percent" : percentObj[Meteor.userId()]}});
    		}catch(exception){
    			return exception;
    		}
		},
		resetPercent:function(){
			percentObj[Meteor.userId()] = 0;
			Meteor.users.update({ "_id" : Meteor.userId() }, { "$set" : {"profile.percent" : percentObj[Meteor.userId()]}});
		}
	});
}