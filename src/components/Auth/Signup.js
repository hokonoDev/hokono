import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      rePassword: '',
      error: '',
    }

    this.change = this.change.bind(this);
  }

  change({ target }) {
    target.name = target.name || 'acctType';
    const nextState = {};
    nextState[target.name] = target.value;
    this.setState(nextState);
  }

  verifySubmit() {
    return this.state.email &&
      this.state.password &&
      this.state.password === this.state.rePassword;
  }

  submit(e) {
    e.preventDefault();
    if (this.verifySubmit()) {
      this.setState({ error: '' });
      this.props.signup(this.state.email, this.state.password);
    } else if (!this.state.email) {
      this.setState({ error: 'Enter an email' });
    } else if (!this.state.password){
      this.setState({ error: 'Enter a password' });
    } else if (this.state.password !== this.state.rePassword) {
      this.setState({ error: 'Passwords don\'t match' });
    }
  }

  render() {
    return (
      <div
        className="col-box-center"
      >
        <div
          className="gen-box"
        >
          <p
            className="title"
          >Sign Up</p>
          <form
            className="col-box-center"
            onSubmit={this.submit.bind(this)}
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
            <input
              type="password"
              placeholder="Re-enter Password"
              value={this.state.rePassword}
              name="rePassword"
              onChange={this.change}
            />
            <button
              type="submit"
            >
              Sign Up
            </button>
          </form>
          <button
            className="row-box-center"
            style={{
              backgroundColor: '#3b5998',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '15px',
              alignItems: 'center',
              margin: '10px',
            }}
            onClick={this.props.fblogin}
          >
            <img
              src="/images/facebook-logo.svg"
              alt=""
              style={{
                height: '20px',
                width: 'auto',
                padding: '5px',
                marginRight: '5px',
              }}
            />
            <p>Sign Up With Facebook</p>
          </button>
          <p>{ this.state.error || this.props.error.message }</p>
        </div>
      </div>
    );
  }
}
