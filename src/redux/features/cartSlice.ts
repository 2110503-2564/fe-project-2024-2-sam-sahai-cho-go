import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReservationItem } from "../../../interfaces";

type CartState = {
    carItems: ReservationItem[]
}

const initialState:CartState = {carItems:[]}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addReservation:(state, action:PayloadAction<ReservationItem>)=>{
            const existingReservation = state.carItems.some((obj) => 
                obj.user === action.payload.user 
            );
        
            if (existingReservation) {
                // If a reservation exists, do not add a new one
                return; // Or you can show a message or log it if needed
            }
        
            // If no reservation exists, add the new reservation
            state.carItems.push(action.payload);
        },
        removeReservation:(state,action:PayloadAction<ReservationItem>)=>{
            const remainItems = state.carItems.filter(obj =>{
                return ((obj.dentist !== action.payload.dentist)||
                (obj.apptDate !== action.payload.apptDate)||
                (obj.user !== action.payload.user))
            })
            state.carItems = remainItems
        },
        updateReservation: (state, action: PayloadAction<ReservationItem>) => {
            state.carItems = state.carItems.map((reservation) =>
                reservation._Id === action.payload._Id // Match by unique `_Id`
                    ? { ...reservation, ...action.payload } // Update only this reservation
                    : reservation
            );
        }
    }
})

export const { addReservation, removeReservation, updateReservation} = cartSlice.actions
export default cartSlice.reducer