import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeFromPastes } from "../redux/pasteSlice";
import { FormatDate } from "../utils/formatDate";
import Navbar from "../components/Navbar";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
    toast.success("Paste deleted successfully");
  };

  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen py-12 px-4 md:px-10 bg-[#0f172a] text-white">
        <div className="max-w-5xl mx-auto flex flex-col gap-y-8">
          {/* Search */}
          <input
            type="search"
            placeholder="Search pastes by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-[#1e293b] border border-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <div className="flex flex-col gap-5">
            <h2 className="text-3xl font-bold border-b pb-4 border-gray-700">
              All Pastes
            </h2>

            {filteredPastes.length > 0 ? (
              filteredPastes.map((paste) => (
                <div
                  key={paste._id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#1e293b] border border-gray-700 rounded-md p-5 gap-5 shadow-md"
                >
                  <div className="flex flex-col gap-2 sm:w-[60%]">
                    <h3 className="text-xl font-semibold text-white truncate">
                      {paste.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-3 max-w-[95%]">
                      {paste.content}
                    </p>
                  </div>

                  <div className="flex flex-col items-start sm:items-end gap-y-3 sm:w-[40%]">
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={`/?pasteId=${paste._id}`}
                        className="p-2 rounded-md border border-gray-600 hover:border-blue-500 transition"
                        title="Edit Paste"
                      >
                        <PencilLine className="text-gray-300 hover:text-blue-500" size={18} />
                      </a>
                      <button
                        onClick={() => handleDelete(paste._id)}
                        className="p-2 rounded-md border border-gray-600 hover:border-red-500 transition"
                        title="Delete Paste"
                      >
                        <Trash2 className="text-gray-300 hover:text-red-500" size={18} />
                      </button>
                      <a
                        href={`/pastes/${paste._id}`}
                        target="_blank"
                        className="p-2 rounded-md border border-gray-600 hover:border-yellow-500 transition"
                        title="View Paste"
                      >
                        <Eye className="text-gray-300 hover:text-yellow-500" size={18} />
                      </a>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(paste.content);
                          toast.success("Copied to Clipboard");
                        }}
                        className="p-2 rounded-md border border-gray-600 hover:border-green-500 transition"
                        title="Copy Content"
                      >
                        <Copy className="text-gray-300 hover:text-green-500" size={18} />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                      <Calendar size={16} />
                      <span>{FormatDate(paste.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-xl text-gray-500">No Pastes Found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Paste;
