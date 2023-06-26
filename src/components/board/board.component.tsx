import React from 'react';
import { connect } from 'react-redux';

import './board.component.scss';
import { ISettings } from '../../reducers/settings.reducer';
import Tile from '../tile/tile.component';
import { ITileData } from '../../reducers/board.reducer';
import {
  GameStatus, IStatus, setPausedAction,
} from '../../reducers/game-status.reducer';
import { IGameStore } from '../../store.interface';
import GameOver from '../game-over/game-over.component';
import Winner from '../winner/winner.component';
import { IGameTimer } from '../../reducers/timer.reducer';

type BoardProps = {
  board: ITileData[],
  settings: ISettings,
  status: IStatus,
  timer: IGameTimer,
  setPaused: () => void,
};

const mapStateToProps = (state: IGameStore) => ({
  board: state.board,
  settings: state.settings,
  status: state.status,
  timer: state.timer,
});

// TODO: Need to investigate how to properly define type for "dispatch" argument.
const mapDispatchToProps = (dispatch: any) => ({
  setPaused: () => dispatch(setPausedAction()),
});

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

function formatTime(time: number): string {
  const minutes = Math.trunc(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds}`;
}

class Board extends React.Component<BoardProps> {
  getTiles() {
    const { board, settings: { mapSize: size } } = this.props;
    if (!board) {
      return '';
    }
    const allCells = [...board];
    const boardCells = new Array(size).fill(null).map(
      (_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className="board-line">
          {allCells.splice(0, size).map((tileData) => (
            <div key={tileData.id} className="board-cell">
              <Tile tileData={tileData} />
            </div>
          ))}
        </div>
      ),
    );

    return boardCells;
  }

  render() {
    const { setPaused, status: { gameStatus }, timer: { leftTime } } = this.props;
    const isPaused = gameStatus === GameStatus.PAUSED;

    const isStarted = gameStatus === GameStatus.STARTED;
    const isWin = gameStatus === GameStatus.WIN;
    const isLoss = gameStatus === GameStatus.LOSS;

    return (
      // TODO: I believe it would be better to left board at background while game paused,
      // but I have not time at the moment to implement styles for such behavior.
      <div className={`game-board ${isPaused ? 'invisible' : ''}`}>
        <div className="board-header card">
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          <span>Time left: {formatTime(leftTime)}</span>
          { isStarted
            && <button type="button" className="game-btn blue-btn" onClick={setPaused}>Pause</button> }
        </div>

        { isStarted
          && (
            <div className="board-body card">
              {this.getTiles()}
            </div>
          )}

        { isWin && <Winner /> }
        { isLoss && <GameOver /> }
      </div>
    );
  }
}

const ConnectedBoard = connectToStore(Board);

export default ConnectedBoard;
