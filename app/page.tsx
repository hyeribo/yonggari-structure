"use client";

import { useState } from "react";

import Guard from "@/app/components/Guard";
import Main from "@/app/components/Main";

export default function Home() {
  const [authorized, setAuthorized] = useState(false);

  const onPass = () => {
    setAuthorized(true);
  };

  return (
    <main className="min-h-screen min-w-full">
      {authorized ? <Main /> : <Guard onPass={onPass} />}
    </main>
  );
}
