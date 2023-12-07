import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
    
    // const id = req.url.split('/').pop();   /// const { id } = req.query
    // if (id) {
    //     const person = await prisma.person.findUnique({
    //         where: {
    //             id: parseInt(id),
    //         }
    //     })
    //     if (!person) {
    //         return new Response('Not found', {
    //             status: 404,
    //         })
    //     }
    //     return new Response(JSON.stringify(person), {
    //         status: 200,
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    // }

    const people = await prisma.person.findMany();
    return new Response(JSON.stringify(people), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();
        const {firstname, lastname, phone} = body;
        if (!firstname || !lastname || !phone) {
            return new Response('Missing required fields', {
                status: 400,
            })
        }
        
        const person = await prisma.person.create({
            data: {
                firstname,
                lastname,
                phone,
            }
        })

        //return the data record
        return new Response(JSON.stringify(person), {
            status: 202,
        })

    } catch (error) {
        return new Response('Error', {
            status: 500,
        })
        
    }


}