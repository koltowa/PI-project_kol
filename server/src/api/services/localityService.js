import localityRepository from '../../data/repositories/localityRepository';

export const getByAreaId = async areaId => localityRepository.getByAreaId(areaId);

export const create = async body => localityRepository.create(body);
