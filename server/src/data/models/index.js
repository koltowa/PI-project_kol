import orm from '../db/connection';
import associate from '../db/associations';

const User = orm.import('./user');
const Area = orm.import('./area');
const Region = orm.import('./region');
const Locality = orm.import('./locality');
const Notary = orm.import('./notary');
const Organization = orm.import('./organization');
const PhoneNumber = orm.import('./phoneNumber');
const Contacts = orm.import('./contacts');
const Employment = orm.import('./employment');
const Archive = orm.import('./archive');

associate({
  User,
  Area,
  Archive,
  Region,
  Locality,
  Notary,
  Organization,
  PhoneNumber,
  Contacts,
  Employment
});

export {
  User as UserModel,
  Area as AreaModel,
  Archive as ArchiveModel,
  Region as RegionModel,
  Locality as LocalityModel,
  Notary as NotaryModel,
  Organization as OrganizationModel,
  PhoneNumber as PhoneNumberModel,
  Contacts as ContactsModel,
  Employment as EmploymentModel
};
