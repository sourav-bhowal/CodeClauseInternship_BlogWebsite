"use client"
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'; 
import toast from 'react-hot-toast';


const Usepage = ({params} : any) => {

  axios.defaults.withCredentials = true;

  const [deleting, setDeleting] = useState(false)
  const router = useRouter();
  const [post, setPost] = useState({}) as any
  const [comment, setComment] = useState(null) as any;
  const [content, setContent] = useState("") as any;
  const [error, setError] = useState(false)

  let userId = useRef("");

  useEffect(() => {
    axios.post(`${process.env.API_URL}/api/v1/users/verifyUser`)
      .then((res) => {
        userId.current = res.data.data._id;
      })
      .catch((err) => {
        console.log(err)
        router.push("/login")
      })

    axios.get(`${process.env.API_URL}/api/v1/posts/${params.post}`) 
      .then(res => setPost(res.data.data))
      .catch(err => console.log(err)) 
  }, []);


  const HandleDelete = async () => {
    setDeleting(true);
    await axios.delete(`${process.env.API_URL}/api/v1/posts/${params.post}`)
    .then((res) => {
      toast.success("Post deleted successfully")
      router.push("/")
    })
    .catch((err) => {
      console.log(err)
      setDeleting(false)
    })
  };

  const HandleDeleteComment = async (id : any) => {
    await axios.delete(`${process.env.API_URL}/api/v1/comments/c/${id}`)
      .then((res) => {
        toast.success("Comment deleted successfully")
        HandleComment()
      })
      .catch((err) => {
        console.log(err)
      })
  };

  const HandleComment = () => {
    axios.get(`${process.env.API_URL}/api/v1/comments/${params.post}`)
      .then(res => {
        setComment(res.data.data.docs);
        setError(false);
      })
      .catch(err => {
        console.log(err)
        setError(true);
        setTimeout(() => {
          location.reload()
        }, 1000)
      })
  };


  const AddCommentHandler = () => {
    axios.post(`${process.env.API_URL}/api/v1/comments/${params.post}`, {
      content
    })
      .then(res => {
        toast.success("Comment added successfully")
        setContent("")
        HandleComment()
      })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-2 py-2 bg-gradient-to-r from-lime-300 to-slate-900'>
        
      <div className='bg-black/80 rounded-3xl w-[90%] flex justify-start items-center lg:px-20 px-6 py-20 mt-10'>

        <div className='flex flex-col gap-10 w-full'>

          <div className='flex justify-between'>
            <h1 className='lg:text-5xl text-3xl text-white capitalize font-bold'>{post.title}</h1>
            <div className="w-10 lg:w-20">
              {
                userId.current === post.owner && (
                  <button
                    onClick={HandleDelete}
                    className='bg-lime-300 p-2 rounded-2xl'>
                      {deleting ? (
                        <Image src="/loader.svg" alt="loading" width={40} height={40} />
                      ) : (
                        <Image src="/delete.svg" alt="delete" width={40} height={40} />
                      )}
                  </button>
                )
              }
            </div>
          </div>

          <Image src={post.image?.url} alt={post.title} width={800} height={800} />
          <p className='lg:text-xl'>{post.content}</p>
          <p className='text-lg text-white/70'>Category: {post.category}</p>

        </div>

      </div>

      <div className='bg-black/80 rounded-3xl w-[90%] flex flex-col justify-start items-center lg:px-20 px-6 py-16 mt-5 gap-10'>
      
        <h2 className='text-4xl text-lime-300 font-bold tracking-wide'>Comments</h2>

        <div className='flex gap-5 w-full items-center justify-center'>
          <input 
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && AddCommentHandler()}
            className='bg-slate-700 rounded-2xl p-4 w-[60%]' 
            placeholder='Add comment...' 
          />
          <button onClick={AddCommentHandler} className='bg-lime-400 py-4 lg:w-[8rem] w-[4rem] rounded-2xl  text-xl font-semibold hover:bg-black text-black hover:text-white'>
            Add
          </button>
        </div>
      
        <button
          onClick={HandleComment}
          className='bg-lime-400 py-3 rounded-2xl lg:w-[20rem] w-[12rem]  text-xl font-semibold hover:bg-black text-black hover:text-white'>
            Show Comments
        </button>

        {
          comment !== null && (
            <div className='w-full flex flex-col items-center'>
            {comment.map((comment: any) => (
                <div key={comment._id} className='flex flex-col lg:w-[60%] w-[90%] gap-5 mb-5 bg-slate-700 lg:px-6 px-3 lg:py-6 py-3 rounded-2xl'>
                  
                  <div className='flex w-full justify-between'>
                    <div className='flex gap-2'>
                    <Image 
                      src={comment.commentOwner.profilePic?.url} 
                      alt={comment.commentOwner.username} 
                      width={50} 
                      height={50}
                      className='rounded-full' 
                    />
                    <h3 className='text-xl text-lime-300'>{comment.commentOwner.username}</h3>
                    </div>
                    <div className='w-10'>
                    {
                      userId.current === comment.commentOwner._id && (
                        <button
                          onClick={() => HandleDeleteComment(comment._id)}
                          className='p-2 rounded-2xl'>
                            {deleting ? (
                              <Image src="/loader.svg" alt="loading" width={30} height={30} />
                            ) : (
                              <Image src="/delete.svg" alt="delete" width={30} height={30} />
                            )}
                        </button>
                      )
                    }
                    </div>
                  </div>
                  <div className=''>{comment.content}</div>

                </div>
              ))}
            </div>
          )
        }
        {
          error && (
            <p className='text-red-500'>Comments are not available</p>
          )
        }
      </div>
   
    </div>
  )
}

export default Usepage