import { writeFile } from "fs";
import { argv } from "yargs";
require("dotenv").config();

// Would be passed to script like this:
// `ts-node set-env.ts --environment=dev`
// we get it from yargs's argv object
const environment = argv.environment;
const isProd = environment === "prod";

let targetPath = `./src/environments/environment.ts`

let envConfigFile = `
export const environment = {
  production: ${isProd},
  api: "${process.env.API}",
  phone: "${process.env.PHONE}"
};
`;

if (isProd) {
  envConfigFile = `
  export const environment = {
    production: ${isProd},
    api: "${process.env.APIPROD}",
    phone: "${process.env.PHONE}"
  };`
}

writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  }
  
  console.log(`Output generated at ${targetPath}`);
});