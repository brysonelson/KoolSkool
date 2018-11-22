module.exports = function(sequelize, DataTypes) {
  var Attendence = sequelize.define(
    "Attendence",
    {
      attendence_dt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: sequelize.NOW,
        validate: {
          isDate: true,
          isAfter: "2018-11-01"
        }
      },
      /*************************************************************************/
      /* Absent or Present Definition and Usage Example:
      /  Absent means the absent field is marked true; 
      /  Present means the absent field is marked false;
      /  Instantiating will automatically set the flag to true if not set
      /  This means that all students are marked absent automatically,
      /  Then the person taking roll-call can flip the flag to false if the 
      /  student is present.
      /*************************************************************************/
      absent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      /*************************************************************************/
      /* Person ID Definition and Usage Example:
      /  The data in this field represents the person who is taking roll-call 
      /  and submitting the information through the application.
      /  The person submitting roll-call does not need to be the assigned
      /  teacher as it might be a TA or volunteer.  
      /*************************************************************************/
      person_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
          isInt: true,
          len: [1]
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

  Attendence.associate = function(models) {
    /*************************************************************************/
    /* Student ID is Foreign Key in Attendence Table
    /  The field is required.  It can not be null.
    /  An attendence record can not be created without a Student due to the 
    /  foreign key constraint.
    /  We're saying that the attendence record should belong to a student.
    /*************************************************************************/
    Attendence.belongsTo(models.Students, {
      foreignKey: {
        allowNull: false
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });

    Attendence.belongsTo(models.Course, {
      foreignKey: {
        allowNull: false
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });

    Attendence.belongsTo(models.Classrooms, {
      foreignKey: {
        allowNull: false
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });
  };

  return Attendence;
};
