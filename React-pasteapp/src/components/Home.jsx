import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addtopaste, updatetopaste } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchparam, setSearchparam] = useSearchParams();
  const pasteId = searchparam.get('pasteId');
  const dispacth = useDispatch();
  const allpaste = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allpaste.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispacth(updatetopaste(paste));
    } else {
      dispacth(addtopaste(paste));
    }

    setTitle('');
    setValue('');
    setSearchparam({});
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white bg-opacity-90 shadow-2xl rounded-2xl p-8 backdrop-blur-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {pasteId ? 'Edit Your Paste' : 'Create a New Paste'}
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
          <input
            className="w-full sm:w-2/3 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
            type="text"
            placeholder="Enter your title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            onClick={createPaste}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-md"
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
        </div>

        <textarea
          className="w-full h-64 p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-inner resize-none"
          value={value}
          placeholder="Enter content here..."
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Home;
