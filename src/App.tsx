import { useEffect, useState } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import { getValueStorage, setValueStorage } from './utils/localStorage';

export interface TaskItemType {
  title: string;
  id?: number;
  description?: string;
  date?: Date | string;
  priority?: string;
}

function App() {
  const [taskList, setTaskList] = useState<TaskItemType[]>(
    (getValueStorage('taskList') as TaskItemType[]) || []
  );
  const [taskListShow, setTaskListShow] = useState<TaskItemType[]>([]);
  const [checkedList, setCheckedList] = useState<number[]>([]);

  useEffect(() => {
    setTaskListShow(taskList);
    setValueStorage('taskList', JSON.stringify(taskList));
  }, [taskList]);

  const addTask = (item: TaskItemType) => {
    setTaskList((prev) => [
      ...prev,
      { ...item, id: Date.now(), date: (item.date as Date).toISOString() }
    ]);
  };

  const removeTask = (id: number) => {
    setTaskList((prev) => prev.filter((item) => item.id !== id));
  };

  const updateTask = (newTask: TaskItemType) => {
    const indexUpdate = taskList.findIndex((item) => item.id === newTask.id);
    const newTaskList = [...taskList];
    newTaskList[indexUpdate] = newTask;
    setTaskList(newTaskList);
  };

  const checkedItem = (id: number) => {
    const newCheckedList = [...checkedList];
    const indexChecked = newCheckedList.findIndex((item) => item === id);
    if (indexChecked !== -1) {
      newCheckedList.splice(indexChecked, 1);
      setCheckedList(newCheckedList);
    } else {
      setCheckedList((prev) => [...prev, id]);
    }
  };

  const removeListTask = () => {
    const newTaskList = taskList.filter((item) => {
      if (item.id) {
        if (!checkedList.includes(item.id)) {
          return item;
        }
      }
    });
    setTaskList(newTaskList);
    setCheckedList([]);
  };

  const handleSearchTask = (key: string) => {
    if (key) {
      const newTaskListShow = taskList.filter((item) => item.title.includes(key));
      setTaskListShow(newTaskListShow);
    } else {
      setTaskListShow(taskList);
    }
  };

  const sortListShow = (list: TaskItemType[]) => {
    return list.sort(
      (a, b) => new Date(a.date as string).valueOf() - new Date(b.date as string).valueOf()
    );
  };

  return (
    <div className="rootPage">
      <div className="contentPage">
        <div className="newTask">
          <div className="headerForm">
            <b style={{ fontSize: 26 }}>New Task</b>
          </div>
          <TaskForm submit={addTask} type="Add" />
        </div>
        <div className="taskList">
          <div className="headerForm">
            <b style={{ fontSize: 26 }}>To Do List</b>
          </div>
          <input
            className="inputSearch"
            type="text"
            onChange={(e) => handleSearchTask(e.target.value)}
            placeholder="Search ..."
          />
          <div className="taskListItem">
            {taskListShow.length > 0 &&
              sortListShow(taskListShow).map((item) => (
                <TaskItem
                  key={item?.id}
                  item={item}
                  removeTask={removeTask}
                  updateTask={updateTask}
                  checkedItem={checkedItem}
                />
              ))}
          </div>
          {checkedList.length > 0 && (
            <div className="rootAction">
              <div className="bulkAction">
                <div className="leftAction">
                  <p>Bulk Action: </p>
                </div>
                <div className="rightAction">
                  <button className="btnAction buttonDone">Done</button>
                  <button className="btnAction buttonRemoveAction" onClick={removeListTask}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
