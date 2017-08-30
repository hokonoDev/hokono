import React from 'react';
import { IfRender } from './index';

export default props => (
  <IfRender
    if={props.display}
    ifTrue={() => (
      <div
        style={{
          position: 'fixed',
          top: '0px',
          left: '0px',
          height: '100vh',
          width: '100vw',
          backgroundColor: 'rgba(169,169,169,0.3)',
        }}
      >
        <div
          style={{
            position: 'fixed',
            top: '10vh',
            left: '50vw',
            boxShadow: '0px 0px 10px black',
            backgroundColor: 'white',
            textAlign: 'center',
          }}
        >
          <p>{props.text || 'This is a popup'}</p>
          <button
            onClick={() => props.callBack ? props.callBack(true) : null}
          >{ props.confirmBtnText || 'Confirm' }</button>
          <button
            onClick={() => props.callBack ? props.callBack(false) : null}
          >{props.denyBtnText || 'Deny'}</button>
        </div>
      </div>
    )}
  />
);
