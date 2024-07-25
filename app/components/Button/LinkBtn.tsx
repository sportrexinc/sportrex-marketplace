import { useRouter } from "next/navigation";
import React from "react";
const LinkBtn = ({ path, name,className }: { path: string; name: string ,className?:string}) => {
  const navigate = useRouter();
  return (
    <div
      className={`flex items-center justify-center text-[12px] md:text-base regular  rounded-[10px] bg-blue-btn hover:bg-white hover:text-blue-btn ${className ?? "w-auto"}   md:px-10 md:py-4 px-4  semibold font-semibold semibold text-white cursor-pointer h-[48px] max-h-[48px] hover:border hover:border-blue-btn`}
      onClick={() => navigate.push(path)}
    >
      <p>{name}</p>
    </div>
  );
};

export default LinkBtn;

export const WhiteBtn = ({ path, name, className }: { path: string; name: string; className?: string }) => {
  const navigate = useRouter();
  return (
    <div
      className={`flex items-center justify-center text-[12px] md:text-base regular  rounded-[10px] bg-white w-auto md:px-10 md:py-4 px-4  semibold font-semibold semibold text-[#3333FF] cursor-pointer h-[48px] max-h-[48px] hover:bg-[#3333FF] hover:text-white border border-blue-btn ${className ?? "w-auto"}`}
      onClick={() => navigate.push(path)}
    >
      <p>{name}</p>
    </div>
  );
};