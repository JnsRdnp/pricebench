import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
import userRoutes from './routes/userRoutes.js';
import cpuRoutes from './routes/cpuRoutes.js'
import priceRoutes from './routes/priceRoutes.js'

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/cpus', cpuRoutes);
app.use('/api/price', priceRoutes);

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

export default app; // for testing