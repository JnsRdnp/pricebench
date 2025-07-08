// gigantti_products.js (ESM)
import { Sequelize } from 'sequelize';

/**
 * @param {Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default function gigantti_products(sequelize, DataTypes) {
  return sequelize.define('gigantti_products', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    sku: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.REAL,
      allowNull: true
    },
    availability: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cpuName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    gpuName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cpuPerformanceJson: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    gpuPerformanceJson: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    combinedValueScore: {
      type: DataTypes.REAL,
      allowNull: true
    },
    specsJson: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'gigantti_products',
    timestamps: false,
    indexes: [
      {
        name: "sqlite_autoindex_gigantti_products_1",
        unique: true,
        fields: [
          { name: "sku" },
        ]
      },
    ]
  });
}
