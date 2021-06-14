var currentUser = {
    id: 3
}
var stompClient = null
var token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnZW5lc2lzLm1vcmlzQGdtYWlsLmNvbSIsImV4cCI6MTYyMzczMjc3MH0.WDR6RL3XLRXAXW91aiEgDNNlgqoocNqIetph-jcZ02o'

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
    var files = formData.getAll("files")
    var output = [];
    files.forEach((element) => {
        var f = {
            lastModified: element.lastModified,
            name: element.name,
            size: element.size,
            type: element.type
        }
        element.text().then(function (text){
            f.fileContent = text;
        })
        output.push(f);
    })
    console.log(output);
    var receiverId = formData.get("receiverId")
    var content = formData.get("content")

    const message = {
        content: content,
        receiverId: receiverId,
        files: output
    };

    console.log(message)

    stompClient.send("/msg/send", {'Authorization': token}, JSON.stringify(message));
};

setTimeout(function(){
    connect();
}, 300);








