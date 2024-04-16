"use client"
import {About} from "@/components/About";
import Contact from "@/components/Contact";
import HeroSection from "@/components/HeroSection";
import Posts from "@/components/Posts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Home() {

  const router = useRouter();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.post(`${process.env.API_URL}/api/v1/users/verifyUser`)
    .then((res) => {
      toast.success("user verified")
    })
    .catch((err) => {
      console.log(err)
      router.push("/login")
      toast.error(err.response.data.message);
    })
  });
  
  return (
    <main className="min-h-screen bg-slate-500/15 antialiased">
      <HeroSection />
      <Posts />
      <About />
      <Contact />
    </main>
  );
}
