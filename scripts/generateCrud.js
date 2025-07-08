import fs from 'fs';
import path from 'path';

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function readSchemas(schemaDir) {
  return fs.readdirSync(schemaDir)
    .filter(f => f.endsWith('.json'))
    .map(f => ({
      name: f.replace('.json', ''),
      path: path.join(schemaDir, f),
      schema: JSON.parse(fs.readFileSync(path.join(schemaDir, f), 'utf8'))
    }));
}

function extractSwaggerProperties(schema) {
  if (!schema || !schema.properties) return {};
  const props = {};
  for (const [key, val] of Object.entries(schema.properties)) {
    props[key] = { type: val.type || 'string' };
  }
  return props;
}

function swaggerSchemaProperties(swaggerProps) {
  let str = '';
  for (const [key, val] of Object.entries(swaggerProps)) {
    str += ` *         ${key}:\n *           type: ${val.type}\n`;
  }
  return str;
}

export function generateRoutes(resource, swaggerProps, createSchemaProps) {
  const Resource = capitalize(resource);
  const CreateSchemaName = `${Resource}_create`;

  return `import express from 'express';
import ${resource}Controller from '../controllers/${resource}Controller.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ${Resource}:
 *       type: object
 *       properties:
${swaggerSchemaProperties(swaggerProps)}
 *     ${CreateSchemaName}:
 *       type: object
 *       properties:
${swaggerSchemaProperties(createSchemaProps)}
 *
 * /api/${resource}:
 *   get:
 *     summary: Get all ${resource} (paginated)
 *     tags: [${Resource}]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of ${resource}
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/${Resource}'
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 total:
 *                   type: integer
 */
router.get('/', ${resource}Controller.getAll);

/**
 * @swagger
 * /api/${resource}/by/{id}:
 *   get:
 *     summary: Get a single ${resource} by ID
 *     tags: [${Resource}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single ${resource}
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/${Resource}'
 */
router.get('/by/:id', ${resource}Controller.getById);

/**
 * @swagger
 * /api/${resource}:
 *   post:
 *     summary: Create a new ${resource}
 *     tags: [${Resource}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/${CreateSchemaName}'
 *     responses:
 *       201:
 *         description: Created ${resource}
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/${Resource}'
 */
router.post('/', ${resource}Controller.create);

/**
 * @swagger
 * /api/${resource}/{id}:
 *   put:
 *     summary: Update an existing ${resource} by ID
 *     tags: [${Resource}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/${CreateSchemaName}'
 *     responses:
 *       200:
 *         description: Updated ${resource}
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/${Resource}'
 */
router.put('/:id', ${resource}Controller.update);

/**
 * @swagger
 * /api/${resource}/{id}:
 *   delete:
 *     summary: Delete a ${resource} by ID
 *     tags: [${Resource}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted ${resource}
 */
router.delete('/:id', ${resource}Controller.remove);

export default router;
`;
}

export function generateController(resource) {
  const Resource = capitalize(resource);

  return `import ${resource}Service from '../services/${resource}Service.js';

const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await ${resource}Service.getAll(page, limit);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const item = await ${resource}Service.getById(req.params.id);
    if (!item) return res.status(404).json({ message: '${Resource} not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const created = await ${resource}Service.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const updated = await ${resource}Service.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: '${Resource} not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await ${resource}Service.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: '${Resource} not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
`;
}

export function generateService(resource) {
  const Resource = capitalize(resource);

  return `import Database from 'better-sqlite3';
const db = new Database('./db/data.db'); // Adjust DB path as needed

class ${Resource}Service {
  async getAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const totalStmt = db.prepare('SELECT COUNT(*) as count FROM ${resource}');
    const totalResult = totalStmt.get();
    const total = totalResult.count;

    const stmt = db.prepare('SELECT * FROM ${resource} LIMIT ? OFFSET ?');
    const data = stmt.all(limit, offset);

    return { data, page, limit, total };
  }

  async getById(id) {
    const stmt = db.prepare('SELECT * FROM ${resource} WHERE id = ?');
    return stmt.get(id);
  }

  async create(data) {
    const keys = Object.keys(data);
    const placeholders = keys.map(() => '?').join(', ');
    const stmt = db.prepare(\`INSERT INTO ${resource} (\${keys.join(', ')}) VALUES (\${placeholders})\`);
    const info = stmt.run(...keys.map(k => data[k]));
    return this.getById(info.lastInsertRowid);
  }

  async update(id, data) {
    const keys = Object.keys(data);
    if (keys.length === 0) throw new Error('No data to update');

    const assignments = keys.map(k => \`\${k} = ?\`).join(', ');
    const stmt = db.prepare(\`UPDATE ${resource} SET \${assignments} WHERE id = ?\`);
    const info = stmt.run(...keys.map(k => data[k]), id);

    if (info.changes === 0) throw new Error('${Resource} not found');
    return this.getById(id);
  }

  async remove(id) {
    const stmt = db.prepare('DELETE FROM ${resource} WHERE id = ?');
    const info = stmt.run(id);
    if (info.changes === 0) throw new Error('${Resource} not found');
    return true;
  }
}

export default new ${Resource}Service();
`;
}

export function generateAllFromSchemas(schemaDir) {
  const schemas = readSchemas(schemaDir);

  const baseSchemas = {};
  const createSchemas = {};

  schemas.forEach(({ name, schema }) => {
    if (name.endsWith('_create')) {
      createSchemas[name.replace('_create', '')] = schema;
    } else {
      baseSchemas[name] = schema;
    }
  });

  const routesPath = path.join(process.cwd(), 'routes');
  const controllersPath = path.join(process.cwd(), 'controllers');
  const servicesPath = path.join(process.cwd(), 'services');

  if (!fs.existsSync(routesPath)) fs.mkdirSync(routesPath);
  if (!fs.existsSync(controllersPath)) fs.mkdirSync(controllersPath);
  if (!fs.existsSync(servicesPath)) fs.mkdirSync(servicesPath);

  for (const [name, baseSchema] of Object.entries(baseSchemas)) {
    const swaggerProps = extractSwaggerProperties(baseSchema);
    const createSchema = createSchemas[name];
    const createProps = extractSwaggerProperties(createSchema || {});

    const filesToGenerate = [
      {
        path: path.join(routesPath, `${name}Routes.js`),
        content: generateRoutes(name, swaggerProps, createProps),
        label: 'Route',
      },
      {
        path: path.join(controllersPath, `${name}Controller.js`),
        content: generateController(name),
        label: 'Controller',
      },
      {
        path: path.join(servicesPath, `${name}Service.js`),
        content: generateService(name),
        label: 'Service',
      },
    ];

    let alreadyExists = false;

    for (const file of filesToGenerate) {
      if (fs.existsSync(file.path)) {
        console.log(`⚠️  ${file.label} file already exists for: ${name}, skipping.`);
        alreadyExists = true;
      } else {
        fs.writeFileSync(file.path, file.content, 'utf8');
      }
    }

    if (!alreadyExists) {
      console.log(`✅ Generated CRUD files for resource: ${name}`);
    }
  }
}

// Run generation (you can adjust the folder path accordingly)
const schemaFolder = path.join(process.cwd(), 'schemas');
generateAllFromSchemas(schemaFolder);
