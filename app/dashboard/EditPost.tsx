'use client'

import Image from "next/image"
import { useState } from 'react'
import Toggle from "./Toggle"
import {useMutation, useQueryClient} from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

type EditProps = {
    id: string
    avatar: string
    name: string
    title: string
    comments?: {
        id: string
        postId: string
        userId: string
    }
}

export default function EditPost({avatar, name, title, comments, id}: EditProps){

    //Toggle
    const [toggle, setToggle] = useState(false)
    const queryClient = useQueryClient()

    // Delete post
    const {mutate} = useMutation(
        async(id: string) => await toast.promise(axios.delete('/api/posts/deletePost', {data: id}), {loading: 'Deleting your post',
            success: (data) => 'Post deleted.',
            error: (error) => `${error?.response?.data.message}`,}),
        {
            onError: (error) => {
                console.log(error)
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries(["auth-posts"])
            }
        }
    )

    const deletePost = () => {
        mutate(id)
    }

    return (
       <>
        <div className="bg-white my-8 p-8 rounded-lg">
            <div className="flex items-center gap-2">
                <Image src={avatar} height={32} width={32} className="rounded-full" alt="avatar" />
                <h3 className="font-bold text-gray-700">{name}</h3>
            </div>
            <div className="my-8">
                <p className="break-all">
                    {title}
                </p>
            </div>
            <div className="flex items-center gap-4">
                <p className="text-sm font-bold text-gray-700">
                    {comments?.length} comment
                </p>
                <button onClick={(e) => setToggle(true)} className="text-sm font-bold text-red-500">Delete</button>
            </div>
        </div>
        {toggle && <Toggle deletePost={deletePost} setToggle={setToggle}/>}
        </>
    )
}