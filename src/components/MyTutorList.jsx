'use client'

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import DeleteBtn from "./DeteteBtn";
import { EditModal } from "./editModal";
import {
  PersonFill,
  BookOpen,
  Clock,
  Display,
  Envelope,
  GraduationCap,
  Pencil,
  Xmark,
} from "@gravity-ui/icons";
import { Card } from "@heroui/react";

export default function MyTutorList({ tutors }) {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const addedBy = user?.email;

  const myTutor = tutors.filter((tutor) => tutor.addedBy === addedBy);

  if (isPending) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-bg-light)" }}
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-10 h-10 rounded-full border-4 animate-spin"
            style={{
              borderColor: "var(--color-primary)",
              borderTopColor: "transparent",
            }}
          />
          <p className="text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-10 px-4"
      style={{ backgroundColor: "var(--color-bg-light)" }}
    >
      {/* Page Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <GraduationCap size={20} className="text-white" />
          </div>
          <div>
            <h1
              className="text-2xl font-bold tracking-tight"
              style={{ color: "var(--color-text-dark)" }}
            >
              My Tutors
            </h1>
            <p className="text-sm text-gray-500">
              {myTutor.length} tutor{myTutor.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>
      </div>

      {/* Tutor Cards */}
      <div className="max-w-2xl mx-auto space-y-4">
        {myTutor.map((tutor, ind) => (
          <div
            key={ind}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-purple-100 hover:shadow-md transition-shadow duration-200"
          >
            {/* Top accent bar */}
            <div
              className="h-1 w-full"
              style={{
                background: `linear-gradient(90deg, var(--color-primary), var(--color-accent))`,
              }}
            />

            <div className="px-5 py-4">
              {/* Header Row: Tutor info + Photo */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Avatar / Photo */}
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2"
                    style={{ borderColor: "var(--color-primary)" }}>
                    <Image
                      src={tutor.photo}
                      width={48}
                      height={48}
                      alt={tutor.tutorName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-base leading-tight"
                      style={{ color: "var(--color-text-dark)" }}
                    >
                      {tutor.tutorName}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">Tutor</p>
                  </div>
                </div>

                {/* Availability Badge */}
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: "#dcfce7", color: "#15803d" }}
                >
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: "var(--color-accent)" }}
                  />
                  {tutor.availability}
                </span>
              </div>

              {/* Dashed Divider */}
              <div className="relative flex items-center my-3">
                <div
                  className="flex-1 border-t-2 border-dashed"
                  style={{ borderColor: "#ede9fe" }}
                />
                <div
                  className="mx-3 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "var(--color-bg-light)" }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  />
                </div>
                <div
                  className="flex-1 border-t-2 border-dashed"
                  style={{ borderColor: "#ede9fe" }}
                />
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-3 gap-3 mt-3">
                {/* Subject */}
                <div className="flex flex-col items-center gap-1 bg-purple-50 rounded-xl py-3 px-2">
                  <BookOpen size={16} style={{ color: "var(--color-primary)" }} />
                  <p
                    className="text-xs font-semibold text-center leading-tight"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    {tutor.subject}
                  </p>
                  <p className="text-[10px] text-gray-400">Subject</p>
                </div>

                {/* Teaching Mode */}
                <div className="flex flex-col items-center gap-1 bg-purple-50 rounded-xl py-3 px-2">
                  <Display size={16} style={{ color: "var(--color-primary)" }} />
                  <p
                    className="text-xs font-semibold text-center leading-tight"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    {tutor.teachingMode}
                  </p>
                  <p className="text-[10px] text-gray-400">Mode</p>
                </div>

                {/* Available Time */}
                <div className="flex flex-col items-center gap-1 bg-purple-50 rounded-xl py-3 px-2">
                  <Clock size={16} style={{ color: "var(--color-primary)" }} />
                  <p
                    className="text-xs font-semibold text-center leading-tight"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    {tutor.availableTime}
                  </p>
                  <p className="text-[10px] text-gray-400">Time</p>
                </div>
              </div>

              {/* Added By */}
              <div className="mt-3 flex items-center gap-2 px-1">
                <Envelope size={13} style={{ color: "#9ca3af" }} />
                <p className="text-xs text-gray-400 truncate">{tutor.addedBy}</p>
              </div>

              {/* Footer: Action Buttons */}
              <div className="mt-4 flex justify-end gap-2">
                <EditModal id={tutor._id} tutorDetailsData={tutor} />
                <DeleteBtn id={tutor._id} />
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {myTutor.length === 0 && (
          <div className="text-center py-20">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "#ede9fe" }}
            >
              <GraduationCap size={28} style={{ color: "var(--color-primary)" }} />
            </div>
            <p
              className="font-semibold text-lg"
              style={{ color: "var(--color-text-dark)" }}
            >
              No tutors yet
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Your added tutors will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
