import { createAction, handleActions } from 'redux-actions';

enum ActionType {
  SET_BOARD = 'SET_BOARD_ACTION',
  UPDATE_TILE = 'UPDATE_TILE_ACTION',
}

const setBoard = createAction(ActionType.SET_BOARD);
const updateTile = createAction(ActionType.UPDATE_TILE);

const reducer = handleActions<ITileData[]>(
  {
    [ActionType.SET_BOARD]: (_, action) => action.payload,
    // [ActionType.UPDATE_TILE]: Handler defined as saga.
  },
  [],
);

export interface ITileData {
  id: number;
  code: number;
  isOpened: boolean;
  isEmpty?: boolean;
}

export default reducer;
export {
  ActionType,
  setBoard,
  updateTile,
};
