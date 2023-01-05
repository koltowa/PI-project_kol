import { ContactsModel } from '../models/index';
import BaseRepository from './baseRepository';

class ContactsRepository extends BaseRepository {}

export default new ContactsRepository(ContactsModel);
