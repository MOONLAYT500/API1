'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            'users',
            {
                id: {
                    allowNull: false,
                    primaryKey: true,
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                },
                nickname: {
                    type: Sequelize.STRING,
                },
                password: {
                    type: Sequelize.STRING,
                },
            },
            {
                timestamps: false,
                createdAt: false,
                updatedAt: false,
            }
        );

        await queryInterface.createTable(
            'todos',
            {
                user_id: {
                    type: Sequelize.UUID,
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                },
                uuid: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    unique: true,
                    primaryKey: true,
                },
                name: {
                    type: Sequelize.STRING,
                    unique: true,
                },
                done: {
                    type: Sequelize.BOOLEAN,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
            },
            {
                timestamps: true,
                createdAt: true,
                updatedAt: false,
            }
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    },
};
