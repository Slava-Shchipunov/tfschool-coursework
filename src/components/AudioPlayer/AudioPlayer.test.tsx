import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AudioPlayer } from './AudioPlayer';
import { playerReducers, setActiveSong } from 'store/player/player.slice';
import { configureStore } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { setCurrentSongs, tracksReducers } from 'store/tracks/tracks.slice';
import { instanceAxiosSpotify } from 'api/instancesOfAxios';

jest.mock('api/instancesOfAxios');

beforeEach(() => {
  type TOptions = {
    params: { ids: string };
  };

  (instanceAxiosSpotify.get as jest.Mock).mockImplementation(
    (_, options: TOptions) => {
      const urls = ['first-track-src', 'second-track-src', 'third-track-src'];
      const ids = Number(options.params.ids);
      const resp = {
        data: {
          tracks: [
            {
              preview_url: urls[ids],
            },
          ],
        },
      };
      return Promise.resolve(resp);
    }
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

const createNewStore = () => {
  return configureStore({
    reducer: {
      player: playerReducers,
      tracks: tracksReducers,
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
  const currentSongs = [
    {
      id: '0',
      name: 'First track',
      artists: ['artist11', 'artist12', 'artist13'],
      image: 'image-url1',
      src: 'first-track-src',
    },
    {
      id: '1',
      name: 'Second track',
      artists: ['artist21', 'artist22', 'artist23'],
      image: 'image-url2',
      src: 'second-track-src',
    },
    {
      id: '2',
      name: 'Third track',
      artists: ['artist31', 'artist32', 'artist33'],
      image: 'image-url3',
      src: 'third-track-src',
    },
  ];
  const obj = {
    currentIdx: 0,
    isActive: true,
    activeSong: {
      id: '0',
      name: 'First track',
      artists: ['artist1', 'artist2', 'artist3'],
      image: 'image-url',
      src: 'first-track-src',
    },
  };

  store.dispatch(setCurrentSongs(currentSongs));
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

  const playStub = jest
    .spyOn(window.HTMLMediaElement.prototype, 'play')
    .mockImplementation(() => {
      return Promise.resolve();
    });

  const pauseStub = jest
    .spyOn(window.HTMLMediaElement.prototype, 'pause')
    .mockImplementation(() => {
      return;
    });

  await waitFor(() => setTestState(store));

  expect(playStub).toBeCalledTimes(1);
  expect(pauseStub).toBeCalledTimes(1);
  /* ожидается количество вызовов playStub === 1 и pauseStub === 1, так как при вызове
    setTestState(store) происходит перерендер компонента Player и вызываются методы play() и
    pause() тега audio */

  fireEvent.click(screen.getByTestId('playPauseBtn'));
  expect(playStub).toBeCalledTimes(1);
  expect(pauseStub).toBeCalledTimes(2);

  fireEvent.click(screen.getByTestId('playPauseBtn'));
  expect(playStub).toBeCalledTimes(2);
  expect(pauseStub).toBeCalledTimes(2);

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
  expect(await screen.findByText('Second track')).toBeInTheDocument();
  expect(audioElement.src).toContain('second-track-src');

  fireEvent.click(screen.getByTestId('nextTrackBtn'));
  expect(await screen.findByText('Third track')).toBeInTheDocument();
  expect(audioElement.src).toContain('third-track-src');

  fireEvent.click(screen.getByTestId('nextTrackBtn'));
  expect(await screen.findByText('First track')).toBeInTheDocument();
  expect(audioElement.src).toContain('first-track-src');
});

test('should correctly change src when clicking on the PrevTrackBtn', async () => {
  const store = createNewStore();

  renderWithProvider(store);

  await waitFor(() => setTestState(store));

  const audioElement: HTMLAudioElement = screen.getByTestId('audio');
  expect(audioElement.src).toContain('first-track-src');

  fireEvent.click(screen.getByTestId('prevTrackBtn'));
  expect(await screen.findByText('Third track')).toBeInTheDocument();
  expect(audioElement.src).toContain('third-track-src');

  fireEvent.click(screen.getByTestId('prevTrackBtn'));
  expect(await screen.findByText('Second track')).toBeInTheDocument();
  expect(audioElement.src).toContain('second-track-src');

  fireEvent.click(screen.getByTestId('prevTrackBtn'));
  expect(await screen.findByText('First track')).toBeInTheDocument();
  expect(audioElement.src).toContain('first-track-src');
});

test('should loop playback when the RepeatTrackBtn is pressed', async () => {
  const store = createNewStore();

  renderWithProvider(store);

  await waitFor(() => setTestState(store));

  const audioElement: HTMLAudioElement = screen.getByTestId('audio');
  expect(audioElement.loop).toBe(false);

  fireEvent.click(screen.getByTestId('repeatTrackBtn'));
  await waitFor(() => expect(audioElement.loop).toBe(true));

  fireEvent.click(screen.getByTestId('repeatTrackBtn'));
  await waitFor(() => expect(audioElement.loop).toBe(false));
});

test('should use random track order when ShuffleTracksBtn is pressed', async () => {
  const store = createNewStore();

  renderWithProvider(store);

  await waitFor(() => setTestState(store));

  const random = jest.spyOn(global.Math, 'random');
  random.mockReturnValueOnce(0.9);

  const audioElement: HTMLAudioElement = screen.getByTestId('audio');
  expect(audioElement.src).toContain('first-track-src');
  fireEvent.click(screen.getByTestId('shuffleTracksBtn'));

  fireEvent.click(screen.getByTestId('nextTrackBtn'));
  expect(await screen.findByText('Third track')).toBeInTheDocument();
  expect(audioElement.src).toContain('third-track-src');

  random.mockReturnValueOnce(0.5);

  fireEvent.click(screen.getByTestId('nextTrackBtn'));
  expect(await screen.findByText('Second track')).toBeInTheDocument();
  expect(audioElement.src).toContain('second-track-src');

  random.mockReturnValueOnce(0.9);

  fireEvent.click(screen.getByTestId('prevTrackBtn'));
  expect(await screen.findByText('Third track')).toBeInTheDocument();
  expect(audioElement.src).toContain('third-track-src');

  random.mockReturnValueOnce(0.5);

  fireEvent.click(screen.getByTestId('prevTrackBtn'));
  expect(await screen.findByText('Second track')).toBeInTheDocument();
  expect(audioElement.src).toContain('second-track-src');
});

test('should change the volume when moving the VolumeBar slider', async () => {
  const store = createNewStore();

  renderWithProvider(store);

  await waitFor(() => setTestState(store));

  const audioElement: HTMLAudioElement = screen.getByTestId('audio');
  expect(audioElement.volume).toBe(0.7);

  fireEvent.change(screen.getByTestId('volumeBar'), {
    target: {
      value: '10',
    },
  });

  expect(await screen.findByText('10%')).toBeInTheDocument();
  expect(audioElement.volume).toBe(0.1);
});
