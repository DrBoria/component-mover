var fs = require("fs-extra");
var findInFiles = require("find-in-files");

function getCompFolderPath(compPath, compFolder) {
  // file.* previx do not removed for usage while write file
  return `${compFolder}/${compPath
    .split("\\") // split file path by folders
    .slice(-2) // took folder name + file name
    .join("")}`; // join without comma
}

// If you need you can add everything you want to import instead styled-components
function replaceDeclarationWithExportDefault(exportedComponent) {
  return exportedComponent[0]             // Took component
    .match(new RegExp("=(.*)", "gms"))[0] // Took all data after declaration
    .replace(                             // Add export default and styled components instead declaration
      "=",
      `
    import styled from 'styled-components';
    export default
    `
    ); 
}

function move(path, destination, story, fileExtension) {
  fs.readFile(path, "utf-8", function (err, data) {
    if (err) throw err;

    // Regular expression to get data from TODO till end of styled component (`;)
    const searchValue = new RegExp(`(\/\/ TODO: ${story})(.*?)\`;`, "gms");

    // Took exact content of styled-component
    const exportedComponent = data.match(searchValue);

    const newExportedComponent = replaceDeclarationWithExportDefault(
      exportedComponent
    );

    // Move component to provided folder
    const componentFolderPath = getCompFolderPath(path, destination);
    fs.mkdirsSync(destination);
    fs.writeFile(
      componentFolderPath,
      newExportedComponent,
      "utf-8",
      function (err) {
        if (err) throw err;
      }
    );

    // Replace component from destination folder with import
    const newValue = data.replace(
      searchValue,
      `import ${story.split(":")[1]} from '${componentFolderPath
        .replace("src/", "")
        .replace(`.${fileExtension}`, "")}';
        export {${story.split(":")[1]}};
        `
    );

    // Remove todo with component
    fs.writeFile(path, newValue, "utf-8", function (err) {
      if (err) throw err;
      console.log(`${story} moved from ${path}`);
    });
  });
}

function moveComponent(
  story,
  destination,
  fileExtension,
  searchDirectory = "./src"
) {
  findInFiles
    .find(`// TODO: ${story}`, searchDirectory, `.${fileExtension}$`)
    .then(function (results) {
      for (var result in results) {
        move(result, destination, story, fileExtension);
      }
    });
}

moveComponent(
  process.argv[2],
  process.argv[3],
  process.argv[4],
  process.argv[5]
);
