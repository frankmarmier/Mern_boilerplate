import React, { Component } from 'react'
import Message from './Message'
import { withUser } from "../../components/Auth/withUser";

export class MessagesPannel extends Component {
    state = { input_value: '' }
    send = (id) => {
        if (this.state.input_value && this.state.input_value !== '') {
            this.props.onSendMessage(this.props.channel._id, this.state.input_value);
            this.setState({ input_value: '' });
            this.props.sendNotif(this.props.channel._id, id)
        }


    }
    handleInput = (e) => {
        this.setState({ input_value: e.target.value });
     
     
    }
    render() {
        const { context } = this.props;
        const { user } = context;
        let list = <div className="no-content-message">There is no new messages</div>;
        
        if (this.props.channel && this.props.channel.messages) {

            list = this.props.channel.messages.map((m => {
              
                return( <div key={m.id} className={m.username=== user.firstName ? `d-flex justify-content-end older-message-left mt-2` : `d-flex justify-content-start older-message-right mt-2 new-message-left ` }>
                    <Message id={m.id} sendername={m.senderName} username={m.username} text={m.text}/>
                    </div>
                )
            })
            )
        }
        

        return (
            
            <div className="messages-panel shadow-none p-3 mb-5 bg-light rounded">
            
                {this.props.olderMessages &&  this.props.olderMessages.map((m) => {
                    return(
                        <div className="older-messages" key={m.id} style={{width: "100%"}}>

                            <div className={m.user.toString() == user._id.toString() ? `d-flex justify-content-end older-message-left ` : `d-flex justify-content-start older-message-right` }>
                                
                                <Message id={m.id} sendername={m.senderName} username={m.username} text={m.text} date={m.sent}/>
                            </div>
                            
                        </div>
                    ) 
                })}
              
               
             <div className="messages-list">{list}</div>

‍               {this.props.channel &&
                <div className="messages-input">
                    <input className="w-100" style={{margin: '22px', padding: "15px"}} type="text" onChange={this.handleInput} value={this.state.input_value} />‍
                    <button type="submit" className="primary-button"  onClick={() => this.send(user && user._id)}>Send</button>
                    
                </div>}
            </div>
        )
    }
}
export default withUser(MessagesPannel)

