import axios from 'axios';
import { APIConfiguration } from '@/configs/api.config';
import { title } from 'process';

const customAxios = axios.create({
  baseURL: APIConfiguration.baseURL,
  headers: {
    'API-Key': APIConfiguration.APIKey,
    'Content-Type': 'application/json',
  },
});

export const getTodos = async () => {
  try {
    const response = await customAxios.get('/todos/scroll/?order=desc&limit=20');
    return response.data.todos;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const createTodos = async (newTodo: {
  title: string;
  completed: boolean;
}) => {
  try {
    const response = await customAxios.post('/todos', newTodo);
    return response;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const updateTodos = async (updatedToDo: {
  id: string;
  title?: string;
  completed?: boolean;
}) => {
  console.log('to be updated id : ', updatedToDo.id, updatedToDo.completed, updatedToDo.title);

  try {
    // Ensure the payload structure matches the API's expectations
    const response = await customAxios.put(`/todos/${updatedToDo.id}`, {
      title: updatedToDo.title,
      completed: updatedToDo.completed,
      date : Date.now()
    });
    return response; 
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error; 
  }
};

export const deleteTodos = async (id: string) => {
  try {
    const response = await customAxios.delete(`/todos/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};
