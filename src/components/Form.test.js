import React from 'react';
import ReactDOM from 'react-dom';
import Form from './Form';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const noop = () => {};
  ReactDOM.render(<Form input='hi' handleChange={noop} handleSubmit={noop} />, div);
});
