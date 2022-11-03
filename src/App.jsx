import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  Todas: () => true, //show all tasks
  Pendentes: (task) => !task.completed, //tasks pending
  Concluídas: (task) => task.completed, //tasks completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("Todas");

  //waiting for form input data
  function addTask(name) {
    //nanoid to not have 2 tasks with the same id
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  //completing a task and updating the list
  function toggleTaskCompleted(id) {
    const updateTasks = tasks.map((task) => {
      //if this task have same id
      if (id == task.id) return { ...task, completed: !task.completed };
      return task;
    });
    //update new state of tasks
    setTasks(updateTasks);
  }

  function editTask(id, newName) {
    const editedList = tasks.map((task) => {
      //if this task have same id as the edited task:
      if (id == task.id) return { ...task, name: newName };
      return task;
    });
    setTasks(editedList);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  // if FILTER_MAP[Todas], this property is () => true, else --> FILTER_MAP[Pendentes]
  //choosing a filter in your browser will now remove tasks that do not meet its criteria
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        editTask={editTask}
        deleteTask={deleteTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  //show tasks remaining
  const taskNoun =
    taskList.length != 1 ? "tarefas restantes" : "tarefa restante";
  const headingText = `${taskList.length} ${taskNoun}`;

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  
useEffect(() => {
  if (tasks.length - prevTaskLength === -1) {
    listHeadingRef.current.focus();
  }
}, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stackLarge">
      <h1>Agenda</h1>
      <Form addTask={addTask} />
      <div className="filters btnGroup stackException">
        {/* all works listed, pending and finished */}
        {filterList}
      </div>

      {/* remaining tasks  */}
      <h2 id="listHeading" ref={listHeadingRef} tabIndex="-1">
        {headingText}
      </h2>
      <ul
        role="list"
        className="todoList stackLarge stackException"
        aria-labelledby="listHeading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
