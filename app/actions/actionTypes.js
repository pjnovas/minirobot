
const name = 'MINIROBO';
const BT = 'SCANNER';

export const CHECKINGSTATE = `${name}/${BT}/CHECKINGSTATE`;
export const BTSTATE = `${name}/${BT}/BTSTATE`;
export const CHECKING_ERROR = `${name}/${BT}/CHECKING_ERROR`;

export const SCANNING = `${name}/${BT}/SCANNING`;
export const SCAN_RECEIVE = `${name}/${BT}/SCAN_RECEIVE`;
export const SCAN_STOP = `${name}/${BT}/SCAN_STOP`;
export const SCAN_ERROR = `${name}/${BT}/SCAN_ERROR`;

export const CONNECTING = `${name}/${BT}/CONNECTING`;
export const CONNECTED = `${name}/${BT}/CONNECTED`;
export const FAIL_CONNECT = `${name}/${BT}/FAIL_CONNECT`;

export const WRITING = `${name}/${BT}/WRITING`;
export const WRITE_DONE = `${name}/${BT}/WRITE_DONE`;
export const WRITE_ERROR = `${name}/${BT}/WRITE_ERROR`;

export const DISCONNECTED = `${name}/${BT}/DISCONNECTED`;
