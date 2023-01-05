export default (orm, DataTypes) => {
  const Notary = orm.define('notary', {
    firstName: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    lastName: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    middleName: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    certificateNumber: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    isPrivate: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    createdAt: DataTypes.DATE
  }, {});

  return Notary;
};
