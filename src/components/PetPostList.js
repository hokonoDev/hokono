import React from 'react';
import _ from 'lodash';
import { PetPost } from './index';

const PetPostList = props => {
  return (
    <div
      style={{
        display: 'flex',
        'flexWrap': 'wrap',
        'justifyContent': 'center',
      }}
    >
      {
        props.pet.posts ? Object.entries(props.pet.posts).map(postData => (
          <PetPost
            key={_.uniqueId()}
            post={postData[1]}
            postId={postData[0]}
            auth={props.auth}
            petId={props.pet.id}
            ownerId={props.pet.ownerUid}
          />
        )) : null
      }
    </div>
  );
}

export default PetPostList;
