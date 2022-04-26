module.exports = (sequelize, DataTypes) => sequelize.define('comments', {
    content: {
        type: DataTypes.STRING,
    },
    rating: {
        type: DataTypes.STRING,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        foreignKey: true,
        references: {
            model: 'User',
            key: "idUser"
        }
    }
});
