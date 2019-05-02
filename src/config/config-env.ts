import { writeFile } from 'fs';

require('dotenv').config();

const environment = process.env.ENVIRONMENT;

let baseUrl;

if (environment === 'production') {
  baseUrl = process.env.PRODUCTION_BASE_URL;
} else {
  baseUrl = process.env.DHIS2_BASE_URL;
}

const targetPath = `../environments/environment.prod.ts`;
const envConfigFile = `
export const environment = {
  production: true,
  baseUrl: '${baseUrl}'
};`

writeFile(targetPath, envConfigFile, (err) => {
  if (err) {
    console.log(err);
  }
});
