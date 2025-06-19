import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const ViewPaste = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.pastes);

  const paste = pastes.find((p) => p._id === id);

  if (!paste) return null;

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-[#0f172a] text-white py-12 px-4 md:px-10">
        <div className="max-w-4xl mx-auto flex flex-col gap-y-6">
          <input
            type="text"
            value={paste.title}
            disabled
            className="w-full text-xl font-semibold bg-[#1e293b] border border-gray-600 rounded-md p-3 text-white placeholder:text-gray-400"
          />

          <div className="relative w-full flex flex-col rounded-md bg-[#1e293b] border border-gray-600">
            <div className="flex justify-between items-center border-b border-gray-600 px-4 py-2">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(paste.content);
                  toast.success("Copied to Clipboard");
                }}
                className="text-gray-300 hover:text-green-400 transition"
                title="Copy Paste Content"
              >
                <Copy size={20} />
              </button>
            </div>

            <textarea
              value={paste.content}
              disabled
              rows={20}
              className="w-full bg-transparent p-4 text-gray-200 resize-none focus:outline-none"
              placeholder="No content to display."
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPaste;
