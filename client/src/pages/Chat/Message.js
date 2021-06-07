import React, { Component } from 'react'

export class Message extends Component {
    render() {
        return (
            <div className="message-item">
                <div><b>{this.props.sendername}</b></div>
                <span>{this.props.text}</span>
                
            </div>
        )
    }
}

export default Message
