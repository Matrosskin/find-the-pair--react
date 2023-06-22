import React from 'react';
import { useDispatch } from 'react-redux';

import './tile.component.scss';
import { ITileData, updateTile } from '../../reducers/board.reducer';

type TileProps = {
  tileData: ITileData
};

function Tile({ tileData }: TileProps) {
  const dispatch = useDispatch();

  const classNames = `game-tile ${tileData.isOpened ? 'opened-tile' : ''}`;

  const onClick = () => {
    if (tileData.isOpened) {
      return;
    }

    const updatedTileData = {
      ...tileData,
      isOpened: true,
    };

    dispatch(updateTile({ updatedTileData }));
  };

  const onKeyDown = (event: { code: string }) => {
    if (event.code === 'Enter' || event.code === 'Space') {
      onClick();
    }
  };

  return tileData.isEmpty
    ? <> </>
    : (
      <div
        className={classNames}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        <svg viewBox="0 0 28 28">
          <text x="14" y="20" textAnchor="middle">
            {
              tileData.isOpened
                ? tileData.emoji
                : '?'
            }
          </text>
        </svg>
      </div>
    );
}

export default Tile;
