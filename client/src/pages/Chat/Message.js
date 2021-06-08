import React, { Component } from 'react'

export class Message extends Component {
    render() {
        let date = this.props.date && `| sent ${new Date(this.props.date).getDate()}/${new Date(this.props.date).getMonth() + 1}/${new Date(this.props.date).getFullYear()}`
        return (
            <div className="message-item">
                <div><b>{this.props.username}</b> {date}</div>
                <span>{this.props.text}</span>
                
            </div>
        )
    }
}

export default Message
