import convict from "convict";

const conf = convict({
  env: {
    format: ["development", "production", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  server: {
    port: {
      format: "port",
      default: 3000,
      env: "NODE_PORT",
    },
  },
  db: {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
});

conf.validate({ allowed: "strict" });

export default conf.getProperties();