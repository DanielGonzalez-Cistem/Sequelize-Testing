'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ST_FakeUsers', { 
      idUser: {
        field: 'UsuarioID',
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        field: 'Correo',
        type: Sequelize.DataTypes.STRING(150),
        allowNull: false
      },
      createdAt: {
        field: 'FechaAlta',
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('GETDATE()')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ST_FakeUsers');
  }
};
