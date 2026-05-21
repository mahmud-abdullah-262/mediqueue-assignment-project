

import { getTutors } from "@/actions/actions";
import MyTutorList from "@/components/MyTutorList";

import { authClient } from "@/lib/auth-client";

export const metadata = {
  title: "My Tutor - MediQueue"
};
export default async function MyTutorsPage() {
  
  


  const tutors = await getTutors(); 



  return(
    <MyTutorList tutors={tutors}></MyTutorList>
  );
}
