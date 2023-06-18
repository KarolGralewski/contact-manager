import React from 'react';
import { Link } from 'react-router-dom';

export const NavigationBar = () => {
  return (
    <Link to={'/'}>
      <div className="flex h-14 w-full items-center bg-slate-800 px-6 font-bold text-gray-200">Contact Manager</div>
    </Link>
  );
};
