import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PlayerProgress from './components/content/PlayerProgress';
import './statics/styles/reset.css';
import './statics/styles/appearance.css';
import './statics/styles/attr.css';
import './statics/styles/global.css';

class App extends Component {
  render() {
    return (
      <div>
        <PlayerProgress />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#app')
);
