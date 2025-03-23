import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./entities/userEntity";
import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from "../common/utils/localStorage";

export enum AuthStatus {
  LOADING = "loading",
  AUTHENTICATED = "authenticated",
  UNAUTHENTICATED = "unauthenticated",
}

export interface AuthState {
  user: User | null;
  status: AuthStatus;
}

const initialState: AuthState = {
  user: null,
  status: AuthStatus.UNAUTHENTICATED,
};

const persistedUser = getLocalStorage<User>("user");
const initialStateFromLocalStorage = persistedUser
  ? { user: persistedUser, status: AuthStatus.AUTHENTICATED }
  : initialState;

const authSlice = createSlice({
  name: "auth",
  initialState: initialStateFromLocalStorage,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.status = AuthStatus.AUTHENTICATED;
      setLocalStorage<User>("user", action.payload);
    },
    logout(state) {
      state.user = null;
      state.status = AuthStatus.UNAUTHENTICATED;
      removeLocalStorage("user");
    },
    loading(state) {
      state.status = AuthStatus.LOADING;
    },
  },
});

export const { login, logout, loading } = authSlice.actions;
export default authSlice.reducer;
