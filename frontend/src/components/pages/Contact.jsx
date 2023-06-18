import React from 'react';
import { useParams } from 'react-router-dom';
import { NavigationBar } from '../molecules/NavigationBar';
import { PageContent } from '../templates/PageContent';

export const Contact = () => {
  const routeParams = useParams();

  return <PageContent>{routeParams.id}</PageContent>;
};
