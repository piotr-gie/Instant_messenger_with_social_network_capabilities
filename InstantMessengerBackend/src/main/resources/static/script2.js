var currentUser = {
    id: 3
}
var stompClient = null

function connect() {
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected, onError);


}

function onConnected() {
    console.log("connected");

    stompClient.subscribe(
        "/chat/" + currentUser.id + "/queue/messages",
        onMessageReceived
    );
    stompClient.send("/app/chat", {}, JSON.stringify({content: "user " + currentUser.id + " joined to chat with you"}));
}


function onMessageReceived(message) {
    var msg = JSON.parse(message.body)
    var content = msg.content
    var element = document.getElementById("msg")
    var p = document.createElement("p")
    p.innerText = content
    element.appendChild(p);
}


const onError = () => {
    console.log("onError")
}

window.sendMessage = function () {
    var msg = document.getElementById("content")
    console.log(msg)
    const message = {
        content: msg.value,
    };
    msg.value=''

    stompClient.send("/app/chat", {}, JSON.stringify(message));
};

window.onload = connect







