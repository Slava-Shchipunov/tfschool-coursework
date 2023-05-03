import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AudioPlayer } from './AudioPlayer';
import { playerReducers, setActiveSong } from 'store/player/player.slice';
import { configureStore } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

const createNewStore = () => {
  return configureStore({
    reducer: {
      player: playerReducers,
    },
  });
};

const renderWithProvider = (store: ToolkitStore) => {
  render(
    <Provider store={store}>
      <AudioPlayer />
    </Provider>
  );

  jest
    .spyOn(window.HTMLMediaElement.prototype, 'play')
    .mockImplementation(() => {
      return Promise.resolve();
    });

  jest
    .spyOn(window.HTMLMediaElement.prototype, 'pause')
    .mockImplementation(() => {
      return;
    });
};

const setTestState = (store: ToolkitStore): void => {
  const obj = {
    currentSongs: [
      {
        name: 'First track',
        src: 'first-track-src',
      },
      {
        name: 'Second  track',
        src: 'second-track-src',
      },
      {
        name: 'Third track',
        src: 'third-track-src',
      },
    ],
    currentIdx: 0,
    isActive: true,
    activeSong: {
      name: 'First track',
      src: 'first-track-src',
    },
  };

  store.dispatch(setActiveSong(obj));
};

test('should render all AudioPlayer component', () => {
  const store = createNewStore();

  render(
    <Provider store={store}>
      <AudioPlayer />
    </Provider>
  );

  expect(screen.getByTestId('audio')).toBeInTheDocument();
  expect(screen.getByTestId('playPauseBtn')).toBeInTheDocument();
  expect(screen.getByTestId('nextTrackBtn')).toBeInTheDocument();
  expect(screen.getByTestId('prevTrackBtn')).toBeInTheDocument();
  expect(screen.getByTestId('currentTime')).toBeInTheDocument();
  expect(screen.getByTestId('totalDuration')).toBeInTheDocument();
  expect(screen.getByTestId('seekbar')).toBeInTheDocument();
});

test('should call the HTMLAudioElement play() and pause() methods when the playPauseBtn is clicked', async () => {
  const store = createNewStore();

  render(
    <Provider store={store}>
      <AudioPlayer />
    </Provider>
  );

  let countPauseCalls = 0;

  const playStub = jest
    .spyOn(window.HTMLMediaElement.prototype, 'play')
    .mockImplementation(() => {
      return Promise.resolve();
    });

  const pauseStub = jest
    .spyOn(window.HTMLMediaElement.prototype, 'pause')
    .mockImplementation(() => {
      countPauseCalls += 1;
      return;
    });

  await waitFor(() => setTestState(store));

  expect(playStub).not.toHaveBeenCalled();
  expect(countPauseCalls).toBe(1);
  /* ожидается countPauseCalls === 1, так как при вызове setTestState(store) происходит
    перерендер компонента Player и вызывается метод pause() тега audio */

  fireEvent.click(screen.getByTestId('playPauseBtn'));
  expect(playStub).toHaveBeenCalled();
  expect(countPauseCalls).toBe(1);

  fireEvent.click(screen.getByTestId('playPauseBtn'));
  expect(countPauseCalls).toBe(2);

  playStub.mockRestore();
  pauseStub.mockRestore();
});

test('should correctly change src when clicking on the NextTrackBtn', async () => {
  const store = createNewStore();

  renderWithProvider(store);

  await waitFor(() => setTestState(store));

  const audioElement: HTMLAudioElement = screen.getByTestId('audio');
  expect(audioElement.src).toContain('first-track-src');

  fireEvent.click(screen.getByTestId('nextTrackBtn'));
  expect(audioElement.src).toContain('second-track-src');

  fireEvent.click(screen.getByTestId('nextTrackBtn'));
  expect(audioElement.src).toContain('third-track-src');

  fireEvent.click(screen.getByTestId('nextTrackBtn'));
  expect(audioElement.src).toContain('first-track-src');
});

test('should correctly change src when clicking on the PrevTrackBtn', async () => {
  const store = createNewStore();

  renderWithProvider(store);

  await waitFor(() => setTestState(store));

  const audioElement: HTMLAudioElement = screen.getByTestId('audio');
  expect(audioElement.src).toContain('first-track-src');

  fireEvent.click(screen.getByTestId('prevTrackBtn'));
  expect(audioElement.src).toContain('third-track-src');

  fireEvent.click(screen.getByTestId('prevTrackBtn'));
  expect(audioElement.src).toContain('second-track-src');

  fireEvent.click(screen.getByTestId('prevTrackBtn'));
  expect(audioElement.src).toContain('first-track-src');
});
