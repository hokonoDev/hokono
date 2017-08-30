import React from 'react';
import { Feed, Nav, FilterBar } from './index';
import { sortGlobalPetsAction } from '../actions/GlobalPetsActions';

export default (props) => (
  <div>
    Global Pet Feed
    <Nav />
    <FilterBar
      filter={props.gPets.sort}
      sortAction={sortGlobalPetsAction}
      searchBar={true}
    />
    <Feed
      feedData={props.gPets}
    />
    <pre>{JSON.stringify(props.auth)}</pre>
  </div>
);
