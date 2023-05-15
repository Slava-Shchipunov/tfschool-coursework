import { TTrack } from 'types/types';

type TShuffleResult = {
  shuffledArray: TTrack[];
  newCurrentIdx: number;
};

export const shuffle = (
  currentIdx: number,
  array: TTrack[]
): TShuffleResult => {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return {
    shuffledArray: shuffledArray,
    newCurrentIdx:
      shuffledArray.findIndex((el) => el.id === array[currentIdx].id) ?? 0,
  };
};
