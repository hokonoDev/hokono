import React from 'react';
import { Link } from 'react-router-dom';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalBarSeries,
  LineSeries,
  ArcSeries,
} from 'react-vis';

const organizeStatusData = (data) => {
  let indices = {
    open: 0,
    pending: 1,
    accepted: 2,
    denied: 3,
  }
  let res = [{ x: 'open', y: 0 }, { x: 'pending', y: 0 }, { x: 'accepted', y: 0 }, { x: 'denied', y: 0 }];
  Object.values(data).forEach(pet => Object.values(pet).forEach(req => res[indices[req.status]].y++));
  return res ;
};

const getDeniedRatio = (data) => {
  let accepted = 0;
  let denied = 0;
  Object.values(data).forEach(pet => Object.values(pet).forEach(req => req.status === 'accepted' ? accepted ++ : req.status === 'denied' ? denied++ : null));
  return denied / (accepted + denied);
};

const organizeTimeData = (data) => {
  let res = [];
  let store = {};
  let oneDay = 60000 * 60 * 24;
  let today = Math.floor(Date.now() / oneDay)
  Object.values(data).forEach(pet => Object.values(pet).forEach(req => {
    const day = today - Math.floor(req.timeStamp / oneDay);
    store[day] ? store[day]++ : store[day] = 1;
  }));
  if (Object.keys(store).indexOf(0) < 0)
    res.push({ x: 0, y: 0 });
  for (let key in store) {
    res.push({ x: key, y: store[key] });
  }
  res.push({ x: Math.max(...Object.keys(store)) + 1, y: 0 });
  return res;
};

export default props => (
  <div
    className="col-box-center"
  >
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
      >{`Request Data`}
        <Link to={'/shelter/dashboard/adopt'}>
          <img
            src="/images/bullets.svg"
            alt=""
            style={{
              height: '20px',
              width: 'auto',
              marginLeft: '10px',
            }}
          />
        </Link>
      </p>

      {
        !props.profile.got || !props.profile.adoptRequests ? 'There is no data on your requests!' :
        <div>
        <h3
          style={{ marginTop: '30px' }}
        >Request Volume Over Time</h3>
        <XYPlot
          width={800}
          height={300}
        >
          <HorizontalGridLines />
          <LineSeries
            data={props.profile.got ? organizeTimeData(props.profile.adoptRequests) : [{ x: 0, y: 0 }]}
            curve={'curveMonotoneX'}
          />
          <XAxis/>
          <XAxis
            top={302}
            left={-300}
            title="Days Ago"
            tickSize={0}
          />
          <YAxis/>
          <YAxis
            title="Request Volume"
            left={-45}
            top={100}
            tickSize={0}
          />
        </XYPlot>

        <h3
          style={{ marginTop: '50px' }}
        >Current Request Statuses</h3>
        <XYPlot
          width={800}
          height={300}
          xType="ordinal"
          yType="linear"
        >
          <HorizontalGridLines />
          <VerticalBarSeries
            data={props.profile.got ? organizeStatusData(props.profile.adoptRequests) : [{ x: '', y: 0 }]}
          />
          <XAxis />
          <YAxis />
        </XYPlot>

        <h3
          style={{ marginTop: '50px' }}
        >Accepted/Denied Ratio</h3>
        <XYPlot
          xDomain={[-3.5, 0]}
          yDomain={[0, 5]}
          width={260}
          height={260}>
          <ArcSeries
            animation
            radiusType={'literal'}
            center={{x: -2, y: 2}}
            data={[
              {
                angle0: 0,
                angle: 2 * Math.PI * (props.profile.got ? getDeniedRatio(props.profile.adoptRequests) : 0),
                opacity: 0.2,
                radius: 100,
                radius0: 120,
                color: 'red'
              },
              {
                angle0: 2 * Math.PI * (props.profile.got ? getDeniedRatio(props.profile.adoptRequests) : 0),
                angle: 2 * Math.PI,
                radius: 100,
                radius0: 120,
                color: 'lightgreen',
              },
            ]}
            colorType={'literal'}/>
        </XYPlot>
        <span
          style={{ marginBottom: '50px' }}
        />
        </div>
      }
    </div>
  </div>
)
