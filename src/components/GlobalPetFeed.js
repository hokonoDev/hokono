import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { GlobalFeedEntry, Nav, FilterBar } from './index';
import { sortGlobalPetsAction } from '../actions/GlobalPetsActions';

export default (props) => (
  <div
    className="col-box-center"
  >
    <div
      className={props.location.pathname === "/global/allpets" ? "gen-box" : ""}
    >

      {
        props.location.pathname === "/global/allpets" ?
        <p
          className="title"
        >Explore</p> : null
      }
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
    </div>
  </div>
);
