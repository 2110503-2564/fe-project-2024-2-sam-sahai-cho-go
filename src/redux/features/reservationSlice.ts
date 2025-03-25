import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReservationItem } from "../../../interfaces";

interface ReservationState {
    reservations: ReservationItem[];
}

const initialState: ReservationState = {
    reservations: [],
};

const reservationSlice = createSlice({
    name: "reservation",
    initialState,
    reducers: {
        addReservation: (state, action: PayloadAction<ReservationItem>) => {
            state.reservations.push(action.payload);
        },
    },
});

export const { addReservation } = reservationSlice.actions;
export default reservationSlice.reducer;
