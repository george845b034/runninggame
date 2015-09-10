if(Meteor.isClient){
    Meteor.subscribe('users');
    var roomsHandle = Meteor.subscribe('rooms');
}