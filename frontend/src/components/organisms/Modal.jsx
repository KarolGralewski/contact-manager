import React from 'react';

export const Modal = ({ children }) => {
  return (
    <div>
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box relative   w-full  max-w-sm bg-slate-900 px-9 shadow-xl lg:w-3/12">
          <label htmlFor="my-modal-5" className="btn-sm btn-circle btn absolute right-2 top-2 bg-slate-800 text-slate-400 hover:bg-slate-700">
            ✕
          </label>
          {children}
        </div>
      </div>
    </div>
  );
};
