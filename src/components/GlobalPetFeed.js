import React from 'react';
import { Feed, Nav } from './index';

export default (props) => (
  <div>
    Global Pet Feed
    <Nav />
    <Feed
      feedData={props.gPets}
    />
    <pre>{JSON.stringify(props.auth)}</pre>
  </div>
);
