import AddSchool from "@/components/addSchool";
import React from "react";

function Page() {
  return (
    <div 
    style={{backgroundImage: "url('/bg.svg')"}}
     className="flex bg-slate-600 bg-cover  pt-30 py-20 fixed inset-0 overflow-auto bg-center h-full items-center justify-center">
      <AddSchool />
    </div>
  );
}

export default Page;
