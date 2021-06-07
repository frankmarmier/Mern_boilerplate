import React, { Component } from 'react'
import Message from './Message'

export class MessagesPannel extends Component {
    state = { input_value: '' }
    send = () => {
      
        if (this.state.input_value && this.state.input_value !== '') {
            this.props.onSendMessage(this.props.channel._id, this.state.input_value);
            this.setState({ input_value: '' });
        }
    }
    handleInput = e => {
        this.setState({ input_value: e.target.value });
    }
    render() {
        let list = <div className="no-content-message">There is no messages to show</div>;
        console.log(this.props.channel && this.props.channel.messages) 
        if (this.props.channel && this.props.channel.messages) {
            list = this.props.channel.messages.map((m => {
              
                return <Message key={m.id} id={m.id} sendername={m.senderName} text={m.text}/>
            })
            )
        }
        

        return (
            
            <div className="messages-panel">
             <div className="messages-list">{list}</div>

‍               {this.props.channel &&
                <div className="messages-input">
                    <input type="text" onChange={this.handleInput} value={this.state.input_value} />‍
                    <button onClick={this.send}>Send</button>
                    
                </div>}
            </div>
        )
    }
}

export default MessagesPannel
