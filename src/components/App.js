import React, { Component } from 'react';
import Form from './Form';
import Help from './Help';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      fileSystem: {
        1: {name: '/', parent: null, children: [2]},
        2: {name: 'Volumes', parent: 1, children: [3]},
        3: {name: 'Macintosh_HD', parent: 2, children: [4]},
        4: {name: 'Users', parent: 3, children: [5]},
        5: {name: 'vinny', parent: 4, children: [6]},
        6: {name: 'Desktop', parent: 5, children: [7, 8]},
        7: {name: 'message', parent: 6, data: 'THANKS FOR VISITING!'},
        8: {name: 'desktop_stuff', parent: 6, children: []}
      },
      currentDirectory: 6,
      nextIndex: 9,
      input: '',
      output: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.operateOnInput = this.operateOnInput.bind(this);
    this.help = this.help.bind(this);
    this.ls = this.ls.bind(this);
    this.cd = this.cd.bind(this);
    this.pwd = this.pwd.bind(this);
    this.mkdir = this.mkdir.bind(this);
    this.touch = this.touch.bind(this);
    this.echo = this.echo.bind(this);
    this.cat = this.cat.bind(this);
    this.inputLength = this.inputLength.bind(this);
  }

  handleChange(e) {
    this.setState({
      input: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.operateOnInput(this.state.input);
    this.setState({input: ''});
  }

  operateOnInput(input) {
    const command = input.split(' ')[0]
    switch (command) {
      case 'echo':
      case 'help':
      case 'ls':
      case 'cd':
      case 'pwd':
      case 'mkdir':
      case 'touch':
      case 'cat':
        this.setState({
          output: this[command]()
        })
        break;
      default:
        this.setState({
          output: 'invalid input! try again!'
        })
    }
  }

  inputLength() {
    return this.state.input.split(' ').length
  }

  help() {
    return <Help />
  }

  ls() {
    const fileSystem = this.state.fileSystem;
    const currentDirectory = this.state.currentDirectory;

    if (this.inputLength() !== 1) {
      return 'invalid. this ls does not take arguments';
    }
    else {
      if (fileSystem[currentDirectory]['children'].length !== 0) {
        let output = fileSystem[currentDirectory]['children'].map((child) => {
          let printChild = `${fileSystem[child]['name']}`;
          fileSystem[child]['children'] ? printChild += '(directory)' : printChild += '(file)'
          return printChild;
        });
        return output.join(' | ');
      }
      else {
        return 'empty directory';
      }
    }
  }

  cd() {
    const input = this.state.input;
    const currentDirectory = this.state.currentDirectory;
    const fileSystem = this.state.fileSystem;

    if (this.inputLength() === 2) {
      if (input.split(' ')[1] === '..') {
        if (fileSystem[currentDirectory]['parent']) {
          this.setState({currentDirectory: fileSystem[currentDirectory]['parent']});
          return `you are now in ${fileSystem[fileSystem[currentDirectory]['parent']]['name']}`;
        }
        else {
          return 'you are already in the root directory';
        }
      }
      else {
        let nextIndex = fileSystem[currentDirectory]['children'].findIndex((child) =>
          fileSystem[child].name === input.split(' ')[1]
        )
        if (nextIndex > -1) {
          let nextDirectory = fileSystem[currentDirectory]['children'][nextIndex]
          if (fileSystem[nextDirectory].hasOwnProperty('children')) {
            this.setState({currentDirectory: nextDirectory});
            return `you are now in ${fileSystem[nextDirectory]['name']}`;
          }
          else {
            return 'you can not cd into a file';
          }
        }
        else {
          return 'invalid option';
        }
      }
    }
    else {
      return 'invalid amount of arguments';
    }
  }

  pwd() {
    const currentDirectory = this.state.currentDirectory;
    const fileSystem = this.state.fileSystem;

    if (this.inputLength() === 1) {
      let directoryId = currentDirectory;
      let path = [fileSystem[directoryId]['name']];
      while (fileSystem[directoryId]['parent']) {
        path.unshift(fileSystem[fileSystem[directoryId]['parent']]['name']);
        directoryId = fileSystem[directoryId]['parent'];
      }
      let result = path;
      if (result.length > 1){
        return `${result[0]}${result.slice(1).join('/')}`;
      }
      else {
        return result[0];
      }
    }
    else {
      return 'invalid! this command doesn\'t take any arguments';
    }
  }

  mkdir() {
    const input = this.state.input;
    const nextIndex = this.state.nextIndex;
    const currentDirectory = this.state.currentDirectory;
    const fileSystem = this.state.fileSystem;

    if (this.inputLength() !== 2 ) {
      return 'invalid! this mkdir only supports 1 argument.';
    }
    else {
      let argument = input.split(' ')[1];
      let newDirectory = {};
      let updateParent = {};
      updateParent[currentDirectory] = {
        ...fileSystem[currentDirectory],
        children: [...fileSystem[currentDirectory]['children'], nextIndex]
      }
      newDirectory[nextIndex] = {name: argument, parent: currentDirectory, children: []};
      this.setState({
        fileSystem: {...fileSystem, ...newDirectory, ...updateParent },
        nextIndex: nextIndex + 1
      })
      return `created new directory called ${argument}`;
    }
  }

  touch() {
    const input = this.state.input;
    const nextIndex = this.state.nextIndex;
    const currentDirectory = this.state.currentDirectory;
    const fileSystem = this.state.fileSystem;
    if (this.inputLength() !== 2 ) {
      return 'invalid! this mkdir only supports 1 argument.';
    }
    else {
      let argument = input.split(' ')[1];
      let newFile = {};
      let updateParent = {};
      updateParent[currentDirectory] = {
        ...fileSystem[currentDirectory],
        children: [...fileSystem[currentDirectory]['children'], nextIndex]
      }
      newFile[nextIndex] = {name: argument, parent: currentDirectory, data: ''};
      this.setState({
        fileSystem: {...fileSystem, ...newFile, ...updateParent },
        nextIndex: nextIndex + 1
      })
      return `created new file called ${argument}`;
    }
  }

  echo() {
    return this.state.input.split(' ').slice(1).join(' ');
  }

  cat() {
    const input = this.state.input;
    const currentDirectory = this.state.currentDirectory;
    const fileSystem = this.state.fileSystem;

    if (this.inputLength() !== 2) {
      return 'accepts only one argument';
    }
    else {
      let argument = input.split(' ')[1];
      let findFile = fileSystem[currentDirectory]['children'].findIndex((child) =>
        fileSystem[child].name === argument
      )
      if (findFile >= 0) {
        return fileSystem[fileSystem[currentDirectory]['children'][findFile]]['data'];
      }
      else {
        return `file not found`;
      }
    }
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          Welcome to the mini command line app.
        </p>
        <p>type `help` to see command list</p>
        <Form
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          input={this.state.input}
        />
        {this.state.output}
      </div>
    );
  }
}

export default App;
