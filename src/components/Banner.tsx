"use client"
import { useState } from "react";
import styles from "./banner.module.css"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Banner (){
    const covers = "/img/background.jpg"
    const router = useRouter();

    const {data:session} = useSession();
    console.log(session?.user.token)
    console.log("User ", session?.user)
    console.log("User name:", session?.user?.name);

    return(
        <div className={styles.banner} >
            <Image src={covers} 
            alt="cover"
            fill={true}
            priority
            objectFit="cover"/>
            <div className={styles.bannerText}>
                <h1 className="text-4xl font-medium">Your Smile, Your Schedule – Book with Ease</h1>
                <h3 className="text-xl font-serif">Find the perfect dentist, hospital, and appointment time – hassle-free dental booking for a healthier, brighter smile!</h3>
            </div>
            <button
    className="bg-white text-[#0E1029] border border-[#0E1029]
                font-semibold py-2 px-2 m-2 rounded-[100px] w-[300px] z-30 absolute top-[60%] left-1/2 
                transform -translate-x-1/2 -translate-y-1/2
                hover:bg-[#0E1029] hover:text-white hover:border-transparent font-sans"
    onClick={(e) => { e.stopPropagation(); router.push("/car"); }}
>
    BOOK NOW
</button>
        </div>
    );
}