const core = require("@actions/core");
const github = require("@actions/github");
//const walk = require("walk");
const walker = require("node-walker");

try {
  const dirToWalk = core.getInput("dir-to-walk");
  console.log(`Walking through: ${dirToWalk}`);
  const fileTypeToSeek = core.getInput("file-type-to-seek");
  console.log(`Looking for all: ${fileTypeToSeek}`);

  var count = 0;
  var results = [];

  // Begin walking
  walker(dirToWalk, function (errorObject, fileName, fnNext) {
    if (errorObject) throw errorObject;

    if (fileName !== null) {
      // check if markdown file
      if (fileName.split(".").pop() == "ipynb") {
        console.log("File: " + fileName);
        count++;
        results.push(fileName);
      }
    }

    // all files have been read, fileName is null
    if (fileName === null) {
      console.log("Count: " + count.toString());
      core.setOutput("count", count);

      results.forEach((result) => {
        console.log(result);
      });
      core.setOutput("results", results);
      return;
    }

    // call next(); when you want to proceed
    if (fnNext) fnNext();
  }); // end walking
} catch (error) {
  core.setFailed(error.message);
}
