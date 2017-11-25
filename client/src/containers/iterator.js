import React, { Component } from 'react'
import io from 'socket.io-client'
class Iterator extends Component {
    constructor(props){
      super(props)
      this.socket = io()
      this.state = { 
        name: null,
        number: null,        
        users: null
      }
    }
  componentDidMount(){
    this.socket.on('welcome', data => {
      this.setState( { name: data.name, number: data.number } )
    })
    this.socket.on('update users', data => {
      this.setState({ users: data.users });
    })
    this.socket.on('iterated', data => { 
      this.setState({ number: data }) 
    })
  }


  iterate = (e) => {
    let by = e.target.value
    this.socket.emit('iterate', by);
  }


    render(){
        return(
            <div>
              <div>{this.state.name}</div>
              <div>users connected: {this.state.users}</div>
              <div>logged in as {this.props.username}</div>
              
                <button
                    value={1}
                    onClick={e=>this.iterate(e)}>
                        +
                </button>

                <button
                    value={-1}
                    onClick={e=>this.iterate(e)}>
                        -
                </button>
                <h3>{this.state.number}</h3>
            </div>
        )
    }
}



export default Iterator

    //     this.socket.emit('user joined', 
    // {
    //   username: this.state.username 
    // })  