import { ArchiveModel, UserModel } from '../models/index';
import BaseRepository from './baseRepository';

class ArchiveRepository extends BaseRepository {
  getAll() {
    return this.model.findAll({
      include: [{
        model: UserModel,
        attributes: ['firstName', 'middleName', 'lastName', 'login']
      }]
    });
  }
}

export default new ArchiveRepository(ArchiveModel);
