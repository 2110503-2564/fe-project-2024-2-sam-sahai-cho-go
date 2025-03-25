import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { dbConnect } from "@/db/dbConnect";
import Dentist from "@/db/models/Dentist";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";

export default async function DashboardPage() {
  const addDentist = async (addDentistForm: FormData) => {
    "use server";
    const name = addDentistForm.get("name");
    const yearsOfExperience = addDentistForm.get("yearsOfExperience");
    const areaOfExpertise = addDentistForm.get("areaOfExpertise");
    const picture = addDentistForm.get("picture");

    try {
      await dbConnect();
      const dentist = await Dentist.create({
        name: name,
        yearsOfExperience: yearsOfExperience,
        areaOfExpertise: areaOfExpertise,
        picture: picture, // Store the picture URL
      });
      console.log("Dentist added:", dentist);
    } catch (error) {
      console.log("Error adding dentist:", error);
    }
  };

  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const profile = await getUserProfile(session.user.token);
  var createdAt = new Date(profile.data.createdAt);

  return (
    <main className="bg-slate-100 m-5 p-5">
      {profile.data.role == "admin" ? (
        <form action={addDentist}>
          <div className="text-xl text-blue-700">Add Dentist Information</div>
          <div className="flex items-center w-1/2 my-2">
            <label className="w-auto block text-gray-700 pr-4" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              required
              id="name"
              name="name"
              placeholder="Dentist name"
              className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="flex items-center w-1/2 my-2">
            <label className="w-auto block text-gray-700 pr-4" htmlFor="areaOfExpertise">
              Area of Expertise
            </label>
            <input
              type="text"
              required
              id="areaOfExpertise"
              name="areaOfExpertise"
              placeholder="Area of Expertise"
              className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="flex items-center w-1/2 my-2">
            <label className="w-auto block text-gray-700 pr-4" htmlFor="yearsOfExperience">
              Years of Experience
            </label>
            <input
              type="number"
              required
              id="yearsOfExperience"
              name="yearsOfExperience"
              placeholder="4"
              min={0}
              max={100}
              className="bg-white border-2 border-gray-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="flex items-center w-1/2 my-2">
            <label className="w-auto block text-gray-700 pr-4" htmlFor="picture">
              Picture URL
            </label>
            <input
              type="text"
              required
              id="picture"
              name="picture"
              placeholder="Picture URL"
              className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded"
          >
            Add Dentist
          </button>
        </form>
      ) : null}
    </main>
  );
}
