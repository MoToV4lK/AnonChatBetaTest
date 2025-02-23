const ws = new WebSocket("wss://your-vercel-app.vercel.app"); // ЗАМЕНИ на свой URL

ws.onmessage = (event) => {
    let chatBox = document.getElementById("chat-box");
    let p = document.createElement("p");
    p.textContent = event.data;
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;
};

function sendMessage() {
    let message = document.getElementById("message").value;
    if (message.trim() !== "") {
        ws.send(message);
        document.getElementById("message").value = "";
    }
}