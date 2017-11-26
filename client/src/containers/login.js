import React, { Component } from 'react';
import '../styles/main.css'
class Login extends Component {

  constructor(props){
    
    super(props)
    
    this.state = {
      username: null,
      password: null
    }

  }


  login = (e) => {
      e.preventDefault();
      this.props.onSetUserName(this.state.username, this.state.password);
  }


  updateName = (nameEvent) => {
      this.setState({
          username: nameEvent.target.value
      });
  }
  updatePass = (passEvent) => {
      this.setState({
          password: passEvent.target.value
      });
  }
  render() {
    return (
        <form className="Login" onSubmit={e => this.login(e)}>
          <input
              className="input" 
              type="text"
              placeholder="username"
              onChange={nameEvent => this.updateName(nameEvent)}/>
          <input
              className="input"  
              type="password"
              placeholder="password"
              onChange={passEvent => this.updatePass(passEvent)}/>
          <input 
              className="input"
              type="submit" />
        </form>
    );
  }
}

export default Login;


