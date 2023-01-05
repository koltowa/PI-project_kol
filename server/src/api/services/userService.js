import userRepository from '../../data/repositories/userRepository';

export const getUserById = async userId => userRepository.getById(userId);

export const getFilteredUsers = async ({ email: login, name }) => userRepository.getFilteredUsers(login, name);

export const blockUserById = async id => userRepository.changeIsActive(id, false);

export const unblockUserById = async id => userRepository.changeIsActive(id, true);

export const deleteUserById = async id => userRepository.deleteById(id);
