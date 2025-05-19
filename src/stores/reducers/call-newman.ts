import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { runPostmanCollection } from "@stores/actions/call-newman";

interface NewmanState {
    loading: boolean;
    error: string;
    result: any; // ใช้ any ไปก่อน ถ้ามี type ที่แน่นอนสามารถเปลี่ยนได้
}

const initialState: NewmanState = {
    loading: false,
    error: "",
    result: null,
};

const newmanReducer = createSlice({
    name: "newman",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(runPostmanCollection.pending, (state) => {
                state.loading = true;
                state.error = "";
                state.result = null;
            })
            .addCase(runPostmanCollection.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.result = action.payload;
            })
            .addCase(runPostmanCollection.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "An unknown error occurred";
            });
    },
});

export default newmanReducer.reducer;
