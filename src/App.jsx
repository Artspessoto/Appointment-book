import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState } from "react";
import { nanoid } from "nanoid";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

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

  function deleteTask(id){
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  const taskList = tasks.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask = {deleteTask}
    />
  ));

  //show tasks remaining
  const taskNoun =
    taskList.length != 1 ? "tarefas restantes" : "tarefa restante";
  const headingText = `${taskList.length} ${taskNoun}`;

  return (
    <div className="todoapp stackLarge">
      <h1>Agenda</h1>
      <Form addTask={addTask} />
      <div className="filters btnGroup stackException">
        {/* all works listed, pending and finished */}
        <FilterButton name="Todas" />
        <FilterButton name="Em andamento" />
        <FilterButton name="Concluídas" />
      </div>

      {/* remaining tasks  */}
      <h2 id="listHeading">{headingText}</h2>
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
