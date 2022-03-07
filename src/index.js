require("dotenv").config();
const debug = require("debug")("pallars:root");
const chalk = require("chalk");
const serverUp = require("./server/serverUp");
const app = require("./server/index");

const port = process.env.PORT || 3000;

(async () => {
  try {
    await serverUp(port, app);
    debug(chalk.greenBright(`Server-up in ${port}`));
  } catch (error) {
    debug(chalk.redBright(`Error: `, error.message));
  }
})();
