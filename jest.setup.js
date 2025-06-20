const { config } = require("dotenv");

const env = process.env.NODE_ENV || "development";

config({
  path: `.env.${env}`,
});
