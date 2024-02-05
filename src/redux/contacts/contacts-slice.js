import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addName: {
      prepare: data => {
        return { payload: { ...data } };
      },
      reducer: (state, { payload }) => [...state, payload],
    },
    deleteName: (state, { payload }) =>
      state.filter(contact => contact.id !== payload),
  },
});

export const { addName, deleteName } = contactsSlice.actions;
export default contactsSlice.reducer;
