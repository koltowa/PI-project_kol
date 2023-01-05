export default (orm, DataTypes) => {
  const Organization = orm.define('organization', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});

  return Organization;
};
