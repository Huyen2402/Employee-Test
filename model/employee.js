'use strict'
module.exports = (sequelize, Sequelize) => {
    const employee = sequelize.define("employees", {
        ID: {
        type: Sequelize.INTEGER
      },
      Code: {
        type: Sequelize.STRING
      },
      Name: {
        type: Sequelize.STRING
      },
      Phone: {
        type: Sequelize.STRING
      },
      Sex: {
        type: Sequelize.BOOLEAN
      },
      Avt: {
        type: Sequelize.TEXT
      }
    });
    employee.associate = (Models) => {
        employee.hasMany(Models.deparment_employee, {
            foreignKey: 'employee_id',
            sourceKey: 'ID',
        });
    };
    return employee;
  };