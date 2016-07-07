'use strict';

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import * as BTActions from '../actions/BTActions';
import { connect } from 'react-redux';

import Devices from '../components/devices';
import Manager from '../components/manager';

// @connect(state => ({
//   state: state.counter
// }))
class Scanner extends Component {
  static propTypes = {
    routes: PropTypes.object,
    state: PropTypes.object,
    actions: PropTypes.object
  };

  render() {
    const { state, actions } = this.props;

    if (!state.connecting && state.active){
      return (
        <Manager scanner={state} {...actions} />
      );
    }

    return (
      <Devices scanner={state} {...actions} />
    );
  }
}

export default connect(state => ({
    state: state.scanner
  }),
  dispatch => {
    dispatch(BTActions.checkState());

    return {
      actions: bindActionCreators(BTActions, dispatch)
    };
  }
)(Scanner);
