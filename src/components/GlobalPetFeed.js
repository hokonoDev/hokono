import React from 'react';
import { Feed } from './index';

export default (props) => (
  <div>
    Global Pet Feed
    <Feed
      feedData={props.gPets}
    />
    <pre>{JSON.stringify(props.auth)}</pre>
  </div>
);
