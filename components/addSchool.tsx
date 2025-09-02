"use client";
import { useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ImagePlusIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DataProps {
  name: string;
  email_id: string;
  address: string;
  contact: string;
  city: string;
  state: string;
  image: File;
}

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DataProps>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState("");
  const router = useRouter();

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setPreview(event?.target?.result as string);
      reader.readAsDataURL(file);
    }
  }

  function onRemove(e: React.MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();
    setPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function onSubmit(data: DataProps) {
    let imageFile: File;
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email_id", data.email_id);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contact);

      if (fileInputRef.current && fileInputRef.current.files?.[0]) {
        imageFile = fileInputRef.current.files?.[0];
        formData.append("image", imageFile);
      }

      const res = await fetch("/api/create", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        reset();
        setPreview("");
        if (fileInputRef.current) fileInputRef.current.value = "";
        toast.success("School Added Successfully!!");
        router.push("/get");
      }
    } catch (err) {
      toast.error("Something went wrong!!");
      console.error("Something went wrong");
      console.error("Error: ", err);
    }
  }

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="lg:w-[35%] bg-white  w-[80%] md:w-[50%] mt-50 rounded-md shadow-lg"
    >
      <div className="bg-red-700 flex items-center justify-center h-16 p-2 rounded-t-md">
        <h1 className="text-2xl font-semibold text-white">Add School</h1>
      </div>

      <div className="p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* School Name */}
          <div className="my-4 flex flex-col gap-2 ">
            <Label>School Name</Label>
            <Input
              {...register("name", {
                required: "School name is required",
                minLength: {
                  value: 3,
                  message: "Must be at least 3 characters",
                },
              })}
              placeholder="Enter School Name"
            />
            {errors?.name && (
              <p className="text-red-400 text-sm">
                {errors?.name?.message as string}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="my-2 flex flex-col gap-2 ">
            <Label>Email Address</Label>
            <Input
              {...register("email_id", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter Email"
              type="email"
            />
            {errors?.email_id && (
              <p className="text-red-400 text-sm">
                {errors?.email_id?.message as string}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="my-2 flex flex-col gap-2 ">
            <Label>Address</Label>
            <Textarea
              {...register("address", {
                required: "Address is required",
                minLength: {
                  value: 3,
                  message: "Must be at least 3 characters",
                },
              })}
              placeholder="Enter Address"
            />
            {errors?.address && (
              <p className="text-red-400 text-sm">
                {errors?.address?.message as string}
              </p>
            )}
          </div>

          {/* City */}
          <div className="my-2 flex flex-col gap-2 ">
            <Label>City</Label>
            <Input
              {...register("city", {
                required: "City is required",
                minLength: {
                  value: 2,
                  message: "Must be at least 2 characters",
                },
              })}
              placeholder="Enter City"
            />
            {errors?.city && (
              <p className="text-red-400 text-sm">
                {errors?.city?.message as string}
              </p>
            )}
          </div>

          {/* State */}
          <div className="my-2 flex flex-col gap-2 ">
            <Label>State</Label>
            <Input
              {...register("state", {
                required: "State is required",
                minLength: {
                  value: 2,
                  message: "Must be at least 2 characters",
                },
              })}
              placeholder="Enter State"
            />
            {errors?.state && (
              <p className="text-red-400 text-sm">
                {errors?.state?.message as string}
              </p>
            )}
          </div>

          {/* Contact */}
          <div className="my-2 flex flex-col gap-2 ">
            <Label>Contact No.</Label>
            <Input
              {...register("contact", {
                required: "Contact number is required",
                pattern: {
                  value: /^[6-9][0-9]{9}$/,
                  message: "Please provde valid contact number",
                },
              })}
              placeholder="Enter Contact Number"
              type="tel"
              inputMode="numeric"
              maxLength={10}
            />
            {errors?.contact && (
              <p className="text-red-400 text-sm">
                {errors?.contact?.message as string}
              </p>
            )}
          </div>

          {/* Image */}
          <div className="my-2 flex flex-col gap-2 ">
            <Label>School Image</Label>
            <div>
              <Input
                {...register("image")}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  onFileChange(e);
                  register("image").onChange(e);
                }}
                ref={fileInputRef}
                className="hidden"
              />
              <div
                className="relative flex"
                onClick={() => fileInputRef.current?.click()}
              >
                {preview ? (
                  <div className="relative">
                    <span
                      onClick={onRemove}
                      className="cursor-pointer absolute -right-1 -top-1 bg-rose-500 rounded-full"
                    >
                      <XIcon color="white" />
                    </span>
                    <Image
                      src={preview}
                      alt="Image"
                      className="size-[100px]"
                      width={100}
                      height={100}
                    />
                  </div>
                ) : (
                  <div className="">
                    <ImagePlusIcon
                      className="bg-gray-100 size-[80px] sm:size-[100px] rounded-md text-gray-400"
                      //   size={100}
                    />
                  </div>
                )}
              </div>
            </div>
            {errors?.image && (
              <p className="text-red-400 text-sm">
                {errors?.image?.message as string}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex mt-6 justify-center">
            <Button type="submit" size={"lg"} className="bg-red-700 flex-1">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
