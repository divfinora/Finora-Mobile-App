import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  queue: [],
};

const alertSlice = createSlice({
  name: "alert",

  initialState,

  reducers: {

    /* =============================== */
    /* PUSH ALERT */
    /* =============================== */

    pushAlert: (state, action) => {

      state.queue.push({
        id: `${Date.now()}-${Math.random()}`,
        type: action.payload.type,
        message: action.payload.message,
      });

    },

    /* =============================== */
    /* REMOVE ALERT */
    /* =============================== */

    removeAlertById: (state, action) => {

      state.queue = state.queue.filter(
        (item) => item.id !== action.payload
      );

    },

    /* =============================== */
    /* CLEAR ALERTS */
    /* =============================== */

    clearAllAlerts: (state) => {

      state.queue = [];

    },

  },

});

export const {

  pushAlert,

  removeAlertById,

  clearAllAlerts,

} = alertSlice.actions;

export default alertSlice.reducer;