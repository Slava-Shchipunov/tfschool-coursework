import { FirebaseError } from '@firebase/util';
import axios from 'axios';
import { convertFirebaseError } from 'utils/convertFirebaseError';

type TErrorResponse = {
  statusCode?: string;
  message: string;
};

export const handleError = (error: unknown): TErrorResponse => {
  if (error instanceof FirebaseError) {
    return {
      statusCode: error.code,
      message: convertFirebaseError(error.message),
    };
  }

  if (axios.isAxiosError(error)) {
    return {
      statusCode: error.code,
      message: error.message,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: 'Bad request',
  };
};
