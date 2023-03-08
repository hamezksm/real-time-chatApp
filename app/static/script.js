
let words = [
    'arse','arsehead','arsehole','ass','asshole','bastard','bitch','bloody','bollocks',
    'brotherfucker','bugger','bullshit','fucker','cock','cocksucker','crap','cunt',
    'damn','damnit','dick','dickhead','dyke','fatherfucker','frigger','fuck','goddamn',
    'godsdamn','hell','holy shit','horseshit','in shit','kike','motherfucker','nigga',
    'nigra','piss','prick','pussy','shit','shit ass','shite','sisterfucker',
    'slut','son of a bitch','whore','spastic','sweet Jesus','turd','twat','wanker',
];

// const webSocketUrl = "ws://127.0.0.1:8000/";
const webSocketUrl = "ws://" + window.location.host + "/";
let chatSocket;
function connect() {
    chatSocket = new WebSocket(webSocketUrl);

    chatSocket.onopen = function (event) {
        console.log("Connection opened!");
    }

    chatSocket.onclose = function (event) {
        console.log("Connection closed!");
        setTimeout(() => {
            connect();
        }, 5000);
    }

    chatSocket.onerror = function (error) {
        console.log("An error occurred: ", error);
    };

    let textEl = document.getElementById('id_message_send_input');
    textEl.focus();

    document.querySelector("#id_message_send_input").onkeyup = function (e) {
        if (e.keyCode == 13) {
            document.querySelector("#id_message_send_button").click();
        }//when the enter button is pressed(keycode 13), call send message function
    };
    document.querySelector("#id_message_send_button").onclick = function (e) {
        let sentence = textEl.value;
        console.log(sentence);
        let message = censorWordsInSentence(sentence, words);
        console.log(message);

        if (sentence != message){
            window.alert("Vulgar word acknowledged. Please avoid using them!")
        }

        const username = document.querySelector("#id_username").value
        chatSocket.send(JSON.stringify({ message, username }));
    };
    chatSocket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        var div = document.createElement("div");
        div.style.marginBottom = '5px';
        div.style.backgroundColor ='#f2f5fe';
        div.style.padding='2px';
        div.style.borderRadius='5px';
        div.innerHTML = data.username + " : " + data.message;
        document.querySelector("#id_message_send_input").value = "";
        document.querySelector("#id_message_field").appendChild(div);
    }
}

connect();

function censorWordsInSentence(sentence, words) {
    // Create a regular expression to match any of the words in the array, with the 'g' flag for global matching and word boundaries
    const regex = new RegExp('\\b(' + words.join('|') + ')\\b', 'g');
  
    // Replace each instance of any of the words in the sentence with asterisks
    const censoredSentence = sentence.replace(regex, '*'.repeat(words[0].length));
  
    // Return the censored sentence
    return censoredSentence;
}