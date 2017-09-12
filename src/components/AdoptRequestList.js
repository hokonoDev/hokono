import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
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
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >{`Request List`}
    {
      props.match.path.split('/')[1] === 'user' ? null :
      <Link to={'/shelter/data'}>
        <img
          src="/images/chart.svg"
          style={{
            height: '25px',
            width: 'auto',
            marginLeft: '10px',
          }}
        />
      </Link>
    }
    </p>

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
            closed={!!item.closed}
          />
        )],
      [])
      .sort((a, b) => {
        const statusA = a.props.closed ? 'closed' : a.props.status;
        const statusB = b.props.closed ? 'closed' : b.props.status;
        const statusVals = {
          closed: -2,
          open: 1,
          pending: 2,
          denied: -1,
          accepted: props.match.path.split('/')[1] === 'user' ? 3 : 0,
        };
        return statusVals[statusB] - statusVals[statusA];
      })
    }
  </div>
);
