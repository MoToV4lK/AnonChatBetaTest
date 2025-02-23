const express = require("express");
const WebSocket = require("ws");
const http = require("http");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static("public")); // Раздаём клиентские файлы

wss.on("connection", (ws) => {
    console.log("Новый пользователь подключился");

    ws.on("message", (message) => {
        console.log("Сообщение:", message);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on("close", () => {
        console.log("Пользователь отключился");
    });
});

// Запускаем сервер
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Сервер работает на порту ${PORT}`));