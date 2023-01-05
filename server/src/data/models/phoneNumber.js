export default (orm, DataTypes) => {
  const PhoneNumber = orm.define('phoneNumber', {
    phoneNumber: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {});

  return PhoneNumber;
};
