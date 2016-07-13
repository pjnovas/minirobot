import * as types from './actionTypes';
import moment from 'moment';

import {
  isEnabled as isBTEnabled,
  list as listBTDevices,
  connect as connectDevice,
  disconnect as disconnectDevice,
  write as writeBT
} from 'react-native-bluetooth-serial';

export function checkingState() {
  return {
    type: types.CHECKINGSTATE
  };
}

export function newBTState(enabled) {
  return {
    type: types.BTSTATE,
    enabled
  };
}

export function checkError() {
  return {
    type: types.CHECKING_ERROR
  };
}

export function scanning() {
  return {
    type: types.SCANNING
  };
}

export function stopScanning() {
  return {
    type: types.SCAN_STOP
  };
}

export function receiveDevices(devices) {
  return {
    type: types.SCAN_RECEIVE,
    devices
  };
}

export function scanError(error) {
  return {
    type: types.SCAN_ERROR,
    error
  };
}

export function connecting() {
  return {
    type: types.CONNECTING
  };
}

export function connected(device) {
  return {
    type: types.CONNECTED,
    device
  };
}

export function connError(error) {
  return {
    type: types.FAIL_CONNECT,
    error
  };
}

export function disconnected() {
  return {
    type: types.DISCONNECTED
  };
}

export function writing() {
  return {
    type: types.WRITING
  };
}

export function writeError(error) {
  return {
    type: types.WRITE_ERROR,
    error
  };
}

export function writeDone() {
  return {
    type: types.WRITE_DONE
  };
}

export function checkState() {
  return dispatch => {
    dispatch(checkingState());

    isBTEnabled()
      .then( enabled => dispatch(newBTState(enabled)) )
      .catch( err => dispatch(checkError(err)) );
  };
}

export function scan() {
  return dispatch => {
    dispatch(scanning());

    listBTDevices()
      .then( devices => dispatch(receiveDevices(devices)) )
      .catch( err => dispatch(scanError(err)) );
  };
}

export function connect(device) {
  return dispatch => {
    dispatch(connecting());

    connectDevice(device.id)
      .then( () => dispatch(connected(device)))
      .catch( err => dispatch(connError(err)) );
  };
}

export function disconnect() {
  return dispatch => {
    disconnectDevice()
      .then( () => dispatch(disconnected()) )
      .catch( err => dispatch(connError(err)) );
  };
}

// Commands

const send = (dispatch, msg) => {
  writeBT(msg)
    .then( () => dispatch(writeDone()))
    .catch((err) => dispatch(writeError(err)));
};

export function display(imgCode) {
  return dispatch => {
    send(dispatch, `11:${imgCode}&`);
  };
}

export function move(dir, vel) {
  return dispatch => {
    switch(dir){
      case 'forward': dir = 60; break;
      case 'backward': dir = 70; break;
      case 'stop': dir = 10; break;
    }

    if (vel < 0 || vel > 255){
      vel = 50; // set a medium, velocity in case the range is wrong
    }

    //console.log(`${dir}:${vel}&`);
    send(dispatch, `${dir}:${vel}&`);
  };
}
