export default models => {
  const {
    Area,
    Archive,
    User,
    Region,
    Locality,
    Notary,
    Organization,
    PhoneNumber,
    Contacts,
    Employment
  } = models;

  Archive.belongsTo(User, { foreignKey: { name: 'registratorId' } });

  Organization.hasMany(Employment);
  Organization.belongsTo(Contacts);

  Employment.belongsTo(Organization);

  Notary.belongsTo(Employment);
  Notary.belongsTo(Contacts);

  Contacts.hasMany(PhoneNumber);
  Contacts.belongsTo(Region);
  Contacts.belongsTo(Area);
  Contacts.belongsTo(Locality);

  Region.hasMany(Area);
  Area.belongsTo(Region);

  Area.hasMany(Locality);
  Locality.belongsTo(Area);
};
