const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    contactId: { type: Schema.Types.ObjectId, ref: "user" },
    status: { type: Boolean, default: false },
})
const Contact = mongoose.model('contact',contactSchema);
module.exports = Contact;