import { configureStore } from "@reduxjs/toolkit";
import randomJokesSlicer from "./slicer/randomJokes/RandomJokesSlicer";
export const store = configureStore({
    reducer: {
        randomJokes: randomJokesSlicer,
    },
});
