'use strict';

const { forceDatetimeColumn } = require('./helpers/force.datetime.column');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await forceDatetimeColumn(queryInterface, 'ST_FakeUsers', 'FechaAlta', {
      allowNull: false,
      reapplyDefault: true // vuelve a aplicar GETDATE()
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('ST_FakeUsers', 'FechaAlta', {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('GETDATE()')
    });
  }
};