Rooms = new Meteor.Collection('rooms');

var RoomsSchema = new SimpleSchema({
  "name": {
    type: String,
    defaultValue: "",
    label: "局名稱"
  },
  "owner": {
    type: String,
    defaultValue: "",
    label: "開局人"
  },
  "users.$.userid": {
    type: String,
    defaultValue: "",
    label: "加入人的編號"
  },
  "creatTime": {
    type: Date,
    defaultValue: "",
    label: "開局時間"
  }
});

Rooms.attachSchema( RoomsSchema );