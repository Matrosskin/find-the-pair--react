export default (state: { counter: number }, action: { type?: string } = {}) => {
  switch (action.type) {
    case 'increase':
      return {
        ...state,
        counter: state.counter + 1,
      };
    case 'decrease':
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
};
