import React from 'react';
import { connect } from 'react-redux';

import './board.component.scss';
import { ISettings } from '../../reducers/settings.reducer';
import Tile from '../tile/tile.component';
import { ITileData, setBoard } from '../../reducers/board.reducer';

const leftTime = '2:13';

type BoardProps = {
  onPauseGame: () => void,
  settings: ISettings,
  isPaused: boolean,
  board: ITileData[],
  setBoardState: (board: ITileData[]) => void,
};

const mapStateToProps = (state: { board: ITileData[] }) => ({
  board: state.board,
});

// TODO: Need to investigate how to properly define type for "dispatch" argument.
const mapDispatchToProps = (dispatch: any) => ({
  setBoardState: (newState: ITileData[]) => dispatch(setBoard(newState)),
});

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

class Board extends React.Component<BoardProps> {
  settings!: ISettings;

  constructor(props: BoardProps) {
    super(props);

    this.settings = props.settings;

    this.prepareBoard();
  }

  componentDidUpdate() {
    const { settings } = this.props;
    if (this.settings === settings) {
      return;
    }

    this.settings = settings;
    this.prepareBoard();
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

  prepareBoard() {
    const { setBoardState, settings: { mapSize } } = this.props;

    const amountOfCells = mapSize * mapSize;
    const allCells: ITileData[] = new Array(amountOfCells).fill(null).map((_, index) => ({
      id: index,
      code: index,
      isOpened: false,
    }));
    const isEmptyCellRequired = !!(amountOfCells % 2);
    if (isEmptyCellRequired) {
      const indexOfEmptyCell = Math.trunc(amountOfCells / 2);
      allCells[indexOfEmptyCell].isEmpty = true;
    }
    setBoardState(allCells);
  }

  render() {
    const { isPaused, onPauseGame } = this.props;
    return (
      // TODO: I believe it would be better to left board at background while game paused,
      // but I have not time at the moment to implement styles for such behavior.
      <div className={`game-board ${isPaused ? 'invisible' : ''}`}>
        <div className="board-header card">
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          <span>Time left: {leftTime}</span>
          <button type="button" className="game-btn blue-btn" onClick={onPauseGame}>Pause</button>
        </div>
        <div className="board-body card">
          {this.getTiles()}
        </div>
      </div>
    );
  }
}

const ConnectedBoard = connectToStore(Board);

export default ConnectedBoard;
