import organizationRepository from '../../data/repositories/organizationRepository';

export const create = async body => organizationRepository.create(body);

export const getOrganizationById = async id => organizationRepository.getOrganizationById(id);

export const updateOrganizationById = async (id, data) => organizationRepository.updateById(id, data);

export const deleteOrganizationById = async id => organizationRepository.deleteById(id);
