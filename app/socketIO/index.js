const chatTextSocket = require('./chatSocket');

module.exports.chat = io => {
    chatTextSocket.chatText(io);
}