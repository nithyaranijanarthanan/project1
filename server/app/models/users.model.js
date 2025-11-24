// models/users.model.js
export default (sequelize, DataTypes) => {
  return sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      mobile_no: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      company_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "company",
          key: "company_id",
        }
      }
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );
};
