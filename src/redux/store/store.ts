import {combineReducers, createStore} from 'redux';
import {itinerariesReducer} from '../reducers/itinerariesReducer';

const rootReducer = combineReducers({
  itineraries: itinerariesReducer,
});
const store = createStore(rootReducer);

export default store;
