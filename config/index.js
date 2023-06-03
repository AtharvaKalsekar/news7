const fs = require("fs");
const path = require("path");

const updateEnv = (environment = "dev") => {
  try {
    const baseEnv = ".env";
    const baseEnvFileLocation = path.resolve(__dirname, "..", baseEnv);
    // .replace('\\','//')
    // .replace(/\\/g, "/");

    fs.unlinkSync(baseEnvFileLocation);

    const currentEnv = `${baseEnv}.${environment}`;

    const currentEnvFileLocation = path.resolve(
      __dirname,
      "..",
      "config",
      currentEnv
    );
    // .replace(/\\/g, "/");

    const data = fs.readFileSync(currentEnvFileLocation, "utf8");
    fs.writeFileSync(baseEnvFileLocation, data);
  } catch (err) {
    console.error(err);
  }
};

const args = process.argv;
updateEnv(args[2].startsWith("-env") ? args[2].split("=")[1] : "dev");
