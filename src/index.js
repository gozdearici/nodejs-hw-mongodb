import { setupServer } from './server/server.js';
import { initMongoConnection } from './db/dbConnection/initMongoConnection.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMPLATES_UPLOAD_DIR, UPLOAD_DIR } from './constants/constants.js';

const bootstrap = async () => {
  console.log('Hello, Node.js with MongoDB!');
  await initMongoConnection();
  await createDirIfNotExists(TEMPLATES_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);
  setupServer();
};

bootstrap();
