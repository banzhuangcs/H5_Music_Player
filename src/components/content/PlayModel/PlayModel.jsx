/**
 * 播放模式
*/

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { modifySongPlayModel } from '../../../actions/songActionCreators';
import style from './PlayModel.css';

class PlayModel extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    playModel: PropTypes.number
  };

  render() {
    const {
      width,
      height,
      playModel,
      modifySongPlayModel } = this.props;

    return (
      <i
        className={ style[ playModel ? 'play-model-loop' : 'play-model-shuffle' ] }
        style={{ width, height, fontSize: width, cursor: 'pointer' }}
        title={ playModel ? '顺序播放' : '随机播放' }></i>
    );
  }
}

export default connect(
  ({ playModel }) => ({ playModel }),
  (dispatch) => ({ modifySongPlayModel: bindActionCreators(modifySongPlayModel, dispatch) })
)(PlayModel);
