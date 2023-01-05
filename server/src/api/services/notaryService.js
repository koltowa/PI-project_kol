import notaryRepository from '../../data/repositories/notaryRepository';

export const getAllNotaries = async () => notaryRepository.getAll();

export const getNotaryById = async id => notaryRepository.getById(id);

export const create = async body => notaryRepository.create(body);

export const updateNotaryById = async (id, body) => notaryRepository.updateById(id, body);

export const deleteNotaryById = async id => notaryRepository.deleteById(id);
