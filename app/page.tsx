"use client";

import { useState } from "react";

import Guard from "@/app/components/Guard";
import Main from "@/app/components/Main";

export default function Home() {
  const [authorized, setAuthorized] = useState(true);

  const onPass = () => {
    setAuthorized(true);
  };

  return (
    // <main className="flex min-h-screen min-w-screen flex-row items-center justify-center p-24">
    <main className="min-h-screen min-w-full">
      {authorized ? <Main /> : <Guard onPass={onPass} />}
    </main>
  );
}
