import { ISettings } from './reducers/settings.reducer';
import { ITileData } from './reducers/board.reducer';
import { IStatus } from './reducers/game-status.reducer';
import { IGameTimer } from './reducers/timer.reducer';

export interface IGameStore {
  settings: ISettings;
  board: ITileData[];
  status: IStatus;
  timer: IGameTimer;
}
