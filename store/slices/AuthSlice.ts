import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";

import { deleteEntry, saveEntryAsJson } from "../../utils/AsyncStorage";
import { AuthApi } from "../apis/AuthApi";

export type AuthState = {
  name: string;
  email: string;
  id: string;
  token: string;
  isEmailVerified: boolean;
};

const initialState: AuthState = {
  name: "",
  email: "",
  id: "",
  token: "",
  isEmailVerified: false,
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setAuthState: (state: AuthState, action: { payload: AuthState }) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.isEmailVerified = action.payload.isEmailVerified;
    },
    logout: (state: AuthState) => {
      state.email = "";
      state.name = "";
      state.id = "";
      state.token = "";
      state.isEmailVerified = false;
      deleteEntry("userData");
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder.addMatcher(
      AuthApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.email = payload.email;
        state.name = payload.name;
        state.id = payload.id;
        state.token = payload.token;
        state.isEmailVerified = payload.isEmailVerified;
        saveEntryAsJson("userData", payload);
      }
    );
    builder.addMatcher(
      AuthApi.endpoints.register.matchRejected,
      (state, payload) => {
        console.log("Rejected register", { state, payload });
      }
    );
    builder.addMatcher(
      AuthApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.email = payload.email;
        state.name = payload.name;
        state.id = payload.id;
        state.token = payload.token;
        state.isEmailVerified = payload.isEmailVerified;
        saveEntryAsJson("userData", payload);
      }
    );
    builder.addMatcher(
      AuthApi.endpoints.login.matchRejected,
      (state, payload) => {
        console.log("Rejected login", { state, payload });
      }
    );
  },
});

export const { setAuthState, logout } = AuthSlice.actions;
