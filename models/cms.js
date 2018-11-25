module.exports = function (sequelize, DataTypes) {
  var cms_example = sequelize.define("cms_example", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return cms_example;
};
