'use client'
import { Button } from "@heroui/react";
import Link from "next/link";


export default  function Tutor({tutor}) {
  
 
  return (
    <div className="p-6">
       <h1> {tutor.tutorName}</h1>
      <Link href={`/tutors/${tutor._id}`}>
      <Button>Details</Button>
      
      </Link>
      
    </div>
  );
}