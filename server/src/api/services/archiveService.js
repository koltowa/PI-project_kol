import archiveRepository from '../../data/repositories/archiveRepository';

export const getAllArchives = async regionId => archiveRepository.getAll(regionId);

export const create = async body => archiveRepository.create(body);
