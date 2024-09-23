import { getTodoAction } from "@/actions/todoAction";
import AddTodoForm from "@/components/AddTodoForm";
import { TodoTable } from "@/components/TodoTable";
import { auth } from "@clerk/nextjs/server";







export default async function Home() {
   
 
    const {userId} = auth()
  const todos  = await getTodoAction({userId})
  
   
  return (
  
      <main className="container mx-auto">
        
      
      <AddTodoForm userId={userId}  />

      <TodoTable todos={todos}/>
      </main>
      
   
  )
}
