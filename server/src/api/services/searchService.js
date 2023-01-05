import organizationRepository from '../../data/repositories/organizationRepository';
import notaryRepository from '../../data/repositories/notaryRepository';

export const searchOrganizationsByAddress = async ({
  getOrganizations,
  getNotaries,
  regionId,
  areaId,
  localityId,
  address
}) => {
  const getBoth = getOrganizations === getNotaries;
  if (getOrganizations || getBoth) {
    return organizationRepository.getOrganizationsByAddress(
      regionId,
      areaId,
      localityId,
      address
    );
  }
  return [];
};

export const searchNotariesByAddress = async ({
  getOrganizations,
  getNotaries,
  regionId,
  areaId,
  localityId,
  address
}) => {
  const getBoth = getOrganizations === getNotaries;
  if (getNotaries || getBoth) {
    return notaryRepository.getNotariesByAddress(
      regionId,
      areaId,
      localityId,
      address
    );
  }
  return [];
};

export const searchOrganizationsByName = async name => organizationRepository.getOrganizationsByName(name);

export const searchNotariesByName = async ({ firstName, middleName, lastName, certificateNumber }) => notaryRepository
  .getNotariesByName(firstName, middleName, lastName, certificateNumber);
