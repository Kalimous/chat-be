const { createServer } = require("http");
const app = require("./app");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log("a user connected");
    io.emit("chat message", "유저가 연결되었습니다");

    socket.on("chat message", (msg) => {
        console.log(msg);
        io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

httpServer.listen(5001, () => {
    console.log("Server is running on port 5001");
});
