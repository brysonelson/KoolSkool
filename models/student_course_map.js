
module.exports = function(sequelize, DataTypes) {
  var StudentCourse = sequelize.define(
    "student_course_map",
    {
      status: {
        type: DataTypes.STRING,
        allowNull: true
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
      as: "Students",
      through: "student_course_map",
      foreignKey: "student_id"
    });
    models.Course.belongsToMany(models.Students, {
      as: "Course_Enrolled",
      through: "student_course_map",
      foreignKey: "course_id"
    });
  };
  return StudentCourse;
};
