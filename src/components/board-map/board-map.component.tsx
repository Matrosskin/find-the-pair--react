import React from 'react';
import { useSelector } from 'react-redux';

import './board-map.component.scss';
import Tile from '../tile/tile.component';
import { mapSizeSelector } from '../../selectors';

function BoardMap() {
  const mapSize = useSelector(mapSizeSelector);

  return (
    <div className="board-body card">
      {
        Array(mapSize).fill(0).map((_, lineInd) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={lineInd} className="board-line">
            {
              Array(mapSize).fill(0).map((__, colInd) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={colInd} className="board-cell">
                  <Tile tileIndex={mapSize * lineInd + colInd} />
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  );
}

export default BoardMap;
