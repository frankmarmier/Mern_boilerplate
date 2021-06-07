import React from "react";
import Chat from './Chat'
import socketClient  from "socket.io-client";
const SERVER = "http://127.0.0.1:8888";

const ChatMessage = () => {


    const socket = socketClient(SERVER, {
         transports: ['websocket', 'polling', 'flashsocket'] 
        


    });
    socketClient (SERVER);
    socket.on('connection', () => {
        console.log(`I'm connected with the back-end`);
});
    
    return (
        <div>
            <Chat/>
        </div>
    )
}

export default ChatMessage
