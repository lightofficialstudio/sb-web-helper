import { createAsyncThunk } from "@reduxjs/toolkit";

export const runPostmanCollection = createAsyncThunk(
    "newman/runCollection",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("/api/run-postman", { method: "POST" });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.error || "Failed to run collection");
            }

            return data.run.executions;
        } catch (error: any) {
            return rejectWithValue(error.message || "Unexpected error");
        }
    }
);
