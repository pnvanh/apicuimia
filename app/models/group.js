const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Group = new Schema({
    title: {type: String, default:""},
    ownerId: {type: Schema.Types.ObjectId, ref: "user"},
    member: [{type: Schema.Types.ObjectId, ref: "user"}],
    messageAmount: {type: Number, default: 0},
    isGroup: {type: Boolean, default: false},
    updateTime: {type: Date, default: Date.now}
});
module.exports = mongoose.model('group', Group);