import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Store from './redux/Store';
import Homepage from './src/Screens/HomePage/Homepage';

export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Homepage />
      </Provider>
    );
  }
}
