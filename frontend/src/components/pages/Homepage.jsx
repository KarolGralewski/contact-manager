import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ContactListItem } from '../organisms/ContactListItem';
import { NavigationBar } from '../molecules/NavigationBar';
import { PageContent } from '../templates/PageContent';
import { Modal } from '../organisms/Modal';
import { AddContact } from '../organisms/AddContact';

export const Homepage = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sortType, setSortType] = useState('');

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

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEnterDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    try {
      let url = 'http://localhost:8080/api/contacts';

      if (searchQuery) {
        url += `?title=${searchQuery}`;
      }

      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSort = async (e) => {
    const selectedSortType = e.target.value.toLowerCase();
    setSortType(selectedSortType);

    try {
      let url = 'http://localhost:8080/api/contacts';

      if (selectedSortType !== 'unsorted') {
        url += `/sorted/${selectedSortType}`;
      }

      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <PageContent>
        <label htmlFor="my-modal-5" className="btn-outline btn mb-5 rounded-full border-0 border-blue-500 bg-blue-500 text-sm font-bold text-slate-300 hover:bg-blue-600 hover:text-slate-100">
          Add contact
        </label>

        <Modal>
          <AddContact />
        </Modal>
      </PageContent>
    );
  }

  return (
    <PageContent>
      <Modal>
        <AddContact />
      </Modal>

      <div className="flex w-full justify-between">
        <div>
          <label htmlFor="my-modal-5" className="btn rounded-lg border-0 border-blue-500 bg-blue-500 px-4 text-sm font-bold text-slate-300 hover:bg-blue-600 hover:text-slate-100">
            Add new
          </label>

          <select className="input-bordered input ml-5 max-w-xs  border-0 bg-slate-800 px-5 text-lg text-slate-200 placeholder:font-normal placeholder:text-slate-700" onChange={handleSort} value={sortType}>
            <option disabled value="">
              Sort By
            </option>
            <option value="title">Title</option>
            <option value="type">Type</option>
            <option value="unsorted">Unsorted</option>
          </select>
        </div>

        <div className="mb-5 flex gap-5">
          <input type="text" name="content" value={searchQuery} onChange={handleChange} onKeyDown={handleEnterDown} placeholder="Search by Title" className="input-bordered input h-12 w-full border-0 bg-slate-800 text-lg text-slate-200 placeholder:font-normal placeholder:text-slate-600" />
          <button onClick={handleSearch} className="btn bg-slate-800 text-slate-400 hover:border-blue-600 hover:bg-blue-600 hover:text-blue-50">
            Search
          </button>
        </div>
      </div>

      {data.length !== 0 ? data.map((contact) => <ContactListItem title={contact.title} key={contact.id} id={contact.id} content={contact.content} type={contact.contactType} createdAt={contact.createdAt} updatedAt={contact.updatedAt} />) : <p>No data match</p>}
    </PageContent>
  );
};
