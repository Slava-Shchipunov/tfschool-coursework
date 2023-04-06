import { render, screen } from '@testing-library/react';
import { SongCard } from './SongCard';

const props = {
  imgUrl: 'https://i.scdn.co/image/ab67616d0000b273ec182939cba3386ddcb93069',
  artist: 'IMAGINE DRAGON',
  title: 'Wrecked',
  isSmall: true,
};

test('renders SongCard component', () => {
  render(<SongCard {...props} />);
  const title = screen.getByText(props.title);
  const artist = screen.getByText(props.artist);
  expect(title).toBeInTheDocument();
  expect(artist).toBeInTheDocument();
});
