import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom'

export default props => (
  <div
    className="gen-box"
  >
    <p
      className="title"
    >Following</p>
    {
      props.following ? Object.entries(props.following).map(userInfo => (
        <Link
          to={`/pet/${userInfo[0]}/profile`}
          key={_.uniqueId()}
        >{ userInfo[1].name }</Link>
      )) : 'You\'er not following anyone right now!'
    }
  </div>
);
