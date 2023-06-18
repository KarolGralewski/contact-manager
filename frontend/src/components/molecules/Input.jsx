import React from 'react';

export const Input = ({ isNumeric, handleChange }) => {
  return <input onChange={handleChange} type="text" name="content" placeholder="Type here" className="input-bordered input w-full  max-w-xs border-0 bg-slate-800 text-lg text-slate-200 placeholder:font-normal placeholder:text-slate-700" id="numericInput" />;
};
