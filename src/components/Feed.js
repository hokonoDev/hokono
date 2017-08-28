import React from 'react';
import { FeedEntry } from './index';
import _ from 'lodash';

export default (props) => (
  <div
    style={{
      display: 'flex',
      'flexWrap': 'wrap',
      'justifyContent': 'center',
    }}
  >
    {
      Object.values(props.feedData).filter(data => !!data.name).map(data => (
        <FeedEntry
          key={_.uniqueId()}
          data={data}
        />
      ))
    }
  </div>
);
