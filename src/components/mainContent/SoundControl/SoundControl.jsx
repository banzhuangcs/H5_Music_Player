/**
 * 音量控制组件
 */

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { modifyPlayVolume } from '../../../actionCreators/play';
import Progress from '../../global/Progress/Progress';
import style from './sound_control.css';

class SoundControl extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    playVolume: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      showProgress: false
    };

    this.handleMouseOver = () =>
      this.setState({ showProgress: true })
    this.handleMouseOut = () =>
      this.setState({ showProgress: false })
    this.handleProgress = (percent) => {
      const playVolume = Number(((+percent.slice(0, -1)) / 100).toFixed(2));
      this.props.modifyPlayVolume(playVolume);
    }
  }

  render() {
    const { width, height, playVolume } = this.props;

    return (
      <div
        className={ style['sound-control'] }
        style={{ width, height, fontSize: width }}
        onMouseOver={ this.handleMouseOver }
        onMouseOut={ this.handleMouseOut }>
        <div
          className={ style['sound-popup'] }
          style={{ opacity: this.state.showProgress ? 1 : 0 }}>
          <div className={ style['sound-popup-inner'] }>
            <Progress
              direction="vertical"
              width={ 3 }
              height={ 100 }
              circleWidth={ 10 }
              circleHeight={ 10 }
              circlePos="bottom"
              ratio={ playVolume }
              onProgress={ this.handleProgress } />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  (dispatch) => ({ modifyPlayVolume: bindActionCreators(modifyPlayVolume, dispatch) })
)(SoundControl);
