export const convertUserError = (errorMessage: string) => {
  const re = /.*?\/([^)]*)\).*/;
  const errorTextArray = re.exec(errorMessage); //errorMessage.match(re);

  let errorText = errorMessage;
  if (errorTextArray) {
    errorText =
      errorTextArray[1].charAt(0).toUpperCase() +
      errorTextArray[1].replaceAll('-', ' ').slice(1);
  }

  return errorText;
};
