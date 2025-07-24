'use strict';

require('dotenv').config();

const { DateTime } = require('luxon');
// const { Sequelize } = require('sequelize');

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
      // FechaAlta: DateTime.fromMillis(new Date().getTime(), { zone: process.env.TIMEZONE }).toISO({ includeOffset: false })
      // FechaAlta: DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss.SSS')
      // FechaAlta: Sequelize.literal("CONVERT(VARCHAR(23), GETDATE(), 121)")
    })), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ST_FakeUsers', null, {});
  }
};