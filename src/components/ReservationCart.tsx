"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // Import useSession from next-auth/react
import { updateReservation, removeReservation } from "@/redux/features/cartSlice";
import { AppDispatch, useAppselector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { ReservationItem } from "../../interfaces";

export default function ReservationCart() {
    const { data: session, status } = useSession(); // Fetch session using useSession hook
    const carItems = useAppselector((state) => state.cart.carItems);
    const dispatch = useDispatch<AppDispatch>();

    const [doctors, setDoctors] = useState<{ id: string; name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedReservation, setSelectedReservation] = useState<ReservationItem | null>(null);
    const [updatedData, setUpdatedData] = useState({ dentist: "", apptDate: "", user: "" });

    // Fetch doctors from the backend API
    useEffect(() => {
        async function fetchDoctors() {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/v1/dentists`, { next: { tags: ["dentists"] } });
                const result = await response.json();
                console.log("Doctor API Response:", result); // Debugging log
    
                if (result.data && Array.isArray(result.data)) {
                    setDoctors(result.data);
                } else {
                    throw new Error("Invalid data format");
                }
            } catch (error) {
                console.error("Error fetching doctors:", error);
                setError("Failed to load doctors");
            } finally {
                setLoading(false);
            }
        }
        fetchDoctors();
    }, []);

    // Open update form
    const handleEdit = (reservation: ReservationItem) => {
        setSelectedReservation(reservation);
        setUpdatedData({
            dentist: reservation.dentist,
            apptDate: reservation.apptDate,
            user: reservation.user,
        });
    };

    // Submit updated reservation
    const handleUpdate = () => {
        if (selectedReservation) {
            dispatch(updateReservation({ ...selectedReservation, ...updatedData }));
            setSelectedReservation(null);
        }
    };

    // Check session status and role
    const loggedInUser = session?.user.name; // Get the logged-in user's name from session
    const userRole = session?.user.role; // Get the logged-in user's role (e.g., "admin" or "user")
    console.log("session : ", session?.user);
    console.log("Role : ", userRole);

    // Filter carItems based on user role
    const userReservations = userRole === "admin"
        ? carItems // Admin can see all bookings
        : carItems.filter((reservation) => reservation.user === loggedInUser); // Regular users can see only their bookings

    // Get today's date for date validation
    const todayDate = new Date().toISOString().split("T")[0];

    return (
        <>
            {status === "loading" ? (
                <p>Loading...</p>
            ) : loggedInUser ? (
                <>
                    {userReservations.length === 0 ? (
                        <p>No reservations found for the logged-in user.</p>
                    ) : (
                        userReservations.map((reservationItem: ReservationItem) => (
                            <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={reservationItem._Id}>
                                <div className="text-xl">{reservationItem.dentist}</div>
                                <div className="text-sm">Appointment Date: {reservationItem.apptDate}</div>
                                <div className="text-sm">Client Name: {reservationItem.user}</div>

                                <button
                                    className="mr-2 rounded-md bg-[#3AABFB] hover:bg-[#1974B4] px-3 py-2 text-white shadow-sm"
                                    onClick={() => handleEdit(reservationItem)}
                                >
                                    Update
                                </button>

                                <button
                                    className="rounded-md bg-[#3AABFB] hover:bg-[#1974B4] px-3 py-2 text-white shadow-sm"
                                    onClick={() => dispatch(removeReservation(reservationItem))}
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    )}

                    {selectedReservation && (
                        <div className="bg-white p-5 rounded shadow-md mx-5">
                            <h3 className="text-lg font-bold mb-3">Update Reservation</h3>

                            {loading ? (
                                <p className="text-gray-500">Loading doctors...</p>
                            ) : error ? (
                                <p className="text-red-500">{error}</p>
                            ) : (
                                <select
                                    value={updatedData.dentist}
                                    onChange={(e) => setUpdatedData({ ...updatedData, dentist: e.target.value })}
                                    className="block w-full p-2 mb-2 border rounded"
                                >
                                    <option value="">Select a Doctor</option>
                                    {doctors.map((doctor) => (
                                        <option key={doctor.id} value={doctor.name}>
                                            {doctor.name}
                                        </option>
                                    ))}
                                </select>
                            )}

                            <input
                                type="date"
                                value={updatedData.apptDate}
                                min={todayDate} // Add min date to restrict past dates
                                onChange={(e) => setUpdatedData({ ...updatedData, apptDate: e.target.value })}
                                className="block w-full p-2 mb-2 border rounded"
                            />

                            <input
                                type="text"
                                value={updatedData.user}
                                onChange={(e) => setUpdatedData({ ...updatedData, user: e.target.value })}
                                placeholder="Client Name"
                                className="block w-full p-2 mb-2 border rounded"
                            />

                            <button
                                className="mr-2 bg-[#3AABFB] hover:bg-[#1974B4] px-4 py-2 text-white rounded shadow"
                                onClick={handleUpdate}
                            >
                                Save Changes
                            </button>

                            <button
                                className="bg-gray-500 hover:bg-gray-600 px-4 py-2 text-white rounded shadow"
                                onClick={() => setSelectedReservation(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <p>Please log in to view your reservations.</p>
            )}
        </>
    );
}
