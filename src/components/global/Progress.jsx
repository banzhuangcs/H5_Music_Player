/**
 * 进度条组件
*/

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

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

    this.state = {
      regulatorLeft: this.props.direction === 'horizontal'
        ? 0
        : -Math.floor(this.props.circleWidth / 2),
      regulatorTop: this.props.direction === 'vertical'
        ? 0
        : -Math.floor(this.props.circleHeight / 2)
    };

    this.startX = 0;
    this.startY = 0;
    this.isMove = false;
    this._getStyle = () => ({
      root: {
        width: `${ this.props.width }px`,
        height: `${ this.props.height }px`,
        display: 'flex',
        flexFlow: `nowrap ${ this.props.direction }`,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
      },
      progress: {
        position: 'relative',
        flex: 1,
        background: '#777'
      },
      regulator: {
        position: 'absolute',
        left: `${ this.state.regulatorLeft }px`,
        top: `${ this.state.regulatorTop }px`,
        width: `${ this.props.circleWidth }px`,
        height: `${ this.props.circleHeight }px`,
        borderRadius: '100%',
        background: '#fff',
        boxShadow: '1px 1px 1px rgba(0, 0, 0, .3)'
      }
    });

    this.handleMouseDown = (event) => {
      event.persist();
      this.startX || (this.startX = event.clientX);
      this.startY || (this.startY = event.clientY);
      this.isMove = true;
    };

    this.handleMouseMove = (event) => {
      event.persist();

      if (this.isMove) {
        let x = event.clientX;
        let y = event.clientY;

        if (this.props.direction === 'horizontal') {
          if (Math.abs(x) > Math.abs(y)) {
            this.setState({
              regulatorLeft: x - this.startX
            });
          }
        } else {
          if (Math.abs(y) > Math.abs(x)) {
            this.setState({
              regulatorTop: y - this.el.getBoundingClientRect().top
            });
          }
        }
      }
    };
    this.handleMouseUp = this.handleMouseOut = () => {
      this.isMove = false;
    };
  }

  render() {
    const { root, progress, regulator } = this._getStyle();

    return (
      <div style={ root }
        onMouseDown={ this.handleMouseDown }
        onMouseMove={ this.handleMouseMove }
        onMouseUp={ this.handleMouseUp }
        onMouseOut={ this.handleMouseOut }>
        <div style={ progress }>
          <span
            ref={ el => this.regulatorEl  }
            style={ regulator }>
            </span>
        </div>
      </div>
    );
  }
}
