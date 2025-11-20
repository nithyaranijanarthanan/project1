import Sequelize from 'sequelize';
import env from './env.js';
import usersModel from '../models/users.model.js';
import uploadsModel from '../models/upload.model.js';

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  port: env.port,
  dialect: env.dialect,
  logging: console.log,
  define: { timestamps: false },
  pool: env.pool,
  dialectOptions: { useUTC: false },
  timezone: '+05:30'
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.users = usersModel(sequelize, Sequelize.DataTypes);
db.uploads = uploadsModel(sequelize, Sequelize.DataTypes);

// Associations
db.uploads.belongsTo(db.users, { foreignKey: 'userId' });
db.users.hasMany(db.uploads, { foreignKey: 'userId' });

// Test connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    await sequelize.sync(); // sync models
  } catch (err) {
    console.error('Unable to connect to database:', err);
  }
})();

export default db;
