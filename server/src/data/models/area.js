export default (orm, DataTypes) => {
  const Area = orm.define('area', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});

  return Area;
};
