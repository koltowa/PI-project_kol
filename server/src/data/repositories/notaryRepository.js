import Sequelize from 'sequelize';
import {
  NotaryModel,
  ContactsModel,
  RegionModel,
  AreaModel,
  LocalityModel,
  PhoneNumberModel,
  EmploymentModel,
  OrganizationModel
} from '../models/index';
import BaseRepository from './baseRepository';

const { Op } = Sequelize;

class NotaryRepository extends BaseRepository {
  getById(id) {
    return this.model.findOne({
      where: { id },
      attributes: {
        exclude: ['contactId', 'employmentId']
      },
      include: [{
        model: ContactsModel,
        attributes: {
          exclude: ['areaId', 'regionId', 'localityId']
        },
        include: [RegionModel, AreaModel, LocalityModel, PhoneNumberModel]
      }, {
        model: EmploymentModel,
        attributes: {
          exclude: ['organizationId']
        },
        include: [{
          model: OrganizationModel,
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
        }]
      }]
    });
  }

  getNotariesByName(firstName, middleName, lastName, certificateNumber) {
    return this.model.findAll({
      where: {
        [Op.and]: [{
          ...(firstName && {
            firstName: {
              [Op.iLike]: `%${firstName}%`
            }
          }),
          ...(middleName && {
            middleName: {
              [Op.iLike]: `%${middleName}%`
            }
          }),
          ...(lastName && {
            lastName: {
              [Op.iLike]: `%${lastName}%`
            }
          }),
          ...(certificateNumber && {
            certificateNumber: {
              [Op.iLike]: `%${certificateNumber}%`
            }
          })
        }]
      },
      attributes: {
        exclude: ['contactId', 'employmentId']
      },
      include: [{
        model: ContactsModel,
        attributes: {
          exclude: ['areaId', 'regionId', 'localityId']
        },
        include: [RegionModel, AreaModel, LocalityModel, PhoneNumberModel]
      }, {
        model: EmploymentModel,
        attributes: {
          exclude: ['organizationId']
        },
        include: [{
          model: OrganizationModel,
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
        }]
      }]
    });
  }

  getNotariesByAddress(regionId, areaId, localityId, address = '') {
    return this.model.findAll({
      attributes: {
        exclude: ['contactId', 'employmentId']
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
      }, {
        model: EmploymentModel,
        attributes: {
          exclude: ['organizationId']
        },
        include: [{
          model: OrganizationModel,
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
        }]
      }]
    });
  }
}

export default new NotaryRepository(NotaryModel);
