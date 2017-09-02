import React from 'react';

export default props => (
  <div>
    {console.log('sentReq props:', props)}
    Req {props.key}
  </div>
);
