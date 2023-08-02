import { configureStore, createSlice } from "@reduxjs/toolkit";
import { FakeData } from "../FakeData";

const todoSlice = createSlice({
  name: "todo",
  initialState: FakeData, 
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: state.length + 1,
        name: action.payload,
        isCompleted: false,
      };
      state.push(newTodo); 
    },
    deleteTodo: (state, action) => {
      return state.filter((todo)=>todo.id!==action.payload)
    },
    tickTodo: (state, action) => {
      const { payload: id } = action;
      const todoToUpdate = state.find((todo) => todo.id === id);
      if (todoToUpdate) {
        todoToUpdate.isCompleted = !todoToUpdate.isCompleted;
      }
    },
  },
});

export const { addTodo,deleteTodo,tickTodo } = todoSlice.actions;

export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
});

export interface Todo {
  id: number;
  name: string;
  isCompleted: boolean;
}

export interface RootState {
  todos: Todo[];
}