import mysql from 'mysql';

let mysqlConfig: mysql.PoolConfig;
if (process.env.ENV === "PRODUCTION") {
   mysqlConfig = {
      connectionLimit: 10,
      host: 'localhost',
      port: 3306,
      user: 'prod',
      password: '..prod2019!',
      database: 'backend'
   }
}
if (process.env.ENV === "TEST") {
   mysqlConfig = {
      connectionLimit: 10,
      host: 'localhost',
      port: 3306,
      user: 'test',
      password: '',
      database: 'backend'
   }
}
if (process.env.ENV === "DEVELOPMENT") {
   mysqlConfig = {
      connectionLimit: 10,
      host: 'localhost',
      port: 3306,
      user: 'dev',
      password: '..dev2019!',
      database: 'backend'
   }
}

let pool: mysql.Pool;
const getPool = () => {
   if (pool) {
      return pool
   };
   pool = mysql.createPool(
      mysqlConfig
   )
   return pool;
};

export {
   getPool
}