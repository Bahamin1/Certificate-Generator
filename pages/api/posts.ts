import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();


const posts = [
  {
    id: 1,
    title: 'Post 1',
    content: 'Content 1',
  },
  {
    id: 2,
    title: 'Post 2',
    content: 'Content 2',
  },
  {
    id: 3,
    title: 'Post 3',
    content: 'Content 3',
  },
  {
    id: 4,
    title: 'Post 4',
    content: 'Content 4',
  }
]



export default async function handle (

    req: NextApiRequest,
    res: NextApiResponse
) {
  if (req.method === 'GET') {
    res.json(posts);
  }
  if (req.method === 'POST') {
    const {title, content, file } = req.body
    const post = await prisma.post.create({
      data: {
        title,
        content,
      
      },
    })
    return res.json(post);
  }
  if (req.method === 'DELETE') {
    const { id } = req.query 
    const postId = parseInt(id as string, 10) 

    const postIndex = posts.findIndex((post) => post.id === postId)

    if (postIndex === -1) {
      return res.status(404).json({ message: 'Post not found' })
    }

    const deletedPost = posts.splice(postIndex, 1)[0]

    return res
      .status(200)
      .json({ message: 'Post deleted successfully', deletedPost })
  } else {
    res.setHeader('Allow', ['DELETE']) 
    res.status(405).json({ message: 'Method not allowed' })
  }
  return res.json({});
}