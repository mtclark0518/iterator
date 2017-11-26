import React, { Component } from 'react';
import Iterator from './iterator'
import Login from './login'
import axios from 'axios'
import Error from '../components/error'

class Container extends Component {
  constructor(props){
    super(props)
    this.state = {
      isUser: false,
      username: null,
      error: null
    }
    this.toggleUser = this.toggleUser.bind(this);
  }

  componentDidMount(){
    console.log(this.state)
  }
  logout = () => {
    this.setState({username: null, isUser: false})
  }

  toggleUser = () => {
    this.setState(prevState => ({
      isUser : !prevState.isUser
    }))
  }
  SetUserName = (name, password) => {
    let data = {
      name: name,
      password: password
    };
    axios({
      method: 'POST',
      url: 'api/login',
      data: data
    })
    .then(response => {
      console.log(response.data)
      let res = response.data;
      if(typeof(res) === 'string'){
        console.log('got an error')
        this.setState({error: 'there was an issue with your login, please check password or try a different username'})
      } else {
        this.setState({username: response.data.name, error: ''})
        this.toggleUser();
      }
    });
  };

  render() {
    return (
      <div className="Container">
        <Error className="errorMessage" message={this.state.error}/>
        { this.state.isUser !== true && (
          <Login 
            onSetUserName={ this.SetUserName } />
        )}
        { this.state.isUser === true && (
          <Iterator 
            username={this.state.username}
            logout={ this.logout } />
        )}
      </div>
    );
  }
}

export default Container;
