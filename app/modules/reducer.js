import { combineReducers } from 'redux';

import scanner from './scanner';
import routes from './routes';

export default combineReducers({
  routes,
  scanner
});
