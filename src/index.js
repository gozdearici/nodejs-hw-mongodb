import { setupServer } from './server/server.js';
import { initMongoConnection } from './db/dbConnection/initMongoConnection.js';

const bootstrap = async () => {
  console.log('Hello, Node.js with MongoDB!');

  await initMongoConnection();
  setupServer();
};

bootstrap();
