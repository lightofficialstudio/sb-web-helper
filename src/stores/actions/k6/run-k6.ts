import { createAsyncThunk } from "@reduxjs/toolkit";

export const runPostmanCollection = createAsyncThunk(
  "api/k6/run",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/k6/run", { method: "POST" });
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
