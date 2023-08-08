const core = require("@actions/core");
const github = require("@actions/github");
const walk = require("walk");

try {
  // `who-to-greet` input defined in action metadata file
  /*
  const nameToGreet = core.getInput("who-to-greet");
  console.log(`Hello ${nameToGreet}!`);
  const time = new Date().toTimeString();
  core.setOutput("time", time);
  */

  // Get the JSON webhook payload for the event that triggered the workflow
  /*
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
  */

  const walker = walk.walk(".", {
    followLinks: false,
    filters: ["node_modules"],
  });
  const results = [];
  walker.on("file", function (root, fileStats, next) {
    if (path.extname(fileStats.name) === ".ipynb") {
      //results.push(lint(path.join(root, fileStats.name), disabled));
      console.log(`Found notebook: ${fileStats.name}`);
    }
    next();
  });
} catch (error) {
  core.setFailed(error.message);
}
