import { GameStatus } from '../reducers/game-status.reducer';
import { IGameStore } from '../store.interface';

export const temporaryOpenedTilesSelector = (state: IGameStore) => (
  state.board.filter((tileData) => tileData.isTemporaryOpened));

export const waitingForOpeningTilesSelector = (state: IGameStore) => (
  state.board.filter((tileData) => !tileData.isOpened && !tileData.isEmpty));

export const gameStatusSelector = (state: IGameStore) => ({
  isGamePaused: state.status.gameStatus === GameStatus.PAUSED,
  isGameStarted: state.status.gameStatus === GameStatus.STARTED,
  isGameIdle: state.status.gameStatus === GameStatus.IDLE,
  isGameWin: state.status.gameStatus === GameStatus.WIN,
  isGameLoss: state.status.gameStatus === GameStatus.LOSS,
});

export const leftTimeSelector = (store: IGameStore) => store.timer.leftTime;

export const mapSizeSelector = (store: IGameStore) => store.settings.mapSize;
