import React from 'react';
import { userFollowedPet } from '../actions/UserFollowsPet';

export default ({data}) => (
  <div
    style={{
      height: '400px',
      width: '350px',
      border: '0px solid black',
      margin: '20px',
      'boxShadow': '2px 2px 2px lightgrey',
      'backgroundColor': 'whitesmoke',
      display: 'flex',
      'flexDirection': 'column',
      'alignItems': 'center',
    }}
  >
  {console.log("data into feed entry, ",data)}
    <h4>{data.name}</h4>
    <div
      style={{
        'backgroundImage': `url(${data.filePath})`,
        width: '300px',
        height: '200px',
        'backgroundSize': 'contain',
        'backgroundRepeat': 'no-repeat',
        'backgroundPosition': 'center',
      }}
    />
    <div>
      <button onClick={userFollowedPet(data)}>
        <img
          style={{
            width: '20px',
            height: '20px',
          }}
          src="/images/heart.png"
        />
      </button>
    </div>
    <p>{data.likes} Likes</p>
  </div>
);
