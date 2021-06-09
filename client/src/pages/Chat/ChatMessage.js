import React from "react";
import Chat from './Chat'
import { withUser } from "../../components/Auth/withUser";
import socketClient  from "socket.io-client";
const SERVER = process.env.REACT_APP_BACKEND_URL;

const ChatMessage = (props) => {


    const socket = socketClient(SERVER, {
         transports: ['websocket', 'polling', 'flashsocket'] 
        


    });
    socketClient (SERVER);
    socket.on('connection', () => {
        console.log(`I'm connected with the back-end`);
});



    return (
        <div className="d-flex justify-content-center align-items-center">
            <Chat  alumni = {props.alumni} users={props.users} />
        </div>
    )
}

export default withUser(ChatMessage);
