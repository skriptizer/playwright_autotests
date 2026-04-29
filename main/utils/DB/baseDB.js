const { Sequelize } = require('sequelize');
const Logger = require('../log/Logger');

class BaseDB {
  constructor(database) {
    this.sequelize = new Sequelize(
      database,
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: (msg) => Logger.log(`[sql] ▶ ${msg}`),
      },
    );
  }

  async createConnection() {
    const log = `[inf] ▶ connect to ${this.sequelize.getDatabaseName()} database`;
    Logger.log(log);
    await this.sequelize.authenticate();
    return { logs: [log] };
  }

  async closeConnection() {
    const log = `[inf] ▶ close connection to ${this.sequelize.getDatabaseName()} database`;
    Logger.log(log);
    await this.sequelize.close();
    return { logs: [log] };
  }
}

module.exports = BaseDB;
