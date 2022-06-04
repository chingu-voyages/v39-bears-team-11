// assign fs utility function to fs
const fs = require('fs');
// move build directory into the root folder
fs.renameSync('build', '../build');