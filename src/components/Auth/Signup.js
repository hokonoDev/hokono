import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      rePassword: '',
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange({ target }) {
    const nextState = {};
    nextState[target.name] = target.value;
    this.setState(nextState);
  }

  render() {
    return (
      <div>
        Sign Up
        <form>
          <input
            type="text"
            placeholder="Username"
            value={this.state.username}
            name="username"
            onChange={this.onChange}
          />
          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            name="password"
            onChange={this.onChange}
          />
          <input
            type="password"
            placeholder="Re-enter Password"
            value={this.state.rePassword}
            name="rePassword"
            onChange={this.onChange}
          />
        </form>
      </div>
    );
  }
}
