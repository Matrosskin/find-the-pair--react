import { ITileData } from '../reducers/board.reducer';
import { IGameStore } from '../store.interface';

export const temporaryOpenedTilesSelector: (state: IGameStore) => ITileData[] = (state: IGameStore) => (
  state.board.filter((tileData) => tileData.isTemporaryOpened));

export const waitingForOpeningTilesSelector: (state: IGameStore) => ITileData[] = (state: IGameStore) => (
  state.board.filter((tileData) => !tileData.isOpened && !tileData.isEmpty));
