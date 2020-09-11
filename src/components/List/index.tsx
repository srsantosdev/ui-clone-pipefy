import React from 'react';
import { MdAdd } from 'react-icons/md';

import Card from '../Card';

import { Container } from './styles';

interface ListProps {
  data: any;
}

const List: React.FC<ListProps> = ({ data }) => {
  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>

        {data.creatable && (
          <button type="button">
            <MdAdd size={24} color="#fff" />
          </button>
        )}
      </header>

      <ul>
        {data.cards.map((card: any) => (
          <Card key={card.id} data={card} />
        ))}
      </ul>
    </Container>
  );
};

export default List;
