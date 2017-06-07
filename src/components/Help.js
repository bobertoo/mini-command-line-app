import React from 'react';
import './Help.css';

function Help() {
  return (
    <div className='Help'>
      <ul>
        <li>`ls` - lists directory contents - takes no arguments</li>
        <li>`cd` - change directory - takes 1 argument that is name of child directory or `..` to go back to parent directory</li>
        <li>`pwd` - prints full path to current directory - takes no arguments</li>
        <li>`mkdir` - creates a new directory inside current directory - takes 1 argument to name the directory</li>
        <li>`touch` - creates a new file inside current directory - takes 1 argument to name the file</li>
        <li>`echo` - repeats what is typed in after command - takes as many arguments as you want to give it</li>
        <li>`cat` - prints file content to output - takes 1 argument that is the name of the file</li>
      </ul>
    </div>
  );
}

export default Help;
