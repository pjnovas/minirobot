import React, { Component } from 'react';
import { Router, Scene, Modal } from 'react-native-router-flux';
import { createStore, applyMiddleware, compose } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from '../modules/reducer';
import Scanner from './scanner';

const ReduxRouter = connect()(Router);
const store = compose( applyMiddleware(thunk) )(createStore)(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ReduxRouter>
          <Scene key="modal" component={Modal} >
            <Scene key="root" hideNavBar hideTabBar>
              <Scene key="scanner" clone component={Scanner} title="Initial" initial={true}/>
            </Scene>
          </Scene>
        </ReduxRouter>
      </Provider>
    );
  }
}
