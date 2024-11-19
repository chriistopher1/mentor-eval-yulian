import React, { useEffect, useState } from 'react';
import { useCreateNewToDo,  useGetCurrentToDo } from './tanstack';
import Todo from './components/Todo/Todo';

const App: React.FC = () => {
  const [newTask, setNewTask] = useState<string>('');

  const { data: todos, isLoading } = useGetCurrentToDo();

  const { mutateAsync: CreateRealToDo } = useCreateNewToDo();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newTask.trim() === '') return;

    const newTodo = { title: newTask, completed: false };

    CreateRealToDo(newTodo);
    setNewTask('');
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <main className='main-container'>
      <div className='title'>
        <h1>Let's Get Things Done!</h1>
        <br></br>
        <h3>One Step CLoser to Your Goals</h3>
      </div>

      <div className='todo-container'>
        <div className='add-task-container'>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              name='new-task'
              placeholder='Create new task'
              className='new-task-input'
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            ></input>
            {/* <Button >Add</Button> */}
            <button type='submit' className='submit-button'>
              Add
            </button>
          </form>
        </div>
        <div className='list-task-container'>
          {todos && !isLoading && todos.length > 0 ? (
            todos.map((todo, index) => (
              <Todo
                key={index}
                text={todo.title}
                isCompleted={todo.completed}
                id={todo.id}
              />
            ))
          ) : (
            <p>No tasks available</p> 
          )}
        </div>
      </div>
    </main>
  );
};

export default App;
