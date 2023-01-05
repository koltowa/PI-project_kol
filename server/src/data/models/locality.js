export default (orm, DataTypes) => {
  const Locality = orm.define('locality', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});

  return Locality;
};
