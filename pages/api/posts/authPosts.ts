import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from 'next-auth/next'
import {authOptions} from '../auth/[...nextAuth]'
import prisma from '../../../prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === 'GET'){
        const session = await getServerSession(req, res, authOptions)
        if(!session) {
            return res.status(401).json({messsage: "Please sign in"})
        }
        // get auth users posts
        try {
           const data = await prisma.user.findUnique({
            where: {
                email: session.user?.email,
            },
            include:{
                Post: {
                    orderBy: {
                        createdAt: "desc"
                    },
                    include: {
                        Comment: true,
                    },
                },
            }
           })
           res.status(200).json(data)
        } catch (error) {
            res.status(403).json({message: "Error has occured whilst fetching the post"})
        }
    }
}