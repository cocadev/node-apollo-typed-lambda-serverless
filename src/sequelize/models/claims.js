'use strict';
module.exports = function(sequelize, DataTypes) {
  var Claim = sequelize.define('Claim', {

    PatientId: {
      type: DataTypes.INTEGER,
      references: { model: { tableName: 'Patients' }, key: 'id' }
    },
    ProviderId: {
      type: DataTypes.INTEGER,
      references: { model: { tableName: 'Providers' }, key: 'id' }
    },
    ActivityId: {
      type: DataTypes.INTEGER,
      references: { model: { tableName: 'Activities' }, key: 'id' }
    },
    payToTaxID: DataTypes.STRING,
    providerEntityId: DataTypes.STRING(32),
    billingEntityId: DataTypes.STRING(32),
    claimType: DataTypes.ENUM('Estimated', 'Final'),
    coPay: DataTypes.FLOAT,
    estimatedCoPay: DataTypes.FLOAT,
    diffCoPay: DataTypes.FLOAT,
    deductible: DataTypes.FLOAT,
    estimatedDeductible: DataTypes.FLOAT,
    diffDeductible: DataTypes.FLOAT,
    coInsurance: DataTypes.FLOAT,
    estimatedCoInsurance: DataTypes.FLOAT,
    diffCoInsurance: DataTypes.FLOAT,
    selfPay: DataTypes.FLOAT,
    estimatedSelfPay: DataTypes.FLOAT,
    diffSelfPay: DataTypes.FLOAT,
    adjustments: DataTypes.FLOAT,
    estimatedAdjustments: DataTypes.FLOAT,
    diffAdjustments: DataTypes.FLOAT,
    total: DataTypes.FLOAT,
    isOutOfNetwork: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isApprovedByPatient: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    approvedByPatientTime: DataTypes.DATE,
    parentClaimId: {
      type: DataTypes.INTEGER,
      defaultValue: -1
    },
    status: {
      type: DataTypes.ENUM('Default', 'Pending approval', 'In payment cycle', 'Administrative processing', 'Paid'),
      default: 'Default'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isPaidByPatient: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isSeenByPatient: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isPoemDiscount: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isHeartFlag: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isInGiftProcess: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isGiftReceived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    patientPaidAmount: DataTypes.FLOAT,
    patientBalanceAmount: DataTypes.FLOAT,
    providerPaidAmount: DataTypes.FLOAT,
    providerBalanceAmount: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        Claim.hasMany(models.Patient, { onDelete: 'cascade', hooks: true });

      }
    }
  });
  return Claim;
};
