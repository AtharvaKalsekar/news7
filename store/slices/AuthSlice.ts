import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';

import { AuthApi } from '../apis/AuthApi';

type AuthState = {
  name: string;
  email: string;
  id: string;
  token: string;
};

const initialState: AuthState = {
  name: "",
  email: "",
  id: "",
  token: "",
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder.addMatcher(
      AuthApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.email = payload.email;
        state.name = payload.name;
        state.id = payload.id;
        state.token = payload.token;
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
