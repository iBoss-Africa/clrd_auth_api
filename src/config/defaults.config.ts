// config/database.config.ts

export default () => ({
    salt: process.env.SALT,
    database_url: process.env.DATABASE_URL,
    jwt_expires:process.env.JWT_EXPIRES,
    jwt_secret: process.env.JWT_SECRET
  });
