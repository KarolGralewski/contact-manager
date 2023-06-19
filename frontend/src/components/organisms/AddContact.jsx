import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const AddContact = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [invalidData, setInvalidData] = useState(false);

  const [data, setData] = useState({
    title: '',
    contactType: 'Number',
    content: '',
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  useEffect(() => {
    if (data.contactType === 'Number' && !/^\d+$/.test(data.content)) {
      setInvalidData(true);
    } else {
      setInvalidData(false);
    }

    setButtonDisabled(!data.title || !data.contactType || !data.content || invalidData);
  }, [data, invalidData]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:8080/api/contacts', data);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  };

  return (
    <div>
      <form className="flex flex-col gap-5">
        <h1 className="mb-3 text-xl font-semibold text-slate-300">Add Contact</h1>

        <div className="">
          <label className="label -mb-3">
            <span className="label-text text-base text-slate-300">Type the title of contact</span>
          </label>

          <input onChange={handleChange} type="text" required name="title" placeholder="Type here" className="input-bordered input w-full  max-w-xs border-0 bg-slate-800 text-lg text-slate-200 placeholder:font-normal placeholder:text-slate-700" />
        </div>

        <label className="label -mb-3">
          <span className="label-text text-base text-slate-300">Pick the category</span>
        </label>
        <select className="input-bordered input w-full  max-w-xs border-0 bg-slate-800 text-lg text-slate-200 placeholder:font-normal placeholder:text-slate-700" name="contactType" onChange={handleChange}>
          <option default className=" bg-slate-800 ">
            Number
          </option>
          <option className=" bg-slate-800 ">Email</option>
          <option className=" bg-slate-800 ">Fax</option>
        </select>

        <label className="label -mb-3">
          <span className="label-text text-base text-slate-300">Enter {data.contactType.toLowerCase()}</span>
        </label>

        {data.contactType === 'Number' ? (
          <input
            onChange={handleChange}
            type="text"
            name="content"
            placeholder="Type here"
            className="input-bordered input w-full  max-w-xs border-0 bg-slate-800 text-lg text-slate-200 placeholder:font-normal placeholder:text-slate-700"
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
        ) : (
          <input onChange={handleChange} type="text" name="content" placeholder="Type here" className="input-bordered input w-full  max-w-xs border-0 bg-slate-800 text-lg text-slate-200 placeholder:font-normal placeholder:text-slate-700" />
        )}

        <button onClick={handleContactSubmit} disabled={buttonDisabled} className="btn-outline btn mb-4 mt-5 w-full rounded-lg border-2 border-blue-500 text-slate-300 hover:border-blue-500 hover:bg-blue-600 hover:text-slate-50">
          Add Contact
        </button>
      </form>
    </div>
  );
};
