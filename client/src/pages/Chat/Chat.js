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
        channel: null
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
            console.log("CHANNELEMIT", channel)
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
        console.log("channel", channel)
        this.setState({ channel });
        
        this.socket.emit('channel-join', id, ack => {
        });
    }

    handleSendMessage = (channel_id, text) => {

        this.socket.emit('send-message', { channel_id, text, senderName: this.socket.id, id: Date.now() });
    }
    render() {
        return (
            <div style={{display: 'flex'}}>
                <ChannelList channels={this.state.channels} onSelectChannel={this.handleChannelSelect} />
                <MessagesPannel onSendMessage={this.handleSendMessage} channel={this.state.channel} />
            </div>
        )
    }
}

export default Chat



