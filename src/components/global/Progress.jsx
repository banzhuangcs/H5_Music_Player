/**
 * 进度条组件
*/

import React, { Component, PropTypes } from 'react';
import style from './Progress.css';

const addEvent = (el, type, handle) =>
  el.addEventListener(type, handle, false)
const removeEvent = (el, type, handle) =>
  el.removeEventListener(type, handle, false)
const getPercent = (to, total) =>
  `${ Math.round(to / total * 100) }%`

export default class Progress extends Component {
  static propTypes = {
    direction: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    circleWidth: PropTypes.number.isRequired,
    circleHeight: PropTypes.number.isRequired,
    onProgress: PropTypes.func.isRequired
  };
  static defaultProps = {
    direction: 'horizontal'
  };

  constructor(props) {
    super(props);
    const {
      direction,
      width,
      height,
      circleWidth,
      circleHeight,
      onProgress } = this.props;
    const isHorizontal = direction === 'horizontal';

    this.state = {
      regulatorLeft: isHorizontal ? 0 : -Math.floor(this.props.circleWidth / 2),
      regulatorTop: isHorizontal ? -Math.floor(this.props.circleHeight / 2) : 0
    };

    this.max = (isHorizontal ? width : height) - (isHorizontal ? circleWidth : circleHeight);

    this._getClientPos = (fn) => (event) => {
      if (event.persist) {
        event.persist();
      }

      const rect = this.el.getBoundingClientRect();
      fn(event.clientX - rect.left, event.clientY - rect.top);
      event.stopPropagation();
    };
    this._setProgressState = (x, y, fn) => {
      if (isHorizontal) {
        this.setState({
          'regulatorLeft': Math.min(this.max, Math.max(0, x))
        }, () =>
          onProgress(getPercent(this.state.regulatorLeft, this.max))
        );
      } else {
        this.setState({
          'regulatorTop': Math.min(this.max, Math.max(0, y))
        }, () =>
          onProgress(getPercent(this.state.regulatorTop, this.max))
        );
      }

      window.getSelection().removeAllRanges();
    };

    this.handleMouseDown = this._getClientPos((x, y) => {
      addEvent(document, 'mousemove', this.handleMouseMove);
      addEvent(document, 'mouseup', this.handleMouseUp);
    });
    this.handleMouseMove = this._getClientPos((x, y) =>
      this._setProgressState(x, y)
    );
    this.handleMouseUp = this._getClientPos((x, y) => {
      removeEvent(document, 'mousemove', this.handleMouseMove);
      removeEvent(document, 'mouseup', this.handleMouseUp);
    });

    this.handleSpeed = this._getClientPos((x, y) =>
      this._setProgressState(x, y)
    );
  }

  render() {
    const {
      width,
      height,
      circleWidth,
      circleHeight } = this.props;

    return (
      <div
        ref={ el => this.el = el }
        className={ style['progress'] }
        style={{ width, height }}
        onMouseDown={ this.handleSpeed }>
          <span className={ style['consumption'] }></span>
          <span
            className={ style['regulator'] }
            style={{ circleWidth, circleHeight }}
            onMouseDown={ this.handleMouseDown }>
          </span>
      </div>
    );
  }
}
