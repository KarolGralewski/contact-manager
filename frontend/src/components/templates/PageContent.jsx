import React from 'react';
import { NavigationBar } from '../molecules/NavigationBar';

export const PageContent = ({ children }) => {
  return (
    <div className="  h-auto w-full  items-end bg-slate-900">
      <NavigationBar />
      <div className=" flex  h-screen flex-col items-end px-6 py-5 text-5xl text-slate-800">{children}</div>
    </div>
  );
};
