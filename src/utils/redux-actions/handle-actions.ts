import reduceReducers from 'reduce-reducers';
import {
  Action, ActionFunctions, Reducer, ReduxCompatibleReducer, handleAction,
} from 'redux-actions';

// NOTE: Definitions available in @types are not useful
// so I decided to use custom one.
// Before doing it I ensured that the JS version of function can be used in such way.
type ReduceReducersCustomDefinition = <State, Payload>(
  ...reducers: ReduxCompatibleReducer<State, Payload>[]
) => Reducer<State, Payload>;

function handleActions<State>(handlersMap: unknown[][], defaultState: State): Reducer<State, any> {
  const reducers = handlersMap.map((handlerArr) => {
    const [handler, reducer] = handlerArr as [ActionFunctions<any>, Reducer<any, any> ];
    return handleAction(handler, reducer, defaultState);
  });
  const reducer = (reduceReducers as unknown as ReduceReducersCustomDefinition)(...reducers);
  const finalReducer = (state: State, action: Action<any>) => reducer(state, action);
  return finalReducer;
}

export default handleActions;
