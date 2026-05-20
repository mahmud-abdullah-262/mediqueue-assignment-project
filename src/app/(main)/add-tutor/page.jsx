'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Select, Button, ListBox, TextField, Label, Input, FieldError } from "@heroui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { BookOpen, Person, Clock, House } from "@gravity-ui/icons";
import { addTutor} from "@/actions/actions";
import { TEACHING_MODES, TIME_SLOTS, DAYS_OPTIONS, SUBJECTS} from "@/actions/data";


const inputBase = "w-full h-10 text-sm border rounded-xl outline-none transition-all placeholder:text-gray-400 border-gray-300 hover:border-violet-500 focus:border-violet-600 px-4";
const inputError = "border-red-400 hover:border-red-400 focus:border-red-400";

const SectionLabel = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
      <Icon className="text-violet-700" width={15} height={15} />
    </div>
    <span className="text-sm font-semibold text-indigo-950 tracking-wide uppercase">{label}</span>
    <div className="flex-1 h-px bg-violet-200" />
  </div>
);

// সাধারণ text/number ইনপুটের জন্য wrapper
const FieldWrapper = ({ label, error, required, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-indigo-950">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);

const AddTutor = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    tutorName: "",
    photo: "",
    subject: "",
    availability: "",
    availableTime: "",
    feeName: "",
    seats: "",
    sessionStartDate: null,
    institutionName: "",
    experience: "",
    location: "",
    teachingMode: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    const required = [
      "tutorName", "photo", "subject", "availability",
      "availableTime", "feeName", "seats",
      "sessionStartDate", "institutionName", "experience",
      "location", "teachingMode",
    ];
    required.forEach((f) => {
      if (!form[f] || form[f] === "") newErrors[f] = "This field is required";
    });
    if (form.feeName && isNaN(Number(form.feeName))) newErrors.feeName = "Must be a number";
    if (form.seats && isNaN(Number(form.seats))) newErrors.seats = "Must be a number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Current form state:", form); // debug
    if (!validate()) return;

    const formData = {
      ...form,
      feeName: Number(form.feeName),
      seats: Number(form.seats),
      sessionStartDate: form.sessionStartDate
        ? form.sessionStartDate.toISOString().split("T")[0]
        : null,
    };

    console.log("New tutor Data from client:", formData);
    addTutor(formData);
  };

  return (
    <div className="min-h-screen py-10 px-4 bg-violet-50">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-violet-700 flex items-center justify-center shadow-md shadow-violet-300">
            <BookOpen className="text-white" width={20} height={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-indigo-950">Add a Tutor</h1>
            <p className="text-sm text-gray-500">Fill in the details below to register a new tutor</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8 mx-auto bg-gray-100 rounded-2xl">

          {/* ───── Basic Information ───── */}
          <div>
            <SectionLabel icon={Person} label="Basic Information" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

              {/* Tutor Name */}
              <FieldWrapper label="Tutor Name" error={errors.tutorName} required>
                <input
                  value={form.tutorName}
                  onChange={(e) => handleChange("tutorName", e.target.value)}
                  placeholder="e.g: Dr. Arif Hossain"
                  className={`${inputBase} ${errors.tutorName ? inputError : ""}`}
                />
              </FieldWrapper>

              {/* Photo URL */}
              <FieldWrapper label="Photo URL" error={errors.photo} required>
                <input
                  value={form.photo}
                  onChange={(e) => handleChange("photo", e.target.value)}
                  placeholder="https://imgbb.com/..."
                  className={`${inputBase} ${errors.photo ? inputError : ""}`}
                />
              </FieldWrapper>

              {/* Subject */}
              <FieldWrapper label="Subject" error={errors.subject} required>
                <select
                  value={form.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  className={`${inputBase} ${errors.subject ? inputError : ""} bg-white`}
                >
                  <option value="">Select Subject</option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </FieldWrapper>

              {/* Teaching Mode */}
              <FieldWrapper label="Teaching Mode" error={errors.teachingMode} required>
                <select
                  value={form.teachingMode}
                  onChange={(e) => handleChange("teachingMode", e.target.value)}
                  className={`${inputBase} ${errors.teachingMode ? inputError : ""} bg-white`}
                >
                  <option value="">Online / Offline / Both</option>
                  {TEACHING_MODES.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </FieldWrapper>

            </div>
          </div>

          {/* ───── Schedule & Availability ───── */}
          <SectionLabel icon={Clock} label="Schedule & Availability" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

            {/* Availability */}
            <FieldWrapper label="Availability" error={errors.availability} required>
              <select
                value={form.availability}
                onChange={(e) => handleChange("availability", e.target.value)}
                className={`${inputBase} ${errors.availability ? inputError : ""} bg-white`}
              >
                <option value="">Select Days</option>
                {DAYS_OPTIONS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </FieldWrapper>

            {/* Available Time */}
            <FieldWrapper label="Available Time" error={errors.availableTime} required>
              <select
                value={form.availableTime}
                onChange={(e) => handleChange("availableTime", e.target.value)}
                className={`${inputBase} ${errors.availableTime ? inputError : ""} bg-white`}
              >
                {/* <option value="">04:00 PM - 06:00 PM</option> */}
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </FieldWrapper>

            {/* Session Start Date */}
            <FieldWrapper label="Session Start Date" error={errors.sessionStartDate} required>
              <DatePicker
                selected={form.sessionStartDate}
                onChange={(date) => handleChange("sessionStartDate", date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                placeholderText="DD/MM/YYYY"
                className={`${inputBase} ${errors.sessionStartDate ? inputError : ""}`}
                wrapperClassName="w-full"
              />
            </FieldWrapper>

            {/* Seats */}
            <FieldWrapper label="Seat" error={errors.seats} required>
              <input
                type="number"
                min={0}
                value={form.seats}
                onChange={(e) => handleChange("seats", e.target.value)}
                placeholder="30"
                className={`${inputBase} ${errors.seats ? inputError : ""}`}
              />
            </FieldWrapper>

          </div>

          {/* ───── Institution & Fee ───── */}
          <SectionLabel icon={House} label="Institution & Fee" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

            {/* Institution Name */}
            <FieldWrapper label="Institution Name" error={errors.institutionName} required>
              <input
                value={form.institutionName}
                onChange={(e) => handleChange("institutionName", e.target.value)}
                placeholder="Dhaka University"
                className={`${inputBase} ${errors.institutionName ? inputError : ""}`}
              />
            </FieldWrapper>

            {/* Experience */}
            <FieldWrapper label="Experience" error={errors.experience} required>
              <input
                value={form.experience}
                onChange={(e) => handleChange("experience", e.target.value)}
                placeholder="5 Years"
                className={`${inputBase} ${errors.experience ? inputError : ""}`}
              />
            </FieldWrapper>

            {/* Fee */}
            <FieldWrapper label="Fee (BDT)" error={errors.feeName} required>
              <input
                type="number"
                min={0}
                value={form.feeName}
                onChange={(e) => handleChange("feeName", e.target.value)}
                placeholder="550"
                className={`${inputBase} ${errors.feeName ? inputError : ""}`}
              />
            </FieldWrapper>

            {/* Location */}
            <FieldWrapper label="Location" error={errors.location} required>
              <input
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="Dhaka"
                className={`${inputBase} ${errors.location ? inputError : ""}`}
              />
            </FieldWrapper>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-violet-700 text-white text-sm font-semibold hover:bg-violet-800 transition-colors"
          >
            Add Tutor
          </button>

        </form>

        <p className="text-xs text-center text-gray-400 mt-4">
          Fields marked with <span className="text-red-400">*</span> are required
        </p>
      </div>
    </div>
  );
};

export default AddTutor;
