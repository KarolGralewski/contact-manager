import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageContent } from '../templates/PageContent';
import axios from 'axios';

export const Contact = () => {
  const routeParams = useParams();
  const [data, setData] = useState();
  const [updatedData, setUpdatedData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [invalidData, setInvalidData] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setUpdatedData({ ...updatedData, [input.name]: input.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/contacts/${routeParams.id}`);
        setData(response.data);
        setUpdatedData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [routeParams.id]);

  if (isLoading || !data) {
    return <p>No data</p>;
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/contacts/${routeParams.id}`, updatedData);

      setUpdatedData(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageContent>
      <div>
        <form className="flex flex-col gap-5 rounded-lg bg-slate-800 p-10" onSubmit={handleFormSubmit}>
          <h1 className="mb-3 text-xl font-semibold text-slate-300">Edit {data.title} Contact</h1>

          <div className="">
            <label className="label -mb-3">
              <span className="label-text text-base text-slate-300">Type the title of contact</span>
            </label>

            <input type="text" onChange={handleChange} value={updatedData.title || ''} required name="title" className="input-bordered input w-full  max-w-xs border-0 bg-slate-700 text-lg text-slate-200 placeholder:font-normal placeholder:text-slate-400" />
          </div>

          <label className="label -mb-3">
            <span className="label-text text-base text-slate-300">Pick the category</span>
          </label>
          <select className="input-bordered input w-full max-w-xs border-0 bg-slate-700 text-lg text-slate-200 placeholder:font-normal placeholder:text-slate-700" onChange={handleChange} value={updatedData.contactType} name="contactType">
            <option value="Number">Number</option>
            <option value="Email">Email</option>
            <option value="Fax">Fax</option>
          </select>

          <label className="label -mb-3">
            <span className="label-text text-base text-slate-300">Enter {updatedData.contactType && updatedData.contactType.toLowerCase()}</span>
          </label>

          {updatedData.contactType === 'Number' ? (
            <input
              onChange={handleChange}
              type="text"
              name="content"
              value={updatedData.content || ''}
              className="input-bordered input w-full  max-w-xs border-0 bg-slate-700 text-lg text-slate-200 placeholder:font-normal placeholder:text-slate-400"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          ) : (
            <input type="text" onChange={handleChange} name="content" value={updatedData.content || ''} className="input-bordered input w-full  max-w-xs border-0 bg-slate-700 text-lg text-slate-200 placeholder:font-normal placeholder:text-slate-400" />
          )}

          <button type="submit" className="btn-outline btn mb-4 mt-5 w-full rounded-lg border-2 border-blue-500 text-slate-300 hover:border-blue-500 hover:bg-blue-600 hover:text-slate-50">
            Edit Contact
          </button>
        </form>
      </div>
    </PageContent>
  );
};
