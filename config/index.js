const fs = require("fs");
const path = require("path");

const updateEnv = (environment = process.env.environment) => {
  try {
    const baseEnv = ".env";
    const baseEnvFileLocation = path.resolve(__dirname, "..", baseEnv);

    fs.unlinkSync(baseEnvFileLocation);

    const currentEnv = `${baseEnv}.${environment}`;

    const currentEnvFileLocation = path.resolve(
      __dirname,
      "..",
      "config",
      currentEnv
    );

    const data = fs.readFileSync(currentEnvFileLocation, "utf8");
    fs.writeFileSync(baseEnvFileLocation, data);
  } catch (err) {
    console.error(err);
  }
};

const args = process.argv;
updateEnv(args[2].startsWith("-env") ? args[2].split("=")[1] : "dev");
