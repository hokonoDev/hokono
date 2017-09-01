import React from 'react';
import _ from 'lodash';
import { FollowFeedEntry, FilterBar } from './index';
import { sortFollowingPostsAction } from '../actions/PostsActions';

export default (props) => (
  <div>
    {console.log('new props')}
    Follow Post Feed
    <FilterBar
      sort={props.sort}
      sortAction={sortFollowingPostsAction}
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
