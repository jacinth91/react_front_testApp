export const checkValidData = (email: string, password: string) => {
  const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  console.log(isEmailValid);
  const isPassValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()]).{8,}$/.test(password);
  console.log(isPassValid);
  if (!isEmailValid) {
    return 'Email not valid !';
  }
  if (!isPassValid) {
    return 'Password not valid !';
  }
  return null;
};
