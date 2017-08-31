import React from 'react';
import _ from 'lodash';
import { FollowFeedEntry, Nav, FilterBar } from './index';
// import { sortGlobalPetsAction } from '../actions/GlobalPetsActions';

export default (props) => (
  <div>
    Follow Post Feed
    <FilterBar
      filter={props.posts.sort}
      // sortAction={sortGlobalPetsAction}
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
        Object.entries(props.posts).map(data => (
          <FollowFeedEntry
            key={_.uniqueId()}
            post={data[1]}
            postId={data[0]}
            auth={props.auth}
          />
        ))
      }
    </div>
    <pre>{JSON.stringify(props.auth)}</pre>
  </div>
);
