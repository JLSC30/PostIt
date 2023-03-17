'use client'

import { useState } from "react"
import {useMutation, useQueryClient} from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

type PostProps = {
    id?: string
}

type Comment = {
    postId?: string
    title: string
}


export default function AddComment({id} : PostProps ){
    const [title, setTitle] = useState('')
    const [isDisabled, setisDisabled] = useState(false)
    const queryClient = useQueryClient()

    const { mutate } = useMutation(
        async(data : Comment) => await toast.promise(axios.post('/api/posts/addComment', {data}), {loading: 'Posting your comment',
            success: (data) => 'Comment posted.',
            error: (error) => `${error?.response?.data.message}`,}),
        {
            onError: (error) => {
                console.log(error)
                setisDisabled(false)
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries(["detail-post"])
                setTitle("")
                setisDisabled(false)
            }
        }
    )

    const submitComment = async (e: React.FormEvent) => {
        e.preventDefault()
        setisDisabled(true)
        mutate({title, postId: id})
    }


    return (
        <form onSubmit={submitComment} className="my-8 ">
            <h3>Add comments</h3>
            <div className="flex flex-col my-2">
                <input className="p-4 text-lg rounded-md my-2" onChange={(e) => setTitle(e.target.value)}
                value={title}
                name="title"
                type="text"/>
            </div>
            <div className="flex items-center gap-2">
                <button disabled={isDisabled} className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25" type="submit">Add Comment 🚀</button>
                <p className={`font-bold text-sm ${title.length > 300 ? "text-red-700" : "text-gray-700"}`}>{`${title.length}/300`}</p>
            </div>
        </form>
    )
}