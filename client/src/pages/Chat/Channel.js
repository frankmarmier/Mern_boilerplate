import React, { Component } from 'react'

export class Channel extends Component {
    click = () => {
        this.props.onClick(this.props.id);
    }

    render() {
        return (
            <div className='channel-item' onClick={this.click}>
                <div>{this.props.name}</div>
                <span>{this.props.participants}</span>
            </div>
        )
    }
}

export default Channel
