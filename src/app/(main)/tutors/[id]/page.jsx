import { getTutorsDetails } from "@/actions/actions";
import { Button } from "@heroui/react";
import { deleteTutor } from "@/actions/actions";
import DeleteBtn from "@/components/DeteteBtn";
import { EditModal } from "@/components/editModal";

export default async function TutorDetails({params}) {


  const {id} = await params;
  
  const tutorDetailsData =  await getTutorsDetails(id)

  return (
    <div className="p-6">
      <h1>{tutorDetailsData?.tutorName}</h1>
       <DeleteBtn id={tutorDetailsData._id}></DeleteBtn>
       <EditModal id={tutorDetailsData._id} tutorDetailsData={tutorDetailsData}></EditModal>
    </div>
  );
}