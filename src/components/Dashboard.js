import React from 'react';
import { Route } from 'react-router-dom';
import { signoutAction } from '../actions/AuthActions';
import {
  FilterBar,
  PetList,
  IfRedirect
} from './index';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <IfRedirect
          if={this.props.auth.displayName}
          ifFalse={`/auth/init`}
        />
        <IfRedirect
          if={this.props.auth.loggedIn}
          ifFalse="/auth/login"
        />
        {`${this.props.auth.displayName}'s Dashboard`}
          <button
            onClick={signoutAction}
          >
            Logout
          </button>
          <Route
            exact path={`${this.props.match.path}`}
            render={renderProps => (
              <FilterBar
                filter={this.props.petData.sort}
              />
            )}
          />
          <Route
            exact path={`${this.props.match.path}`}
            render={renderProps=> (
              <PetList
                petData={this.props.petData}
              />
            )}
          />
          <pre>Auth: { JSON.stringify(this.props.auth) }</pre>
      </div>
    )
  };
};

export default Dashboard;
