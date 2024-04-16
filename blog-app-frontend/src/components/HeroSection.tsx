"use client"
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import Navbar from "./Navbar";
import { useState } from "react";
import toast from "react-hot-toast";


const HeroSection = () => {

  axios.defaults.withCredentials = true

  const router = useRouter();
  const [navActive, setNavActive] = useState(false);

  const handleLogOut = () => {
    
    axios.post(`${process.env.API_URL}/api/v1/users/logout`)
    .then((res) => {
      router.push("/login")
    })
    .catch((err) => {
      console.log(err)
      toast.error(err.response.data.message);
    })
  }
  
  return (
    <div className="flex flex-col h-[26.5rem] md:h-[45rem] w-full bg-[url('/710436.jpg')] bg-center items-center lg:gap-20 ">

      <div className="w-full bg-black justify-between px-16 items-center hidden lg:flex">
        <div className="w-[10rem] text-3xl font-bold text-lime-400 tracking-wide">BlogNet</div>
        <Navbar />
        <div className="flex justify-center items-center gap-4 ">
          <Link href={"/signin"}>
            <button className='text-white bg-lime-400 rounded-2xl w-24 hover:bg-white hover:text-black font-bold py-2'>
              Sign Up
            </button>
          </Link>
          <button className='text-white bg-lime-400 rounded-2xl w-24 hover:bg-white hover:text-black font-bold py-2'
            onClick={handleLogOut}>
            Log Out
          </button>
        </div>
      </div>

      <div className="w-full bg-black px-10 py-4 lg:hidden flex justify-between">
        <div className="w-[10rem] text-xl font-bold text-lime-400 tracking-wide">BlogNet</div>
        <div className="flex items-center justify-center">
          {
            navActive ? 
            <RiCloseLine color="#fff" size={27} onClick={() => setNavActive(false)} /> 
            : 
            <RiMenu3Line color="#fff" size={27} onClick={() => setNavActive(true)} />
          }
        </div>
      </div>

      <div className="w-full flex justify-end rounded-3xl px-2">
        {
          navActive && (
            <motion.div
            className="bg-black rounded-2xl mt-2 flex flex-col items-center justify-center pb-3"
              initial={{ opacity: 0.0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
            >
              <Navbar />
              <div className="flex flex-col justify-center items-center gap-2 ">
                <Link href={"/signin"}>
                  <button className='text-white bg-lime-400 rounded-2xl w-24 hover:bg-white hover:text-black font-bold py-2'>
                    Sign Up
                  </button>
                </Link>
                <button className='text-white bg-lime-400 rounded-2xl w-24 hover:bg-white hover:text-black font-bold py-2'
                  onClick={handleLogOut}>
                  Log Out
                </button>
              </div>
            </motion.div>
          )
        }
      </div>
      
      {
        !navActive && (
          <motion.div
        initial={{ opacity: 0.0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="flex flex-col justify-center items-center gap-10 mt-24 w-full"
      >
        <h1 className="lg:text-6xl text-4xl font-bold text-lime-500 px-5 text-center">Start your journey with us. Enjoy blogging</h1>
        <Link href="/createpost">
          <button className="text-white text-lg bg-lime-400/90 rounded-2xl hover:bg-white/80 hover:text-black font-bold py-3 px-4">
            Write a Blog
          </button>
        </Link>
      </motion.div>
        )
      }
    
    </div>
  )
}

export default HeroSection