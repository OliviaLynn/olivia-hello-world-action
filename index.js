const core = require("@actions/core");
const github = require("@actions/github");
//const walk = require("walk");
const walker = require("node-walker");

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
  /*
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
  */
  const fileTypeToSeek = core.getInput("file-type-to-seek");
  console.log(`Looking for all ${fileTypeToSeek}...`);

  let count = 0;

  const setOut = (count) => {
    core.setOutput("count", count);
    console.log("Count: " + count.toString());
  };
  const incr = (x) => {
    console.log(x);
    return x + 1;
  };

  // Begin walking
  walker(".", function (errorObject, fileName, fnNext) {
    if (errorObject) throw errorObject;

    if (fileName !== null) {
      // check if markdown file
      if (fileName.split(".").pop() == "ipynb") {
        console.log("File: " + fileName);
        count++;
      }
    }

    // all files have been read, fileName is null
    if (fileName === null) {
      return;
    }

    // call next(); when you want to proceed
    if (fnNext) fnNext();
  }); // end walking

  core.setOutput("count", count);
  console.log("Count: " + count.toString());
} catch (error) {
  core.setFailed(error.message);
}
