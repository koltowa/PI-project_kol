import { LocalityModel } from '../models/index';
import BaseRepository from './baseRepository';

class AreaRepository extends BaseRepository {
  getByAreaId(areaId) {
    return this.model.findAll({ where: { areaId } });
  }
}

export default new AreaRepository(LocalityModel);
