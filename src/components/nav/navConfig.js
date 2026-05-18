import {
  Calendar,
  CirclePlus,
  FolderHouse,
  Person,
  PersonWorker,
  Persons,
} from "@gravity-ui/icons";

export const mainNavLinks = [
  { href: "/", label: "Home", icon: FolderHouse },
  { href: "/tutors", label: "Tutors", icon: Persons },
  { href: "/add-tutor", label: "Add Tutor", icon: CirclePlus },
  { href: "/my-tutors", label: "My Tutor", icon: PersonWorker },
  {
    href: "/my-booked-sessions",
    label: "My Booked Sessions",
    icon: Calendar,
  },
];

export const mobileNavLinks = [
  { href: "/", label: "Home", icon: FolderHouse },
  { href: "/tutors", label: "Tutors", icon: Persons },
  { href: "/my-tutors", label: "My Tutor", icon: PersonWorker },
  { href: "/profile", label: "Profile", icon: Person },
];

export const moreNavLinksGuest = [
  { href: "/add-tutor", label: "Add Tutor" },
  { href: "/my-booked-sessions", label: "My Booked Sessions" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
];
