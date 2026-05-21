"use client";

import Image from "next/image";
import { useState } from "react";
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    text: "MediQueue completely changed my experience of finding tutors. I was able to book the right subject tutor within minutes. The session token system is extremely convenient.",
    rating: 5,
    name: "Arif Hossain",
    role: "HSC Student at Dhaka College",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 2,
    text: "It was difficult to find a good Physics tutor. Through MediQueue, I easily found an experienced tutor and there are no issues with time slot conflicts.",
    rating: 5,
    name: "Nusrat Jahan",
    role: "A-Level Student, Rajuk College",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    text: "The platform is very easy to use. I joined here as a tutor and now I get new students every day. The management system is excellent.",
    rating: 4,
    name: "Md. Rakibul Islam",
    role: "Mathematics Tutor, 5 Years Experience",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: 4,
    text: "Before my university exams, I was able to book a tutor quickly. The digital session token system helps a lot in tracking classes.",
    rating: 5,
    name: "Tasnim Akter",
    role: "University Student, BUET",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 5,
    text: "I never thought booking an online Chemistry tutor could be this easy. With MediQueue’s subject filters, I found the best tutor within my budget.",
    rating: 5,
    name: "Farhan Ahmed",
    role: "SSC Candidate, Motijheel Govt. School",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 6,
    text: "Managing my schedule as a tutor is now much easier. Students directly book during my available time slots, with no phone calls or hassle.",
    rating: 4,
    name: "Sharmin Sultana",
    role: "English & Literature Tutor",
    avatar: "https://i.pravatar.cc/150?img=16",
  },
  {
    id: 7,
    text: "It used to be very difficult to find a trustworthy tutor for my child. With MediQueue’s ratings and reviews, I could make a decision easily.",
    rating: 5,
    name: "Rehana Begum",
    role: "Parent of Class 8 Student",
    avatar: "https://i.pravatar.cc/150?img=20",
  },
  {
    id: 8,
    text: "I booked separate tutors for both Geography and Bangla from the same platform. The slot management is so good that I never miss a class.",
    rating: 4,
    name: "Sabbir Rahman",
    role: "JSC Student, Viqarunnisa Noon School",
    avatar: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: 9,
    text: "Tutors are available in both offline and online formats. I chose online — it saves both time and money. The service is highly professional.",
    rating: 5,
    name: "Lamiya Chowdhury",
    role: "Diploma Engineering Student",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 10,
    text: "I found an expert tutor for ICT and Programming. The booking process is so fast that everything was completed within just two minutes.",
    rating: 5,
    name: "Imran Hasan",
    role: "Class 12 Student, Ideal School",
    avatar: "https://i.pravatar.cc/150?img=17",
  },
  {
    id: 11,
    text: "Even while living in a remote area, I can learn online from the best tutors in Dhaka through MediQueue. It is truly a game changer.",
    rating: 4,
    name: "Sumaiya Islam",
    role: "SSC Student, Comilla Government School",
    avatar: "https://i.pravatar.cc/150?img=23",
  },
  {
    id: 12,
    text: "Canceling or rescheduling tutor bookings is also very easy. The customer support is responsive and the entire experience is extremely smooth.",
    rating: 5,
    name: "Niaz Morshed",
    role: "O-Level Student, Sunbeams School",
    avatar: "https://i.pravatar.cc/150?img=18",
  },
];

const ITEMS_PER_PAGE = 4;
const TOTAL_PAGES = Math.ceil(reviews.length / ITEMS_PER_PAGE);

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={13}
          style={{ color: star <= count ? "#f59e0b" : "#d1d5db" }}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div
      className="flex flex-col justify-between rounded-2xl p-6 h-full"
      style={{
        background: "#ffffff",
        border: "1px solid #ede9fe",
        boxShadow: "0 2px 12px rgba(124,58,237,0.07)",
      }}
    >
     
      <div className="flex items-start justify-between mb-4">
        <FaQuoteLeft size={22} style={{ color: "#7c3aed", opacity: 0.35 }} />
        <StarRating count={review.rating} />
      </div>

   
      <p
        className="text-sm leading-relaxed flex-1 mb-6"
        style={{ color: "#1e1b4b", opacity: 0.75 }}
      >
        {review.text}
      </p>


      <div className="flex items-center gap-3">
        <Image
          src={review.avatar}
          alt={review.name}
          width={50}
          height={50}
          className="w-10 h-10 rounded-full object-cover"
          style={{ border: "2px solid #ede9fe" }}
        />
        <div>
          <p className="text-sm font-semibold" style={{ color: "#1e1b4b" }}>
            {review.name}
          </p>
          <p className="text-xs" style={{ color: "#7c3aed", opacity: 0.8 }}>
            {review.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Comments() {
  const [page, setPage] = useState(0);

  const currentReviews = reviews.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  return (
    <section className="py-16 px-4 md:px-8" style={{ background: "#faf5ff" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <h2
              className="text-3xl md:text-4xl font-extrabold leading-tight mb-2"
              style={{ color: "#1e1b4b" }}
            >
              What Our{" "}
              <span style={{ color: "#7c3aed" }}>Students</span>{" "}
              Say
            </h2>
            <p className="text-sm" style={{ color: "#1e1b4b", opacity: 0.6 }}>
              Hear directly from our satisfied learners &amp; tutors
            </p>
          </div>

       
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-10 h-10 rounded-full flex items-center justify-center border-2 disabled:opacity-30 cursor-pointer"
              style={{
                borderColor: "#7c3aed",
                color: "#7c3aed",
                background: "transparent",
              }}
            >
              <FaChevronLeft size={13} />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(TOTAL_PAGES - 1, p + 1))}
              disabled={page === TOTAL_PAGES - 1}
              className="w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-30 cursor-pointer"
              style={{
                background: "#7c3aed",
                color: "#ffffff",
                border: "none",
              }}
            >
              <FaChevronRight size={13} />
            </button>
          </div>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {currentReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className="rounded-full cursor-pointer"
              style={{
                width: i === page ? "24px" : "8px",
                height: "8px",
                background: i === page ? "#7c3aed" : "#c4b5fd",
                border: "none",
              }}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
