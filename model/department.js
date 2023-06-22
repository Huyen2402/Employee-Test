'use strict'
module.exports = (sequelize, Sequelize) => {
    const department = sequelize.define("deparments", {
        ID: {
        type: Sequelize.INTEGER
      },
      Code: {
        type: Sequelize.STRING
      },
      Name: {
        type: Sequelize.STRING
      }
    });
    department.associate = (Models) => {
        department.hasMany(Models.deparment_employee, {
            foreignKey: 'deparment_id',
            sourceKey: 'ID',
        });
    };
    return department;
  };