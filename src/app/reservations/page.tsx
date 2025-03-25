"use client"
import LocationDateReserve from "@/components/LocationDateReserve";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDispatch, UseDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { ReservationItem } from "../../../interfaces";
import { addReservation } from "@/redux/features/cartSlice";
import { model } from "mongoose";
import { useSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default function Reservations(){

    const urlParams = useSearchParams()
    const cid = urlParams.get("id")
    const name = urlParams.get("name")

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession(); // Get user session


    const makeReservation = () => {
        if (!apptDate) {
            alert("Please select a valid appointment date.");
            return;
        }
    
        const currentDate = dayjs(); // Get the current date
        if (apptDate.isBefore(currentDate, 'day')) {
            alert("The selected date cannot be in the past. Please choose a future date.");
            return;
        }
    
        if (cid && name && apptDate && session?.user?.name) {
            const item: ReservationItem = {
                _Id: cid,
                apptDate: apptDate.format("YYYY/MM/DD"),
                user: session?.user?.name,
                dentist: name,
            };
            dispatch(addReservation(item)); // Dispatch reservation action
            alert("Booking Confirmed!")
        }
    };
    const [apptDate, setApptDate] = useState<Dayjs|null>(null)
    

    return(
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-xl font-medium">Dentist Appointment Booking</div>
            <div className="text-xl font-medium">Dentist: {name}</div>

            <div className="w-fit space-y-2">
                <div className="text-md text-left text-gray-600">
                    Appointment Date 
                </div>
                <LocationDateReserve onDateChange={(value:Dayjs)=>{setApptDate(value)}}/>
            </div>
            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
            text-white shadow-sm" onClick={makeReservation}>
                Schedule This Dentist
            </button>
        </main>
    );
}