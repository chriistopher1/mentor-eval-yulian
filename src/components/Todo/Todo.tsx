import styles from './Todo.module.scss';
import { MouseEventHandler, useState } from 'react';
import Modal from '../Modal/Modal';
import { useDeleteToDo, useUpdateToDo } from '@/tanstack';

interface TodoProps {
  id: string;
  text: string;
  isCompleted: boolean;
}

const Todo: React.FC<TodoProps> = ({ id, text, isCompleted }) => {

  console.log(text);

  const [isModalOpen, setModalOpen] = useState(false);

  const { mutateAsync: UpdateRealToDo } = useUpdateToDo();
  const { mutateAsync: DeleteRealToDo } = useDeleteToDo();

  const handleSave = async (updatedTitle: string) => {
    UpdateRealToDo({
      id: id,
      completed: isCompleted,
      title: updatedTitle,
    });
    setModalOpen(false);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const completed = e.target.checked;
    UpdateRealToDo({
      id: id,
      completed: completed,
      title: text,
    });
  };

  const handleDelete: MouseEventHandler<HTMLImageElement> = () => {
    DeleteRealToDo(id);
    
  };

  

  return (
    <div className={styles.container}>
      <input
        type='checkbox'
        defaultChecked={isCompleted}
        onChange={handleCheckboxChange}
      />
      <p>{text}</p>
      <div className={styles.actions}>
        <button onClick={() => setModalOpen(true)}>
          <img src='./update.png' className={styles.update} />
        </button>
        <img
          src='./trash-icon.jpg'
          className={styles.trash}
          onClick={handleDelete}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        currentTitle={text}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default Todo;
