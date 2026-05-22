import { Button } from "@heroui/react";
import { MapPin, Clock, Calendar, BookOpen, GraduationCap, Star, Display } from "@gravity-ui/icons";
import Link from "next/link";



export default function TutorCard({ tutor, onDetails })
{

  console.log(tutor, 'tutor')
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
  } = tutor;

  const formattedDate = new Date(sessionStartDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className=" rounded-2xl bg-bg-card shadow-lg border border-bg-card overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4 flex items-center gap-3">
        <img
          src={photo}
          alt={tutorName}
          className="w-14 h-14 rounded-full border-2 border-white object-cover shrink-0"
        />
        <div className="min-w-0">
          <h2 className="text-text-light text-xl font-bold leading-tight truncate">{tutorName}</h2>
          <p className="text-blue-100 text-xs mt-0.5 truncate">{institution}</p>
          <span className=" inline-flex items-center gap-1 mt-1 bg-primary text-white text-xs px-2 py-1 rounded-full">
            <Star size={10} className="fill-yellow-300 text-yellow-300" />
            {experience} exp.
          </span>
        </div>
      </div>

      {/* Subject badge */}
      <div className="px-5 pt-4">
        <div className="flex items-center gap-2">
          <BookOpen size={15} className="text-primary shrink-0" />
          <span className="text-sm font-semibold text-text-light truncate">{subject}</span>
        </div>
      </div>

      {/* Info rows */}
      <div className="px-5 py-3 space-y-2.5">
        <div className="flex items-center gap-2 text-sm text-text-dark">
          <Calendar size={14} className="text-primary shrink-0" />
          <span>{availableDays}</span>
          <span className="text-text-dark">•</span>
          <Clock size={14} className="text-primary shrink-0" />
          <span className="truncate">{availableTimeSlot}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-text-dark">
          <MapPin size={14} className="text-primary shrink-0" />
          <span className="truncate">{location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-text-dark">
          <Display size={14} className="text-primary shrink-0" />
          <span>Mode: <span className="font-medium text-text-dark">{teachingMode}</span></span>
          <span className="text-text-dark">•</span>
          <GraduationCap size={14} className="text-primary shrink-0" />
          <span>{totalSlot} slots left</span>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 border-t border-gray-100" />

      {/* Footer */}
      <div className="px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-text-dark">Starts {formattedDate}</p>
          <p className="text-lg font-bold text-text-dark">
            {hourlyFee}
            <span className="text-xs font-normal text-text-light">/hr</span>
          </p>
        </div>
          <Link href={`/tutors/${tutor._id}`}>
      <Button className={'bg-primary text-white rounded-xl'} >Book Session</Button>
      
      </Link>
      </div>
    </div>
  );
}
