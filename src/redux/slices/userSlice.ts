import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the User type
interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

// Define the state type
interface UserState {
  user: User | null;
  token: string | null;
}

// Initial state
const initialState: UserState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// Export actions and reducer
export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
