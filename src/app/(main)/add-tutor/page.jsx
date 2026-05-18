'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Input,
  Select,
  Button,
  Card,
  ListBox,
} from "@heroui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Gravity UI icons
import { BookOpen, Person, Camera, Clock, CircleDollar, House, MapPin, Display } from "@gravity-ui/icons";
import { Divider } from "@gravity-ui/uikit";

/* ── constants ─────────────────────────────────── */
const SUBJECTS = [
  "Mathematics", "Higher Mathematics", "Physics", "Chemistry",
  "Biology", "English", "Bangla", "ICT",
  "Accounting", "Economics", "Statistics", "Geography",
];

const DAYS_OPTIONS = [
  "Sun - Thu", "Sat - Thu", "Mon - Fri",
  "Mon - Sat", "Sat - Wed", "Sun - Wed",
  "Fri - Tue", "Mon - Thu", "Sun - Tue",
];

const TIME_SLOTS = [
  "9:00 AM - 12:00 PM", "10:00 AM - 1:00 PM",
  "11:00 AM - 2:00 PM", "2:00 PM - 5:00 PM",
  "3:00 PM - 6:00 PM", "4:00 PM - 7:00 PM",
  "4:30 PM - 7:30 PM", "5:00 PM - 8:00 PM",
  "5:30 PM - 8:30 PM", "6:00 PM - 9:00 PM",
  "6:30 PM - 9:30 PM", "7:00 PM - 10:00 PM",
];

const TEACHING_MODES = ["Online", "Offline", "Both"];

/* ── shared input class ─────────────────────────── */
const inputClass = {
  inputWrapper: [
    "bg-[#FAF5FF]",
    "border-[1.5px]",
    "border-[#DDD6FE]",
    "hover:border-[#7C3AED]",
    "focus-within:border-[#7C3AED]",
    "focus-within:ring-2",
    "focus-within:ring-[#7C3AED]/20",
    "rounded-xl",
    "h-11",
    "transition-all",
  ],
  label: ["text-[#1E1B4B]", "font-medium", "text-sm"],
  input: ["text-[#1E1B4B]", "placeholder:text-[#A5B4FC]", "font-['Outfit']"],
};

const selectClass = {
  ...inputClass,
  trigger: [
    "bg-[#FAF5FF]",
    "border-[1.5px]",
    "border-[#DDD6FE]",
    "hover:border-[#7C3AED]",
    "data-[focus=true]:border-[#7C3AED]",
    "data-[focus=true]:ring-2",
    "data-[focus=true]:ring-[#7C3AED]/20",
    "rounded-xl",
    "h-11",
    "transition-all",
  ],
  label: ["text-[#1E1B4B]", "font-medium", "text-sm"],
  value: ["text-[#1E1B4B]", "font-['Outfit']"],
};

/* ── section label ─────────────────────────────── */
const SectionLabel = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="w-7 h-7 rounded-lg bg-[#7C3AED]/10 flex items-center justify-center flex-shrink-0">
      <Icon className="text-[#7C3AED]" width={15} height={15} />
    </div>
    <span className="text-sm font-semibold text-[#1E1B4B] tracking-wide uppercase">
      {label}
    </span>
    <div className="flex-1 h-px bg-[#DDD6FE]" />
  </div>
);

