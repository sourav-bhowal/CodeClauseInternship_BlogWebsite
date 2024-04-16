"use client"
import axios from 'axios'
import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

const Posts = () => {

    const [posts, setPosts] = React.useState([])

    axios.defaults.withCredentials = true
    useEffect(() => {
        axios.get(`${process.env.API_URL}/api/v1/posts/`)
            .then(res => setPosts(res.data.data))
            .catch(err => console.log(err))
    }, [])
    return (

        <div className="flex flex-col py-14 bg-black items-center justify-center w-full" id='posts'>

            <div>
                <div className="text-center w-full">
                    <h2 className="sm:text-4xl text-2xl text-lime-400 font-bold tracking-wide uppercase">Featured Blogs</h2>
                    <p className="mt-2 text-2xl leading-8 font-extrabold tracking-wide text-white sm:text-5xl">Explore Our Latest Blogs</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-16 w-full px-5 lg:px-20" >
                {posts.map((post: any) => (
                   <CardContainer className="flex items-center justify-center w-full" key={post._id}>
                   <CardBody 
                   className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-lime-400/[0.4] 
                   dark:bg-black dark:border-lime-400/[0.5] border-black/[0.1] border rounded-xl p-6 h-full">
                     <CardItem
                       translateZ="50"
                       className="text-2xl font-bold text-neutral-600 dark:text-white"
                     >
                       {post.title}
                     </CardItem>
                     <CardItem
                       as="p"
                       translateZ="60"
                       className="text-neutral-500 text-sm mt-2 dark:text-neutral-300 line-clamp-2"
                     >
                       {post.content}
                     </CardItem>
                     <CardItem translateZ="100" className="w-full mt-5">
                       <Link href={`/post/${post._id}`}>
                       <Image
                         src={post.image?.url}
                         height="1000"
                         width="1000"
                         className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                         alt="thumbnail"
                         priority
                       />
                       </Link>
                     </CardItem>
                     <CardItem
                       as="p"
                       translateZ="60"
                       className="text-neutral-500 text-sm max-w-sm mt-5 dark:text-neutral-400"
                     >
                      category: {post.category}
                     </CardItem>
                   </CardBody>
                 </CardContainer> 
                ))}
            </div>

        </div>
    )
}

export default Posts