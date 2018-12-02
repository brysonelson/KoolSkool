module.exports = function(sequelize, DataTypes) {
  var ParentChild = sequelize.define(
    "parent_child_map",
    {
      /**************************************************************************/
      /* Relationship Definition and Usage Example:
      /  Describes the relationship between the parent record and the student; 
      /  Example:  Mother, Father, Stepparent, Grandparent.
      /**************************************************************************/
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      relationship: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 35]
        }
      },
      /*************************************************************************/
      /* Contact Sequence Definition and Usage Example:
      /  This field defines the sequence that parents or guardians would be 
      /  called in the case of an emergency.
      /*************************************************************************/
      contact_sequence: {
        type: DataTypes.TINYINT,
        allowNull: true,
        validate: {
          isInt: true
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

  ParentChild.associate = function(models) {
    models.Parents.belongsToMany(models.Students, {
      as: "children",
      through: {model: ParentChild, unique: false},
      foreignKey: "parent_id"
    });
    models.Students.belongsToMany(models.Parents, {
      as: "parents",
      through: {model: ParentChild, unique: false},
      foreignKey: "student_id"
    });
  };
  return ParentChild;
};
