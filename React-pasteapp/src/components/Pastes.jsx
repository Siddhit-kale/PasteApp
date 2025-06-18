import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { remvoefrompaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Pastes = () => {

    // const paste = useSelector((state) => state.paste.pastes);
    // console.log(paste);

    const pastes = useSelector((state) => state.paste.pastes);
    const [searchterm, setsearchterm] = useState('');
    const dispatch = useDispatch();

    const filteredData = pastes.filter(
        (paste) =>
            paste.title && paste.title.toLowerCase().includes(searchterm.toLowerCase())
    );

    function handledelte(pasteId) {
        dispatch(remvoefrompaste(pasteId));
    }

    return (
        <div>
            <div>
                <input
                    className='p-2 rounded-2xl w-[600px] mt-5  border-amber-50 border-2'
                    type='text'
                    placeholder='search here'
                    value={searchterm}
                    onChange={(e) => setsearchterm(e.target.value)}
                />
            </div>

            <div className='flex flex-col gap-5 mt-4'>
                {
                    filteredData.length > 0 &&
                    filteredData.map(
                        (pastes) => {
                            return (
                                <div className='border p-3' key={pastes?._id}>
                                    <div>
                                        {pastes.title}
                                    </div>
                                    <div>
                                        {pastes.content}
                                    </div>
                                    <div className='flex flex-row place-content-evenly'>

                                        <button>
                                            <a href={`/?pasteId=${pastes?._id}`}>
                                                Edit
                                            </a>
                                        </button>


                                        <button onClick={() => handledelte(pastes?._id)}>
                                            Delete
                                        </button>

                                        <button>
                                            <a href={`/pastes/${pastes?._id}`}>
                                                View
                                            </a>
                                        </button>

                                        <button>
                                            Share
                                        </button>

                                        <button onClick={() => {
                                            navigator.clipboard.writeText(pastes?.content)
                                            toast.success("Copied to clipborad")
                                        }}>
                                            Copy
                                        </button>

                                    </div>

                                    <div>
                                        {pastes.createdAt}
                                    </div>

                                </div>
                            )
                        }
                    )
                }
            </div>

        </div>
    )
}

export default Pastes
