"use client";

import {Pencil, PencilToSquare} from "@gravity-ui/icons";



import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Select, Button, ListBox, TextField, Label, Input, FieldError, Modal, Surface, toast } from "@heroui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { BookOpen, Person, Clock, House } from "@gravity-ui/icons";
import { addTutor, updateTutor} from "@/actions/actions";
import { TEACHING_MODES, TIME_SLOTS, DAYS_OPTIONS, SUBJECTS} from "@/actions/data";


const inputBase = "w-full h-10 text-sm border rounded-xl outline-none transition-all placeholder:text-gray-400 border-gray-300 hover:border-violet-500 focus:border-violet-600 px-4";
const inputError = "border-red-400 hover:border-red-400 focus:border-red-400";

const SectionLabel = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
      <Icon className="text-primary" width={15} height={15} />
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


export function EditModal({id, tutorDetailsData}) {
console.log("tutorDetailsData:", tutorDetailsData)
console.log("SUBJECTS array:", SUBJECTS);
   const router = useRouter();

  const [form, setForm] = useState({
    tutorName: tutorDetailsData.tutorName,
    photo: tutorDetailsData.photo,
    subject: tutorDetailsData.subject,
    availableDays: tutorDetailsData.availableDays,
    availableTimeSlot: tutorDetailsData.availableTimeSlot,
    hourlyFee: tutorDetailsData.hourlyFee,
    totalSlot: tutorDetailsData.totalSlot,
    sessionStartDate: new Date(tutorDetailsData.sessionStartDate),
    institution: tutorDetailsData.institution,
    experience: tutorDetailsData.experience,
    location: tutorDetailsData.location,
    teachingMode: tutorDetailsData.teachingMode,
  });
  

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    console.log("validate called")
    const newErrors = {};
    const required = [
      "tutorName", "photo", "subject", "availableDays",
      "availableTimeSlot", "hourlyFee", "totalSlot",
      "sessionStartDate", "institution", "experience",
      "location", "teachingMode",
    ];
    required.forEach((f) => {
      if (!form[f] || form[f] === "") newErrors[f] = "This field is required";
       console.log("Failed field:", f, "Value:", form[f]);
    });
    if (form.hourlyFee && isNaN(Number(form.hourlyFee))) newErrors.hourlyFee = "Must be a number";
    if (form.totalSlot && isNaN(Number(form.totalSlot))) newErrors.totalSlot = "Must be a number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
      console.log("handleSubmit called 1")
    e.preventDefault();
    console.log("Current form state:", form); // debug
  
    if (!validate()) return;
    console.log("handleSubmit called 2")
    const formData = {
      ...form,
      hourlyFee: Number(form.hourlyFee),
      totalSlot: Number(form.totalSlot),
      sessionStartDate: form.sessionStartDate
        ? form.sessionStartDate.toISOString().split("T")[0]
        : null,
    };
    try{
    
   const result = await updateTutor(id, formData);
   console.log('update result:', result)
    console.log("handleSubmit called 3")
     toast.success("You have Successfully edited a tutor", {
          description: "Redirecting to tutors page...",
          actionProps: {
            children: "View Tutors",
            className: "bg-success text-success-foreground",
          
          },
        });
    setTimeout( () => {  router.push("/tutors");
        router.refresh();}, 1500)
       
    } catch (error){
         console.log("handleSubmit called 4")
        toast.warning("Failed to edit tutor", {
              description: error?.message || "Something went wrong",
            });
    }

  };

  return (
    <Modal>
    <Button
  variant="outline"
  className="border border-[#7c3aed]/40 text-[#7c3aed] hover:bg-[#7c3aed]/10 hover:border-[#7c3aed] transition-colors"
>
  <Pencil size={15} />
  Edit Tutor
</Button>
      <Modal.Backdrop>
        <Modal.Container className={' bg-gray-100'} placement="auto">
          <Modal.Dialog className="sm:max-w-4xl ">
            <Modal.CloseTrigger />
           
            <Modal.Body className="">
              <Surface variant="default">
                  <div className="flex gap-2 items-center">
                    <div className="bg-gray-200 p-2 rounded-full text-primary">
                       <PencilToSquare ></PencilToSquare> 
                    </div>
                  
                    <h1 className="text-2xl font-bold text-text-dark "> Edit Tutor</h1>
                  </div>
                  
                 <form onSubmit={handleSubmit} className="p-10 space-y-8 mx-auto">
                
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
                
                          {/* ───── Schedule & availableDays ───── */}
                          <SectionLabel icon={Clock} label="Schedule & availableDays" />
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                
                            {/* availableDays */}
                            <FieldWrapper label="availableDays" error={errors.availableDays} required>
                              <select
                                value={form.availableDays}
                                onChange={(e) => handleChange("availableDays", e.target.value)}
                                className={`${inputBase} ${errors.availableDays ? inputError : ""} bg-white`}
                              >
                                <option value="">Select Days</option>
                                {DAYS_OPTIONS.map((d) => (
                                  <option key={d} value={d}>{d}</option>
                                ))}
                              </select>
                            </FieldWrapper>
                
                            {/* Available Time */}
                            <FieldWrapper label="Available Time" error={errors.availableTimeSlot} required>
                              <select
                                value={form.availableTimeSlot}
                                onChange={(e) => handleChange("availableTimeSlot", e.target.value)}
                                className={`${inputBase} ${errors.availableTimeSlot ? inputError : ""} bg-white`}
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
                
                            {/* totalSlot */}
                            <FieldWrapper label="Seat" error={errors.totalSlot} required>
                              <input
                                type="number"
                                min={0}
                                value={form.totalSlot}
                                onChange={(e) => handleChange("totalSlot", e.target.value)}
                                placeholder="30"
                                className={`${inputBase} ${errors.totalSlot ? inputError : ""}`}
                              />
                            </FieldWrapper>
                
                          </div>
                
                          {/* ───── Institution & Fee ───── */}
                          <SectionLabel icon={House} label="Institution & Fee" />
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                
                            {/* Institution Name */}
                            <FieldWrapper label="Institution Name" error={errors.institution} required>
                              <input
                                value={form.institution}
                                onChange={(e) => handleChange("institution", e.target.value)}
                                placeholder="Dhaka University"
                                className={`${inputBase} ${errors.institution ? inputError : ""}`}
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
                            <FieldWrapper label="Fee (BDT)" error={errors.hourlyFee} required>
                              <input
                                type="number"
                                min={0}
                                value={form.hourlyFee}
                                onChange={(e) => handleChange("hourlyFee", e.target.value)}
                                placeholder="550"
                                className={`${inputBase} ${errors.hourlyFee ? inputError : ""}`}
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
                            className="w-full h-11 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-violet-600 transition-colors"
                          >
                            Edit Tutor
                          </button>
                
                        </form>
              </Surface>
            </Modal.Body>
            
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}