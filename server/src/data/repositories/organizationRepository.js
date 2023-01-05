import Sequelize from 'sequelize';
import { OrganizationModel, ContactsModel, AreaModel, RegionModel, LocalityModel, PhoneNumberModel } from '../models';
import BaseRepository from './baseRepository';

const { Op } = Sequelize;

class OrganizationRepository extends BaseRepository {
  getOrganizationById(id) {
    return this.model.findOne({
      where: { id },
      attributes: {
        exclude: ['contactId']
      },
      include: [{
        model: ContactsModel,
        attributes: {
          exclude: ['areaId', 'regionId', 'localityId']
        },
        include: [RegionModel, AreaModel, LocalityModel, PhoneNumberModel]
      }]
    });
  }

  getOrganizationsByName(name = '') {
    return this.model.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      },
      attributes: {
        exclude: ['contactId']
      },
      include: [{
        model: ContactsModel,
        attributes: {
          exclude: ['areaId', 'regionId', 'localityId']
        },
        include: [RegionModel, AreaModel, LocalityModel, PhoneNumberModel]
      }]
    });
  }

  getOrganizationsByAddress(regionId, areaId, localityId, address = '') {
    return this.model.findAll({
      attributes: {
        exclude: ['contactId']
      },
      include: [{
        model: ContactsModel,
        where: {
          ...(regionId && {
            regionId
          }),
          ...(areaId && {
            areaId
          }),
          ...(localityId && {
            localityId
          }),
          address: {
            [Op.iLike]: `%${address}%`
          }
        },
        attributes: {
          exclude: ['areaId', 'regionId', 'localityId']
        },
        include: [RegionModel, AreaModel, LocalityModel, PhoneNumberModel]
      }]
    });
  }
}

export default new OrganizationRepository(OrganizationModel);
