"use client";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
export function Time() {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    //1초단위 갱신
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    //언마운트시 해제
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className="absolute right-10 top-10 flex flex-col justify-center items-end ">
      <p>{format(time, "yyyy-MM-dd")}</p>
      <p>{format(time, "HH:mm")}</p>
    </div>
  );
}
