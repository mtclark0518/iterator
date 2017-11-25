import React, { Component } from 'react';

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


  updateName(nameEvent){
      this.setState({
          username: nameEvent.target.value
      });
  }
  updatePass(passEvent){
      this.setState({
          password: passEvent.target.value
      });
  }
  render() {
    return (
      <div>
        <form className="Login" onSubmit={e => this.login(e)}>
          <input 
              type="text"
              placeholder="username"
              onChange={nameEvent => this.updateName(nameEvent)}/>
          <input 
              type="password"
              placeholder="password"
              onChange={passEvent => this.updatePass(passEvent)}/>
          <button type="submit">join</button>
        </form>
      </div>
    );
  }
}

export default Login;


