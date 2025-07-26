'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [
      'juan.perez@gmail.com',
      'maria.garcia@hotmail.com',
      'luis.sanchez@cistem.com.mx',
      'ana.martinez@outlook.com',
      'carlos.lopez@gmail.com',
      'sofia.ramirez@gmail.com',
      'diego.morales@outlook.com',
      'laura.jimenez@grupocisneros.com',
      'pedro.fernandez@cistem.com.mx',
      'elena.castillo@x.com'
    ];

    await queryInterface.bulkInsert('ST_FakeUsers', users.map(correo => ({
      Correo: correo,
    })), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ST_FakeUsers', null, {});
  }
};
