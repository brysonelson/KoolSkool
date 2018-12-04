module.exports = function(sequelize, Sequelize) {
  var User = sequelize.define("user", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    use_mode: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "user"
    },
    personnel_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    status: {
      type: Sequelize.ENUM("active", "inactive"),
      defaultValue: "active"
    },
    resetPasswordToken: Sequelize.STRING,
    resetPasswordExpires: Sequelize.DATE
  });

  return User;
};
