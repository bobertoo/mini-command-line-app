import React, { Component } from 'react';
import Form from './Form';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      fileSystem: {disk0: {}},
      currentDirectory: {},
      path: [],
      input: '',
      output: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.operateOnInput = this.operateOnInput.bind(this);
    this.ls = this.ls.bind(this);
    this.cd = this.cd.bind(this);
    this.pwd = this.pwd.bind(this);
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
      case 'cd':
        this.setState({
          output: this.cd(input)
        })
        break;
      case 'ls':
        this.setState({
          output: this.ls(input, this.state.currentDirectory)
        })
        break;
      case 'pwd':
        this.setState({
          output: this.pwd(input, this.state.path)
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

  ls(input, currentDirectory) {
    if (Object.keys(currentDirectory).length !== 0) {
      let output = ''
      for (var item in currentDirectory) {
        output += item
        if (typeof(currentDirectory[item]) === 'object') {
          output += '/';
        }
        output += ' '
      }
      return output;
    }
    else {
      return 'empty directory';
    }
  }

  cd(input) {
    if (this.inputLength(input) === 2) {
      return 'you are now in this directory'
    }
    else {
      return 'invalid'
    }
  }

  pwd(input, path) {
    if (this.inputLength(input) > 1) {
      return 'invalid';
    }
    else {
      if (path.length === 0) {
        return '/'
      }
      else {
        return 'invalid'
      }
    }
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
