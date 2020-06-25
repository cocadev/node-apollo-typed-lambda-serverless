'use strict';

const view_name = `"viewActivityDetails"`;
const query = `
  SELECT
    "A2"."PatientId", "A2"."ActivityTypeId", "A2".id AS "ActivityId", "A2"."activityDate" AS "ActivityDate", "A2"."installments" AS "ActivityInstallments",
    "A2"."isCompleted" AS "isActivityCompleted", "A2"."isActive" AS "isActivityActive", "A2"."total" AS "ActivityAmount",
    "A2"."paidAmount" AS "ActivityPaidAmount", "A2"."balanceAmount" AS "ActivityBalanceAmount", "A2"."nextInstallmentAmount" AS "ActivityNextInstallmentAmount",
    "AI2"."id" AS "ActivityInstallmentId", "AI2"."installmentNumber" AS "InstallmentNumber", "AI2"."dueDate" AS "InstallmentDueDate",
    "AI2"."isPaid" AS "isInstallmentPaid", "AI2"."isActive" AS "isInstallmentActive", "AI2"."amount" AS "InstallmentAmount", "C"."id" AS "ClaimId"
  FROM
    "Activities" AS "A2" LEFT JOIN "ActivityInstallments" AS "AI2" ON "A2"."id" = "AI2"."ActivityId",
    "Activities" AS "A3" LEFT JOIN "Claims" AS "C" ON "A3"."id" = "C"."ActivityId"
  WHERE
    "A2"."id" = "A3"."id"
`;

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`CREATE VIEW ${view_name} AS ${query}`);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`DROP VIEW ${view_name}`);
  }
};
