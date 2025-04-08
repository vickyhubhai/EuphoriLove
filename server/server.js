const io = require("socket.io")(process.env.PORT || 3001, {
    cors: {
      origin: ["http://localhost:3000", "https://love-tunes-brown.vercel.app"],
      methods: ["GET", "POST"],
      credentials: true,
      allowedHeaders: ["my-custom-header"]
    },
    pingTimeout: 60000,
    pingInterval: 25000,
    transports: ['websocket', 'polling'],
    allowEIO3: true,
    path: '/socket.io/',
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    maxHttpBufferSize: 1e8,
    connectTimeout: 45000
  });
  
  let roomVideoState = {};  // Store the current video state per room
  let roomMessages = {};  // Store the messages per room
  
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
  
    // Handle user joining a room
    socket.on("join-room", (roomId) => {
      socket.join(roomId);
      io.to(roomId).emit("room-users", getUsersInRoom(roomId));
  
      // Send current video state to the new user
      if (roomVideoState[roomId]) {
        const { videoId, isPlaying } = roomVideoState[roomId];
        socket.emit("play-video", videoId);
        socket.emit("video-state", isPlaying);
      }
  
      // Send previous messages to the new user
      if (roomMessages[roomId]) {
        socket.emit("receive-message", roomMessages[roomId]);
      }
    });
  
    // Handle video play event
    socket.on("play-video", (roomId, videoId, videoTitle) => {
      if (!videoId) {
        console.error("Received undefined videoId in play-video event");
        return;
      }
  
      console.log("play-video:", videoId, videoTitle);
  
      roomVideoState[roomId] = { videoId, isPlaying: true };
      io.to(roomId).emit("play-video", videoId, videoTitle);
      io.to(roomId).emit("video-state", true);
    });
  
    // Handle video pause event
    socket.on("pause-video", (roomId) => {
      if (!roomVideoState[roomId]) {
        console.error(`Room ${roomId} video state not found`);
        return;
      }
  
      roomVideoState[roomId].isPlaying = false;
      io.to(roomId).emit("pause-video");
      io.to(roomId).emit("video-state", false);
    });
  
    // Handle message sending
    socket.on("send-message", (data) => {
      const { roomId, message, senderId, type, content } = data;
  
      console.log("Received message:", data);
  
      if (!roomMessages[roomId]) {
        roomMessages[roomId] = [];
      }
  
      // Store the message with type and a unique id
      const messageId = Date.now().toString();
      roomMessages[roomId].push({ type, message, senderId, content, messageId });
  
      // Broadcast the message to everyone in the room
      io.to(roomId).emit("receive-message", { type, message, senderId, content, messageId });
    });
  
    // Handle message deletion
    socket.on("delete-message", (data) => {
      const { roomId, messageId, senderId } = data;
      
      if (!roomMessages[roomId]) return;
      
      // Find the message to delete
      const messageIndex = roomMessages[roomId].findIndex(msg => msg.messageId === messageId);
      
      if (messageIndex === -1) return;
      
      // Only allow deletion if the sender is the same
      if (roomMessages[roomId][messageIndex].senderId === senderId) {
        // Remove the message
        roomMessages[roomId].splice(messageIndex, 1);
        
        // Broadcast the deletion to everyone in the room
        io.to(roomId).emit("message-deleted", { messageId });
      }
    });
  
    // Handle user disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
  
  // Helper function to get users in a room
  function getUsersInRoom(roomId) {
    const clients = io.sockets.adapter.rooms.get(roomId);
    return clients ? Array.from(clients) : [];
  }
  