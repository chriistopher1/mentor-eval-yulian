import React, { useState } from 'react';
import styles from './Modal.module.scss'; // Create your modal styles

interface ModalProps {
  isOpen: boolean;
  currentTitle: string;
  onClose: () => void;
  onSave: (updatedTitle: string) => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  currentTitle,
  onClose,
  onSave,
}) => {
  const [newTitle, setNewTitle] = useState(currentTitle);

  const handleSave = () => {
    onSave(newTitle);
    onClose();
  };
  console.log('modal title : ', newTitle);
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <div className={styles.header}> 
          <h2 className={styles.title}>Edit Task</h2>
          <button onClick={onClose} className={styles.cancelButton}>
            X
          </button>
        </div>

        <input
          type='text'
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder='Enter new title'
          className={styles.input}
        />
        <div className={styles.buttons}>
          <button onClick={handleSave} className={styles.saveButton}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
