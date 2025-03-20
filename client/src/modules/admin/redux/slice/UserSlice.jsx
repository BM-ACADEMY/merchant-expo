import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  users: [],
  userDetails: null,
  loading: false,
  error: null,
};


// Fetch all users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Fetch single user by ID
export const fetchUserByUserId = createAsyncThunk("users/fetchUserByUserId", async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Add new user
export const addUser = createAsyncThunk("users/addUser", async (newUser, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_URL, newUser);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Update user
export const updateUser = createAsyncThunk("users/updateUser", async (user, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/${user.id}`, user);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Delete user
export const deleteUser = createAsyncThunk("users/deleteUser", async (userId, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${userId}`);
    return userId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.loading = true; })
      .addCase(fetchUsers.fulfilled, (state, action) => { state.loading = false; state.users = action.payload; })
      .addCase(fetchUsers.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      
      .addCase(fetchUserByUserId.fulfilled, (state, action) => { state.userDetails = action.payload; })

      .addCase(addUser.fulfilled, (state, action) => { state.users.push(action.payload); })
      
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        
        if (index !== -1) state.users[index] = action.payload;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
