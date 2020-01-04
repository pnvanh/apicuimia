const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema({
    senderId: {type: Schema.Types.ObjectId, ref: "user"},
    receiverId: {type: Schema.Types.ObjectId, ref: "group"},
    messageText: {type:String},
    //messageFile: {data: Buffer, contentType: String, nameFile:String, default: ""},
    timeSend: { type: Date, default: Date.now}
});
module.exports = mongoose.model("message",Message);
