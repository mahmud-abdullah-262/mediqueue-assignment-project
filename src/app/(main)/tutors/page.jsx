import { getTutors } from "@/actions/actions";
import Tutor from "@/components/Tutor";
import { Button } from "@heroui/react";
import Link from "next/link";


export default async function TutorsPage() {
    
  const tutorsData = await getTutors()
  // console.log(tutorsData, 'tutors Data')


  return <div className="p-6">

    {tutorsData.map(tutor => <Tutor key={tutor._id} tutor={tutor} ></Tutor>)}
  </div>;
}
