import React from "react";
import Chat from './Chat'
import { withUser } from "../../components/Auth/withUser";
import socketClient  from "socket.io-client";
const SERVER = "http://127.0.0.1:8888";

const ChatMessage = (props) => {


    const socket = socketClient(SERVER, {
         transports: ['websocket', 'polling', 'flashsocket'] 
        


    });
    socketClient (SERVER);
    socket.on('connection', () => {
        console.log(`I'm connected with the back-end`);
});



    return (
        <div>
            <Chat />
        </div>
    )
}

export default withUser(ChatMessage);
