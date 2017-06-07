import React from 'react';
import './Form.css';

function Form({handleChange, handleSubmit, input}) {
  return (
    <form onSubmit={handleSubmit} className="Form">
      <input type="text" value={input} onChange={handleChange} />
    </form>
  );
}

export default Form;
