import { getTutors } from "@/actions/actions";
import Tutor from "@/components/Tutor";
import TutorCard from "@/components/TutorCard";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";



export default async function TutorsPage() {
    
  const tutorsData = await getTutors()
  console.log(tutorsData, 'tutors Data')


  return (

  
  <>
   
  <div className="relative my-6 space-y-2">

    <h1 className="text-center text-white font-bold text-3xl md:text-4xl lg:text-5xl">Meet Our Tutors</h1>
    <p className="text-center text-gray-600 ">Top Class Tutors from across the country at your fingertips</p>
  </div>


  <div className="absolute top-20 md:top-10 lg:top-0 right-0 -z-10">
    <Image
    src="/assets/bground.png"
    width={2000}
    height={400}
    alt="bg"
    className="w-full h-35 md:h-60 lg:h-72 object-center object-cover"
    />
  </div>
   <div className="w-11/12 mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

    {tutorsData.map(tutor => 
    
    <TutorCard key={tutor._id} tutor={tutor} ></TutorCard>)}
  </div>;
  </>
  )
 
}
