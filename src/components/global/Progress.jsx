/**
 * 进度条组件
*/

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

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
    this.startX = 0;
    this.startY = 0;
    this.prevStartX = 0;
    this.prevStartY = 0;
    this.isMove = false;
    this._getStyle = () => ({
      root: {
        width: `${ width }px`,
        height: `${ height }px`,
        display: 'flex',
        flexFlow: `nowrap ${ direction }`,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        cursor: 'pointer'
      },
      progress: {
        position: 'relative',
        flex: 1,
        background: '#777'
      },
      consumption: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: `${ isHorizontal ? this.state.regulatorLeft : width }px`,
        height: `${ isHorizontal ? height : this.state.regulatorTop }px`,
        background: '#e03a3a',
        zIndex: 1
      },
      regulator: {
        position: 'absolute',
        left: `${ this.state.regulatorLeft }px`,
        top: `${ this.state.regulatorTop }px`,
        width: `${ circleWidth }px`,
        height: `${ circleHeight }px`,
        borderRadius: '100%',
        background: '#fff',
        boxShadow: '1px 1px 1px rgba(0, 0, 0, .3)',
        zIndex: 2
      }
    });

    this._getClientPos = (fn) => (event) => {
      if (event.persist) {
        event.persist();
      }

      fn(event.clientX, event.clientY);
    };
    this._setProgressState = (x, y) => {
      if (isHorizontal) {
        this.setState({
          'regulatorLeft': Math.min(this.max, Math.max(0, this.prevStartX + x - this.startX))
        }, () =>
          onProgress(getPercent(this.state.regulatorLeft, this.max))
        );
      } else {
        this.setState({
          'regulatorTop': Math.min(this.max, Math.max(0, this.prevStartY + y - this.startY))
        }, () =>
          onProgress(getPercent(this.state.regulatorTop, this.max))
        );
      }

      window.getSelection().removeAllRanges();
    };

    this.handleMouseDown = this._getClientPos((x, y) => {
      this.startX = x;
      this.startY = y;

      addEvent(document, 'mousemove', this.handleMouseMove);
      addEvent(document, 'mouseup', this.handleMouseUp);
    });
    this.handleMouseMove = this._getClientPos((x, y) =>
      this._setProgressState(x, y)
    );
    this.handleMouseUp = this._getClientPos((x, y) => {
      removeEvent(document, 'mousemove', this.handleMouseMove);
      removeEvent(document, 'mouseup', this.handleMouseUp);

      if (isHorizontal) {
        this.prevStartX = x;
      } else {
        this.prevStartY = y;
      }
    });

    this.handleSpeed = this._getClientPos((x, y) =>
      this._setProgressState(x, y)
    );
  }

  render() {
    const {
      root,
      progress,
      regulator,
      consumption } = this._getStyle();

    return (
      <div style={ root } onMouseDown={ this.handleSpeed }>
        <div style={ progress }>
          <span style={ consumption }></span>
          <span
            style={ regulator }
            onMouseDown={ this.handleMouseDown }>
          </span>
        </div>
      </div>
    );
  }
}
