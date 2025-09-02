import AddSchool from "@/components/addSchool";
import Link from "next/link";
import React from "react";

function Page() {
  return (
    <div
      style={{ backgroundImage: "url('/bg.svg')" }}
      className="flex flex-col gap-2 bg-slate-600 bg-cover  pt-30 py-20 fixed inset-0 overflow-auto bg-center h-full items-center justify-center"
    >
      <AddSchool />

      <Link href={"/get"} className="text-white text-center text-shadow-2xs underline">See the list of all schools</Link>
    </div>
  );
}

export default Page;
