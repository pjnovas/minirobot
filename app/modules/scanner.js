import * as types from '../actions/actionTypes';

const initialState = {
  checkingState: true,
  scanning: false,
  hasBT: false,
  ready: false,
  connecting: false,
  devices: [],
  active: null,
  writing: false,
  error: null
};

export default function scanner(state = initialState, action = {}) {
  switch (action.type) {
    case types.CHECKINGSTATE:
      return {
        ...state,
        error: null,
        checkingState: true
      };
    case types.CHECKING_ERROR:
      return {
        ...state,
        error: {
          type: 'check',
          data: action.error
        },
      };
    case types.BTSTATE:
      return {
        ...state,
        checkingState: false,
        error: null,
        hasBT: action.enabled,
        ready: action.enabled
      };
    case types.SCANNING:
      return {
        ...state,
        devices: [],
        ready: false,
        error: null,
        scanning: true
      };
    case types.SCAN_ERROR:
      return {
        ...state,
        error: {
          type: 'scan',
          data: action.error
        },
        ready: true,
        scanning: false
      };
    case types.SCAN_RECEIVE: {
      return {
        ...state,
        devices: action.devices.slice(0),
        ready: true,
        error: null,
        scanning: false
      };
    }
    case types.SCAN_STOP:
      return {
        ...state,
        ready: true,
        error: null,
        scanning: false
      };
    case types.CONNECTING:
      return {
        ...state,
        error: null,
        connecting: true
      };
    case types.CONNECTED:
      return {
        ...state,
        connecting: false,
        error: null,
        active: action.device
      };
    case types.FAIL_CONNECT:
      return {
        ...state,
        error: {
          type: 'conn',
          data: action.error
        },
        connecting: false,
        active: null
      };
    case types.DISCONNECTED:
      return {
        ...state,
        connecting: false,
        error: null,
        active: null
      };
    case types.WRITING:
      return {
        ...state,
        writing: true
      };
    case types.WRITE_ERROR:
      return {
        ...state,
        error: {
          type: 'write',
          data: action.error
        },
        writing: false
      };
    case types.WRITE_DONE:
      return {
        ...state,
        writing: false,
        error: null
      };

    default:
      return state;
  }
}
