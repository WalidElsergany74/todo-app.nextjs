'use server'
import { ITodo } from '@/interfaces';
import { TodoFormValues } from '@/schema';
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient()

export const getTodoAction = async () => {
   return await prisma.todo.findMany({orderBy : {
    createdAt : "desc"
   }});
};
export const updateTodoAction = async ({id , title , body , completed} : ITodo) => {
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
export const createTodoAction = async ({title , body , completed} : TodoFormValues) => {
    await prisma.todo.create({
        data : {
            title,
            body,
            completed
        }
    })
    revalidatePath("/")
}
export const deleteTodoAction = async ({id} : {id : string}) => {
    await prisma.todo.delete({
        where : {
            id,
        }
    })
    revalidatePath("/")
}
