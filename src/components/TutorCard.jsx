import { Button } from "@heroui/react";
import { MapPin, Clock, Calendar, BookOpen, GraduationCap, Star, Display } from "@gravity-ui/icons";
import Link from "next/link";



export default function TutorCard({ tutor, onDetails }) {
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
    <div className="w-80 rounded-2xl bg-white shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4 flex items-center gap-3">
        <img
          src={photo}
          alt={tutorName}
          className="w-14 h-14 rounded-full border-2 border-white object-cover shrink-0"
        />
        <div className="min-w-0">
          <h2 className="text-white font-bold text-base leading-tight truncate">{tutorName}</h2>
          <p className="text-blue-100 text-xs mt-0.5 truncate">{institution}</p>
          <span className="inline-flex items-center gap-1 mt-1 bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
            <Star size={10} className="fill-yellow-300 text-yellow-300" />
            {experience} exp.
          </span>
        </div>
      </div>

      {/* Subject badge */}
      <div className="px-5 pt-4">
        <div className="flex items-center gap-2">
          <BookOpen size={15} className="text-indigo-500 shrink-0" />
          <span className="text-sm font-semibold text-gray-800 truncate">{subject}</span>
        </div>
      </div>

      {/* Info rows */}
      <div className="px-5 py-3 space-y-2.5">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={14} className="text-indigo-400 shrink-0" />
          <span>{availableDays}</span>
          <span className="text-gray-300">•</span>
          <Clock size={14} className="text-indigo-400 shrink-0" />
          <span className="truncate">{availableTimeSlot}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin size={14} className="text-indigo-400 shrink-0" />
          <span className="truncate">{location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Display size={14} className="text-indigo-400 shrink-0" />
          <span>Mode: <span className="font-medium text-gray-700">{teachingMode}</span></span>
          <span className="text-gray-300">•</span>
          <GraduationCap size={14} className="text-indigo-400 shrink-0" />
          <span>{totalSlot} slots left</span>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 border-t border-gray-100" />

      {/* Footer */}
      <div className="px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400">Starts {formattedDate}</p>
          <p className="text-lg font-bold text-gray-900">
            {hourlyFee}
            <span className="text-xs font-normal text-gray-400">/hr</span>
          </p>
        </div>
          <Link href={`/tutors/${tutor._id}`}>
      <Button className={'bg-primary text-white rounded-xl'} >Book Session</Button>
      
      </Link>
      </div>
    </div>
  );
}
