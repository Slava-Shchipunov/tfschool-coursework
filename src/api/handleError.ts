import { FirebaseError } from '@firebase/util';

type TErrorResponse = {
  statusCode?: string;
  message: string;
};

export const handleError = (error: unknown): TErrorResponse => {
  if (error instanceof FirebaseError) {
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
