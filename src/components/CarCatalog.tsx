import Link from "next/link";
import ProductCard from "./ProductCard";

export default async function CarCatalog({ carJson }: { carJson: Promise<any> }) {
    // Wait for the carJson data to resolve (similar to getDentist)
    const carJsonReady = await carJson; // Await the promise to get the actual data

    return (
        <>
            <h2>Explore {carJsonReady.count} Dentists in Our Network</h2>
            <div
                style={{
                    margin: "20px",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    alignContent: "space-around",
                }}
            >
                {
                    // Iterate over the car data
                    carJsonReady.data.map((carItem: any) => (
                        <Link
                            href={`/car/${carItem.id}`} // Dynamically link to the car's details page
                            key={carItem.id}
                            className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] p-2 sm:p-4 lg:p-8"
                        >
                            <ProductCard
                                carName={carItem.name} // Display the car model name
                                imgSrc={carItem.picture} // Display the car image
                            />
                        </Link>
                    ))
                }
            </div>
        </>
    );
}
