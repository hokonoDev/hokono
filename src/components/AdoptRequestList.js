import React from 'react';

export default props => (
  <div>
    request list
    {
      Object.entries(props.requests).map(req =>
        <div>
          <p>petId: {req[0]}</p>
          <p>uid: {Object.keys(req[1])[0]}</p>
          <p>time of Request: {Object.values(req[1])[0]}</p>
        </div>
      )
    }
  </div>
);
