module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define(
    'Activity',
    {
      PatientId: DataTypes.INTEGER,
      ActivityTypeId: DataTypes.INTEGER,
      activityDate: DataTypes.DATE,
      service: DataTypes.STRING,
      coPay: DataTypes.FLOAT,
      coInsurance: DataTypes.FLOAT,
      selfPay: DataTypes.FLOAT,
      charity: DataTypes.FLOAT,
      buffer: DataTypes.FLOAT,
      prepay: DataTypes.FLOAT,
      ppi: DataTypes.FLOAT,
      fees: DataTypes.FLOAT,
      deductible: DataTypes.FLOAT,
      outOfPocketMax: DataTypes.FLOAT,
      total: DataTypes.FLOAT,
      installments: DataTypes.INTEGER,
      isCompleted: DataTypes.BOOLEAN,
      paidAmount: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      balanceAmount: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      nextInstallmentAmount: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
    },
    {
      classMethods: {
        associate(models) {
          // associations can be defined here
          Activity.belongsTo(models.Patient);
          Activity.belongsTo(models.ActivityType);

          Activity.hasMany(models.ActivityInstallment, { onDelete: 'cascade', hooks: true });
        }
      }
    }
  );

  Activity.beforeCreate((user, options) => {
    console.log("--> Activity.beforeCreate called");
    // return hashPassword(user.password).then(hashedPw => {
    //   user.password = hashedPw;
    // });
  });

  Activity.afterCreate((user, options) => {
    console.log("--> Activity.afterCreate called");
    // return hashPassword(user.password).then(hashedPw => {
    //   user.password = hashedPw;
    // });
  });

  return Activity;
};
