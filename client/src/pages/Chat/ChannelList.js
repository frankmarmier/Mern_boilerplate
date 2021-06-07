import React, { Component } from 'react'
import Channel from './Channel';

export class ChannelList extends Component {
    handleClick = id => {
        this.props.onSelectChannel(id);
    }

    render() {

        let list = `There is no channels to show`;
        if (this.props.channels) {
            list = this.props.channels.map((c) => {
                return (
                    <div key={c._id} className="hello">
                         
                         <Channel id={c.id} name={c.name} participants={c.participants} onClick={() => this.handleClick(c._id)}/>
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

export default ChannelList
