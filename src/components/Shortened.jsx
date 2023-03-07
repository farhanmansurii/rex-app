
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { MdOutlineExpandMore, MdCopyAll, MdOutlineExpandLess } from 'react-icons/md'
import { mutate } from 'swr';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Shortened({ url, handleDelete }) {
  const [expanded, setexpanded] = useState(false)
  const notify = () => toast.success('Copied!', {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
  const handleCopyLink = (link) => {
    notify()
    navigator.clipboard.writeText(link)
      .then(() => {
        notify,
          console.log(`Link copied: ${link}`);
        // Optionally, you could show a success message to the user
      })
      .catch((error) => {
        console.error(`Failed to copy link: ${error}`);
        // Optionally, you could show an error message to the user
      });
  };


  return (
    <div className='w-full justify-between p-3 flex items-center rounded-3xl bg-black/20 '>
      <div className='flex flex-col gap-3 my-4 w-full' target={'_blank'} href={`https://rexdirect.vercel.app/${url.shortUrl}`} rel="noreferrer">
        <div className='flex items-center justify-between  '>

          <div className='flex items-center gap-5'>
            <div className='mx-2'>/{url.shortUrl}</div>

          </div>

          <div className='mx-2 flex items-center gap-4'>
            {
              !expanded ?
                <MdOutlineExpandMore onClick={() => setexpanded(!expanded)} className='bg-white/20 lg:w-10 w-8 h-8  cursor-pointer hover:scale-105 lg:h-10 p-2 rounded-full' />
                : <MdOutlineExpandLess onClick={() => setexpanded(!expanded)} className='bg-black/20 text-white cursor-pointer hover:scale-105 lg:w-10 w-8 h-8  lg:h-10 p-2 rounded-full' />
            }
            <a onClick={() => { handleCopyLink(`https://rexdirect.vercel.app/${url.shortUrl}`)}}   >
              <MdCopyAll className='bg-black/20 text-white lg:w-10 w-8 h-8 cursor-pointer hover:scale-105 lg:h-10 p-2 rounded-full' />
            </a>

            <svg onClick={() => handleDelete(url)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="lg:w-10 w-8 h-8 lg:h-10 rounded-full hover:scale-110 bg-red-500/20 p-2 duration-150">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>

          </div>
        </div>
        {expanded &&
          <div className='ease-in-out transition-transform flex flex-col gap-4 duration-150 '>
            <div className='mx-2 text-gray-500/80 flex-wrap break-all'>{url.originalUrl}</div>
            <div className='mx-2 text-white bg-black/20 rounded-full w-fit px-4 py-2'> Visits {url.clicks}</div>
          </div>
        }
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}
