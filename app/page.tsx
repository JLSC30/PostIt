'use client'
import AddPost from './components/AddPost'
import axios from 'axios'
import {useQuery} from '@tanstack/react-query'
import Posts from './components/Posts'
import { PostType } from './types/Posts'

// fetch all post
const allPosts = async() => {
  const response = await axios.get('/api/posts/getPosts')
  return response.data
}

export default function Home() {
  const {data, error, isLoading} = useQuery<PostType[]>({queryFn: allPosts, queryKey: ["posts"],})
  if(error) return error
  if(isLoading) return "Loading..."
  return (
    <main>
      <AddPost/>
      {data?.map((post) => (
        <Posts key={post.id} name={post.user.name} avatar={post.user.image} postTitle={post.title} id={post.id} comments={post.Comment}/>
      ))}
    </main>
  )
}
