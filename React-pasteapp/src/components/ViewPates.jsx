import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addtopaste, updatetopaste } from '../redux/pasteSlice';

const ViewPates = () => {

    const {id} = useParams();

    const allpaste = useSelector((state) => state.paste.pastes);

    const pasteArray = allpaste.filter((p) => p._id === id)[0];

  return (
    <div >
            <div className='flex flex-row gap-4 mt-3 place-content-between'>
            <input
                className='p-2 mt-2 rounded-2xl w-[66%] pl-6 border-amber-50 border-2'
                type='text'
                placeholder='Enter your title'
                value={pasteArray.title}
                disabled
                onChange={(e) => setTitle(e.target.value)}
            />

            {/* <button onClick={createPaste} className='p-2 mt-2 rounded-2xl'>
            {
                pasteId ? "Update My Paste" : "Create My Paste"
            }
            </button> */}

        </div>

        <div className='mt-4'>
            <textarea 
                className='rounded-2xl min-w-[500px] p-4 border-amber-50 border-2'
                value={pasteArray.content}
                disabled
                placeholder='Enter Content here'
                onChange={(e) => setValue(e.target.value)}
                rows={20}
            />
        </div>

        </div>
  )
}

export default ViewPates
