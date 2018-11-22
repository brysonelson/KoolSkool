module.exports = function(sequelize, DataTypes) {
  var Course = sequelize.define(
    "Course",
    {
      /*************************************************************************/
      /* course Description Definition and Usage Example:
      /  Required, length no greater than 25 chars
      /  i.e., First Grade     Math 101     Bible Study
      /*************************************************************************/
      course_descr: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 25]
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
  return Course;
};
