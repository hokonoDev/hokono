import React from 'react';

const IfRender = class extends React.Component {
  constructor(props) {
    super(props);

    const dummyFunc = () => null;

    this.state = {
      if: this.props.if,
      ifTrue: this.props.ifTrue || dummyFunc,
      ifFalse: this.props.ifFalse || dummyFunc,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.if !== prevProps.if) {
      this.setState({ if: this.props.if })
    }
  }

  render() {
    return this.state.if ? this.state.ifTrue() : this.state.ifFalse();
  }
}

export default IfRender;
