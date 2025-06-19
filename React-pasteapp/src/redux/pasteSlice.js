import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

// 🔹 Load initial pastes from localStorage or fallback to empty array
const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    // 🔸 Add a new paste
    addToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        toast.error("Paste already exists");
        return;
      }

      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste added");
    },

    // 🔸 Update an existing paste
    updatePastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated");
      }
    },

    // 🔸 Remove a paste by ID
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste deleted");
      }
    },

    // 🔸 Reset all pastes
    resetPaste: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All pastes cleared");
    },
  },
});

// 🔹 Export all action creators
export const {
  addToPastes,
  removeFromPastes,
  updatePastes,
  resetPaste,
} = pasteSlice.actions;

// 🔹 Export the reducer
export default pasteSlice.reducer;
