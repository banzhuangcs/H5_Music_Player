/**
 * 播放模式
*/

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { modifyPlayModel } from '../../../actionCreators/play';
import style from './play_model.css';

class PlayModel extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    playModel: PropTypes.oneOf(['order', 'loop'])
  };

  constructor(props) {
    super(props);

    this.handleToggleModel = () =>
      this.props.modifyPlayModel(this.props.playModel === 'order' ? 'loop' : 'order')
  }

  render() {
    const { width, height, playModel } = this.props;
    const isOrder = playModel === 'order' ? true : false;

    return (
      <i
        className={ style[ isOrder ? 'play-model-loop' : 'play-model-order' ] }
        style={{ width, height, fontSize: width, cursor: 'pointer' }}
        title={ isOrder ? '循环播放' : '顺序播放' }
        onClick={ this.handleToggleModel }></i>
    );
  }
}

export default connect(
  null,
  (dispatch) => ({ modifyPlayModel: bindActionCreators(modifyPlayModel, dispatch) })
)(PlayModel);
