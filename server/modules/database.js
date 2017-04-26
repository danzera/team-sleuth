var pg = require('pg');
var pool;
var config = {
  user: 'danzera', // env var: PGUSER
  database: 'team-mate', // env var: PGDATABASE
  password: '', // env var: PGPASSWORD
  port: 5432, // env var: PGPORT
  max: 20, // max number of clients in the pool
  idleTimeoutMillis: 15000, // 15s // how long a client is allowed to remain idle before being closed
};

function getPool() {
  if (pool) { // if a pool already exists, return it
    return pool;
  } else { // otherwise, create one
    pool = new pg.Pool(config);
  }
}

module.exports = getPool;
