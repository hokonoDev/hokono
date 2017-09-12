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
      <div
        className="col-box-center"
      >
        <div
          className="gen-box"
        >
          <p
            className="title"
          >Account Setup</p>
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
              <form
                className="col-box-center"
              >
                <p>I want to make an account for the shelter I own or work for to help get pets adopted!</p>
                <button
                  value="shelter"
                  onClick={this.submit}
                  style={{ marginBottom: '50px', marginTop: '15px' }}
                >
                  SHELTER ACCOUNT
                </button>
                <p>I want to make a personal account to browse posts and adopt a pet!</p>
                <button
                  value="user"
                  onClick={this.submit}
                  style={{ marginTop: '15px' }}
                >
                  USER ACCOUNT
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
      </div>
    );
  }

}
