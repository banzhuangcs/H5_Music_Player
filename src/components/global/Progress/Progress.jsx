/**
 * 进度条组件
*/

import React, { Component, PropTypes } from 'react';
import style from './progress.css';

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
    circlePos: PropTypes.oneOf(['left', 'right', 'top', 'bottom']).isRequired,
    onProgress: PropTypes.func.isRequired
  };
  static defaultProps = {
    direction: 'horizontal',
    circlePos: 'left'
  };

  constructor(props) {
    super(props);
    const {
      direction,
      width,
      height,
      circleWidth,
      circleHeight,
      circlePos,
      onProgress } = this.props;
    const isHorizontal = direction === 'horizontal';
    const averageLeft = Math.floor(circleWidth / 2);
    const averageTop = Math.floor(circleHeight / 2);

    this.state = {
      regulatorLeft: isHorizontal ? circlePos === 'left' ? -averageLeft : width - circleWidth + averageLeft : -averageLeft,
      regulatorTop: isHorizontal ? -averageTop : circlePos === 'top' ? -averageTop : height - circleHeight + averageTop
    };

    this.max = (isHorizontal ? width : height) - (isHorizontal ? circleWidth : circleHeight) + (isHorizontal ? averageLeft : averageTop);

    this._getClientPos = (fn) => (event) => {
      if (event.persist) {
        event.persist();
      }

      const rect = this.progressEl.getBoundingClientRect();
      const diffX = event.clientX - rect[circlePos];
      const diffY = event.clientY - rect[circlePos];

      fn(diffX, diffY);
      event.stopPropagation();
    };
    this._setProgressState = (x, y, fn) => {
      if (isHorizontal) {
        this.setState({
          'regulatorLeft': this.props.circlePos === 'left'
            ? Math.min(this.max, Math.max(0, x))
            : this.max + Math.min(0, Math.max(-this.max, x))
        }, () =>
          onProgress(getPercent(this.state.regulatorLeft, this.max))
        );
      } else {
        this.setState({
          'regulatorTop': this.props.circlePos === 'top'
            ? Math.min(this.max, Math.max(0, y))
            : this.max + Math.min(0, Math.max(-this.max, y))
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
      direction,
      width,
      height,
      circleWidth,
      circleHeight,
      circlePos } = this.props;

    const { regulatorLeft, regulatorTop } = this.state;
    const isHorizontal = direction === 'horizontal';
    const isPosHorizontal = ['left', 'right'].indexOf(circlePos) >= 0;

    return (
      <div
        ref={ el => this.progressEl = el }
        className={ style['progress'] }
        style={{ width, height }}
        onMouseDown={ this.handleSpeed }>
          <span
            className={ style['consumption'] }
            style={{
              width: isHorizontal ? circlePos === 'left' ? regulatorLeft : this.max - regulatorLeft : width,
              height: isHorizontal ? height : circlePos === 'top' ? regulatorTop : this.max - regulatorTop,
              [isPosHorizontal ? circlePos : 'left']: 0,
              [isPosHorizontal ? 'top' : circlePos]: 0 }}></span>
          <span
            className={ style['regulator'] }
            style={{
              width: circleWidth,
              height: circleHeight,
              left: regulatorLeft,
              top: regulatorTop }}
            onMouseDown={ this.handleMouseDown }></span>
      </div>
    );
  }
}
