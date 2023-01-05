import contactsRepository from '../../data/repositories/contactsRepository';
import * as phoneNumberService from './phoneNumberService';

export const create = async body => contactsRepository.create(body);

export const updateContacts = async (contact, body) => {
  const { phoneNumbers } = body;

  if (phoneNumbers) {
    phoneNumberService.deleteByContactId(contact.id);
    phoneNumberService.createAll(phoneNumbers, contact);
  }

  return contactsRepository.updateById(contact.id, body);
};
