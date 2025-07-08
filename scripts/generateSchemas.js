import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { SchemaManager, OpenApiStrategy } from '@techntools/sequelize-to-openapi';
import { Sequelize } from 'sequelize';
import * as modelsModule from '../models/init-models.js';

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a Sequelize instance (dummy in-memory)
const sequelize = new Sequelize('sqlite::memory:', { logging: false });

const models = modelsModule.default ? modelsModule.default(sequelize) : modelsModule(sequelize);

const schemaManager = new SchemaManager();
const strategy = new OpenApiStrategy({ additionalProperties: false });

const schemasDir = path.join(__dirname, '../schemas');
if (!fs.existsSync(schemasDir)) {
  fs.mkdirSync(schemasDir);
}

for (const modelName in models) {
  const model = models[modelName];

  const fullSchema = schemaManager.generate(model, strategy, { associations: true });

  const fullFilePath = path.join(schemasDir, `${modelName}.json`);
  fs.writeFileSync(fullFilePath, JSON.stringify(fullSchema, null, 2));
  console.log(`✅ Full schema created for model: ${modelName}`);

  const createSchema = JSON.parse(JSON.stringify(fullSchema));

  for (const attrName in model.rawAttributes) {
    const attribute = model.rawAttributes[attrName];
    if (attribute.primaryKey) {
      if (Array.isArray(createSchema.required)) {
        createSchema.required = createSchema.required.filter(r => r !== attrName);
      }
      if (createSchema.properties && createSchema.properties[attrName]) {
        delete createSchema.properties[attrName];
      }
    }
  }

  const createFilePath = path.join(schemasDir, `${modelName}_create.json`);
  fs.writeFileSync(createFilePath, JSON.stringify(createSchema, null, 2));
  console.log(`✅ Create schema created for model: ${modelName}`);
}
