import { DataTypes } from 'sequelize';
import cpubenchmarks from './cpubenchmarks.js';
import gigantti_products from './gigantti_products.js';
import gpubenchmarks from './gpubenchmarks.js';

export default function initModels(sequelize) {
  const cpubenchmarksModel = cpubenchmarks(sequelize, DataTypes);
  const giganttiProductsModel = gigantti_products(sequelize, DataTypes);
  const gpubenchmarksModel = gpubenchmarks(sequelize, DataTypes);

  return {
    cpubenchmarks: cpubenchmarksModel,
    gigantti_products: giganttiProductsModel,
    gpubenchmarks: gpubenchmarksModel,
  };
}
