import React, { Component } from 'react'
import  ChannelList from './ChannelList';
import  MessagesPannel from './MessagesPannel';
import '../../styles/chat.css';
import axios from 'axios';
import socketClient from "socket.io-client";
const SERVER = "http://127.0.0.1:8888";
export class Chat extends Component {
    state = {
        channels: null,
        socket: null,
        channel: null,
        username: null,
        olderMessages: null
    }
    socket;


    componentDidMount() {
        axios.get('http://localhost:8888/api/chat/getChannels', {withCredentials: true})
        .then((response) => {

            this.setState({
                channels: response.data.channels
            })
        })
        .catch((error) => console.log(error))
        this.configureSocket();
    }
    configureSocket = () => {
        var socket = socketClient(SERVER);
        socket.on('connection', () => {

            if (this.state.channel) {
                this.handleChannelSelect(this.state.channel._id);
            }
        });
        socket.on('channel', channel => {
            let channels = this.state.channels;
            channels.forEach(c => {
                if (c._id === channel._id) {
                    c.participants = channel.participants;
                }
            });
            this.setState({ channels });
        });
        socket.on('message', message => {

            let channels = this.state.channels
            channels.forEach(c => {
                if (c._id === message.channel_id) {
                    if (!c.messages) {
                        c.messages = [message];
                    } else {
                        c.messages.push(message);
                    }
                }
            });
            this.setState({ channels });
        });
        this.socket = socket;
    }

    handleChannelSelect = id => {
        let channel = this.state.channels.find(c => {

            return c._id === id;
        });
        this.setState({ channel });
        
        this.socket.emit('channel-join', id, ack => {
        });

        let channel_id = channel._id
        axios.post('http://localhost:8888/api/chat/older-messages', {channel_id}, {withCredentials: true})
        .then((response) => {
           
            this.setState({
                olderMessages: response.data.olderMessage
            })

        })
   


    }

    handleSendMessage = (channel_id, text) => {
        axios.post('http://localhost:8888/api/chat/messages', { channel_id, text, senderName: this.socket.id, id: Date.now() }, {withCredentials: true})
        .then((response) => {

            this.socket.emit('send-message', { channel_id, text, senderName: this.socket.id, id: Date.now(), username: response.data.message.user.firstName });
        })
   
   
   
    }


    render() {
      
        return (
            <div style={{display: 'flex'}}>
                
                <ChannelList channels={this.state.channels} onSelectChannel={this.handleChannelSelect} />
                <MessagesPannel onSendMessage={this.handleSendMessage} channel={this.state.channel} olderMessages={this.state.olderMessages}/>
            </div>
        )
    }
}

export default Chat;




