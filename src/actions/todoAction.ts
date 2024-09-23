'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient()

export const getTodoAction = async ({userId} : {userId : string | null}) => {
   return await prisma.todo.findMany(
    {
      where : {
       user_Id : userId as string
      },
      orderBy : {
    createdAt : "desc"
   }});
};
export const updateTodoAction = async ({id , title , body , completed} : {title : string , body? : string | undefined, id : string , completed : boolean}) => {
 await prisma.todo.update({
    where : {
        id,
    },
    data : {
        title, 
        body,
        completed,

    }
 })

 revalidatePath("/")
}
export const createTodoAction = async ({
    title,
    body,
    completed,
    userId,
  }: {
    title: string,
    body?: string | undefined,
    completed: boolean,
    userId: string | null,
  }  )  => {
    if (!userId) {
      throw new Error("User ID is required to create a todo");
    }
  
    await prisma.todo.create({
      data: {
        user_Id : userId as string,
        title,
        body,
        completed,
      },
    });
  
    revalidatePath("/");
  };
  
export const deleteTodoAction = async ({id} : {id : string}) => {
    await prisma.todo.delete({
        where : {
            id,
        }
    })
    revalidatePath("/")
}
