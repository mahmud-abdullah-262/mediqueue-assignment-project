"use client";

import {
  Moon,
  Sun
} from "@gravity-ui/icons";
import {Switch} from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";






export function ToggolBtn() {
const {theme, setTheme} = useTheme();
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) return null;  

  const icons = {
  
    darkMode: {
      off: Moon,
      on: Sun,
      selectedControlClass: "",
    },
  
  };

  return (
     <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}