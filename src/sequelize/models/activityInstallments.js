module.exports = (sequelize, DataTypes) => {
  const ActivityInstallment = sequelize.define(
    'ActivityInstallment',
    {
      ActivityId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Activities'
          },
          key: 'id'
        }
      },
      PatientId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Patients'
          },
          key: 'id'
        }
      },
      installmentNumber: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
      amount: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
      amountPaid: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
      amountDue: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
      installmentDate: DataTypes.DATE,
      paymentDate: DataTypes.DATE,
      dueDate: DataTypes.DATE,
      isPaid: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
    },
    {
      classMethods: {
        associate(models) {
          // associations can be defined here
          ActivityInstallment.belongsTo(models.Activity);
          ActivityInstallment.belongsTo(models.Patient);
        }
      }
    }
  );
  return ActivityInstallment;
};
