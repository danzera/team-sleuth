var pg = require('pg');
var pool;
var config = {
  host: process.env.DATABASE_HOST || 'localhost',
  user: process.env.DATABASE_USER || 'danzera', // env var: PGUSER
  database: process.env.DATABASE_NAME || 'team-mate', // env var: PGDATABASE
  password: process.env.DATABASE_PW || '', // env var: PGPASSWORD
  port: 5432, // env var: PGPORT
  max: 20, // max number of clients in the pool
  idleTimeoutMillis: 15000, // 15s // how long a client is allowed to remain idle before being closed
};

if(!pool) { // is there a connection pool? if not, initialize one
  pool = new pg.Pool(config);
}

module.exports = pool;
