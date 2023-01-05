import { EmploymentModel } from '../models/index';
import BaseRepository from './baseRepository';

class EmploymentRepository extends BaseRepository {}

export default new EmploymentRepository(EmploymentModel);
