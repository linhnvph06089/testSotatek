import { useState } from 'react';
import { TaskItemType } from '../App';
import TaskForm from './TaskForm';
import styles from './TaskItem.module.css';

interface TaskItemProps {
  item: TaskItemType;
  removeTask: (id: number) => void;
  updateTask: (newItem: TaskItemType) => void;
  checkedItem: (id: number) => void;
}

const TaskItem = (props: TaskItemProps) => {
  const { item, removeTask, updateTask, checkedItem } = props;
  const [openDetail, setOpenDetail] = useState(false);

  const handleShowDetail = () => {
    setOpenDetail(!openDetail);
  };

  const handleRemoveTask = () => {
    if (item?.id) {
      removeTask(item.id);
    }
  };

  const handleUpdateTask = (item: TaskItemType) => {
    if (item?.id) {
      updateTask(item);
    }
  };

  const handleCheckTask = (id?: number) => {
    if (id) {
      checkedItem(id);
    }
  };

  return (
    <div className={styles.rootTaskItem}>
      <div className={styles.infoItem}>
        <div className={styles.leftItem}>
          <input
            type="checkbox"
            className={styles.checkboxItem}
            onChange={() => handleCheckTask(item.id)}
          />
          <p className={styles.titleItem}>{item.title}</p>
        </div>
        <div className={styles.rightItem}>
          <button className={`${styles.buttonDetail} ${styles.btn}`} onClick={handleShowDetail}>
            Detail
          </button>
          <button className={`${styles.buttonRemove} ${styles.btn}`} onClick={handleRemoveTask}>
            Remove
          </button>
        </div>
      </div>
      {openDetail && (
        <div className={styles.detailItem}>
          <TaskForm submit={handleUpdateTask} type="Update" detailTask={item} />
        </div>
      )}
    </div>
  );
};

export default TaskItem;
