import { render, screen } from '@testing-library/react';
import { SongCard } from './SongCard';
import { Provider } from 'react-redux';
import { playerReducers } from 'store/player/player.slice';
import { configureStore } from '@reduxjs/toolkit';
import { tracksReducers } from 'store/tracks/tracks.slice';

const props = {
  trackId: '1',
  imgUrl: 'https://i.scdn.co/image/ab67616d0000b273ec182939cba3386ddcb93069',
  artist: 'IMAGINE DRAGON',
  title: 'Wrecked',
  isSmall: true,
};

const createNewStore = () => {
  return configureStore({
    reducer: {
      player: playerReducers,
      tracks: tracksReducers,
    },
  });
};

test('renders SongCard component', () => {
  const store = createNewStore();
  render(
    <Provider store={store}>
      <SongCard {...props} />
    </Provider>
  );
  const title = screen.getByText(props.title);
  const artist = screen.getByText(props.artist);
  expect(title).toBeInTheDocument();
  expect(artist).toBeInTheDocument();
});
