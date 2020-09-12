import React, { createContext, useCallback, useContext, useState } from 'react';
import produce from 'immer';

import { TypeList, loadLists } from '../services/api';

interface BoardData {
  lists: TypeList[];
  move: (fromList: number, toList: number, from: number, to: number) => void;
}

const data = loadLists();

const BoardContext = createContext({} as BoardData);

export const BoardProvider: React.FC = ({ children }) => {
  const [lists, setLists] = useState(data);

  const move = useCallback(
    (fromList: number, toList: number, from: number, to: number) => {
      setLists(
        produce(lists, draft => {
          const dragged = draft[fromList].cards[from];

          draft[fromList].cards.splice(from, 1);
          draft[toList].cards.splice(to, 0, dragged);
        }),
      );
    },
    [lists],
  );

  return (
    <BoardContext.Provider value={{ lists, move }}>
      {children}
    </BoardContext.Provider>
  );
};

export function useBoard(): BoardData {
  const context = useContext(BoardContext);

  return context;
}
