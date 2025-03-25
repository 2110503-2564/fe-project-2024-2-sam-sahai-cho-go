import styles from "./topmenu.module.css"
import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Link } from "@mui/material";
import { Session } from "inspector/promises";
import getUserProfile from "@/libs/getUserProfile";

export default async function TopMenu(){

    const session = await getServerSession(authOptions)
    

    return(
        <div className={styles.menucontainer}>
            <Link href="https://project-software-dev2.vercel.app/">
            <Image src={"/img/LOGO.jpg"} className={styles.logoimg} alt="logo"
            width={0} height={0} sizes="100vh"/>
            </Link>
            <TopMenuItem title="My Booking" pageRef="/cart"/>
            {session && session.user.role === "admin" ? (
                <Link href="/reservations/manage">
                    <div className="flex items-center h-full px-2 text-white text-sm">
                        Add Dentist
                    </div>
                </Link>
            ) : null}
            <div className="flex flex-row absolute right-0 h-full">
            {
                 session? null
             : <Link href="/signup">
             <div className="flex items-center h-full px-2 text-cyan-600 text-sm">
             Signup</div></Link>
            }
            {
                session? <Link href="/api/auth/signout">
                    <div className="flex items-center h-full px-2 text-cyan-600 text-sm">
                    Sign-Out of {session.user?.name}</div></Link>
                : <Link href="/api/auth/signin"><div className="flex items-center h-full px-2 text-cyan-600 text-sm">Sign-In</div></Link>
            }
            </div>

        </div>
    );
}