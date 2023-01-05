import phoneNumberRepository from '../../data/repositories/phoneNumberRepository';

export const create = async body => phoneNumberRepository.create(body);

export const createAll = async (phoneNumbers, contact) => {
  const isArray = Array.isArray(phoneNumbers);
  if (isArray) {
    phoneNumbers.forEach(phoneNumber => create({ phoneNumber, contactId: contact.id }));
  } else {
    create({ phoneNumber: phoneNumbers, contactId: contact.id });
  }
  return contact;
};

export const deleteByContactId = async contactId => phoneNumberRepository.deleteByContactId(contactId);
