import React from 'react';
import { useDispatch } from 'react-redux';

import './tile.component.scss';
import { emoji } from '../../constants';
import { ITileData, updateTile } from '../../reducers/board.reducer';

type TileProps = {
  tileData: ITileData
};

function Tile({ tileData }: TileProps) {
  const dispatch = useDispatch();

  const classNames = `game-tile ${tileData.isOpened ? 'opened-tile' : ''}`;

  const onClick = () => {
    const updatedTileData = {
      ...tileData,
      isOpened: !tileData.isOpened,
    };

    dispatch(updateTile({ updatedTileData }));
  };

  return tileData.isEmpty
    ? <> </>
    : (
      <div className={classNames} role="button" tabIndex={0} onClick={onClick} onKeyUp={() => {}}>
        <svg viewBox="0 0 28 28">
          <text x="14" y="14" textAnchor="middle" alignmentBaseline="central">
            {
              tileData.isOpened
                ? emoji[tileData.code]
                : '?'
            }
          </text>
        </svg>
      </div>
    );
}

export default Tile;
