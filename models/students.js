module.exports = function(sequelize, DataTypes) {
  var Students = sequelize.define(
    "Students",
    {
      /*************************************************************************/
      /* First Name Definition and Usage Example:
      /  Required, length no greater than 35 chars
      /*************************************************************************/
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 35]
        }
      },
      /*************************************************************************/
      /* First Name Definition and Usage Example:
      /  Not required, but if entered, length no greater than 25 chars
      /*************************************************************************/
      middle_name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1, 25]
        }
      },
      /*************************************************************************/
      /* First Name Definition and Usage Example:
      /  Required. Length no greater than 60 chars
      /*************************************************************************/
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 60]
        }
      },
      /*************************************************************************/
      /* Name Suffix Definition and Usage Example:
      /  Not required but if used length no greater than 10 chars
      /  i.e., Jr.   Sr.   III  
      /*************************************************************************/
      name_suffix: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1, 10]
        }
      },
      /*************************************************************************/
      /* Nickname Definition and Usage Example:
      /  Not required but if used length no greater than 35 chars
      /  This is the name the student prefers  
      /*************************************************************************/
      nickname: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1, 35]
        }
      },
      /*************************************************************************/
      /* Birthdate Definition and Usage Example:
      /  A birthdate is not required but will be helpful to calculate age.
      /*************************************************************************/
      birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isDate: true
        }
      },
      /*************************************************************************/
      /* Gender Definition and Usage Example:
      /  Optional field.  UI designers may opt to exclude this field, but if 
      /  used then more than two options are available.
      /  i.e., Male   Female   Prefer not to Answer  
      /*************************************************************************/
      gender: {
        type: DataTypes.TINYINT,
        allowNull: true,
        validate: {
          isInt: true
        }
      },
      /*************************************************************************/
      /* Photo Definition and Usage Example:
      /  Optional field.  
      /  If used, it contains the file name to locate the photo  
      /*************************************************************************/
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1, 255]
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
  Students.associate = function(models) {
    Students.hasMany(models.Attendence, { as: "student_attendence" });
    //Students.hasMany(models.Course, { as: "student_courses" });
  };
  return Students;
};
