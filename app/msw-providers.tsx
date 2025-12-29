"use client";

import React, { useEffect, useState } from "react";

export default function MSWProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mswReady, setMswReady] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      if (process.env.NODE_ENV === "development") {
        const { initMocks } = await import("@/mocks");
        await initMocks();
        setMswReady(true);
      } else {
        setMswReady(true);
      }
    };
    init();
  }, []);

  if (!mswReady) return null;

  return <>{children}</>;
}
