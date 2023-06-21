import React from 'react';
import { connect } from 'react-redux';

import './board.component.scss';
import { ISettings } from '../../reducers/settings.reducer';
import Tile from '../tile/tile.component';
import { ITileData, setBoard } from '../../reducers/board.reducer';
import {
  GameStatus, IStatus, setIdleAction, setLossAction, setPausedAction,
} from '../../reducers/game-status.reducer';
import { IGameStore } from '../../store';
import { generateMap } from '../../utils';

type BoardProps = {
  board: ITileData[],
  settings: ISettings,
  status: IStatus,
  setBoardState: (board: ITileData[]) => void,
  setPaused: () => void,
  setLoss: () => void,
  setIdle: () => void,
};

type BoardState = {
  leftTime: number;
  gameId: number;
  intervalId?: number;
};

const mapStateToProps = (state: IGameStore) => ({
  board: state.board,
  settings: state.settings,
  status: state.status,
});

// TODO: Need to investigate how to properly define type for "dispatch" argument.
const mapDispatchToProps = (dispatch: any) => ({
  setBoardState: (newState: ITileData[]) => dispatch(setBoard(newState)),
  setPaused: () => dispatch(setPausedAction()),
  setLoss: () => dispatch(setLossAction()),
  setIdle: () => dispatch(setIdleAction()),
});

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

class Board extends React.Component<BoardProps, BoardState> {
  static formatTime(time: number): string {
    const minutes = Math.trunc(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds}`;
  }

  constructor(props: BoardProps) {
    super(props);

    this.state = {
      leftTime: 0,
      gameId: 0,
    };
  }

  componentDidMount(): void {
    this.recreateBoardIfSettingsChanged();
  }

  componentDidUpdate() {
    const { status: { gameStatus } } = this.props;
    const { intervalId } = this.state;
    if ((gameStatus === GameStatus.WIN || gameStatus === GameStatus.LOSS) && intervalId) {
      clearInterval(intervalId);
      this.setState((state) => ({
        ...state,
        intervalId: undefined,
      }));
    }
    this.recreateBoardIfSettingsChanged();
  }

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

  private recreateBoardIfSettingsChanged() {
    const { status: { gameId } } = this.props;
    const { gameId: currentGameId } = this.state;
    if (currentGameId === gameId) {
      return;
    }

    this.setState((state) => ({
      ...state,
      gameId,
    }));
    this.startNewGame();
  }

  startNewGame() {
    const { setBoardState, settings: { mapSize, durationTime, bonusTime } } = this.props;

    const allCells: ITileData[] = generateMap(mapSize);
    setBoardState(allCells);

    this.setState((state) => ({
      ...state,
      leftTime: durationTime * 60,
    }));

    setTimeout(() => {
      setBoardState(allCells.map((tile) => ({
        ...tile,
        isOpened: false,
      })));

      const { intervalId } = this.state;
      if (intervalId) {
        clearInterval(intervalId);
      }

      const newIntervalId = window.setInterval(() => {
        const { status: { gameStatus }, setLoss } = this.props;

        if (gameStatus === GameStatus.PAUSED) {
          return;
        }

        this.setState((state) => {
          const leftTime = state.leftTime - 1;
          let { intervalId: actualIntId } = state;

          if (leftTime <= 0) {
            clearInterval(state.intervalId);
            actualIntId = undefined;
            setLoss();
          }

          return {
            ...state,
            leftTime,
            intervalId: actualIntId,
          };
        });
      }, 1000);

      this.setState((state) => ({
        ...state,
        intervalId: newIntervalId,
      }));
    }, bonusTime * 1000);
  }

  render() {
    const { setPaused, setIdle, status: { gameStatus } } = this.props;
    const { leftTime } = this.state;
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
          <span>Time left: {Board.formatTime(leftTime)}</span>
          { isStarted
            && <button type="button" className="game-btn blue-btn" onClick={setPaused}>Pause</button> }
          { (isWin || isLoss)
            && <button type="button" className="game-btn blue-btn" onClick={setIdle}>Try one more time</button> }
        </div>
        { isStarted
          && (
            <div className="board-body card">
              {this.getTiles()}
            </div>
          )}

        { isWin
          && (
            <div className="win-card">
              🥳
            </div>
          )}

        { isLoss
          && (
            <div className="loss-card">
              ☠️
            </div>
          )}
      </div>
    );
  }
}

const ConnectedBoard = connectToStore(Board);

export default ConnectedBoard;
