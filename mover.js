var fs = require("fs-extra");
var findInFiles = require("find-in-files");

function getCompFolderPath(compPath, compFolder) {
  // file.* previx do not removed for usage while write file
  return `${compFolder}/${compPath
    .split("\\") // split file path by folders
    .slice(-2) // took folder name + file name
    .join("")}`; // join without comma
}

function move(path, folder, story) {
  fs.readFile(path, "utf-8", function (err, data) {
    if (err) throw err;

    // Regular expression to get data from TODO till end of styled component (`;)
    const searchValue = new RegExp(`(\/\/ TODO: ${story})(.*?)\`;`, "gms"); //gms;

    // Took exact content of styled-component
    const exportedComponent = data.match(searchValue);

    // Remove component from provided folder
    const newValue = data.replace(searchValue, "");

    // Move component to provided folder
    const componentFolderPath = getCompFolderPath(path, folder);
    fs.mkdirsSync(folder);
    fs.writeFile(
      componentFolderPath,
      exportedComponent,
      "utf-8",
      function (err) {
        if (err) throw err;
      }
    );

    // Remove todo with component
    fs.writeFile(path, newValue, "utf-8", function (err) {
      if (err) throw err;
      console.log(`${story} moved from ${path}`);
    });
  });
}

function moveComponent(story, destination) {
  findInFiles
    .find(`// TODO: ${story}`, "./src", ".js$")
    .then(function (results) {
      for (var result in results) {
        move(result, destination, story);
      }
    });
}

moveComponent(process.argv[2], process.argv[3]);
