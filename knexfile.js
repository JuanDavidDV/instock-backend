import { parse } from 'url';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
// Parse JawsDB URL for Heroku
const dbUrl = process.env.JAWSDB_URL || process.env.LOCAL_DB_URL;
const dbConfig = dbUrl ? parse(dbUrl) : null;


export default {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      charset: "utf8",
    },
    migrations: {
      directory: path.join(dirname, 'migrations'),
    },
    seeds: {
      directory: path.join(dirname, 'seeds'),
    },
  },
  production: {
    client: 'mysql2',
    connection: dbConfig
      ? {
          host: dbConfig.hostname,
          port: dbConfig.port || 3306,
          user: dbConfig.auth.split(':')[0],
          password: dbConfig.auth.split(':')[1],
          database: dbConfig.pathname.slice(1),
        }
      : null,
    migrations: {
      directory: path.join(dirname, 'migrations'),
    },
    seeds: {
      directory: path.join(dirname, 'seeds'),
    },
  },
};