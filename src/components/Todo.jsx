import React from "react";

export default function Todo(props) {
  return (
    <li className="todo stackSmall">
      <div className="c-cb">
        <input id="todo-0" type="checkbox" defaultChecked={props.completed} />
        <label className="todoLabel" htmlFor={props.id}>
          {props.name}
        </label>
      </div>

      <div className="btnGroup">
        <button type="button" className="btn">
          Editar <span className="visuallyHidden">{props.name}</span>
        </button>
        <button type="button" className="btn btnDanger">
          Deletar <span className="visuallyHidden">{props.name}</span>
        </button>
      </div>
    </li>
  );
}
