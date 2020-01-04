const bcrypt = require('bcrypt')
const User = require('../models/userModel'); 
const Contact = require('../models/contactModel');
const Group = require('../models/group')
const Message = require('../models/messageModel');
module.exports.searchContact = async (req, res) => {
    let userId = req.body.id;
    let keywords = req.query.keyword;
    // console.log(userId);
    // console.log(keywords)
    let allUsers = [];
  
    let users = await User.find({
      $and: [
        {
          $or: [
            { email: { $regex: ".*" + keywords + ".*" } },
            { phone: { $regex: ".*" + keywords + ".*" } },
            { firstName: { $regex: ".*" + keywords + ".*" } },
            { lastName: { $regex: ".*" + keywords + ".*" } },
          ]
        },
        { _id: { $ne: userId } }
      ]
    }).select("_id email phone firstName lastName avatar");
    console.log(users,"dm");
    users.forEach(user => allUsers.push(user));
    
    if (allUsers == []) {
      return res.status(401).json({
        success: false,
        message: "This user not found"
      });
    }
  
    return res.json({
      success: !!allUsers,
      users: allUsers
    });
  };
module.exports.addContact = async (req, res) => {
    let currentUserId = req.body.currentUserId;
    let contactId = req.body.contactId;
    //check user exits
    let contactExits = await Contact.findOne({
        $or:[
            {$and: [{userId: currentUserId},{contactId: contactId}]},
            {$and: [{userId: contactId},{contactId: currentUserId}]},
        ]
    });
    if (contactExits){
        return res.status(401).json({
            status: "false",
            message: "Your and contact user has been friend!"
        })
    }
    console.log(currentUserId);
    console.log(contactId)
    let newContact = {
        userId: currentUserId,
        contactId: contactId
    };
    let addNewContact = await Contact.create(newContact);
    return res.json({
        success: !!addNewContact,
        message: "Add new contact success, waiting for contact accept"
    })

};
module.exports.listFriends = async (req, res) => {
  let userId = req.body.currentUserId;
  let list = [];
  let listFirends = await Contact.find({
    $and: [
      { $or: [{contactId: userId}, {userId: userId}] },
      { status: true}
    ]
  })
  .populate({ path: "contactId", select: "_id email avatar firstName lastName" })
  .populate({ path: "userId", select: " _id email avatar firstName lastName" });
  // for( var item in listFirends) {
  //   console.log(listFirends);
  //   let _id = listFirends[item].userId;
  //   let contactInfo = await User.findOne({_id}).select('_id phone email firstName lastName avatar');
  //   list.push(contactInfo);
  // }
 return res.json({ success: true, listFirends: listFirends});
};
module.exports.listWaitingAccept = async (req, res) => {
  let userId = req.body.currentUserId
  let list = [];
  let listWaiting = await Contact.find({
    $and: [
      { contactId: userId},
      { status: false}
    ]
  });
  for( var item in listWaiting) {
    let _id = listWaiting[item].userId;
    let contactInfo = await User.findOne({_id}).select('_id phone email firstName lastName avatar');
    list.push(contactInfo);
  }
 return res.json({ success: true, listWaiting: list});
};
module.exports.acceptContact = async (req, res) =>{
  let userId = req.body.currentUserId;
  let contactId = req.body.contactId;
  let members= [];
  members.push(contactId);
  let newGroupChat = {
    ownerId: userId,
    member: members
  }
  let newMessage = {
    senderId: userId,
    receiverId: contactId,
    messageText: "Say hi! With chatting time <3"
  }
  // console.log(userId + "-" + contactId);
  let newAcceptContact = await Contact.updateOne({
    $and: [
      { userId: contactId},
      { contactId: userId},
    ]
  },{ status: true });
  if (newAcceptContact){
    // return res.json({
    //   success: false,
    //   message: "Some thing error!"
    // });
    let addNewGroup = await Group.create(newGroupChat);
    let message = await Message.create(newMessage)
  }
  return res.json({
    success: true,
    message: "Let chat with friend!"
  });
};
module.exports.newGroupChat = async (req, res) =>{
  let ownerId = req.params.ownerId;
  let title = req.body.title;
  let member = req.body.member;
  let newGroup = {
    title: title,
    member: member,
    isGroup: true,
    ownerId: ownerId
  }
  let newGroupChatNe = await Group.create(newGroup);
  return  res.json({
    success: true,
    message: newGroupChatNe
  })
};

