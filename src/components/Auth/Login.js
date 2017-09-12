import React from 'react';

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
      this.setState({ error: '' });
      this.props.login(this.state.email, this.state.password);
    } else if (!this.state.email) {
      this.setState({ error: 'Enter a email' });
    } else if (!this.state.password){
      this.setState({ error: 'Enter a password' });
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
          >Login</p>
          <form
            className="col-box-center"
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
            <p>Login With Facebook</p>
          </button>
        </div>
      </div>
    );
  }
}
