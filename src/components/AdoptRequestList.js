import React from 'react';
import _ from 'lodash';
import {
  SentRequest,
  ReceivedRequest,
} from './index';

export default props => (
  <div>
    request list
    {console.log(props)}
    {
      Object.entries(props.requests)
      .map(req =>
        props.match.path.split('/')[1] === 'user' ?
        <SentRequest
          key={_.uniqueId()}
          petId={req[0]}
          ownerUid={req[1].ownerUid}
          timeStamp={req[1].timestamp}
        /> :
        <ReceivedRequest
          key={_.uniqueId()}
          petId={req[0]}
          uid={Object.keys(req[1])[0]}
          timeStamp={Object.values(req[1])[0].timeStamp}
          profile={props.profile}
        />
      )
    }
  </div>
);
