import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { GlobalFeedEntry, Nav, FilterBar } from './index';
import { sortGlobalPetsAction } from '../actions/GlobalPetsActions';

export default (props) => (
  <div>
    <FilterBar
      filter={props.gPets.sort}
      sortAction={sortGlobalPetsAction}
      searchBar={true}
    />
    <Link
      to={'/global/mapview'}
    >Map View</Link>
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
  </div>
);
