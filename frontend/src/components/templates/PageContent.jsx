import React from 'react';
import { NavigationBar } from '../molecules/NavigationBar';

export const PageContent = ({ children }) => {
  return (
    <div className=" h-screen w-full bg-slate-900">
      <NavigationBar />
      <div className="mt-6 px-6">{children}</div>
    </div>
  );
};
