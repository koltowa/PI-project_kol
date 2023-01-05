import areaRepository from '../../data/repositories/areaRepository';

export const getByRegionId = async regionId => areaRepository.getByRegionId(regionId);

export const create = async body => areaRepository.create(body);
