// cpubenchmarks.js (ESM module)
import { Sequelize } from 'sequelize';

/**
 * @param {Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default function cpubenchmarks(sequelize, DataTypes) {
  return sequelize.define('cpubenchmarks', {
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
    singlethread: {
      type: DataTypes.REAL,
      allowNull: true
    },
    multithread: {
      type: DataTypes.REAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cpubenchmarks',
    timestamps: false,
    indexes: [
      {
        name: "sqlite_autoindex_cpubenchmarks_1",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
}
