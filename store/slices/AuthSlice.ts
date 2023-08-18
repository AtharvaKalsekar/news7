import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';

import { deleteEntry } from '../../utils/AsyncStorage';
import { AuthApi } from '../apis/AuthApi';

export type AuthState = {
  name: string;
  email: string;
  id: string;
  token: string;
  isEmailVerified: boolean;
  isPasswordReset?: boolean;
};

const initialState: AuthState = {
  name: "",
  email: "",
  id: "",
  token: "",
  isEmailVerified: false,
  isPasswordReset: false,
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
      state.isPasswordReset = action.payload.isPasswordReset || false;
    },
    logout: (state: AuthState) => {
      state.email = "";
      state.name = "";
      state.id = "";
      state.token = "";
      state.isEmailVerified = false;
      state.isPasswordReset = false;
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
        state.isPasswordReset = false;
        // saveEntryAsJson("userData", payload);
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
        state.isPasswordReset = false;
        // saveEntryAsJson("userData", payload);
      }
    );
    builder.addMatcher(
      AuthApi.endpoints.login.matchRejected,
      (state, payload) => {
        console.log("Rejected login", { state, payload });
      }
    );

    builder.addMatcher(
      AuthApi.endpoints.verifyOtp.matchFulfilled,
      (state, { payload }) => {
        state.isEmailVerified = payload.isEmailVerified;
        // saveEntryAsJson("userData", payload);
      }
    );
    builder.addMatcher(
      AuthApi.endpoints.verifyOtp.matchRejected,
      (state, payload) => {
        console.log("Rejected verifyOtp", { state, payload });
      }
    );

    builder.addMatcher(
      AuthApi.endpoints.checkEmailExists.matchFulfilled,
      (state, { payload }) => {
        state.email = payload.email;
        state.token = payload.token;
        state.isEmailVerified = payload.isEmailVerified;
        state.isPasswordReset = true;
      }
    );
    builder.addMatcher(
      AuthApi.endpoints.checkEmailExists.matchRejected,
      (state, payload) => {
        console.log("Rejected checkEmailExists", { state, payload });
      }
    );

    builder.addMatcher(
      AuthApi.endpoints.setNewPassword.matchFulfilled,
      (state) => {
        state.isPasswordReset = false;
      }
    );
    builder.addMatcher(
      AuthApi.endpoints.checkEmailExists.matchRejected,
      (state, payload) => {
        console.log("Rejected setNewPassword", { state, payload });
      }
    );
  },
});

export const { setAuthState, logout } = AuthSlice.actions;
