"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import {  Trash } from 'lucide-react'
import { deleteTodoAction } from '@/actions/todoAction'
import Spinner from './Spinner'
import EditTodoForm from './EditTodoForm'
import { ITodo } from '@/interfaces'

const TodoTableAction = ({todo} : {todo : ITodo}) => {
    const [isLoading, setisLoading] = useState(false)
  return (
  <>
          <EditTodoForm todo={todo}/>
  
                    <Button onClick={async() => {
                        setisLoading(true)
                       await deleteTodoAction({id : todo.id})
                       setisLoading(false)
                    }} size={"icon"} variant={"destructive"}>
                        {isLoading ? <Spinner/> : <Trash size={16}/>}
                    </Button>
  </>
  )
}

export default TodoTableAction
