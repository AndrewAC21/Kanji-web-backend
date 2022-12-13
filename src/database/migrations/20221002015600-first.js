'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'full_name',
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: 'user',
      },
      profilePicture:{
        type: Sequelize.STRING,
        allowNull: true,
        field: "profile_picture"  
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,

        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.createTable('kanjis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pictogram: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      meaning: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hiragana: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      furigana: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      level: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      takenFrom: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'taken_from',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,

        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.createTable('user-kanji', {
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        References: {
          model: 'users',
          key: 'id',
        },
      },
      kanjiId: {
        type: Sequelize.INTEGER,
        field: 'kanji_id',
        References: {
          model: 'kanjis',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,

        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('kanjis');
    await queryInterface.dropTable('user-kanji');
  },
};
