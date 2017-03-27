import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './statics/styles/xx.css';

class Image extends Component {
  render() {
    return <div className={ styles.xx }></div>
  }
}

ReactDOM.render(
  <Image />,
  document.getElementById('app')
);
