import Image from "next/image";
import getDentist from "@/libs/getDentist";
import Link from "next/link";


export default async function DentistDetailPage({ params }: { params: { cid: string } }) {
    const dentistDetail = await getDentist(params.cid);
    console.log("dentistDetail", dentistDetail);
    console.log("image",dentistDetail.data.picture);
    return (
        <main className="text-center p-5">
            
            <h1 className="text-lg font-medium">{dentistDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image
                    src={dentistDetail.data.picture} // Use dentist's picture here
                    alt="Dentist Image"
                    width={0} height={0} sizes="100vw"
                    className="rounded-lg w-[30%]"
                />
                <div className="text-md mx-5 text-left">
                    <div className="text-md mx-5">Years of Experience: {dentistDetail.data.yearsOfExperience}</div>
                    <div className="text-md mx-5">Area of Expertise: {dentistDetail.data.areaOfExpertise}</div>

                    <Link href={`/reservations?id=${params.cid}&name=${dentistDetail.data.name}`}>
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm">
                            Schedule This Dentist
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}

