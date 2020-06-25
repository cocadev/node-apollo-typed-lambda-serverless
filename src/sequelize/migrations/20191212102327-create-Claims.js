'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Claims', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PatientId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Patients'
          },
          key: 'id'
        }
      },
      ProviderId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Providers'
          },
          key: 'id'
        }
      },
      ActivityId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Activities'
          },
          key: 'id'
        }
      },

      payToTaxID: { allowNull: true, type: Sequelize.STRING(100) },
      providerEntityId: { allowNull: true, type: Sequelize.STRING(100) },
      billingEntityId: { allowNull: true, type: Sequelize.STRING(100) },

      claimType: {
        type: Sequelize.ENUM('Estimated', 'Final'),
        defaultValue: 'Estimated'
      },
      coPay: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      estimatedCoPay: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      diffCoPay: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      deductible: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      estimatedDeductible: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      diffDeductible: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      coInsurance: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      estimatedCoInsurance: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      diffCoInsurance: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      selfPay: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      estimatedSelfPay: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      diffSelfPay: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      adjustments: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      estimatedAdjustments: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      diffAdjustments: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      total: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      isOutOfNetwork: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isApprovedByPatient: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      approvedByPatientTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      parentClaimId: {
        type: Sequelize.INTEGER,
        defaultValue: -1
      },
      status: {
        type: Sequelize.ENUM('Default', 'Pending approval', 'In payment cycle', 'Administrative processing', 'Paid'),
        default: 'Default'
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      isPaidByPatient: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isSeenByPatient: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isCompleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isPoemDiscount: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isHeartFlag: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isInGiftProcess: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isGiftReceived: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      patientPaidAmount: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      patientBalanceAmount: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      providerPaidAmount: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      providerBalanceAmount: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      balanceAmount: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Claims');
  }
};
