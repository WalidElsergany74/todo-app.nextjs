
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { ITodo } from "@/interfaces"
import TodoTableAction from "./TodoTableAction"


  

  
  export function TodoTable({todos} : {todos : ITodo[]}) {
    
    return (
      <Table >
        
        <TableHeader>
          <TableRow>
            <TableHead >ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Completed</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos?.map((todo) => (
            <TableRow key={todo?.id}>
              <TableCell className="font-medium">{todo?.id}</TableCell>
              <TableCell>{todo?.title}</TableCell>
              <TableCell>{todo?.completed ? "Completed" : "UnCompleted"}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end items-center space-x-2">
                   <TodoTableAction todo={todo} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{todos?.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
  