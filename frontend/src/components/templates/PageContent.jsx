import React from 'react';
import { NavigationBar } from '../molecules/NavigationBar';

export const PageContent = ({ children }) => {
  return (
    <div className="h-auto  min-h-screen   w-full  items-center bg-slate-900">
      <NavigationBar />
      <div className=" flex h-auto  min-h-screen flex-col items-center px-6 py-5 text-5xl text-slate-800">{children}</div>
    </div>
  );
};
