export default (orm, DataTypes) => {
  const User = orm.define('user', {
    role: {
      allowNull: false,
      type: DataTypes.STRING
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    middleName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    login: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    passwordHash: {
      allowNull: false,
      type: DataTypes.STRING
    },
    birthday: {
      allowNull: false,
      type: DataTypes.DATE
    },
    passportSeria: DataTypes.STRING,
    passportNumber: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    ITN: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    isActive: {
      defaultValue: true,
      allowNull: false,
      type: DataTypes.BOOLEAN
    }
  }, {});

  return User;
};
