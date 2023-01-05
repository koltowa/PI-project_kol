import { AreaModel } from '../models/index';
import BaseRepository from './baseRepository';

class AreaRepository extends BaseRepository {
  getByRegionId(regionId) {
    return this.model.findAll({ where: { regionId } });
  }
}

export default new AreaRepository(AreaModel);
