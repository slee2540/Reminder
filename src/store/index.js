import {createStore, combineReducers} from 'redux';
import list from './List';

const reducers = combineReducers({
  list,
});

const store = createStore(reducers);

export default store;
