import React, { Component } from 'react'
import io from 'socket.io-client'
import '../styles/main.css'
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
      this.login()
    })
    this.socket.on('update users', data => {
      this.setState({ users: data.users });
    })
    this.socket.on('iterated', data => { 
      this.setState({ number: data }) 
    })
  }

  login = () => {
    this.socket.emit('logging in', {
      username: this.props.username
    })
  }

  logout = () => {
    console.log('inside logout request')

    this.socket.emit('logging out', {
      username: this.props.username
    })
    this.props.logout();
  }

  iterate = (e) => {
    let by = e.target.value
    this.socket.emit('iterate', by);
  }

    render(){
        return(
            <div className="Iterator">

              <div className="item">                
                <h2>{this.state.name}</h2>
                <div>users connected: {this.state.users}</div>
                <div>logged in as {this.props.username}</div>
              </div>

              <div className="item">
                <button
                    className='button'
                    value={1}
                    onClick={e=>this.iterate(e)}>
                        +
                </button>

                <button
                    className='button'
                    value={-1}
                    onClick={e=>this.iterate(e)}>
                        -
                </button>
              </div>            
              
              <div className="item">
                <h3>{this.state.number}</h3>
               </div>            

              <div className="item">
                <button 
                  className='button'
                  onClick={this.logout}>
                    leave
                </button>
              </div>
                          
            </div>
        )
    }
}



export default Iterator

    //     this.socket.emit('user joined', 
    // {
    //   username: this.state.username 
    // })  