import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom'

export default props => (
  <div>
    {
      props.following ? Object.entries(props.following).map(userInfo => (
        <Link
          to={`/pet/${userInfo[0]}`}
          key={_.uniqueId()}
        >{ userInfo[1].name }</Link>
      )) : null
    }
  </div>
);
