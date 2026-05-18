'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Select, Button, Card, ListBox } from "@heroui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { BookOpen, Person, Camera, Clock, CircleDollar, House, MapPin, Display } from "@gravity-ui/icons";
import { Divider } from "@gravity-ui/uikit";

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

const inputBase = "w-full h-10 text-sm border rounded-xl outline-none transition-all placeholder:text-gray-400 border-gray-300 hover:border-violet-500 focus:border-violet-600";
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

const Field = ({ label, error, required, children, className }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-indigo-950">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);

const TextInput = ({ icon: Icon, error, ...props }) => (
  <div className="relative">
    {Icon && (
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-300 pointer-events-none">
        <Icon width={16} height={16} />
      </span>
    )}
    <input
      className={`${inputBase} ${error ? inputError : ""} ${Icon ? "pl-9 pr-4" : "px-4"}`}
      {...props}
    />
  </div>
);

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
    if (form.hourlyFee && isNaN(Number(form.hourlyFee))) newErrors.hourlyFee = "Must be a number";
    if (form.totalSlot && isNaN(Number(form.totalSlot))) newErrors.totalSlot = "Must be a number";
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
  };

  const SelectField = ({ label, field, placeholder, options, icon: Icon }) => (
    <Field label={label} error={errors[field]} required>
      <Select
        placeholder={placeholder}
        selectedKey={form[field] || null}
        onSelectionChange={(key) => handleChange(field, key || "")}
        isInvalid={!!errors[field]}
      >
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {options.map((opt) => (
              <ListBox.Item key={opt} id={opt} textValue={opt}>
                {opt}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
    </Field>
  );

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
            <p className="text-sm text-gray-500">Fill in the details below to register a new tutor session</p>
          </div>
        </div>

        {/* Card */}
        <Card className="border border-violet-200 bg-white rounded-2xl" shadow="none">
          <div className="p-8">
            <form onSubmit={handleSubmit} noValidate>

              {/* Section 1: Basic Info */}
              <SectionLabel icon={Person} label="Basic Information" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

                <Field label="Tutor Name" error={errors.tutorName} required>
                  <TextInput
                    placeholder="e.g. Dr. Arif Hossain"
                    value={form.tutorName}
                    onChange={(e) => handleChange("tutorName", e.target.value)}
                    error={errors.tutorName}
                  />
                </Field>

                

                <Field label="Photo URL"  error={errors.photo} required>
                 
                  <TextInput
                    
                    placeholder="https://imgbb.com/..."
                    value={form.photo}
                    onChange={(e) => handleChange("photo", e.target.value)}
                    error={errors.photo}
                  />
                </Field>

                <SelectField
                  label="Subject / Category"
                  placeholder="Select a subject"
                  field="subject"
                  options={SUBJECTS}
                />

                <SelectField
                  label="Teaching Mode"
                  placeholder="Online / Offline / Both"
                  field="teachingMode"
                  options={TEACHING_MODES}
                />
              </div>

              <Divider className="mb-8" />

              {/* Section 2: Schedule */}
              <SectionLabel icon={Clock} label="Schedule & Availability" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

                <SelectField
                  label="Available Days"
                  placeholder="Select days"
                  field="availableDays"
                  options={DAYS_OPTIONS}
                />

                <SelectField
                  label="Available Time Slot"
                  placeholder="Select time"
                  field="availableTimeSlot"
                  options={TIME_SLOTS}
                />

                <Field label="Session Start Date" error={errors.sessionStartDate} required>
                  <DatePicker
                    selected={form.sessionStartDate}
                    onChange={(date) => handleChange("sessionStartDate", date)}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    placeholderText="DD/MM/YYYY"
                    className={`${inputBase} px-4 ${errors.sessionStartDate ? inputError : ""}`}
                    wrapperClassName="w-full"
                  />
                </Field>

                <Field label="Total Slots" error={errors.totalSlot} required>
                  <TextInput
                    type="number"
                    min={1}
                    placeholder="e.g. 10"
                    value={form.totalSlot}
                    onChange={(e) => handleChange("totalSlot", e.target.value)}
                    error={errors.totalSlot}
                  />
                </Field>
              </div>

              <Divider className="mb-8" />

              {/* Section 3: Institution & Fee */}
              <SectionLabel icon={House} label="Institution & Fee" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

                <Field label="Institution" error={errors.institution} required>
                  <TextInput
                    placeholder="e.g. Dhaka University"
                    value={form.institution}
                    onChange={(e) => handleChange("institution", e.target.value)}
                    error={errors.institution}
                  />
                </Field>

                <Field label="Experience" error={errors.experience} required>
                  <TextInput
                    placeholder="e.g. 5 years"
                    value={form.experience}
                    onChange={(e) => handleChange("experience", e.target.value)}
                    error={errors.experience}
                  />
                </Field>

                <Field label="Hourly Fee (BDT)" error={errors.hourlyFee} required>
                  <TextInput
                  
                    type="number"
                    min={0}
                    placeholder="e.g. 800"
                    value={form.hourlyFee}
                    onChange={(e) => handleChange("hourlyFee", e.target.value)}
                    error={errors.hourlyFee}
                  />
                </Field>

                <Field label="Location (Area/City)" error={errors.location} required>
                  <TextInput
                  
                    placeholder="e.g. Dhanmondi, Dhaka"
                    value={form.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    error={errors.location}
                  />
                </Field>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-violet-100">
                <Button
                  type="button"
                  variant="flat"
                  onPress={() => router.back()}
                  className="h-11 px-7 rounded-xl font-semibold text-sm"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="h-11 px-8 rounded-xl font-semibold text-sm text-white bg-violet-700 hover:bg-violet-800"
                >
                  Add Tutor
                </Button>
              </div>

            </form>
          </div>
        </Card>

        <p className="text-xs text-center text-gray-400 mt-4">
          Fields marked with <span className="text-red-400">*</span> are required
        </p>
      </div>
    </div>
  );
};

export default AddTutor;
