import { RegionModel } from '../models/index';
import BaseRepository from './baseRepository';

class RegionRepository extends BaseRepository {}

export default new RegionRepository(RegionModel);
