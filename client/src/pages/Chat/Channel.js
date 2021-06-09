import React, { Component } from 'react'

export class Channel extends Component {
    click = () => {
        this.props.onClick(this.props.id);
    }

    render() {
        return (
            <div className='channel-item shadow p-3 mb-2 mr-2 bg-white rounded' onClick={this.click}>
                <div >My conversation with <span className="chanel-name"><b>{this.props.name}</b></span></div>
                <span>{this.props.participants}</span>
            </div>
        )
    }
}

export default Channel
