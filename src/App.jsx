import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState } from 'react';


function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  //waiting for form input data 
  function addTask(name){
    const newTask = { id: "id", name, completed: false };
    setTasks([...tasks, newTask])
  }
  
  const taskList = tasks.map((task) => (
    <Todo id={task.id} name={task.name} completed={task.completed} key={task.id} />
  ));

  return (
    <div className="todoapp stackLarge">
      <h1>Agenda</h1>
      <Form addTask={addTask}/>
      <div className="filters btnGroup stackException">
        {/* all works listed, pending and finished */}
        <FilterButton name="Todas"/>
        <FilterButton name="Em andamento"/>
        <FilterButton name="Concluídas"/>
      </div>

      {/* remaining tasks  */}
      <h2 id="listHeading">3 tarefas restantes</h2>
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
