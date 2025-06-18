import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,

  reducers: {
    addtopaste: (state, action) => {

      

      const paste = action.payload;


      // Check for existing paste with same title
      const exists = state.pastes.some(item => item.title === paste.title);
      if (exists) {
        toast.error("Paste already created with this title");
        return;
      }

      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast("Paste created Sucessfully")
    },

    updatetopaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item.id === paste.id);

      if (index > 0) {
        state.pastes[index] = paste;

        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("paste Updated");
      }
    },

    resetallpaste: (state, action) => {
      state.pastes = [];

      localStorage.removeItem("pastes");
    },

    remvoefrompaste: (state, action) => {
      const pasteId = action.payload;

      console.log(pasteId);
      const index = state.pastes.findIndex((item) => item.id === paste.id);

      if (index > 0) {
        state.pastes.splice(index, 1);

        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste Deleted");
      }
    },

  },
})

// Action creators are generated for each case reducer function
export const { addtopaste, updatetopaste, resetallpaste, remvoefrompaste } = pasteSlice.actions

export default pasteSlice.reducer