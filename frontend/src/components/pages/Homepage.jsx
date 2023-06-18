import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ContactListItem } from '../organisms/ContactListItem';
import { NavigationBar } from '../molecules/NavigationBar';
import { PageContent } from '../templates/PageContent';
import { Modal } from '../organisms/Modal';
import { AddContact } from '../organisms/AddContact';
export const Homepage = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/contacts');
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (isLoading || data.length === 0) {
    return <PageContent>No data yet</PageContent>;
  }

  return (
    <PageContent>
      <label htmlFor="my-modal-5" className=" btn-outline btn mb-5 rounded-lg border-0  border-blue-500 bg-blue-500  text-sm font-bold  text-slate-300   hover:bg-blue-600 hover:text-slate-100">
        Add contact
      </label>

      <Modal>
        <AddContact />
      </Modal>
      <>{data.length !== 0 ? data.map((contact, index) => <ContactListItem title={contact.title} key={contact.id} id={contact.id} content={contact.content} type={contact.contactType} createdAt={contact.createdAt} updatedAt={contact.createdAt} />) : <p>No data yet</p>}</>
    </PageContent>
  );
};
