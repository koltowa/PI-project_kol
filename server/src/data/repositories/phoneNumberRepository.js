import { PhoneNumberModel } from '../models/index';
import BaseRepository from './baseRepository';

class PhoneNumberRepository extends BaseRepository {
  deleteByContactId(contactId) {
    return this.model.destroy({
      where: { contactId }
    });
  }
}

export default new PhoneNumberRepository(PhoneNumberModel);
