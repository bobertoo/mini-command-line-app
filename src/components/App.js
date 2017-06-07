import React, { Component } from 'react';
import Form from './Form';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      fileSystem: {
        1: {name: '/', parent: null, children: [2]},
        2: {name: 'Volumes', parent: 1, children: [3]},
        3: {name: 'Macintosh HD', parent: 2, children: [4]},
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
    this.operateOnInput(this.state.input)
  }

  operateOnInput(input) {
    const command = input.split(' ')[0]
    switch (command) {
      case 'help':
        this.setState({
          output: this.help()
        })
        break;
      case 'cd':
        this.setState({
          output: this.cd(input)
        })
        break;
      case 'ls':
        this.setState({
          output: this.ls(input, this.state.currentDirectory, this.state.fileSystem)
        })
        break;
      case 'pwd':
        this.setState({
          output: this.pwd(input)
        })
        break;
      case 'mkdir':
        this.setState({
          output: this.mkdir(input, this.state.fileSystem)
        })
        break;
      case 'touch':
        this.setState({
          output: this.touch(input, this.state.fileSystem)
        })
        break;
      case 'echo':
        this.setState(  {
          output: this.echo(input)
        })
        break;
      case 'cat':
        this.setState({
          output: this.cat(input, this.state.fileSystem)
        })
        break;
      default:
        this.setState({
          output: 'invalid input! try again!'
        })
    }
  }

  inputLength(input) {
    return input.split(' ').length
  }

  help() {
    return 'this is how you use this app';
  }

  ls(input, currentDirectory, fileSystem) {
    if (fileSystem[currentDirectory]['children'].length !== 0) {
      let output = fileSystem[currentDirectory]['children'].map((child) => {
        let printChild = `${fileSystem[child]['name']} type=`;
        fileSystem[child]['children'] ? printChild += 'directory' : printChild += 'file'
        return printChild;
      });
      return output.join(' | ');
    }
    else {
      return 'empty directory';
    }
  }

  cd(input) {
    if (this.inputLength(input) === 2) {
      return 'you are now in this directory';
    }
    else {
      return 'invalid';
    }
  }

  pwd(input, path) {
    if (this.inputLength(input) > 1) {
      return 'invalid';
    }
    else {
      if (path.length === 0) {
        return '/';
      }
      else {
        return 'invalid';
      }
    }
  }

  mkdir(input, path, fileSystem) {
    if (this.inputLength(input) > 2) {
      return 'invalid! this mkdir only supports 1 argument.';
    }
    else {
      let argument = input.split(' ')[1];
      if (path.length > 0) {
        let directory = fileSystem;
        let directoryArr = path.map((walkUp) => directory = directory[walkUp]);
        directoryArr.forEach

      }
      return 'mkdir';
    }
  }

  touch() {
    return 'touch';
  }

  echo() {
    return 'echo';
  }

  cat() {
    return 'cat';
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          Welcome to the mini command line app.
        </p>
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
