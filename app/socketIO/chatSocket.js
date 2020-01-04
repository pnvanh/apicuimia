const SocketHelpers = require("../helpers/socket");
const socketIO = require("../middlewares/socketMid");

module.exports.chatText = async io => {
    let clients = {};
   //io.use(socketIO);

    io.on("connection", socket => {
      socket.on("value", function(data) {
       let currentUserId = data["currentUserId"];
        let socketId = socket.id;
        console.log(socketId);
        clients = SocketHelpers.pushSocketIdToArray(
          clients,
          currentUserId,
          socketId
        );
      })
      ahihi = {
        test:"tess"
      }

      socket.on("chat-text", async data => {
        // console.log({data});
        // console.log(data.messageText);
        // console.log(data.receiverId);
        socket.emit("emit-chat", data);
        // console.log(clients[data.receiverId]);
        // console.log(clients)
        if (clients[data.receiverId]) {
            SocketHelpers.emitNotificationToArray(
            clients,
            data.receiverId,
            io,
            data.messageText
          );
          //console.log(clients[userId]);
        }
        else{
          console.log("đéo đc")
        }
        // socket.on("disconnect", () => {
        //   SocketHelpers.removeSocketIdFromArray(clients, currentUserId, socket);
        // });
      });

    });
  };
  