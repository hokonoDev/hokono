import React from 'react';
import { Feed } from './index';

export default (props) => (
  <div>
    Global Pet Feed
    <Feed
      feedData={{
        dog1: {
          filePath: "https://static.pexels.com/photos/356378/pexels-photo-356378.jpeg",
          id: "pet_1",
          likes: 0,
          name: "Dirty Dan",
        },
        dog2: {
          filePath: "https://cdn.pixabay.com/photo/2016/02/19/15/46/dog-1210559_960_720.jpg",
          id: "pet_2",
          likes: 0,
          name: "Clean Dan",
        },
        dog3: {
          filePath: "https://cdn.pixabay.com/photo/2014/03/04/19/53/dog-279698_960_720.jpg",
          id: "pet_3",
          likes: 0,
          name: "Messy Dan",
        },
      }}
    />
    <pre>{JSON.stringify(props.auth)}</pre>
  </div>
);
