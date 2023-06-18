import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ContactListItem } from '../organisms/ContactListItem';
import { NavigationBar } from '../molecules/NavigationBar';
import { PageContent } from '../templates/PageContent';
export const Homepage = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/contacts');
        setData(response);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    // fetchData();
  });

  return (
    <PageContent>
      <ContactListItem id="12" type="EMAIL" />
      <ContactListItem /> <ContactListItem type="NUMBER" />
      <ContactListItem />
    </PageContent>
  );
};
