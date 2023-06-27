import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './tile.component.scss';
import { openTileTemporary } from '../../reducers/board.reducer';
import { IGameStore } from '../../store.interface';

type TileProps = {
  tileIndex: number,
};

function Tile({ tileIndex }: TileProps) {
  const tileData = useSelector((store: IGameStore) => store.board[tileIndex]);
  const dispatch = useDispatch();

  const isTileOpened = tileData.isOpened || tileData.isTemporaryOpened;

  const classNames = `game-tile ${isTileOpened ? 'opened-tile' : ''}`;

  const onClick = () => {
    dispatch(openTileTemporary(tileData.id));
  };

  return tileData.isEmpty
    ? null
    : (
      <button
        type="button"
        className={classNames}
        onClick={onClick}
        disabled={isTileOpened}
      >
        <svg viewBox="0 0 28 28">
          <text x="14" y="20" textAnchor="middle">
            {
              isTileOpened
                ? tileData.emoji
                : '?'
            }
          </text>
        </svg>
      </button>
    );
}

export default Tile;
