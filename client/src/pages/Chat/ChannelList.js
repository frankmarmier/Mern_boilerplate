import React, { Component } from 'react'
import Channel from './Channel';
import { withUser } from "../../components/Auth/withUser";
export class ChannelList extends Component {
    handleClick = id => {
        this.props.onSelectChannel(id);
    }

    render() {
        const { context } = this.props;
        const { user } = context;
       
        let list = `There is no channels to show`;
        if (this.props.channels) {
            list = this.props.channels.map((c) => {

                let username = user && c.title.filter((surname) => surname !== user.firstName)
                return (
                    <div key={c._id} className="hello">
                         
                         <Channel id={c.id} name={username?.join('')} onClick={() => this.handleClick(c._id)}/>
                    </div>
                )
            })
            
        }


        return (
            <div className='channel-list'>
                {list}
            </div>
        )
    }
}
export default withUser(ChannelList);

