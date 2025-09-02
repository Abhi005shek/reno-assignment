"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Loader, School, Star, StarHalf } from "lucide-react";
import { demoSchools } from "@/data/demo";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function ShowSchools() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/api/get")
      .then((res) => res.json())
      .then((d) => {
        setData(d.data);
      })
      .catch((err) => console.log("Error 💥 :", err));
  }, []);

  return (
    <div
      style={{ backgroundImage: "url(bg.svg)" }}
      className="h-full fixed overflow-auto inset-0 bg-cover bg-center"
    >
      <div className={`py-8 px-6 m-10 bg-white shadow-lg`}>
        <h1 className="pl-6 text-4xl  flex flex-col sm:flex-row items-center justify-center font-semibold text-red-700">
          <School size={40} /> &nbsp;All Schools
        </h1>

        {data && data.length == 0 ? (
          <div className="flex flex-col mt-10 items-center p-10 justify-center w-full h-46">
            <Loader className="text-gray-500 animate-spin size-10 md:size-50" />
            <p className="text-lg font-semibold ml-4">Please wait...</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="px-6 mt-4 rounded w-full grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {/* {demoSchools.map((s, i) => {
            return <SchoolCard key={s.name + i} data={s} />;
          })} */}

            {data.map((s: any, i) => {
              return <SchoolCard key={s.name + i} data={s} />;
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default ShowSchools;

interface SchoolCardProps {
  name: string;
  board: string;
  city: string;
  state: string;
  image?: string;
}

function SchoolCard({ data }: { data: SchoolCardProps }) {
  return (
    <motion.div
      variants={cardVariants}
      className="relative  border-0 border-gray-300 shadow-md p-2 rounded-md hover:-translate-y-1.5 duration-150"
    >
      <div className="relative h-50 overflow-hidden rounded-sm">
        <Image
          src={data.image ? data.image : "/bg.jpg"}
          alt="school image"
          fill
          className="transition-all duration-150 hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-xl mt-2">{data.name}</h2>

        <div className="flex justify-between items-center">
          <p className="text-gray-500">Ratings</p>
          <p className="flex text-sm">
            <Star size={20} className="text-yellow-400" />
            <Star size={20} className="text-yellow-400" />
            <Star size={20} className="text-yellow-400" />
            <Star size={20} className="text-yellow-400" />
            <StarHalf size={20} className="text-yellow-400" />
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-500">Board</p>
          <p>CBSE</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-500">State</p>
          <p>{data.state}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-500">City</p>
          <p>{data.city}</p>
        </div>
      </div>

      <div className="text-center mt-2">
        <Button
          size={"lg"}
          className="w-full bg-red-800 hover:bg-gray-400 cursor-pointer rounded-sm"
        >
          Apply
        </Button>
      </div>
    </motion.div>
  );
}
