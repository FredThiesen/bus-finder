import {combineReducers, createStore} from 'redux';
import {busLinesReducer} from '../reducers/busLinesReducer';
import {itinerariesReducer} from '../reducers/itinerariesReducer';
import {jitneysReducer} from '../reducers/jitneysReducer';

const rootReducer = combineReducers({
  itineraries: itinerariesReducer,
  jitneys: jitneysReducer,
  busLines: busLinesReducer,
});
const store = createStore(rootReducer);

export default store;
