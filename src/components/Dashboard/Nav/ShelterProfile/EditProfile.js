import React from 'react';
import { Redirect } from 'react-router-dom';

export default (props) => (
  <div>
    {props.authorized ?
      <form>
        <input
          type="text"
        />
      </form>
      :
      <Redirect
        to={props.match.url.replace('/edit', '')}
      />
    }
  </div>
);
