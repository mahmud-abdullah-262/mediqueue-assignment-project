import { getTutorsDetails } from "@/actions/actions";
import {
  Card,
  Link,
  Button,
  Chip,
} from "@heroui/react";
import {
  Person,
  GraduationCap,
  Clock,
  Calendar,
  BookOpen,
  Briefcase,
  MapPin,
  Display,
  Banknote,
} from "@gravity-ui/icons";
import Image from "next/image";
import DeleteBtn from "@/components/DeteteBtn";
import { EditModal } from "@/components/editModal";
import BookingBtn from "@/components/BookingBtn";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";



export const metadata = {
  title: "Tutor Details - MediQueue"
  
};

export default async function TutorDetailsPage({ params }) {

  // console.log(Object.keys(auth.api)); এটা দিলে অথের ভেতর কি কি আছে দেখা যায়
const {token} = await auth?.api?.getToken({
  headers: await headers()
})
  console.log(token, 'token')
 


  const { id } = await params;
  const tutorDetailsData = await getTutorsDetails(id, token);
  const {
    tutorName,
    photo,
    subject,
    availableDays,
    availableTimeSlot,
    hourlyFee,
    totalSlot,
    sessionStartDate,
    institution,
    experience,
    location,
    teachingMode,
    addedBy,
  } = tutorDetailsData;

  return (
    <div className="min-h-screen bg-[#faf5ff] py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-5">

        {/* Hero Card */}
       <Card className="overflow-hidden">
  <div className="h-1.5 w-full bg-[#7c3aed]" />
  <Card.Header className="p-5 flex-col gap-4">

    {/* Top row: ছবি + নাম + subject */}
    <div className="flex items-start gap-4">
      <div className="rounded-2xl overflow-hidden ring-4 ring-[#7c3aed]/20 shrink-0">
        <Image
          src={photo}
          width={90}
          height={90}
          alt={tutorName}
          className="object-cover w-[90px] h-[90px]"
        />
      </div>
      <div className="flex-1 min-w-0 space-y-1.5">
        <Card.Title className="text-xl font-bold text-[#1e1b4b] font-outfit leading-tight">
          {tutorName}
        </Card.Title>
        <div className="flex items-center gap-2 text-[#5b21b6]">
          <BookOpen size={14} />
          <span className="text-sm font-medium">{subject}</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-0.5">
          <Chip size="sm" className="bg-[#7c3aed]/10 text-[#5b21b6]">
            {teachingMode}
          </Chip>
          <Chip size="sm" className="bg-[#22c55e]/10 text-[#15803d]">
            {totalSlot} slots available
          </Chip>
        </div>
      </div>
    </div>

    {/* Bottom row: fee + Book Now */}
    <div className="flex items-center justify-between pt-1 border-t border-[#7c3aed]/10">
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">
          Per Hour
        </p>
        <p className="text-2xl font-bold text-[#7c3aed]">৳{hourlyFee}</p>
      </div>
  
      <BookingBtn tutorId={id} tutorDetailsData={tutorDetailsData} />
    </div>

  </Card.Header>
</Card>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Schedule Card */}
          <Card>
            <Card.Header className="px-5 pt-5 pb-3">
              <Card.Title className="text-xs font-semibold text-[#5b21b6] uppercase tracking-widest">
                Schedule
              </Card.Title>
            </Card.Header>
            <Card.Content className="px-5 pb-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#7c3aed]/10 shrink-0">
                  <Calendar size={15} className="text-[#7c3aed]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Available days</p>
                  <p className="text-sm font-medium text-[#1e1b4b]">{availableDays}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#7c3aed]/10 shrink-0">
                  <Clock size={15} className="text-[#7c3aed]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Time slot</p>
                  <p className="text-sm font-medium text-[#1e1b4b]">{availableTimeSlot}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#22c55e]/10 shrink-0">
                  <Display size={15} className="text-[#22c55e]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Session starts</p>
                  <p className="text-sm font-medium text-[#1e1b4b]">{sessionStartDate}</p>
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* Background Card */}
          <Card>
            <Card.Header className="px-5 pt-5 pb-3">
              <Card.Title className="text-xs font-semibold text-[#5b21b6] uppercase tracking-widest">
                Background
              </Card.Title>
            </Card.Header>
            <Card.Content className="px-5 pb-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#7c3aed]/10 shrink-0">
                  <GraduationCap size={15} className="text-[#7c3aed]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Institution</p>
                  <p className="text-sm font-medium text-[#1e1b4b]">{institution}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#7c3aed]/10 shrink-0">
                  <Briefcase size={15} className="text-[#7c3aed]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Experience</p>
                  <p className="text-sm font-medium text-[#1e1b4b]">{experience}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#7c3aed]/10 shrink-0">
                  <MapPin size={15} className="text-[#7c3aed]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Location</p>
                  <p className="text-sm font-medium text-[#1e1b4b]">{location}</p>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>

        {/* Added By */}
        <Card>
          <Card.Content className="px-5 py-4 flex flex-row justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#7c3aed]/10">
                <Person size={15} className="text-[#7c3aed]" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Added by</p>
                <p className="text-sm font-medium text-[#1e1b4b]">{addedBy}</p>
              </div>
            </div>

            {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-1">
         
          <EditModal id={tutorDetailsData._id} tutorDetailsData={tutorDetailsData} />
          <DeleteBtn id={tutorDetailsData._id} />
        </div>
          </Card.Content>
        </Card>

        

      </div>
    </div>
  );
}