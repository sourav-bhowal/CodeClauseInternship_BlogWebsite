
import { IconBrandFacebook, IconBrandInstagram, IconBrandX } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link from "next/link";

const Contact = () => {


  return (
    <div className='relative bg-gradient-to-r from-lime-300 to-slate-900 py-10 lg:px-16 px-5 items-center text-2xl justify-center' id="contact">
      
      <div className=" bg-black/40 rounded-3xl py-10 px-10">

      <div className="">
        <div className="text-center">
            <h2 className="sm:text-4xl text-2xl text-lime-300 font-bold tracking-wide uppercase">About</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-wide text-white sm:text-5xl">Know Us</p>
        </div>


        <div className='flex lg:flex-row flex-col items-center lg:py-20 py-10 lg:gap-15 gap-10 justify-between'>

          <motion.div 
            className="text-lg font-semibold lg:w-[40%]"
            initial={{ opacity: 0.0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
          >
            BlogNet is a blog platform that allows you to share your thoughts and ideas with the world. We are constantly working to improve our platform and provide you with the best experience.
          </motion.div>
          <motion.div 
          className="flex flex-col gap-5 lg:items-start justify-center items-center lg:pr-10"
            initial={{ opacity: 0.0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
          >
            <h2 className="font-bold lg:text-3xl text-2xl text-neutral-800 dark:text-neutral-200">Follow on</h2>
            <div className="flex items-center w-56 justify-between">
              
          
              <div className="bg-black h-12 w-12 flex justify-center items-center rounded-full hover:bg-lime-400">
                <Link href={"https://www.facebook.com/"}>
                  <IconBrandFacebook/>
                </Link>
              </div>
              <div className="bg-black h-12 w-12 flex justify-center items-center rounded-full hover:bg-lime-400">
                <Link href={"https://www.instagram.com/"}>
                  <IconBrandInstagram/>
                </Link>
              </div>
              <div className="bg-black h-12 w-12 flex justify-center items-center rounded-full hover:bg-lime-400">   
                <Link href={"https://www.twitter.com/"}>
                  <IconBrandX/>
                </Link>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
      <div className="text-center lg:text-sm text-xs">
        <p className="mt-10">© 2024 BlogNet - All Rights Reserved.</p>
      </div>  

      </div>

    </div>
  )
}

export default Contact