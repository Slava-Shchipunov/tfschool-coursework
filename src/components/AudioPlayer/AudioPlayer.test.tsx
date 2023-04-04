import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { AudioPlayer } from './AudioPlayer';

test('renders AudioPlayer component', () => {
  render(
    <Provider store={store}>
      <AudioPlayer />
    </Provider>
  );
  const audioElement = screen.getByTestId('audio');
  expect(audioElement).toBeInTheDocument();

  const playPauseBtn = screen.getByTestId('playPauseBtn');
  expect(playPauseBtn).toBeInTheDocument();
});
