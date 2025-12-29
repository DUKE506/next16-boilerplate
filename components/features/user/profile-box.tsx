"use client";
import { useSession } from "next-auth/react";
import { User } from "lucide-react";
import React, { useEffect } from "react";
import { LogoutButton } from "../auth/logout-button";

export function ProfileBox() {
  const { data: session } = useSession();
  useEffect(() => {
    console.log("세션", session);
  }, [session]);

  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 flex items-center justify-center aspect-square rounded-full border-2 border-(--border) ">
        <User />
      </div>
      <div className="flex flex-col">
        <span>{session?.user.name}</span>
        <span>{session?.user.email}</span>
      </div>
      <LogoutButton />
    </div>
  );
}
