import {combineReducers, createStore} from 'redux';
import {busLinesReducer} from '../reducers/busLinesReducer';
import {itinerariesReducer} from '../reducers/itinerariesReducer';
import {minibusLinesReducer} from '../reducers/minibusLinesReducer';

const rootReducer = combineReducers({
  itineraries: itinerariesReducer,
  minibusLines: minibusLinesReducer,
  busLines: busLinesReducer,
});
const store = createStore(rootReducer);

export default store;
