import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationBar } from '../molecules/NavigationBar';
import format from 'date-fns/format';
import axios from 'axios';

export const ContactListItem = ({ id, type, title, content, updatedAt, createdAt }) => {
  const handleContactDelete = () => {
    const fetchData = async () => {
      try {
        const response = await axios.delete(`http://localhost:8080/api/contacts/${id}`);
        window.location.reload();
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  };

  const formattedCreate = format(new Date(createdAt), 'dd MMMM, HH:mm');
  const formattedUpdate = format(new Date(updatedAt), 'dd MMMM, HH:mm');

  return (
    <div className="mb-4 flex w-full items-center">
      <Link to={`/contact/${id}`} className="w-full">
        <div className="flex w-full items-end  justify-between rounded-md bg-slate-800 px-6 py-4">
          <div className="flex w-full items-end justify-start gap-5 ">
            <div>
              <div className="flex gap-3">
                <span className="flex items-center rounded-md bg-blue-500 p-1 px-2 text-xs font-bold text-blue-50">{type === 'Number' ? 'Number' : type === 'Email' ? 'Email ' : 'Fax'}</span>
                <p className=" text-2xl font-semibold text-blue-500">{title}</p>
              </div>
              <p className="mt-2 text-xl font-semibold text-slate-300">{content}</p>
            </div>
            <p className="mb-1 text-lg font-bold text-slate-700">.</p>
            <p className=" font text-lg text-slate-700">Created {formattedCreate}</p>

            {createdAt === updatedAt ? null : (
              <>
                <p className="mb-1 text-lg font-bold text-slate-700">.</p> <p className=" font text-lg text-slate-700">Updated {formattedUpdate}</p>
              </>
            )}
          </div>
        </div>
      </Link>
      <button className="btn-sm btn -ml-24 border border-rose-800 bg-slate-800 text-xs text-slate-300 hover:bg-rose-600 hover:text-rose-50" onClick={handleContactDelete}>
        Delete
      </button>
    </div>
  );
};
