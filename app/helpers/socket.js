module.exports.pushSocketIdToArray = (clients, userId, socketId) => {
  if (clients[userId]) {
    clients[userId].push(socketId);
  } else {
    clients[userId] = [socketId];
  }
  console.log(clients);
  return clients;
};

module.exports.emitNotificationToArray = (
  clients,
  userId,
  io,
  data
) => {

  if (clients[userId]) {
    clients[userId].forEach(socketId => {
      if (io.sockets.connected[socketId]) {
        io.sockets.emit("return-chat", userId,data);
      }
    });
  }
};

module.exports.removeSocketIdFromArray = (clients, userId, socket) => {
  if (clients[userId]) {
    clients[userId] = clients[userId].filter(
      socketId => socketId !== socket.id
    );
    if (!clients[userId].length) {
      delete clients[userId];
    }
  }

  return clients;
};