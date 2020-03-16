const  RcvMessageTemplate  = `
<li class="left clearfix"><span class="chat-img pull-left">
<img src="http://placehold.it/50/55C1E7/fff&text=YOU" alt="User Avatar" class="img-circle" />
</span>
<div class="chat-body clearfix">
    <div class="header">
        <strong class="primary-font">{{MessageFrom}}</strong> <small class="pull-right text-muted">
            <span class="glyphicon glyphicon-time"></span>{{MessageTime}}</small>
    </div>
    <p>
        {{MessageContent}}
    </p>
</div>
</li>
`

const  SentMessageTemplate  = `
<li class="right clearfix"><span class="chat-img pull-right">
<img src="http://placehold.it/50/FA6F57/fff&text=ME" alt="User Avatar" class="img-circle" />
</span>
<div class="chat-body clearfix">
    <div class="header">
        <small class=" text-muted"><span class="glyphicon glyphicon-time"></span>{{MessageTime}}</small>
        <strong class="pull-right primary-font">{{MessageFrom}}</strong>
    </div>
    <p>
    {{MessageContent}}
    </p>
</div>
</li>
`

var counter = 0;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("btn-chat").onclick = sendMessageFromChat;
 }, false);
 

//Test fucntion nothing that really matters
let testContentAdd = () =>{
    if(counter%2 == 0){
        postSentMessage({data: "cosis"});
    }else{
        postRcvMessage({data:"masCosis"});
    }
    counter++;
}

let sendMessageFromChat = () => {
    let message = document.getElementById("btn-input").value;
    //We send data
    sendDataNewChat(message);
    //Post sent message on chat
    postSentMessage({data: message});
    //Clear text input
    document.getElementById("btn-input").value = "";
};

let processRcvMessage = message =>{
    postRcvMessage({data: message});
}

let postRcvMessage = message => {
    let html = composeHTML(message,RcvMessageTemplate,remoteName);
    addMessage(html);
};

let postSentMessage = message =>{
    let html = composeHTML(message,SentMessageTemplate,localName);
    addMessage(html);
};

let composeHTML = (message,html,name) => {
    let filledHTML = html.replace("{{MessageContent}}",message.data);
    filledHTML = filledHTML.replace("{{MessageTime}}",getFormattedDate());
    filledHTML = filledHTML.replace("{{MessageFrom}}",name);
    return filledHTML;
};

let addMessage = (html) =>{
    document.getElementById("chat-container").innerHTML += html;
};

let getFormattedDate = () => {
    var d = new Date();

    d = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);

    return d;
};
