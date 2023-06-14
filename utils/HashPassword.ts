import { genSaltSync, hashSync } from 'bcryptjs';

const salt = genSaltSync(10);

export const getHashedPassword = (password: string) => {
  const hashedPassword = hashSync(password, salt);
  return hashedPassword;
};
