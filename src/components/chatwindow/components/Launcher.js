import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ChatWindow from './ChatWindow';
import launcherIcon from './../assets/logo-no-bg.svg';
import launcherIconActive from './../assets/close-icon.png';


class Launcher extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      launcherIcon
    };
    this.handleClick = this.handleClick.bind(this);
    this.openChat = this.openChat.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.toggle !== prevProps.toggle)
    {
      if (this.props.toggle !== prevProps.toggle) {
        this.openChat();
      }
    }
  }
  handleClick() {
    this.setState({
      active: !this.state.active
    });
  }

  openChat() {
    this.setState({
      active: true
    });
  }

  render() {
    const classList = [
      'sc-launcher',
      (this.state.active ? ' active' : ''),
    ];
    return (
      <div>
        <div className={classList.join(' ')} onClick={()=> {this.handleClick()}}>
          <img className={"sc-open-icon"} src={launcherIconActive} />
          <img className={"sc-closed-icon"} src={launcherIcon} />
        </div>
        <ChatWindow
          messageList={this.props.messageList}
          onUserInputSubmit={this.props.onMessageWasSent}
          agentProfile={this.props.agentProfile}
          active={this.state.active}
          onClose={this.handleClick.bind(this)}
        />
      </div>
    );
  }
}

Launcher.propTypes = {
  onMessageWasReceived: PropTypes.func,
  onMessageWasSent: PropTypes.func,
};

export default Launcher;
