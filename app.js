import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
import cpuRoutes from './routes/cpuRoutes.js'
import priceRoutes from './routes/priceRoutes.js'
import gpuRoutes from './routes/gpuRoutes.js'
import giganttiRoutes from './routes/giganttiRoutes.js'
import cors from 'cors';
import authenticateToken from './middlewares/authToken.js'
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

app.use(express.json());

app.use('/api', authenticateToken);

app.use('/api/cpus', cpuRoutes);
app.use('/api/gpus', gpuRoutes);
app.use('/api/price', priceRoutes);
app.use('/api/gigantti', giganttiRoutes);



// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/api-docs');
});

export default app; // for testing