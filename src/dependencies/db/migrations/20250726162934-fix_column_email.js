'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('ST_FakeUsers', 'Correo', {
      type: Sequelize.DataTypes.STRING(150),
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('ST_FakeUsers', 'Correo', {
      type: Sequelize.DataTypes.STRING(30),
      allowNull: false
    });
  }
};
