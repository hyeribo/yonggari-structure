"use client";

import { useState } from "react";

import Guard from "@/app/components/Guard";
import Main from "@/app/components/Main";

export default function Home() {
  const [authorized, setAuthorized] = useState(true);

  const handlePass = () => {
    setAuthorized(true);
  };

  const handleLock = () => {
    setAuthorized(false);
  };

  return (
    <main className="min-h-screen min-w-full">
      {authorized ? (
        <Main onLock={handleLock} />
      ) : (
        <Guard onPass={handlePass} />
      )}
    </main>
  );
}
