module.exports = function(sequelize, DataTypes) {
  var Personnel = sequelize.define(
    "Personnel",
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
      /* Address 1 Definition and Usage Example:
      /  Not required but if used length no greater than 100 chars
      /  The field is not required because we anticipate there may be some 
      /  situations where the address isn't available at the time of data entry. 
      /*************************************************************************/
      address1: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1, 100]
        }
      },
      /*************************************************************************/
      /* Address 2 Definition and Usage Example:
      /  Not required but if used length no greater than 60 chars
      /*************************************************************************/
      address2: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1, 60]
        }
      },
      /*************************************************************************/
      /* City Definition and Usage Example:
      /  Not required but if used length no greater than 30 chars
      /  The field is not required because we anticipate there may be some 
      /  situations where the address isn't available at the time of data entry. 
      /*************************************************************************/
      city: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1, 30]
        }
      },
      /*************************************************************************/
      /* Postal Code Definition and Usage Example:
      /  This is the 2 character state abbreviation assigned by USPS
      /  Not required but if used length must be exactly 2 chars
      /  The field is not required because we anticipate there may be some 
      /  situations where the address isn't available at the time of data entry. 
      /*************************************************************************/
      postal_code: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [2]
        }
      },
      /*************************************************************************/
      /* zip code Definition and Usage Example:
      /  Not required but if used length no greater than 10 chars
      /  The field is not required because we anticipate there may be some 
      /  situations where the address isn't available at the time of data entry. 
      /  Validation logic:
      /  You need to validate a ZIP code (U.S. postal code), 
      /  allowing both the five-digit and nine-digit (called ZIP+4) formats. 
      /  The regex should match 12345 and 12345-6789, but not 1234, 123456, 
      /  123456789, or 1234-56789.
      /*************************************************************************/
      zip_code: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [5, 10],
          is: [/^[0-9]{5}(?:-[0-9]{4})?$/i]
        }
      },
      /*************************************************************************/
      /* Phone Number Primary Definition and Usage Example:
      /  Required must be valid format of 10 characters no punctuation.
      /*************************************************************************/
      phone_num_primary: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [10],
          is: [/^\d+$/i]
        }
      },
      /*************************************************************************/
      /* Phone Number Alt Definition and Usage Example:
      /  Not required but if used it should be a valid 10 character phone number
      /*************************************************************************/
      phone_num_alt: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [10],
          is: [/^\d+$/i]
        }
      },
      /*************************************************************************/
      /* Emergency Definition and Usage :
      /  This is a flag that will default to false and when true will allow 
      /  the DEVELOPER to write queries to only pull phone numbers where this
      /  flag is marked true.
      /*************************************************************************/
      emergency: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      /*************************************************************************/
      /* Email Address Definition and Usage Example:
      /  Not required but if used it should be a valid email
      /*************************************************************************/
      email_address: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
          len: [1]
        }
      },
      /*************************************************************************/
      /* Position Description Definition and Usage Example:
      /  Required 
      /  Used to provide description of what the person does for the school.
      /  example:  Teacher, TA, Principal, School Nurse, Volunteer, etc.
      /*************************************************************************/
      position_descr: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 50]
        }
      },
      /*************************************************************************/
      /* Reports to ID Definition and Usage Example:
      /  Not required, could be null
      /  The Personnel ID of the person that this record reports to.
      /*************************************************************************/
      reports_to_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: true,
        }
      },
      /*************************************************************************/
      /* Remarks Definition and Usage Example:
      /  Not required 
      /  Used to enter miscellaneous information about parents and how to contact
      /*************************************************************************/
      remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
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

  Personnel.associate = function(models) {
    /*************************************************************************/
    /* Reports to ID is a Foreign Key in this same Personnel table.
    /  It can be null.
    /  We're saying that people in this table report to others.
    /*************************************************************************/
    Personnel.belongsTo(models.Personnel, {
      foreignKey: "reports_to_id"
    });
  };

  return Personnel;
};
