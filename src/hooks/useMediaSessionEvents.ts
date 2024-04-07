import { useEffect } from 'react';

type ActionHandler = {
  action: MediaSessionAction;
  handler: MediaSessionActionHandler | null;
};

type useMediaSessionEventsProps = Record<string, MediaSessionActionHandler>;

/** Хук, позволяющий управлять воспроизведением аудио через media keys на клавиатуре или в мультимедийных уведомлениях */
export const useMediaSessionEvents = ({
  playPauseTrack,
  prevTrack,
  nextTrack,
}: useMediaSessionEventsProps) => {
  useEffect(() => {
    const actionHandlers: ActionHandler[] = [
      {
        action: 'play',
        handler: playPauseTrack,
      },
      {
        action: 'pause',
        handler: playPauseTrack,
      },
      {
        action: 'previoustrack',
        handler: prevTrack,
      },
      {
        action: 'nexttrack',
        handler: nextTrack,
      },
    ];

    for (const { action, handler } of actionHandlers) {
      try {
        navigator.mediaSession.setActionHandler(action, handler);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(
          `The media session action "${action}" is not supported yet.`
        );
      }
    }
  }, [playPauseTrack, prevTrack, nextTrack]);
};
