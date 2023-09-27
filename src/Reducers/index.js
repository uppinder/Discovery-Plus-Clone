import { combineReducers } from 'redux';
import showReducer from './showReducer';

const rootReducer = combineReducers({ showList: showReducer });

export default rootReducer;
