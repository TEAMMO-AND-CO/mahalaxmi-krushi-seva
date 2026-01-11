"use client";

import "../styles/globals.css";
import { useState } from "react";
import Header from "../components/Header";
import { Language } from "../types";

interface ClientRootProps {
  children: React.ReactNode;
}

export default function ClientRoot({ children }: ClientRootProps) {
  const [currentLang, setCurrentLang] = useState<Language>("en");

  return (
    <>
      <Header currentLang={currentLang} setCurrentLang={setCurrentLang} />
      {children}
    </>
  );
}
