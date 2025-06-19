import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updatePastes, resetPaste } from '../redux/pasteSlice';
import { Copy, PlusCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchparam, setSearchparam] = useSearchParams();
  const pasteId = searchparam.get('pasteId');

  const dispatch = useDispatch();
  const allpaste = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allpaste.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allpaste]);

  function createPaste() {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updatePastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle('');
    setValue('');
    setSearchparam({});
  }

  function handleReset() {
    dispatch(resetPaste());
    setTitle('');
    setValue('');
    setSearchparam({});
  }

  return (
    <>
      <Navbar />

      <div className="w-full min-h-screen py-12 px-4 md:px-10 bg-[#0f172a] text-white">
        <div className="max-w-4xl mx-auto flex flex-col gap-y-8">
          {/* Header Inputs */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <input
              type="text"
              placeholder="Enter a title for your paste"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full md:w-[60%] p-3 rounded-md bg-[#1e293b] text-white placeholder:text-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <div className="flex gap-2">
              <button
                onClick={createPaste}
                className="px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition font-medium text-white"
              >
                {pasteId ? 'Update Paste' : 'Create Paste'}
              </button>
              {pasteId && (
                <button
                  onClick={handleReset}
                  className="px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition"
                >
                  <PlusCircle size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Paste Editor */}
          <div className="bg-[#1e293b] border border-gray-600 rounded-md overflow-hidden shadow-lg">
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-[#111827]">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="w-3 h-3 bg-yellow-400 rounded-full" />
                <span className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  toast.success('Copied to Clipboard', { position: 'top-right' });
                }}
                className="text-gray-300 hover:text-green-400"
              >
                <Copy size={18} />
              </button>
            </div>

            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Write your paste here..."
              rows={16}
              className="w-full p-4 bg-[#1e293b] text-white placeholder:text-gray-500 focus:outline-none resize-none"
              style={{ caretColor: '#00FF00' }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
