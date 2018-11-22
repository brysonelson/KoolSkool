module.exports = function(sequelize, DataTypes) {
  var Schedule = sequelize.define(
    "Schedule",
    {
      /*************************************************************************/
      /* Course Schedule Date Definition and Usage Example:
      /  Required, without null value
      /  the date must fall after the 11/1/2018. 
      /*************************************************************************/
      schedule_dttm: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          isAfter: "2018-11-01"
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
      /* disable the modification of table names; By default, sequelize will 
      /* automatically transform all passed model names (first parameter of 
      /* define) into plural. if you don't want that, set the following
      /* freezeTableName: true,

      /*************************************************************************/

      /*************************************************************************/
      /* don't use camelcase for automatically added attributes but underscore
      /  style so updatedAt will be updated_at
      /*************************************************************************/
      underscored: true
    }
  );

  Schedule.associate = function(models) {
    /*************************************************************************/
    /* Cass ID and Classroom ID is Foreign Key in Attendence Table
    /  The field is required.  It can not be null.
    /  An course schedule record can not be created without both the course and 
    /  classroom records due to the foreign key constraint.
    /  We're saying that the schedule record should belong to a course and 
    /  to a classroom.
    /*************************************************************************/
    Schedule.belongsTo(models.Course, {
      foreignKey: {
        allowNull: false
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });

    Schedule.belongsTo(models.Classrooms, {
      foreignKey: {
        allowNull: false
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });
  };

  return Schedule;
};
