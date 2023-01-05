export default (orm, DataTypes) => {
  const Employment = orm.define('employment', {
    position: {
      allowNull: false,
      type: DataTypes.STRING
    },
    dateFrom: DataTypes.DATE,
    dateTo: DataTypes.DATE
  }, {});

  return Employment;
};
