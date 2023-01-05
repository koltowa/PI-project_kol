export default (orm, DataTypes) => {
  const Archive = orm.define('archive', {
    documentCode: {
      allowNull: false,
      type: DataTypes.STRING
    },
    date: {
      allowNull: false,
      type: DataTypes.DATE
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});

  return Archive;
};
