import { useRouter } from "next/navigation";
import React from "react";
const YellowBtn = ({ path, name, className }: { className?: string; path: string; name: string }) => {
  const navigate = useRouter();

  return (
    <div
      className={`flex items-center cursor-pointer h-[44px] max-h-[48px] justify-center rounded-[10px] text-[12px] px-10   md:text-base regular outline outline-yellow  md:px-14  semibold font-semibold semibold text-yellow capitalize ${className??"w-auto"}`}
      onClick={() => navigate.push(path)}
    >
      <p>{name}</p>
    </div>
  );
};

export default YellowBtn;
