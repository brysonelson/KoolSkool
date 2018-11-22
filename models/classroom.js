module.exports = function(sequelize, DataTypes) {
  var Classrooms = sequelize.define(
    "Classrooms",
    {
      /*************************************************************************/
      /* Classroom Description Definition and Usage Example:
      /  This is the location where classes are held
      /  Required, length no greater than 50 chars
      /  i.e., 5th Floor, North Side of Building
               Room next to library
      /*************************************************************************/
      location_descr: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 50]
        }
      },
      /*************************************************************************/
      /* Room Number Definition and Usage Example:
      /  This is an optional field that can be used if the building has room #s
      /  Field value is optional, but if entered can be no more than 10 chars
      /  i.e., 1250
               5-327
      /*************************************************************************/
      room_num: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1, 10]
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
  return Classrooms;
};
