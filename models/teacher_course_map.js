
module.exports = function(sequelize, DataTypes) {
  var TeacherCourse = sequelize.define(
    "teacher_course_map",
    {
      /*************************************************************************/
      /* Teacher Type Description Definition and Usage Example:
      /  Required, length no greater than 10 chars
      /  Example:  Teacher, TA, Volunteer
      /*************************************************************************/
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      teacher_type_descr: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 15]
        }
      },
      /*************************************************************************/
      /* Status Definition and Usage Example:
      /  Required, length no greater than 10 chars
      /  Example:  Not Started, Dropped, Active, Complete 
      /*************************************************************************/
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

  TeacherCourse.associate = function(models) {
    models.Personnel.belongsToMany(models.Course, {
      as: "course_taught",
      through: {model: TeacherCourse, unique: false},
      through: "teacher_course_map",
      foreignKey: "personnel_id"
    });
    models.Course.belongsToMany(models.Personnel, {
      as: "teachers",
      through: {model: TeacherCourse, unique: false},
      foreignKey: "course_id"
    });
  };
  return TeacherCourse;
};
