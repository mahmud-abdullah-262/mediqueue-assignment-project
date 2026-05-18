import { getTutorsDetails } from "@/actions/actions";

export default async function TutorDetails({params}) {
  const {id} = await params;
  console.log(id, 'tutor id')
  const tutorDetailsData =  await getTutorsDetails(id)
  console.log(tutorDetailsData, "tutorDetailsData")
  return (
    <div className="p-6">
      <h1>{tutorDetailsData.tutorName}</h1>
    </div>
  );
}