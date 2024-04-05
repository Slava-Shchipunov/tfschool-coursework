type TStates = {
  [key: string]: React.Dispatch<React.SetStateAction<string>>;
};

type TErrors = {
  [key: string]: React.Dispatch<React.SetStateAction<string | null>>;
};

type TPatterns = {
  [key: string]: RegExp;
};

export const validateInput = (
  states: TStates,
  errors: TErrors,
  patterns: TPatterns
) => {
  return (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string,
    minLength?: number
  ) => {
    const id = event.target.id;
    const value = event.target.value;

    states[id as keyof typeof states](value);

    if (!value) {
      const message = `${type} is required`;
      errors[id as keyof typeof states](message);
      return;
    }

    if (!patterns[type].test(value)) {
      const message =
        type === 'Email'
          ? 'Email is not valid'
          : 'Only numbers and latin letters are allowed';

      errors[id as keyof typeof states](message);
      return;
    }

    if (minLength && value.length < minLength) {
      const message = `${type} should be at-least ${minLength} characters`;
      errors[id as keyof typeof states](message);
      return;
    }

    const message = null;
    errors[id as keyof typeof states](message);
    return;
  };
};
