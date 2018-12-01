
module.exports = function(sequelize, DataTypes) {
  var StudentCourse = sequelize.define(
    "student_course_map",
    {
      /*************************************************************************/
      /* Status Definition and Usage Example:
      /  Required, length no greater than 10 chars
      /  Example:  Not Started, Dropped, Suspended, Moved, Active, Complete 
      /*************************************************************************/
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 15]
        }
      }
    },
    {
      /*************************************************************************/
      /* Table Configuration Options:
      /*
      /* don't delete database entries but set the newly added attribute 
      /* deletedAt to the current date (when deletion was done). paranoid will 
      /* only work if timestamps are enabled
      /* paranoid: true,
      /* 
      /* define the table's name
      /* tableName: 'my_very_custom_table_name',
      /* 
      /*************************************************************************/

      /*************************************************************************/
      /* disable the modification of table names; By default, sequelize will 
      /* automatically transform all passed model names (first parameter of 
      /* define) into plural. if you don't want that, set the following

      /* don't use camelcase for automatically added attributes but underscore
      /  style so updatedAt will be updated_at
      /*************************************************************************/
      freezeTableName: true,
      underscored: true
    }
  );

  StudentCourse.associate = function(models) {
    models.Students.belongsToMany(models.Course, {
      as: "course_enrolled",
      through: {model: StudentCourse, unique: false},
      foreignKey: "student_id"
    });
    models.Course.belongsToMany(models.Students, {
      as: "course_students",
      through: {model: StudentCourse, unique: false},
      foreignKey: "course_id"
    });
  };
  return StudentCourse;
};
