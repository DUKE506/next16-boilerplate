"use client";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useState } from "react";

export function DarkModeButton() {
  const { theme, setTheme } = useTheme();

  const onChangeMode = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div
      className={`absolute right-10 bottom-10 border-2 border-(--border) p-2 rounded-(--default-rounded) cursor-pointer`}
      onClick={onChangeMode}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </div>
  );
}
