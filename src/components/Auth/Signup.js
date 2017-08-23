import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      rePassword: '',
    }

    this.change = this.change.bind(this);
  }

  change({ target }) {
    const nextState = {};
    nextState[target.name] = target.value;
    this.setState(nextState);
  }

  submit(e) {
    e.preventDefault();
    if (this.state.password && this.state.password === this.state.rePassword) {
      this.props.signup(this.state.email, this.state.password);
      this.setState({ email: '', password: '', rePassword: '' });
    } else {
      console.log('passwords don\'t match');
    }
  }

  render() {
    return (
      <div>
        Sign Up
        <form
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
          <button type="submit" />
        </form>
        <p>{ this.props.error.message }</p>
      </div>
    );
  }
}
