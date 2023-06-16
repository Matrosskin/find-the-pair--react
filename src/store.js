import { createStore } from 'redux';
import counterReducer from './reducers/counter-reducer';

const initialState = {
  counter: 0,
};

function configureStore(state = initialState) {
  return createStore(counterReducer, state);
}

export default configureStore;
