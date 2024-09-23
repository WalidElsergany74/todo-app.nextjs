"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm } from "react-hook-form"
  import { Textarea } from "@/components/ui/textarea"
  import { Input } from "@/components/ui/input"
import { todoFormSchema, TodoFormValues } from '@/schema';

import { Checkbox } from '@/components/ui/checkbox';
import Spinner from './Spinner';
import { ITodo } from '@/interfaces';
import { updateTodoAction } from '@/actions/todoAction';


const EditTodoForm = ({todo} : {todo : ITodo}) => {
 const [isLoading, setisLoading] = useState(false)
 const [isOpen , setisOpen] = useState(false)
    const defaultValues: Partial<TodoFormValues> = {
        title : todo.title,
        body : todo.body as string,
        completed : todo.completed,
      }
    
    
    
      const form = useForm<TodoFormValues>({
        resolver: zodResolver(todoFormSchema),
        defaultValues,
        mode: "onChange",
      })
    
    
      const onSubmit = async (data : TodoFormValues) => {
        setisLoading(true)
        await updateTodoAction({ id : todo.id, title : data.title , body : data.body as string , completed : data.completed})
        setisLoading(false)
          setisOpen(false)
      } 



  return (
    <Dialog open={isOpen} onOpenChange={setisOpen} >
    <DialogTrigger asChild>
    <Button size={"icon"}>
                        <Pen size={16}/>
                    </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogDescription>
          Edit Your todo to your profile here. Click edit when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

      
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Go to gym" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        <FormField
        control={form.control}
        name="body"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Short Description </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell us a little bit about yourself"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormDescription>
              You can  write a short description about your next todo.
              
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

        
<FormField
        control={form.control}
        name="completed"
        render={({ field }) => (
          <FormItem className='flex items-center space-x-2 '>
           

            <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange}   />

            

            </FormControl>

            <FormLabel className='mt-0'>Completed</FormLabel>

            <FormMessage />
          </FormItem>
        )}
      />

       <Button disabled={isLoading} type="submit">
        {isLoading ? (
            <>
            
             <Spinner/> 
             Editing
            </>
        ) :" Edit "}
       </Button>
      </form>
      </Form>
      </div>
      
    </DialogContent>
  </Dialog>
  )
}

export default EditTodoForm
