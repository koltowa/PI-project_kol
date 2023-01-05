import { createToken } from '../../helpers/tokenHelper';
import { encrypt } from '../../helpers/cryptoHelper';
import userRepository from '../../data/repositories/userRepository';

export const login = async ({ id }) => ({
  token: createToken({ id }),
  user: await userRepository.getById(id)
});

export const register = async ({ password, ...userData }) => {
  const newUser = await userRepository.addUser({
    ...userData,
    passwordHash: await encrypt(password)
  });
  return login(newUser);
};
