import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Calendar, PersonFill, GraduationCap, Clock, CircleCheckFill, CircleXmarkFill, BookOpen} from '@gravity-ui/icons';

import { Button } from "@heroui/react";
import DeleteBtn from "@/components/DeteteBtn";
import { DeleteSession } from "@/components/DeleteSession";
import { getBookings } from "@/actions/actions";

export default async function MyBookedSessionsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const id = user?.id;
  console.log(session, "session");

  const res = await fetch(
    `${process.env.MEDIQUEUE_ASSIGNMENT_SERVER}/booking/${user?.id}`
  );
  console.log(await res, "res");
  const bookings = await res.json();
  console.log(bookings, "bookings");

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
            <BookOpen size={20} className="text-white" />
          </div>
          <div>
            <h1
              className="text-2xl font-bold tracking-tight"
              style={{ color: "var(--color-text-dark)" }}
            >
              My Bookings
            </h1>
            <p className="text-sm text-gray-500">
              {bookings.length} session{bookings.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>
      </div>

      {/* Booking Cards */}
      <div className="max-w-2xl mx-auto space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
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
              {/* Header Row: Tutor info + Status badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Avatar circle */}
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
                    }}
                  >
                    {booking.tutorName?.charAt(0)?.toUpperCase() ?? "T"}
                  </div>
                  <div>
                    <p
                      className="font-semibold text-base leading-tight"
                      style={{ color: "var(--color-text-dark)" }}
                    >
                      {booking.tutorName}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">Tutor</p>
                  </div>
                </div>

                {/* Status Badge */}
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={
                    booking.bookingStatus == "true"
                      ? {
                          backgroundColor: "#dcfce7",
                          color: "#15803d",
                        }
                      : {
                          backgroundColor: "#fee2e2",
                          color: "#b91c1c",
                        }
                  }
                >
                  {booking.bookingStatus == "true" ? (
                    <CircleCheckFill size={12} />
                  ) : (
                    <CircleXmarkFill size={12} />
                  )}
                  {booking.bookingStatus == "true" ? "Booked" : "Cancelled"}
                </span>
              </div>

              {/* Divider with dashed line like flight UI */}
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
                {/* Date */}
                <div className="flex flex-col items-center gap-1 bg-purple-50 rounded-xl py-3 px-2">
                  <Calendar
                    size={16}
                    style={{ color: "var(--color-primary)" }}
                  />
                  <p
                    className="text-xs font-semibold text-center leading-tight"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    {new Date(booking.selectedDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-[10px] text-gray-400">Date</p>
                </div>

                {/* Student Name */}
                <div className="flex flex-col items-center gap-1 bg-purple-50 rounded-xl py-3 px-2">
                  <PersonFill size={16} style={{ color: "var(--color-primary)" }} />
                  <p
                    className="text-xs font-semibold text-center leading-tight truncate w-full text-center"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    {booking.studentName}
                  </p>
                  <p className="text-[10px] text-gray-400">Student</p>
                </div>

                {/* Student Email */}
                <div className="flex flex-col items-center gap-1 bg-purple-50 rounded-xl py-3 px-2">
                  <GraduationCap
                    size={16}
                    style={{ color: "var(--color-primary)" }}
                  />
                  <p
                    className="text-xs font-semibold text-center leading-tight truncate w-full text-center"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    {booking.studentEmail}
                  </p>
                  <p className="text-[10px] text-gray-400">Email</p>
                </div>
              </div>

              {/* Footer: Cancel Button */}
              {booking.bookingStatus == "true" && (
                <div className="mt-4 flex justify-end">
                  <DeleteSession  bookingId={booking._id} ></DeleteSession>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Empty state */}
        {bookings.length === 0 && (
          <div className="text-center py-20">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "#ede9fe" }}
            >
              <BookOpen size={28} style={{ color: "var(--color-primary)" }} />
            </div>
            <p
              className="font-semibold text-lg"
              style={{ color: "var(--color-text-dark)" }}
            >
              No bookings yet
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Your booked sessions will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
