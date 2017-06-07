let fileSystem = {
  1: {name: '/', parent: null, children: [2]},
  2: {name: 'Volumes', parent: 1, children: [3]},
  3: {name: 'Macintosh HD', parent: 2, children: [4]},
  4: {name: 'Users', parent: 3, children: [5]},
  5: {name: 'vinny', parent: 4, children: [6]},
  6: {name: 'Desktop', parent: 5, children: [7]},
  7: {name: 'message', parent: 6, data: 'THANKS FOR VISITING!'}
};

let currentDirectory = 6;
let path = [];

function navigateFileSystem(currentDirectory) {
  if (fileSystem[currentDirectory]['parent']) {
    path.unshift(fileSystem[currentDirectory]['name']);
    navigateFileSystem(fileSystem[currentDirectory]['parent']);
    return `${path.slice(0, 1)}${path.slice(1).join('/')}`;
  }
  else {
    console.log(currentDirectory)
    return path.unshift(fileSystem[currentDirectory]['name']);
  }
}

console.log(navigateFileSystem(currentDirectory));
