import React from 'react';
import _ from 'lodash';
import {
  SentRequest,
  ReceivedRequest,
} from './index';

export default props => (
  <div>
    request list
    {
      Object.entries(props.requests)
      .map(req =>
        props.match.path.split('/')[1] === 'user' ?
        <SentRequest
          key={_.uniqueId()}
          petId={req[0]}
          ownerUid={req[1].ownerUid}
          timeStamp={req[1].timeStamp}
          status={req[1].status}
        /> :
        <ReceivedRequest
          key={_.uniqueId()}
          petId={req[0]}
          uid={Object.keys(req[1])[0]}
          timeStamp={Object.values(req[1])[0].timeStamp}
          status={Object.values(req[1])[0].status}
          profile={props.profile}
        />
      )
    }
  </div>
);
