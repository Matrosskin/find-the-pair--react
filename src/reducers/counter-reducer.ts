import { createAction, handleActions } from 'redux-actions';

enum ActionType {
  READ = 'read',
  INCREASE = 'increase',
  INCREASE_ASYNC = 'INCREMENT_ASYNC',
  DECREASE = 'decrease',
}

// NOTE: ReduxCompatibleReducer - is type of returned value from `handleActions`
// it should be used with `useSelector` in components ,but their types are not compatible.
// So, to simulate action, without action, we need this `read` action.
const read = createAction(ActionType.READ);
const increase = createAction(ActionType.INCREASE);
const increaseAsync = createAction(ActionType.INCREASE_ASYNC);
const decrease = createAction(ActionType.DECREASE);

const reducer = handleActions(
  {
    [ActionType.READ]: (state: { counter: number }) => state,
    [ActionType.INCREASE]: (state: { counter: number }) => ({
      ...state,
      counter: state.counter + 1,
    }),
    [ActionType.DECREASE]: (state: { counter: number }) => ({
      ...state,
      counter: state.counter - 1,
    }),
  },
  { counter: 0 },
);

export interface IStore {
  counter: number;
}

export default reducer;
export {
  read,
  increase,
  increaseAsync,
  decrease,
};
