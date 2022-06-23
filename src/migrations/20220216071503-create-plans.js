'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('plans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      plan_name: {
        type: Sequelize.STRING
      },
      dzongkhag_id: {
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      period_from: {
        type: Sequelize.INTEGER
      },
      period_till: {
        type: Sequelize.INTEGER
      },
      base_population: {
        type: Sequelize.INTEGER
      },
      projected_population: {
        type: Sequelize.INTEGER
      },
      preparation_date: {
        type: Sequelize.STRING
      },
      approved_date: {
        type: Sequelize.STRING
      },
      area: {
        type: Sequelize.FLOAT
      },
      data_url: {
        type: Sequelize.STRING
      },
      report_url: {
        type: Sequelize.STRING
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('plans');
  }
};