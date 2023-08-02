"use client"
import Image from 'next/image'
import {useState} from 'react'
import {useSelector,useDispatch} from "react-redux"
import { RootState, addTodo , deleteTodo , tickTodo} from './redux/store';

export default function Home() {
  const [input,setInput] = useState("");
  const todoList = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (input.trim() !== '') {
      dispatch(addTodo(input));
      setInput(''); 
    }
  };

  const handleDeleteTodo = (todo : any) => {
    dispatch(deleteTodo(todo.id))
  }

  const handleTickTodo = (todo:any)=>{
    dispatch(tickTodo(todo.id))
  }

  

  return (
      <>
        <nav className='mx-auto mt-2 rounded-xl w-[60%] bg-gray-400 h-20 shadow-lg text-black flex justify-center items-center text-3xl font-medium'>
          <h1 className='max-lg:text-xl'>NextJS-Redux Todo List</h1>
        </nav>
        <div className='w-[100%] h-screen flex flex-col gap-5 mt-5'>
          <div>
            <div className='flex flex-row justify-center'>
              <input type="text" placeholder='Do Homework' className='rounded-lg p-1 text-xl mr-2 max-lg:w-[50%]' value={input} onChange={(e)=>setInput(e.target.value)}/>
              <button  onClick={handleAddTodo} className='bg-green-500 text-black rounded-lg p-1 text-lg hover:bg-green-400 transition all 0.3s ease-in-out'>Add Todo</button>
            </div>
          </div>
          <div className='w-[40%] mx-auto p-5 rounded-xl bg-orange-200 text-black font-medium max-lg:w-[90%] h-auto'>
          {
        todoList.map((todo) => (
          todo.isCompleted ? (
            <div key={todo.id} className='flex justify-between w-[70%] mx-auto text-left bg-zinc-800 text-white my-2 rounded-lg px-4 py-2 font-semibold max-lg:w-[100%]'>
              <p className='max-lg:text-sm line-through'>{todo.name}</p>
              <div className='flex'>
                <button onClick={() => handleTickTodo(todo)} className='bg-white rounded-lg mr-1 px-2 text-black font-semibold hover:bg-gray-400 transition all 0.3s ease-in-out max-lg:h-min ml-auto max-lg:text-sm'>Untick</button>
                <button onClick={() => handleDeleteTodo(todo)} className='bg-white rounded-lg px-2 text-black font-semibold hover:bg-gray-400 transition all 0.3s ease-in-out max-lg:h-min ml-auto max-lg:text-sm'>Delete</button>
              </div>
            </div>
          ) : (
            <div key={todo.id} className='flex justify-between w-[70%] mx-auto text-left bg-zinc-800 text-white my-2 rounded-lg px-4 py-2 font-semibold max-lg:w-[100%]'>
              <p className='max-lg:text-sm'>{todo.name}</p>
              <div className='flex'>
                <button onClick={() => handleTickTodo(todo)} className='bg-white rounded-lg mr-1 px-2 text-black font-semibold hover:bg-gray-400 transition all 0.3s ease-in-out max-lg:h-min ml-auto max-lg:text-sm'>Tick</button>
                <button onClick={() => handleDeleteTodo(todo)} className='bg-white rounded-lg px-2 text-black font-semibold hover:bg-gray-400 transition all 0.3s ease-in-out max-lg:h-min ml-auto max-lg:text-sm'>Delete</button>
              </div>
            </div>
          )
        ))
      }
          </div>
        </div>
      </>
  )
}
