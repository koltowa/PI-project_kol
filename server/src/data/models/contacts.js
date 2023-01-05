export default (orm, DataTypes) => {
  const Contacts = orm.define('contacts', {
    address: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});

  return Contacts;
};
