import React from 'react';
import { withRouter } from 'react-router-dom';

const IfRedirect = class extends React.Component {
  constructor(props) {
    super(props);

    this.redirect();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.if !== prevProps.if) this.redirect();
  }

  redirect() {
    this.props.if ?
      this.props.history.push(this.props.ifTrue)
      : this.props.history.push(this.props.ifFalse);
  }

  render() {
    return null;
  }
}

export default withRouter(IfRedirect);
