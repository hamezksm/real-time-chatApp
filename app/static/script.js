
const webSocketUrl = "ws://127.0.0.1:8000/";
let chatSocket;
function connect(){
    chatSocket = new WebSocket(webSocketUrl);

    chatSocket.onopen = function (event){
        console.log("Connection opened!");
    }

    chatSocket.onclose = function(event){
        console.log("Connection closed!");
        setTimeout(() =>{
            connect();
        }, 5000);
    }

    chatSocket.onerror = function (error) {
        console.log("An error occurred: ", error);
    };

    document.querySelector("#id_message_send_input").focus();

    document.querySelector("#id_message_send_input").onkeyup = function (e) {
        if (e.keyCode == 13) {
            document.querySelector("#id_message_send_button").click();
        }//when the enter button is pressed(keycode 13), call send message function
    };
    document.querySelector("#id_message_send_button").onclick = function (e) {
        console.log(document.querySelector("#id_message_send_input").value);
        var messageInput = document.querySelector(
            "#id_message_send_input"
        ).value;
        chatSocket.send(JSON.stringify({ message: messageInput, username : "{{request.user.username}}"}));
    };
    chatSocket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        var div = document.createElement("div");
        div.innerHTML = data.username + " : " + data.message;
        document.querySelector("#id_message_send_input").value = "";
        document.querySelector("#id_chat_item_container").appendChild(div);
    }
}

connect();
