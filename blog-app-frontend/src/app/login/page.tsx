"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const LoginPage = () => {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const[error, setError] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  

  axios.defaults.withCredentials = true;
  
  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = axios.post(`${process.env.API_URL}/api/v1/users/login`, user);
    response.then((res) => {
      setLoading(true)
      toast.success("Login successful");
      setError(false);
      router.push("/");
    });
    response.catch((err) => {
      toast.error(err.response.data.message);
      setLoading(false);
      setError(true);
    });
  }

  

  useEffect(() => {
    if (user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true);
    }
  }, [user]);



  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-6 py-2 bg-gradient-to-r from-lime-300 to-slate-900 w-full'>

      <div className='flex flex-col items-center justify-center  py-10 text-center gap-16 bg-black/80 rounded-3xl w-full lg:w-1/4'>

      <h1 className=' p-4 text-5xl font-bold text-center'>
        Login
      </h1>

      <form onSubmit={handleLogin} className='flex flex-col gap-6 justify-center items-center w-[80%]'>
        
        <div className='flex flex-col justify-center items-center gap-3 w-full'>
          <label htmlFor='username' className='text-lg'>Username</label>
          <input
            id='username' 
            type='text' 
            placeholder='username' 
            value={user.username} 
            onChange={(e) => setUser({ ...user, username: e.target.value })} 
            className='p-2 rounded-xl text-lg w-full text-black'
        />
        </div>
        
        <div className='flex flex-col justify-center items-center gap-3 w-full'>
          <label htmlFor='password' className='text-lg'>Password</label>
          <input 
            type='password' 
            placeholder='password' 
            value={user.password} 
            onChange={(e) => setUser({ ...user, password: e.target.value })} 
            className='p-2 rounded-xl text-lg w-full text-black'
          />
        </div>
        
        <button disabled={buttonDisabled} type='submit' className={`bg-lime-300 ${buttonDisabled ? "cursor-not-allowed" : "cursor-pointer"} hover:bg-black/60 text-white font-bold mt-2 py-2 px-4 rounded-full lg:w-[10rem] w-[5rem] flex items-center justify-center`}>
          {loading ? (
            <>
            <Image src={"/loader.svg"} alt="loader" width={25} height={25} className='flex items-center justify-center'/>
            </>
          ) : "Login"}
        </button>

        <Link href={"/signin"}>
          <button className='underline text-white font-bold px-4 hover:opacity-70 w-full text-sm lg:text-base'>Dont have a account? Sign In</button>
        </Link>

      </form>

      {error && <p className='text-red-500'>Invalid username or password</p>}

      </div>

    </div>
  )
  
}

export default LoginPage;

