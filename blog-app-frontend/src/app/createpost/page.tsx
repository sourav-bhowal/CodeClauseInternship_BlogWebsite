"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const CreatePostPage = () => {

    const router = useRouter();
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const [imgFile, setImgFile] = useState<File>();
    const [post, setPost] = useState({
        title: "",
        content: "",
        category: "",
    });

    axios.defaults.withCredentials = true

    function handleCreatePost(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", post.title);
        formData.append("content", post.content);
        formData.append("category", post.category);
        formData.append("image", imgFile!);
    
        setLoading(true);
    
        const response = axios.post(`${process.env.API_URL}/api/v1/posts/`, formData);
        response.then((res) => {
          toast.success("Signin successful");
          router.push("/");
        });
        response.catch((err) => {
          toast.error(err.response.data.message);
          setLoading(false);
        });
    }

    useEffect(() => {
        if (post.title.length > 0 && post.content.length > 0 && post.category.length > 0) {
          setButtonDisabled(false);
        }
        else {
          setButtonDisabled(true);
        }
    }, [post]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen lg:px-16 px-5 py-2 bg-gradient-to-r from-lime-300 to-slate-900 w-full">
      <div className="flex flex-col items-center justify-center py-10 text-center gap-10 bg-black/80 rounded-3xl w-full lg:w-1/3">

      <h1 className='p-4 text-5xl font-bold'>
        Create Post
      </h1>


      <form onSubmit={handleCreatePost} className='flex flex-col gap-6 justify-center items-center w-[80%]'>
        
        <div className='flex flex-col justify-center items-center gap-3 w-full'>
          <label htmlFor='title' className='text-lg'>Title</label>
          <input
            id='username' 
            type='text' 
            placeholder='title' 
            value={post.title} 
            onChange={(e) => setPost({ ...post, title: e.target.value })} 
            className='p-2 rounded-xl text-lg w-full text-black'
        />
        </div>
        
        <div className='flex flex-col justify-center items-center gap-3 w-full'>
          <label htmlFor='content' className='text-lg'>Content</label>
          <textarea
            id='content' 
            placeholder='content' 
            value={post.content} 
            onChange={(e) => setPost({ ...post, content: e.target.value })} 
            className='p-2 rounded-xl text-lg w-full text-black'
          />
        </div>

        <div className='flex flex-col justify-center items-center gap-3 w-full'>
          <label htmlFor='category' className='text-lg'>Category</label>
          <input
            id='category'
            type='text' 
            placeholder='eg: technology, lifestyle, politics' 
            value={post.category} 
            onChange={(e) => setPost({ ...post, category: e.target.value })} 
            className='p-2 rounded-xl text-lg w-full text-black'
          />
        </div>
        
        <div className='flex flex-col justify-center items-center gap-3 w-full'>
          <label htmlFor='image' className='text-lg'>Image</label>
          <input 
            id='image'
            type='file' 
            placeholder='image' 
            onChange={(e) => setImgFile(e.target.files![0])} 
            className='p-2 rounded-xl text-lg bg-white text-black w-full'
          />
        </div>
  
  

        <button disabled={buttonDisabled} type='submit' className={`bg-lime-400 ${buttonDisabled ? "cursor-not-allowed" : "cursor-pointer"} hover:bg-black text-white font-bold py-2 px-4 rounded-full w-[12rem] flex items-center justify-center`}>
          {loading ? <>
            <Image src="/loader.svg" alt="loading" width={25} height={25} className='flex items-center justify-center'/>
          </> : "Post"}
        </button>

      </form>

      </div>
    </div>
  )
}

export default CreatePostPage