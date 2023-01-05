import regionRepository from '../../data/repositories/regionRepository';

export const getAll = async () => regionRepository.getAll();

export const create = async body => regionRepository.create(body);
