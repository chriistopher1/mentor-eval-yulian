import { createTodos, deleteTodos, getTodos, updateTodos } from '@/api';
import { ITodo } from '@/constant';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useGetCurrentToDo = () => {
  return useQuery<ITodo[]>({
    queryKey: ['todos'],
    queryFn: () => getTodos(),
  });
};

const useCreateNewToDo = () => {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newToDo: { title: string; completed: boolean }) =>
      createTodos(newToDo),
    onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['todos'],
        });
      },
  });
};

const useDeleteToDo = () => {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id : string) =>
      deleteTodos(id),
    onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['todos'],
        });
      },
  });
};


const useUpdateToDo = () => {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newToDo : {
        id : string,
        title : string, 
        completed : boolean
    }) =>
      updateTodos(newToDo),
    onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['todos'],
        });
      },
  });
};



export { useGetCurrentToDo, useCreateNewToDo, useUpdateToDo, useDeleteToDo };
