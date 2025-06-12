
import Hapi from '@hapi/hapi';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: () => ({
      status: 'success',
      message: 'Welcome to Hapi.js + Supabase SDK API!',
    }),
  });

  server.route(userRoutes);

  await server.start();
  console.log(`✅ Server running on ${server.info.uri}`);

  server.table().forEach((route) => {
    console.log(`${route.method.toUpperCase()} ${route.path}`);
  });
};

init();
