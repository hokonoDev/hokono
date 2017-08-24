import React from 'react';
import { Redirect } from 'react-router-dom';
import IfRedirect from '../helpers/ConditionalRedirect';

export default (props) => (
  <div>
    <IfRedirect
      if={props.authorized}
      ifFalse={props.match.url.replace('/edit', '')}
    />
    <form>
      <input
        type="text"
      />
    </form>
  </div>
);
