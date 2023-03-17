'use client'
import { useState } from 'react'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function CreatePost() {
    const [title, setTitle] = useState('')
    const [isDisabled, setisDisabled] = useState(false)
    const queryClient = useQueryClient()

    //Create a post
    const {mutate} = useMutation(
        async (title: string) => await toast.promise(axios.post('/api/posts/addPost', {title}), {loading: 'Creating your post',
        success: (data) => 'Post has been made 🔥',
        error: (error) => `${error?.response?.data.message}`,}),
    {
        onError: (error) => {
            setisDisabled(false)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(["posts"])
            setTitle("")
            setisDisabled(false)
        },
    })

    const submitPost  = async (e: React.FormEvent) => {
        e.preventDefault();
        setisDisabled(true) 
        mutate(title)
    }

    return (
        <form onSubmit={submitPost} className='bg-white my-8 p-8 rounded-md'>
            <div className='flex flex-col my-4'>
                <textarea name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What's on your mind?" className='p-4 text-lg rounded-md my-2 bg-gray-200'></textarea>
            </div>
            <div className='flex items-center justify-between gap-2'>
                <p className={`font-bold text-sm ${title.length > 300 ? "text-red-700" : "text-gray-700"}`}>{`${title.length}/300`}</p>
                <button disabled={isDisabled} className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25" type="submit">Create a post</button>
            </div>
        </form>
    )
}