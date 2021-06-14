var currentUser = {
    id: 2
}
var stompClient = null
var token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnZW5lc2lzLm1vcmlzQGdtYWlsLmNvbSIsImV4cCI6MTYyMzcwMjg3N30.fMqmNARbAi1vtb_FKvKAE319LRr-V4cPNMxzSEXjRRE'

function connect() {
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);

    console.log("BEFORE CONNECT")
    stompClient.connect({'Authorization': token}, onConnected, onError);


}

function onConnected() {
    console.log("connected");

    stompClient.subscribe(
        "/chat/" + currentUser.id + "/queue/messages",
        onMessageReceived
    );
    stompClient.send("/msg/send", {'Authorization': token}, JSON.stringify({content: "user " + currentUser.id + " joined to chat with you"}));
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
    var formData = new FormData(document.querySelector('form'))
    var object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    var file = formData.get("files")
    var buff = file.arrayBuffer().then( value => console.log(JSON.stringify(buff)))


    var msg = document.getElementById("content")
    var files = document.getElementById("files")
    console.log(msg)
    console.log(files);
    const message = {
        content: msg.value,
    };
    msg.value=''

    stompClient.send("/msg/send", {'Authorization': token}, JSON.stringify(message));
};

setTimeout(function(){
    connect();
}, 300);








