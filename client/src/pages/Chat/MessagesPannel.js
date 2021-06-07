import React, { Component } from 'react'
import Message from './Message'
import { withUser } from "../../components/Auth/withUser";

export class MessagesPannel extends Component {
    state = { input_value: '' }
    send = (id) => {
        if (this.state.input_value && this.state.input_value !== '') {
            this.props.onSendMessage(this.props.channel._id, this.state.input_value);
            this.setState({ input_value: '' });
        }


    }
    handleInput = e => {
        this.setState({ input_value: e.target.value });
    }
    render() {
        const { context } = this.props;
        const { user } = context;
        let list = <div className="no-content-message">There is no messages to show</div>;
        
        if (this.props.channel && this.props.channel.messages) {

            list = this.props.channel.messages.map((m => {
              
                return( <div key={m.id} className={m.username=== user.firstName ? `text-right` : `text-left` }>
                    <Message id={m.id} sendername={m.senderName} username={m.username} text={m.text}/>
                    </div>
                )
            })
            )
        }
        

        return (
            
            <div className="messages-panel">
         
            {this.props.olderMessages &&  this.props.olderMessages.map((m) => {
                return(
                    <div style={{width: "100%"}}>

                        <div key={m.id} className={m.user.toString() == user._id.toString() ? `text-right` : `text-left` }>
                            <Message id={m.id} sendername={m.senderName} username={m.username} text={m.text}/>
                        </div>
                        
                    </div>
                ) 
            })}
               
             <div className="messages-list">{list}</div>

‍               {this.props.channel &&
                <div className="messages-input">
                    <input type="text" onChange={this.handleInput} value={this.state.input_value} />‍
                    <button onClick={() => this.send(user && user._id)}>Send</button>
                    
                </div>}
            </div>
        )
    }
}
export default withUser(MessagesPannel)

