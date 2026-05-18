import { getTutors } from "@/actions/actions";
import { Button } from "@heroui/react";
import Link from "next/link";


export default async function TutorsPage() {
  const tutorsData = await getTutors()
  console.log(tutorsData, 'tutors Data')
  return <div className="p-6">

    {tutorsData.map(tutor => <div key={tutor._id}>
      <h1> {tutor.tutorName}</h1>
      <Link href={`/tutors/${tutor._id}`}>
      <Button>Details</Button>
      </Link>
     
      
      </div>)}
  </div>;
}
