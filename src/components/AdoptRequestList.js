import React from 'react';
import _ from 'lodash';
import {
  SentRequest,
  ReceivedRequest,
} from './index';

export default props => (
  <div
    className="gen-box"
  >
    <p
      className="title"
    >Request List</p>
    {
      Object.entries(props.requests)
      .reduce((accum, req) =>
        props.match.path.split('/')[1] === 'user' ?
        [ ...accum, <SentRequest
          key={_.uniqueId()}
          petId={req[0]}
          ownerUid={req[1].ownerUid}
          timeStamp={req[1].timeStamp}
          status={req[1].status}
        />] :
        [ ...accum, ...Object.values(req[1]).map((item, i) =>
          <ReceivedRequest
            key={_.uniqueId()}
            petId={req[0]}
            uid={Object.keys(req[1])[i]}
            timeStamp={item.timeStamp}
            status={item.status}
            profile={props.profile}
          />
        )],
      [])
      .sort((a, b) => {
        const statusVals = {
          open: 1,
          pending: 2,
          denied: -1,
          accepted: props.match.path.split('/')[1] === 'user' ? 3 : 0,
        };
        return statusVals[b.props.status] - statusVals[a.props.status];
      })
    }
  </div>
);
