import React from 'react';
import _ from 'lodash';
import { GlobalFeedEntry, Nav, FilterBar } from './index';
import { sortGlobalPetsAction } from '../actions/GlobalPetsActions';

export default (props) => (
  <div>
    Global Pet Feed
    <Nav />
    {console.log(props)}
    <FilterBar
      filter={props.gPets.sort}
      sortAction={sortGlobalPetsAction}
      searchBar={true}
    />
    <div
      style={{
        display: 'flex',
        'flexWrap': 'wrap',
        'justifyContent': 'center',
      }}
    >
      {
        Object.values(props.gPets).filter(data => !!data.name).map(data => (
          <GlobalFeedEntry
            key={_.uniqueId()}
            pet={data}
          />
        ))
      }
    </div>
    <pre>{JSON.stringify(props.auth)}</pre>
  </div>
);
