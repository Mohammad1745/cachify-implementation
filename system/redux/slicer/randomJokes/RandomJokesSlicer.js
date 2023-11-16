import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    randomJokesData: null,
};

const randomJokesListSlicer = createSlice({
    name: "RandomJokesListSlicer",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.randomJokesData = action.payload;
        }
    },
});

export const randomJokesListAction = randomJokesListSlicer.actions;
export default randomJokesListSlicer.reducer;