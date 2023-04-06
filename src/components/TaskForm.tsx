import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TaskItemType } from '../App';
import CalendarIcon from '../icons/Calendar.svg';
import styles from './TaskForm.module.css';

interface TaskFormProps {
  submit: (newPage: TaskItemType) => void;
  type: string;
  detailTask?: TaskItemType;
}

const defautValueTask: TaskItemType = {
  title: '',
  priority: 'Nomal',
  date: new Date(),
  description: ''
};

const TaskForm = (props: TaskFormProps) => {
  const { submit, type, detailTask } = props;
  const [valueTask, setValueTask] = useState<TaskItemType>(defautValueTask);
  const [invalidTitle, setInvalidTilte] = useState(false);

  useEffect(() => {
    if (detailTask) {
      setValueTask(detailTask);
    }
  }, []);

  const changeDate = (value: Date | null) => {
    setValueTask((prev) => ({ ...prev, date: value || undefined }));
  };

  const changeValueTask = (key: string, value: string) => {
    if (key === 'title') {
      if (value) {
        setInvalidTilte(false);
      } else {
        setInvalidTilte(true);
      }
    }
    setValueTask((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddTask = () => {
    if (valueTask.title) {
      submit(valueTask);
      if (type === 'Add') {
        setValueTask(defautValueTask);
      }
    } else {
      setInvalidTilte(true);
    }
  };

  return (
    <div className={styles.rootTaskForm}>
      <input
        onChange={(e) => changeValueTask('title', e.target.value)}
        value={valueTask.title}
        type="text"
        placeholder="Add new task ..."
        style={{ height: 30, paddingLeft: 10 }}
      />
      {invalidTitle && <span style={{ color: 'red' }}>Invalid title</span>}
      <b className={styles.labelform}>Description</b>
      <textarea
        style={{ width: 'auto', minHeight: 100 }}
        value={valueTask.description}
        onChange={(e) => changeValueTask('description', e.target.value)}
      />
      <div className={styles.rootSelect}>
        <div className={styles.selectDate}>
          <b className={styles.labelform}>Due Date</b>
          <div className={styles.rootDatePicker}>
            <DatePicker
              className={styles.datePicker}
              onChange={(date) => changeDate(date)}
              minDate={new Date()}
              selected={new Date(valueTask.date as string)}
              dateFormat="dd MMM yyyy"
            />
            <img className={styles.iconDate} src={CalendarIcon} alt="" />
          </div>
        </div>
        <div className={styles.selectPriority}>
          <b className={styles.labelform}>Priority</b>
          <select
            className={styles.inputPriority}
            name="priority"
            id=""
            onChange={(e) => changeValueTask('priority', e.target.value)}
            value={valueTask.priority}>
            <option value="Low">Low</option>
            <option value="Nomal">Nomal</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>
      <button className={styles.buttonSubmit} onClick={handleAddTask}>
        {type}
      </button>
    </div>
  );
};

export default TaskForm;
