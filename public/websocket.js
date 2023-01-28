let url = 'ws://192.168.23.135:8000/playlists/ws/socket-server/';
const chatSocket = new WebSocket(url);

//When receiving socket request from server
chatSocket.onmessage = function(e){
    let data = JSON.parse(e.data)
    // console.log('Data:', data)

    var msgType = data.type
    var msgId = data.id
    // console.log(msgType)

    if(msgType === 'DELETE'){
        var rowId = '000'+msgId;
        $('#'+rowId).remove();
        
    }
    if(msgType === 'PUT'){
        var msgContent = data.content;
        var rowId = '00'+msgId;
        $('#'+rowId).text(msgContent);
    }
    if(msgType === 'POST'){
        var msgContent = data.content;

        var x = document.getElementById("tableOutput").rows.length;
        // var text = "<tr id="+0+0+0+x+"><td id="+0+0+x+">"+ msgContent + "</td><td><button id="+0+x+" class='update'>Update</button></td><td><button id='"+x+"'  class='delete'>Delete</button></td></tr></table>";
        var row = document.getElementById('tableOutput').insertRow(x);
        row.id='000'+x
        
        var rowCell1 = row.insertCell(0);
        var rowCell2 = row.insertCell(1);
        var rowCell3 = row.insertCell(2);

        rowCell1.innerHTML = msgContent;
        rowCell1.id='00'+x;

        rowCell2.innerHTML = "<button id="+'0'+x+" class='update'>Update</button>";

        rowCell3.innerHTML = "<button id='"+x+"'  class='delete'>Delete</button>";
    }
}

//when sending socket request to server
function socketRequestDelete(messageType, id){
    var message_type = messageType
    var message_id = id
    chatSocket.send(JSON.stringify({
        'type_front':message_type,
        'id_front':message_id
    }))
}

function socketRequestPut(messageContent, messageType, id){
    var message_type = messageType
    var message_id = id
    var message_content = messageContent
    chatSocket.send(JSON.stringify({
        'type_front':message_type,
        'id_front':message_id,
        'message_front':message_content
    }))
}

function socketRequestPost(messageContent, messageType){
    var message_type = messageType
    var message_content = messageContent
    chatSocket.send(JSON.stringify({
        'type_front':message_type,
        'message_front':message_content
    }))
}