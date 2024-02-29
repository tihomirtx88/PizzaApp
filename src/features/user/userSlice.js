import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiGeocoding from "./../../services/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await apiGeocoding(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    return { position, address };
  },
);

const userName = localStorage.getItem('addUser') !== null ? JSON.parse(localStorage.getItem('addUser')) : "";
const userNameAdress = localStorage.getItem('addUserAdress') !== null ? JSON.parse(localStorage.getItem('addUserAdress')) : "";
const userNameStatus = localStorage.getItem('addUserStatu') !== null ? JSON.parse(localStorage.getItem('addUserStatu')) : "idle";

const initialState = {
  username: userName,
  status: userNameStatus,
  position: {},
  address: userNameAdress,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
      localStorage.setItem("addUser", JSON.stringify(state.username));
      localStorage.setItem("addUserAdress", JSON.stringify(state.address));
      localStorage.setItem("addUserStatus", JSON.stringify(state.status));
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (status) => {
        status.status = "error";
        status.error =
          "There was a problem getting your address. Make sure to fill this field!";
      }),
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
