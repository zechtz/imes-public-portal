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

export const username   = process.env.DHIS2_USERNAME;
export const password   = process.env.DHIS2_PASSWORD;
export const baseUrl    = process.env.DHIS2_BASE_URL;
export const apiVersion = process.env.DHIS2_VERSION;
