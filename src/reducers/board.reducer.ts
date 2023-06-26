import { combineActions, createAction } from 'redux-actions';
import { handleActions } from '../utils/redux-actions';

enum ActionType {
  SET_BOARD = 'SET_BOARD',
  OPEN_TILE = 'OPEN_TILE',
  OPEN_TILE_TEMPORARY = 'OPEN_TILE_TEMPORARY',
  CLOSE_TILE_OPENED_TEMPORARY = 'CLOSE_TILE_OPENED_TEMPORARY',
}

const setBoard = createAction(ActionType.SET_BOARD, (board: ITileData[]) => ({ board }));
const openTile = createAction(ActionType.OPEN_TILE, (id: number) => ({ id, isOpened: true, isTemporaryOpened: false }));
const openTileTemporary = createAction(
  ActionType.OPEN_TILE_TEMPORARY,
  (id: number) => ({ id, isTemporaryOpened: true }),
);
const closeTileOpenedTemporary: typeof openTileTemporary = createAction(
  ActionType.CLOSE_TILE_OPENED_TEMPORARY,
  (id: number) => ({ id, isTemporaryOpened: false }),
);

const handlers = [
  [
    setBoard,
    (_: ITileData[], action: ReturnType<typeof setBoard>) => action.payload.board,
  ],
  [
    openTile,
    (state: ITileData[], { payload: { id, isOpened, isTemporaryOpened } }: ReturnType<typeof openTile>) => (
      state.map((tile) => (tile.id === id ? { ...tile, isOpened, isTemporaryOpened } : tile))
    ),
  ],
  [
    combineActions(openTileTemporary, closeTileOpenedTemporary),
    (state: ITileData[], { payload: { id, isTemporaryOpened } }: ReturnType<typeof openTileTemporary>) => (
      state.map((tile) => (tile.id === id ? { ...tile, isTemporaryOpened } : tile))
    ),
  ],
];

const reducer = handleActions<ITileData[]>(handlers, []);

export interface ITileData {
  id: number;
  emoji: string;
  isOpened: boolean;
  isEmpty?: boolean;
  isTemporaryOpened?: boolean;
}

export default reducer;
export {
  setBoard,
  openTile,
  openTileTemporary,
  closeTileOpenedTemporary,
};
