import { genSaltSync, hashSync, setRandomFallback } from 'bcryptjs';

setRandomFallback((len: number) => {
  const buf = new Uint8Array(len);
  return Array.from(buf.map(() => Math.floor(Math.random() * 256)));
});

const salt = genSaltSync(10);

export const getHashedPassword = (password: string) => {
  const hashedPassword = hashSync(password, salt);
  return hashedPassword;
};
