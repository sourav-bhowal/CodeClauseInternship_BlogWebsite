"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';


const SignInPage = () => {

  axios.defaults.withCredentials = true

  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [imgFile, setImgFile] = useState<File | null>(null);
  const [user, setUser] = useState({
      username: "",
      email: "",
      password: "",
  });

  function handleSignin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("profilePic", imgFile!);

    setLoading(true);

    const response = axios.post(`${process.env.API_URL}/api/v1/users/signin`, formData);
    response.then((res) => {
      toast.success("Signin successful");
      router.push("/login");
    });
    response.catch((err) => {
      toast.error(err.response.data.message);
      setLoading(false);
    });
  }



  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 6 && user.username.length > 0 && imgFile !== null) {
      setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true);
    }
  }, [user, imgFile]);



  return (
    <div className='flex flex-col items-center justify-center min-h-screen lg:px-16 px-5 py-2 bg-gradient-to-r from-lime-300 to-slate-900 w-full'>

      <div className='flex flex-col items-center justify-center py-10 text-center gap-10 bg-black/80 rounded-3xl w-full lg:w-1/3'>

      <h1 className=' p-4 text-5xl font-bold text-center'>
        SignUp
      </h1>

      <form onSubmit={handleSignin}  className='flex flex-col gap-6 justify-center items-center w-[80%]'>
      
      <div className='flex flex-col justify-center items-center gap-3 w-full'>
          <label htmlFor='username' className='text-lg'><span className='text-red-500'>*</span>Username</label>
          <input
            id='username' 
            type='text' 
            placeholder='username' 
            value={user.username} 
            onChange={(e) => setUser({ ...user, username: e.target.value })} 
            className='p-2 rounded-xl text-lg text-black w-full'
        />
        </div>
        
        <div className='flex flex-col justify-center items-center gap-3 w-full'>
          <label htmlFor='email' className='text-lg'><span className='text-red-500'>*</span>Email</label>
          <input
            id='email'
            type='email' 
            placeholder='email' 
            value={user.email} 
            onChange={(e) => setUser({ ...user, email: e.target.value })} 
            className='p-2 rounded-xl text-lg w-full text-black'
          />
        </div>

        
        <div className='flex flex-col justify-center items-center gap-3 w-full'>
          <label htmlFor='password' className='text-lg'><span className='text-red-500'>*</span>Password</label>
          <input 
            type='password' 
            placeholder='password' 
            value={user.password} 
            onChange={(e) => setUser({ ...user, password: e.target.value })} 
            className='p-2 rounded-xl text-lg w-full text-black'
          />
        </div>
        
        <div className='flex flex-col justify-center items-center gap-3 w-full'>
          <label htmlFor='profilePic' className='text-lg'><span className='text-red-500'>*</span>ProfilePic</label>
          <input 
            id='profilePic'
            type='file' 
            placeholder='profilePic' 
            onChange={(e) => setImgFile(e.target.files![0])} 
            className='p-2 rounded-xl text-lg bg-white text-black w-full'
          />
        </div>

        <div className='text-red-500 text-xs text-left w-full'>
          *All fields are required
        </div>
        
        <button disabled={buttonDisabled} type='submit' className={`bg-lime-400 ${buttonDisabled ? "cursor-not-allowed opacity-20" : "cursor-pointer"} hover:bg-black/60 text-white font-bold mt-2 py-2 px-4 rounded-full lg:w-[10rem] w-[5rem] flex items-center justify-center`}>
          {loading ? (
            <>
            <Image src={"/loader.svg"} alt="loader" width={25} height={25} className='flex items-center justify-center'/>
            </>
          ) : "SignUp"}
        </button>

        <Link href={"/login"}>
          <button className='underline text-white font-bold px-4 hover:opacity-70 w-full text-sm lg:text-base'>Already have an account? LogIn</button>
        </Link>

      </form>

      </div>
    </div>
  )
}

export default SignInPage;