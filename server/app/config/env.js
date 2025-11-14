const env = {
  database: 'demodb',
  username: 'postgres',
  password: 'Abcd@1234',
  host: 'localhost',
  port: '5432',
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    acquire: 1000000,
    idle: 200000
  }
};

export default env;
