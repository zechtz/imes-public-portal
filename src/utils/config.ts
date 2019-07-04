import * as dotenv from "dotenv";

dotenv.config();

let path;

switch (process.env.NODE_ENV) {
  case "test":
    path = `${__dirname}/../../.env`;
    break;
  case "production":
    path = `${__dirname}/../../.env`;
    break;
  default:
    path = `${__dirname}/../../.env`;
}

dotenv.config({ path: path });

export const username   = process.env.IMES_USERNAME;
export const password   = process.env.IMES_PASSWORD;
export const baseUrl    = process.env.IMES_BASE_URL;
export const apiVersion = process.env.IMES_VERSION;
