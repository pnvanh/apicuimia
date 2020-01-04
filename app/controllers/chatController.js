const bcrypt = require('bcrypt')
const User = require('../models/userModel'); 
const Contact = require('../models/contactModel');
const Message = require('../models/messageModel');
const Group = require('../models/group');
const isBase64 = require('is-base64');
module.exports.sendMessage = async (req, res) => {
    let senderId = req.params.senderId;
    let receiverId = req.body.receiverId;
    let messageText = req.body.messageText;
    let message 
    if (isBase64(messageText) == false){
        message = {
            senderId: senderId,
            receiverId: receiverId,
            messageText: messageText
        }
    }else{
        const imagePath = "http://localhost:6969/uploads/image/"+Date.now() + "-"+ ".jpeg"
        const nameImage = "public/uploads/image/"+Date.now() + "-"+ ".jpeg";
        require("fs").writeFile(nameImage, messageText, 'base64', function(err) {
            console.log("erorr"+err);
        });
        message = {
            senderId: senderId,
            receiverId: receiverId,
            messageText: imagePath
        }
    }
    let newMessage = await Message.create(message);
    newMessage = await newMessage
    .populate({
        path: senderId, 
        select: "_id avatar firstName lastName"
    })
    .populate({
        path: receiverId,
        select: "_id avatar firstName lastName"
    })
    .execPopulate();
    if (!newMessage) return res.status(401).json({ success: false });
    return res.json({ success: !!newMessage, messages: newMessage });
};
module.exports.getMessageInbox = async (req, res) =>{
    let author = req.params.author;
    let isNotGroup = await Group.find({
        $and: [
            {
                $or: [{ownerId: author}, {member: author} ]
            },
            { isGroup: false }
          ]
       
    })
    .populate({ path: "ownerId", select: "_id firstName lastName avatar" })
    .populate({ path: "member", select: "_id firstName lastName avatar" });
    let messageChat = await Message.find({
        $or: [{senderId: author}, {receiverId: author}]
    }).select("_id messageText timeSend")
    .sort({timeSend: 0})

    
    let isGroup = await Group.find({
        isGroup: true
    }).populate({ path: "ownerId", select: "_id firstName lastName" })
    .populate({ path: "member", select: "_id firstName lastName" });
    if (!isNotGroup || !messageChat){
        res.json({
            success: false,
            message: "Error quỷ gì đó"
        })
    }
    res.json({
        success: true,
        listInbox: isNotGroup,
        listGroup: isGroup,
        // message: messageChat
    });
}; 
module.exports.getAllMessage = async (req, res) =>{
    let senderId = req.body.senderId;
    let receiverId = req.body.receiverId;
    let check = req.body.checkGroup;
    let findAllMessage
    if (check == false) {
        findAllMessage = await Message.find({
            $or: [
                {
                  $and: [
                    {senderId: senderId}, 
                    {receiverId: receiverId}
                  ]
                },
                {$and: [
                    {senderId: receiverId}, 
                    {receiverId: senderId}
                ]}
            ]
        });
    }
    else{
        findAllMessage = await Message.find({
            $or: [{senderId: senderId}, {receiverId: receiverId}]
        });
    }
    if(!findAllMessage){
        res.json({
            success: false,
            message: "Get Faile"
        })
    }
    return res.json({
        success: true,
        message: findAllMessage
    });
};


