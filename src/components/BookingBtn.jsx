'use client'

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Calendar } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import DatePicker from "react-datepicker";
import { postBookig } from "@/actions/actions";
import { Aladin } from "next/font/google";

export default function BookingBtn({ tutorDetailsData, tutorId }) {



  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const { tutorName, sessionStartDate, totalSlot } = tutorDetailsData;
  console.log(tutorDetailsData, 'selected date')
 
  const minDate = (() => {
    const next = new Date(sessionStartDate);
    next.setDate(next.getDate() + 1);
    return next;
  })();

  const handleBookSession = async () => {
    const bookingData = {
      tutorName,
      studentName: user?.name,
      studentEmail: user?.email,
      phone,
      selectedDate,
      tutorId,
      userId: user?.id,
      bookingStatus: 'true'
    };
console.log(selectedDate, minDate, 'failed validation date')
  if (!bookingData.phone.trim()) {
    alert('please giv a phone no.')
      return;
    }

    if (!bookingData.selectedDate) {
      alert('please select a date')
      return;
    }

    if (bookingData.selectedDate < minDate) {
   
      alert('please select a future date')
      return;
    }
    
 const {data: tokenData} = await authClient.token()
 console.log(tokenData, 'tokenData')  
    const token = tokenData.token
    
    
    postBookig(bookingData, token)
  };

  return (
    <>
      <button
        disabled={totalSlot === 0}
        onClick={() => setIsOpen(true)}
        style={{ fontFamily: "var(--font-outfit)" }}
        className="flex items-center gap-2 bg-primary hover:bg-[#5b21b6] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        <Calendar size={15} />
        {totalSlot > 0 ? 'Book Now' : 'No Slots Available'}
        
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div
            style={{ fontFamily: "var(--font-outfit)", backgroundColor: "#faf5ff" }}
            className="relative w-full max-w-md mx-4 rounded-2xl shadow-2xl border border-[#7c3aed]/20 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#7c3aed] px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl">
                  <Calendar size={20} color="white" />
                </div>
                <div>
                  <h2 className="text-white text-lg font-bold">Book a Session</h2>
                  <p className="text-purple-200 text-xs mt-0.5">Fill in the details to confirm</p>
                </div>
              </div>
              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white/70 hover:text-white text-xl font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 flex flex-col gap-4">

              {/* Tutor */}
              <div className="flex flex-col gap-1">
                <label className="text-[#1e1b4b] text-xs font-semibold uppercase tracking-wide">Tutor</label>
                <input
                  readOnly
                  value={tutorName || ""}
                  className="bg-[#7c3aed]/10 text-[#1e1b4b] font-medium rounded-xl px-4 py-2.5 text-sm outline-none cursor-not-allowed"
                />
              </div>

              {/* Name */}
              <div className="flex flex-col gap-1">
                <label className="text-[#1e1b4b] text-xs font-semibold uppercase tracking-wide">Your Name</label>
                <input
                  readOnly
                  value={user?.name || ""}
                  className="bg-[#7c3aed]/10 text-[#1e1b4b] font-medium rounded-xl px-4 py-2.5 text-sm outline-none cursor-not-allowed"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-[#1e1b4b] text-xs font-semibold uppercase tracking-wide">Email</label>
                <input
                  readOnly
                  value={user?.email || ""}
                  className="bg-[#7c3aed]/10 text-[#1e1b4b] font-medium rounded-xl px-4 py-2.5 text-sm outline-none cursor-not-allowed"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1">
                <label className="text-[#1e1b4b] text-xs font-semibold uppercase tracking-wide">Phone</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-white border border-[#7c3aed]/30 focus:border-[#7c3aed] text-[#1e1b4b] rounded-xl px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-gray-400"
                />
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1">
                <label className="text-[#1e1b4b] text-xs font-semibold uppercase tracking-wide">Pick a Date</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  minDate={minDate}
                 placeholderText={sessionStartDate ? new Date(sessionStartDate + "T00:00:00").toLocaleDateString("en-GB") : "DD/MM/YYYY"}
                  className="bg-white border border-[#7c3aed]/30 focus:border-[#7c3aed] text-[#1e1b4b] rounded-xl px-4 py-2.5 text-sm outline-none w-full transition-colors placeholder:text-gray-400"
                  wrapperClassName="w-full"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-white border-t border-[#7c3aed]/10 flex gap-3 justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#7c3aed] border border-[#7c3aed]/40 hover:bg-[#7c3aed]/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBookSession}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#22c55e] hover:bg-[#16a34a] text-white transition-colors shadow-md hover:shadow-lg"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}