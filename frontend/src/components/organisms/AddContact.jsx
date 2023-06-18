import React from 'react';
import { useState } from 'react';
import { NumericInput } from '../molecules/NumericInput';

export const AddContact = () => {
  const [data, setData] = useState({
    title: '',
    category: '',
    content: '',
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  console.log(data);

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
        <select className="input-bordered input w-full  max-w-xs border-0 bg-slate-800 text-lg text-slate-200 placeholder:font-normal placeholder:text-slate-700" name="category" onChange={handleChange}>
          <option default className=" bg-slate-800 ">
            Number
          </option>
          <option className=" bg-slate-800 ">Email</option>
          <option className=" bg-slate-800 ">FAX</option>
        </select>

        <label className="label -mb-3">
          <span className="label-text text-base text-slate-300">Enter {data.category.toLowerCase()}</span>
        </label>

        {data.category === 'Number' ? <NumericInput onChange={handleChange} /> : <p>asd</p>}

        <label htmlFor="my-modal-5" className="btn-outline btn mb-4 mt-5 w-full rounded-lg border-2 border-blue-500 text-slate-300 hover:border-blue-500 hover:bg-blue-600 hover:text-slate-50">
          Add exercise
        </label>
      </form>
    </div>
  );
};
