// gpubenchmarks.js (ESM)
import { Sequelize } from 'sequelize';

/**
 * @param {Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default function gpubenchmarks(sequelize, DataTypes) {
  return sequelize.define('gpubenchmarks', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: true
    },
    benchmark: {
      type: DataTypes.REAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'gpubenchmarks',
    timestamps: false,
    indexes: [
      {
        name: "sqlite_autoindex_gpubenchmarks_1",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
}
