import React from 'react';
import { FeedEntry } from './index';

export default (props) => (
  <div
    style={{
      display: 'flex',
      'flexWrap': 'wrap',
      'justifyContent': 'center',
    }}
  >
    {
      Object.values(props.feedData).map(data => (
        <FeedEntry
          data={data}
        />
      ))
    }
  </div>
);
