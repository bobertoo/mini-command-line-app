import React from 'react';
import './Form.css';

function Form({handleChange, handleSubmit, input}) {
  return (
    <form onSubmit={handleSubmit} className="Form">
      <input type="text" value={input} onChange={handleChange} placeholder='enter command here (type help if confused)' />
    </form>
  );
}

export default Form;
