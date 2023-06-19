import React from 'react';
import { Link } from 'react-router-dom';

export const NavigationBar = () => {
  return (
    <div className="flex h-16 items-center justify-between bg-slate-800 px-6 ">
      <Link to={'/'}>
        <div className="font-bold text-gray-200">Contact Manager</div>
      </Link>
    </div>
  );
};
