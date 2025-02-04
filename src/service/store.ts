import { rootReducer } from "../redux/reducers";
import { configureStore } from "@reduxjs/toolkit";



const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        // getDefaultMiddleware({
        //     serializableCheck: false,
        // }),
        getDefaultMiddleware()
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
