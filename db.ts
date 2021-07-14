import { Pool } from 'pg';

const config = {
  host: '127.0.0.1',
  port: 5432,
  database: 'chatbot',
  user: 'alexey',
  password: '123'
};

export default new Pool(config);