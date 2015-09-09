Template.game.helpers({
	getData:function(){
		var tempData =  Rooms.find({_id: this._id }).fetch();

		if(tempData.length > 0)
		{
			return Meteor.users.find({ _id: {$in: tempData[0].users}});
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

            if (change > sensitivity) {
                $('.display').text(change);
                Meteor.call('userRun');
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