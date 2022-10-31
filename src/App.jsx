import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
// import {v4 as uuid} from "uuid";

function App(props) {
  const taskList = props.tasks.map((task) => (
    <Todo id={task.id} name={task.name} completed={task.completed} key={task.id} />
  ));
  return (
    <div className="todoapp stackLarge">
      <h1>Agenda</h1>
      <Form />
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
