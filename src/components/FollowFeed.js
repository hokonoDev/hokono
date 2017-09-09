import React from 'react';
import _ from 'lodash';
import { FollowFeedEntry, FilterBar } from './index';
import { sortFollowingPostsAction } from '../actions/PostsActions';

export default (props) => (
  <div
    className="col-box-center"
  >
    <div
      className="gen-box"
    >
      <p
        className="title"
      >Follow Post Feed</p>
      {
        Object.keys(props.posts).length ? <FilterBar
            sort={props.sort}
            sortAction={sortFollowingPostsAction}
            searchBar={false}
          /> : null
      }
      <div
        style={{
          display: 'flex',
          'flexWrap': 'wrap',
          'justifyContent': 'center',
        }}
      >
        {
          Object.keys(props.posts).length ? Object.entries(props.posts).map(data => (
            <FollowFeedEntry
              key={_.uniqueId()}
              post={data[1]}
              postId={data[0]}
              auth={props.auth}
            />
          )) :
          <p style={{ marginTop: '20px' }} >
            There are no posts in your Following Feed :<span style={{ color: 'skyblue' }} >'</span>(
          </p>
        }
      </div>
    </div>
  </div>
);
