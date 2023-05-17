import classNames from 'classnames/bind';
import styles from './style.module.css';
import { memo } from 'react';
import { PrevTrackBtn } from '../controls/PrevTrackBtn';
import { PlayPauseBtn } from '../controls/PlayPauseBtn';
import { NextTrackBtn } from '../controls/NextTrackBtn';
import { TTrack } from 'types/types';

const className = classNames.bind(styles);

type TMiniAudioPlayer = {
  activeSong: TTrack | null;
  isPlay: boolean;
  isPlayerHidden: boolean;
  nextTrack: () => void;
  prevTrack: () => void;
  playPauseTrack: () => void;
  handleClickToSwitchPlayer: () => void;
};

export const MiniAudioPlayerComponent = (props: TMiniAudioPlayer) => {
  const {
    activeSong,
    isPlay,
    isPlayerHidden,
    nextTrack,
    prevTrack,
    playPauseTrack,
    handleClickToSwitchPlayer,
  } = props;
  return (
    <div className={className('container', { hidden: !isPlayerHidden })}>
      <div
        className={className('track-info')}
        onClick={handleClickToSwitchPlayer}
      >
        <img
          className={className('art')}
          src={activeSong?.image}
          alt="Track cover"
          width={67}
          height={67}
        />
        <div className={className('title-wrapper')}>
          <div className={className('title')}>{activeSong?.name}</div>{' '}
          <div className={className('artist')}>{activeSong?.artists}</div>{' '}
        </div>
      </div>
      <div className={className('buttons')}>
        <PrevTrackBtn prevTrack={prevTrack} width="25px" height="25px" />
        <PlayPauseBtn
          isPlay={isPlay}
          playPauseTrack={playPauseTrack}
          width="25px"
          height="25px"
        />
        <NextTrackBtn nextTrack={nextTrack} width="25px" height="25px" />
      </div>
    </div>
  );
};

export const MiniAudioPlayer = memo(MiniAudioPlayerComponent);
