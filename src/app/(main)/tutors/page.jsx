import { getTutors } from "@/actions/actions";
import Tutor from "@/components/Tutor";
import TutorCard from "@/components/TutorCard";
import { Button } from "@heroui/react";
import Link from "next/link";



export default async function TutorsPage() {
    
  const tutorsData = await getTutors()
  // console.log(tutorsData, 'tutors Data')


  return (

  
  <>
   
  <div className=" my-6 space-y-2">

    <h1 className="text-center text-text-dark font-bold text-3xl">Meet Our Tutors</h1>
    <p className="text-center text-gray-600 ">Top Class Tutors from across the country at your fingertips</p>
  </div>


  
   <div className="w-11/12 mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

    {tutorsData.map(tutor => <TutorCard key={tutor._id} tutor={tutor} ></TutorCard>)}
  </div>;
  </>
  )
 
}
