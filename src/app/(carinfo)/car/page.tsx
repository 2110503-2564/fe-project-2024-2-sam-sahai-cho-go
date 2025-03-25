import getDentists from "@/libs/getDentists";
import CarCatalog from "@/components/CarCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default  function Car(){
    const cars =  getDentists();

    return(
        <main className="text-center p-5">
            <h1 className="text-xl font-medium">Select a Dentist for Your Appointment</h1>
                <Suspense fallback={<p>Loading ... <LinearProgress/></p>}>
                    <CarCatalog carJson={cars}/>
                </Suspense>

                <hr className="my-10"/>
        </main>
    );
}