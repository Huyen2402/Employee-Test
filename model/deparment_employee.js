'use strict'
module.exports = (sequelize, Sequelize) => {
    const deparment_employee = sequelize.define("deparment_employees", {
        ID: {
        type: Sequelize.INTEGER
      },
      employee_id: {
        type: Sequelize.INTEGER
      },
      deparment_id: {
        type: Sequelize.INTEGER
      }
    });
    deparment_employee.associate = (Models) => {
        deparment_employee.belongsTo(Models.employee, {
            foreignKey: 'employee_id',
            targetKey: 'ID',
        });
        deparment_employee.belongsTo(Models.deparment, {
            foreignKey: 'deparment_id',
            targetKey: 'ID',
        });
    };
    return deparment_employee;
  };