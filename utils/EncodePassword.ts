import { Base64 } from 'js-base64';

export const getEncodedPassword = (password: string) => {
  const encodedPassword = Base64.encode(password);
  return encodedPassword;
};
