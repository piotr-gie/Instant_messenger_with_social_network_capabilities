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

window.sendMessage = async function () {
    var formData = new FormData(document.querySelector('form'))
    var files = formData.getAll("files")
    let output = [];

    await iterateThrough(files, output);

    var receiverId = formData.get("receiverId")
    var content = formData.get("content")

    console.log(output[0])

    const message = {
        content: content,
        receiverId: receiverId,
        files: output,
        senderId: currentUser.id
    };

    console.log(message)


    stompClient.send("/msg/send", {'Authorization': token}, JSON.stringify(message));
};

async function iterateThrough(files, output) {
    for await(let element of files) {
        var f = {
            name: element.name,
            size: element.size,
            type: element.type
        }

        f.fileString = await element.text();

        output.push(f);
    }
}

setTimeout(function(){
    connect();
}, 300);








