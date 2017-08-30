import React from 'react';
import {
  IfRedirect,
  IfRender,
  ShelterInit,
  UserInit,
} from '../index';

export default class extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      acctType : '',
      error: '',
    };

    this.submit = this.submit.bind(this);
  }

  verify() {
    return true;
  }

  submit(e) {
    e.preventDefault();
    let error = '';
    if(this.verify()) {
      this.setState({ acctType: e.target.value });
    }
    this.setState({ error });
  }

  getAccountForm(acctType) {
    switch (acctType) {
      default :
        return null;
    }
  }

  render() {
    return (
      <div>
        <IfRedirect
          if={this.props.auth.displayName}
          ifTrue="/"
        />
        <IfRedirect
          if={this.props.auth.loggedIn}
          ifFalse="/auth/login"
        />
        <IfRender
          if={!!this.state.acctType}
          ifFalse={() => (
            <form>
              <button
                value="shelter"
                onClick={this.submit}
              >
              Shelter Account
              </button>
              <button
                value="user"
                onClick={this.submit}
              >
              User Account
              </button>
            </form>
          )}
        />
        <IfRender
          if={this.state.acctType === 'shelter'}
          ifTrue={() => <ShelterInit />}
        />
        <IfRender
          if={this.state.acctType === 'user'}
          ifTrue={() => <UserInit />}
        />
      </div>
    );
  }

}
