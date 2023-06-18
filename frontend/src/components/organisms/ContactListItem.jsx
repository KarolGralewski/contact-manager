import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationBar } from '../molecules/NavigationBar';

export const ContactListItem = ({ id, type }) => {
  return (
    <div className="mb-4 flex w-full items-center">
      <Link to={`/contact/${id}`} className="w-full">
        <div className="flex w-full items-end  justify-between rounded-md bg-slate-800 px-6 py-4">
          <div className="flex w-full items-end justify-start gap-10  ">
            <div>
              <div className="flex gap-3">
                <span className="flex items-center rounded-md bg-blue-500 p-1 px-2 text-xs font-bold text-blue-50">{type === 'NUMBER' ? 'Number' : type === 'EMAIL' ? 'Email ' : 'Fax'}</span>
                <p className=" text-2xl font-semibold text-blue-500">Janek</p>
              </div>
              <p className="mt-2 text-xl font-semibold text-slate-300">+48 721 238 129</p>
            </div>
            <p className="mb-1 text-lg font-bold text-slate-600">.</p>
            <p className="text-lg font-semibold text-slate-300">Created at 23 Marca, 2023</p>
            <p className="mb-1  text-lg font-bold text-slate-600">.</p>
            <p className="text-lg font-semibold text-slate-300">Updated at 12 Lipca, 2023 </p>
          </div>
        </div>
      </Link>
      <button className="btn-sm btn -ml-24 border border-rose-800 bg-slate-800 text-xs text-slate-300 hover:bg-rose-600 hover:text-rose-50">Delete</button>
    </div>
  );
};
