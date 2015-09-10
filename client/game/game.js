
Session.setDefault('currentRoom', '');
Session.setDefault('isBegin', 0);
Session.setDefault('countdwon', 0);

Template.game.onRendered(function () {
	this.subscribe("game");
	Meteor.call('resetPercent');
	Session.set('isBegin', 0);


	Session.set('countdwon', 3);
	var counter = Meteor.setInterval(function(){
		Session.set('countdwon', Session.get('countdwon') - 1);
		if (Session.get('countdwon') <= 0)
		{
			Meteor.clearInterval(counter);
			Session.set('isBegin', 1);
		}	
	}, 1000);
});

Template.game.helpers({
	getData:function(){

		var tempData =  Rooms.findOne({'_id': this._id });
		if(tempData != undefined)
		{
			Session.set('currentRoom', this._id);
			return Meteor.users.find({ _id: {$in: tempData.users}});
		}else{
			Router.go('main');
		}
	},
	getUserName: function ( userId ) {
		var tempData = Meteor.users.findOne({ '_id': userId});
		if(tempData)
		{
			return tempData.username;	
		}else{
			return '';
		}
	},
	isDialog: function () {
		var tempData =  Rooms.find({_id: this._id, status: 'stop', users:{$in:[Meteor.userId()]} }).fetch();
		if(tempData.length > 0)return tempData;
	},
	isBegin: function () {
		if(!Session.get('isBegin'))
		{
			return Session.get('countdwon');
		}else{
			return false;
		}
	}
});

Template.game.events({
    'click .leave': function (event, temp) {
    	Meteor.call('removeRooms', $('.leave').data('leave'), Meteor.userId());
    	Router.go('main');
    }
});

Meteor.startup(function () {
    if (window.DeviceMotionEvent != undefined) {
        var sensitivity = 20;
        var x1 = 0, y1 = 0, z1 = 0, x2 = 0, y2 = 0, z2 = 0;


        window.addEventListener('devicemotion', function (e) {

            x1 = e.accelerationIncludingGravity.x;
            y1 = e.accelerationIncludingGravity.y;
            z1 = e.accelerationIncludingGravity.z;

            var change = Math.abs(x1-x2+y1-y2+z1-z2);

            if (Session.get('isBegin') && change > sensitivity) {
                $('.display').text(Session.get('currentRoom'));
                Meteor.call('userRun');
                Meteor.call('addPercent', Session.get('currentRoom'));
            }

            // Update new position
            x2 = x1;
            y2 = y1;
            z2 = z1;
        }, false);
    }

    
	$('body').on("animationend webkitAnimationEnd oAnimationEnd", ".monster", function(e){
		Meteor.call('userRunStop');
	});
});