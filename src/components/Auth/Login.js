import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
    }

    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }

  change({ target }) {
    const nextState = {};
    nextState[target.name] = target.value;
    this.setState(nextState);
  }

  verifySubmit() {
    return this.state.email &&
      this.state.password;
  }

  submit(e) {
    e.preventDefault();
    if (this.verifySubmit()) {
      this.state.error = '';
      this.props.login(this.state.email, this.state.password);
    } else if (!this.state.email) {
      this.setState({ error: 'Enter a email' });
    } else if (!this.state.password){
      this.setState({ error: 'Enter a password' });
    }
  }

  render() {
    return (
      <div>
        Login
        <form
          onSubmit={this.submit}
        >
          <input
            type="text"
            placeholder="Email"
            value={this.state.email}
            name="email"
            onChange={this.change}
          />
          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            name="password"
            onChange={this.change}
          />
          <button
            type="submit"
          >
            Login
          </button>
        </form>
        <p>{ this.state.error || this.props.error.message }</p>
       <button onClick={this.props.fblogin}>login with facebook</button>

      </div>
    );
  }
}