/* ══════════════════════════════════════════════════
   Main Component
══════════════════════════════════════════════════ */
const AddTutor = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    tutorName: "",
    photo: "",
    subject: "",
    availableDays: "",
    availableTimeSlot: "",
    hourlyFee: "",
    totalSlot: "",
    sessionStartDate: null,
    institution: "",
    experience: "",
    location: "",
    teachingMode: "",
  });

  const [errors, setErrors] = useState({});

  /* ── handlers ─────────────────────────────────── */
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    const required = [
      "tutorName", "photo", "subject", "availableDays",
      "availableTimeSlot", "hourlyFee", "totalSlot",
      "sessionStartDate", "institution", "experience",
      "location", "teachingMode",
    ];
    required.forEach((f) => {
      if (!form[f] || form[f] === "") newErrors[f] = "This field is required";
    });
    if (form.hourlyFee && isNaN(Number(form.hourlyFee))) {
      newErrors.hourlyFee = "Must be a number";
    }
    if (form.totalSlot && isNaN(Number(form.totalSlot))) {
      newErrors.totalSlot = "Must be a number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...form,
      hourlyFee: Number(form.hourlyFee),
      totalSlot: Number(form.totalSlot),
      sessionStartDate: form.sessionStartDate
        ? form.sessionStartDate.toISOString().split("T")[0]
        : null,
    };

    console.log("📦 Tutor Payload:", payload);
    // TODO: POST করবে এখানে
    // await axiosSecure.post("/tutors", payload)
  };

  /* ── render ───────────────────────────────────── */
  return (
    <div
      className="min-h-screen py-10 px-4"
      style={{ background: "#FAF5FF", fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="max-w-4xl mx-auto">

        {/* ── Page Header ── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-[#7C3AED] flex items-center justify-center shadow-md shadow-[#7C3AED]/30">
              <BookOpen className="text-white" width={20} height={20} />
            </div>
            <div>
              <h1
                className="text-2xl font-bold text-[#1E1B4B] leading-tight"
                style={{ letterSpacing: "-0.4px" }}
              >
                Add a Tutor
              </h1>
              <p className="text-sm text-[#6B7280]">
                Fill in the details below to register a new tutor session
              </p>
            </div>
          </div>
        </div>

        {/* ── Form Card ── */}
        <Card
          className="shadow-sm border border-[#DDD6FE] bg-white rounded-2xl"
          shadow="none"
        >
          <div className="p-8">
            <form onSubmit={handleSubmit} noValidate>

              {/* ════ Section 1: Basic Info ════ */}
              <SectionLabel icon={Person} label="Basic Information" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

                {/* Tutor Name */}
                <Input
                  label="Tutor Name"
                  placeholder="e.g. Dr. Arif Hossain"
                  labelPlacement="outside"
                  value={form.tutorName}
                  onValueChange={(v) => handleChange("tutorName", v)}
                  isInvalid={!!errors.tutorName}
                  errorMessage={errors.tutorName}
                  classNames={inputClass}
                  isRequired
                />

                {/* Photo URL */}
                <Input
                  label="Photo URL"
                  placeholder="https://imgbb.com/..."
                  labelPlacement="outside"
                  value={form.photo}
                  onValueChange={(v) => handleChange("photo", v)}
                  isInvalid={!!errors.photo}
                  errorMessage={errors.photo}
                  classNames={inputClass}
                  startContent={
                    <Camera className="text-[#A5B4FC]" width={16} height={16} />
                  }
                  isRequired
                />

                {/* Subject */}
                <Select
                  label="Subject / Category"
                  placeholder="Select a subject"
                  labelPlacement="outside"
                  selectedKey={form.subject || null}
                  onSelectionChange={(key) =>
                    handleChange("subject", key || "")
                  }
                  isInvalid={!!errors.subject}
                  errorMessage={errors.subject}
                  classNames={selectClass}
                  isRequired
                >
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {SUBJECTS.map((s) => (
                        <ListBox.Item key={s} id={s} textValue={s}>
                          {s}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>

                {/* Teaching Mode */}
                <Select
                  label="Teaching Mode"
                  placeholder="Online / Offline / Both"
                  labelPlacement="outside"
                  selectedKey={form.teachingMode || null}
                  onSelectionChange={(key) =>
                    handleChange("teachingMode", key || "")
                  }
                  isInvalid={!!errors.teachingMode}
                  errorMessage={errors.teachingMode}
                  classNames={selectClass}
                  startContent={
                    <Display className="text-[#A5B4FC]" width={16} height={16} />
                  }
                  isRequired
                >
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {TEACHING_MODES.map((m) => (
                        <ListBox.Item key={m} id={m} textValue={m}>
                          {m}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

           

              {/* ════ Section 2: Schedule ════ */}
              <SectionLabel icon={Clock} label="Schedule & Availability" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

                {/* Available Days */}
                <Select
                  label="Available Days"
                  placeholder="Select days"
                  labelPlacement="outside"
                  selectedKey={form.availableDays || null}
                  onSelectionChange={(key) =>
                    handleChange("availableDays", key || "")
                  }
                  isInvalid={!!errors.availableDays}
                  errorMessage={errors.availableDays}
                  classNames={selectClass}
                  isRequired
                >
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {DAYS_OPTIONS.map((d) => (
                        <ListBox.Item key={d} id={d} textValue={d}>
                          {d}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>

                {/* Time Slot */}
                <Select
                  label="Available Time Slot"
                  placeholder="Select time"
                  labelPlacement="outside"
                  selectedKey={form.availableTimeSlot || null}
                  onSelectionChange={(key) =>
                    handleChange("availableTimeSlot", key || "")
                  }
                  isInvalid={!!errors.availableTimeSlot}
                  errorMessage={errors.availableTimeSlot}
                  classNames={selectClass}
                  isRequired
                >
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {TIME_SLOTS.map((t) => (
                        <ListBox.Item key={t} id={t} textValue={t}>
                          {t}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>

                {/* Session Start Date */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#1E1B4B]">
                    Session Start Date <span className="text-red-500">*</span>
                  </label>
                  <DatePicker
                    selected={form.sessionStartDate}
                    onChange={(date) => handleChange("sessionStartDate", date)}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    placeholderText="DD/MM/YYYY"
                    className={`w-full h-11 px-4 text-sm text-[#1E1B4B] bg-[#FAF5FF] border-[1.5px] rounded-xl outline-none transition-all font-['Outfit'] placeholder:text-[#A5B4FC] ${
                      errors.sessionStartDate
                        ? "border-red-400"
                        : "border-[#DDD6FE] hover:border-[#7C3AED] focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20"
                    }`}
                    wrapperClassName="w-full"
                  />
                  {errors.sessionStartDate && (
                    <span className="text-xs text-red-500">
                      {errors.sessionStartDate}
                    </span>
                  )}
                </div>

                {/* Total Slot */}
                <Input
                  label="Total Slots"
                  placeholder="e.g. 10"
                  labelPlacement="outside"
                  type="number"
                  min={1}
                  value={form.totalSlot}
                  onValueChange={(v) => handleChange("totalSlot", v)}
                  isInvalid={!!errors.totalSlot}
                  errorMessage={errors.totalSlot}
                  classNames={inputClass}
                  isRequired
                />
              </div>

              <Divider className="bg-[#EDE9FE] mb-8" />

              {/* ════ Section 3: Institution & Fee ════ */}
              <SectionLabel icon={House} label="Institution & Fee" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

                {/* Institution */}
                <Input
                  label="Institution"
                  placeholder="e.g. Dhaka University"
                  labelPlacement="outside"
                  value={form.institution}
                  onValueChange={(v) => handleChange("institution", v)}
                  isInvalid={!!errors.institution}
                  errorMessage={errors.institution}
                  classNames={inputClass}
                  isRequired
                />

                {/* Experience */}
                <Input
                  label="Experience"
                  placeholder="e.g. 5 years"
                  labelPlacement="outside"
                  value={form.experience}
                  onValueChange={(v) => handleChange("experience", v)}
                  isInvalid={!!errors.experience}
                  errorMessage={errors.experience}
                  classNames={inputClass}
                  isRequired
                />

                {/* Hourly Fee */}
                <Input
                  label="Hourly Fee (BDT)"
                  placeholder="e.g. 800"
                  labelPlacement="outside"
                  type="number"
                  min={0}
                  value={form.hourlyFee}
                  onValueChange={(v) => handleChange("hourlyFee", v)}
                  isInvalid={!!errors.hourlyFee}
                  errorMessage={errors.hourlyFee}
                  classNames={inputClass}
                  startContent={
                    <CircleDollar
                      className="text-[#A5B4FC]"
                      width={16}
                      height={16}
                    />
                  }
                  isRequired
                />

                {/* Location */}
                <Input
                  label="Location (Area/City)"
                  placeholder="e.g. Dhanmondi, Dhaka"
                  labelPlacement="outside"
                  value={form.location}
                  onValueChange={(v) => handleChange("location", v)}
                  isInvalid={!!errors.location}
                  errorMessage={errors.location}
                  classNames={inputClass}
                  startContent={
                    <MapPin className="text-[#A5B4FC]" width={16} height={16} />
                  }
                  isRequired
                />
              </div>

              {/* ════ Action Buttons ════ */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EDE9FE]">
                <Button
                  type="button"
                  variant="flat"
                  onPress={() => router.back()}
                  className="
                    h-11 px-7 rounded-xl font-semibold text-sm
                    bg-[#F1EFE8] text-[#5F5E5A]
                    hover:bg-[#DDD6FE] hover:text-[#5B21B6]
                    transition-all
                  "
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="
                    h-11 px-8 rounded-xl font-semibold text-sm text-white
                    bg-[#7C3AED] hover:bg-[#5B21B6]
                    shadow-md shadow-[#7C3AED]/30
                    transition-all
                  "
                  endContent={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  }
                >
                  Add Tutor
                </Button>
              </div>

            </form>
          </div>
        </Card>

        {/* note */}
        <p className="text-xs text-center text-[#9CA3AF] mt-4">
          Fields marked with <span className="text-red-400">*</span> are required
        </p>
      </div>
    </div>
  );
};

export default AddTutor;
