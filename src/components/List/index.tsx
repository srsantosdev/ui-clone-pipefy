import React from 'react';
import { MdAdd } from 'react-icons/md';
import { TypeList } from '../../services/api';

import Card from '../Card';

import { Container } from './styles';

interface ListProps {
  data: TypeList;
  index: number;
}

const List: React.FC<ListProps> = ({ data, index: listIndex }) => {
  return (
    <Container done={!!data.done}>
      <header>
        <h2>{data.title}</h2>

        {data.creatable && (
          <button type="button">
            <MdAdd size={24} color="#fff" />
          </button>
        )}
      </header>

      <ul>
        {data.cards.map((card, index) => (
          <Card key={card.id} data={card} index={index} listIndex={listIndex} />
        ))}
      </ul>
    </Container>
  );
};

export default List;
