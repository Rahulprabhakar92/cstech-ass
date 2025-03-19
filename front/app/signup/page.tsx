"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("Login SUccefull");
  const router=useRouter()


  const onSubmit = async(data: any) => {
    const {email,password}=data
    console.log("the submi")
    try{
       const res=await axios.post("http://localhost:3001/signup",{
            email,
            password
        })
        const {token,id}=res.data
        
        if(token){
            localStorage.setItem("authToken",token)
            localStorage.setItem("Id",id)
            
            router.push(`http://localhost:3000/dashboard/${id}`)
        }
    }catch(e){
        console.error(e)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-black/30">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Sign Up</h2>

        {/* {message && <p className="text-green-600 text-center">{message}</p>} */}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className=" text-black font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            />
            {errors.email && <p className="text-red-500 text-sm"></p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Must be 6+ chars" } })}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            />
            {errors.password && <p className="text-red-500 text-sm">{}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
