import Sequelize from 'sequelize';
import { UserModel } from '../models/index';
import BaseRepository from './baseRepository';

const { Op } = Sequelize;

class UserRepository extends BaseRepository {
  addUser(user) {
    return this.create(user);
  }

  getByEmail(login) {
    return this.model.findOne({ where: { login } });
  }

  changeIsActive(id, value) {
    return this.updateById(id, { isActive: value });
  }

  getFilteredUsers(email, name) {
    const fields = ['firstName', 'middleName', 'lastName'];
    const nameParts = name.split(' ').filter(part => !!part);
    const options = [];

    fields.forEach(field => {
      nameParts.forEach(part => {
        options.push({
          [field]: {
            [Op.iLike]: `%${part}%`
          }
        });
      });
    });

    return this.model.findAll({
      where: {
        [Op.or]: [{
          login: {
            [Op.iLike]: `%${email}%`
          }
        },
        ...options
        ]
      }
    });
  }
}

export default new UserRepository(UserModel);
