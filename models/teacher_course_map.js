
module.exports = function(sequelize, DataTypes) {
  var TeacherCourse = sequelize.define(
    "teacher_course_maps",
    {
      teacher_type_descr: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
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

  TeacherCourse.associate = function(models) {
    models.Personnel.belongsToMany(models.Course, {
      as: "Teachers",
      through: "teacher_course_maps",
      foreignKey: "personnel_id"
    });
    models.Course.belongsToMany(models.Personnel, {
      as: "Course_Taught",
      through: "teacher_course_maps",
      foreignKey: "course_id"
    });
  };
  return TeacherCourse;
};
