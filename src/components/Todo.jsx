import React, { useEffect, useRef, useState } from "react";

//useRef hook allows you to persistent value between renders
//useRef create an new object with a single property: current
// property current can be used to acess a DOM element

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  const wasEditing = usePrevious(isEditing)

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    //clear input
    setNewName("");
    setEditing(false);
  }

  /*the Todo will display one of two possible templates:
  template view and template editing */

  const editingTemplate = (
    <form action="" className="stackSmall" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor={props.id} className="todoLabel">
          Novo nome para {props.name}:
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>

      <div className="btnGroup">
        <button
          type="button"
          className="btn todoCancel"
          onClick={() => setEditing(false)}
        >
          Cancelar
          <span className="visuallyHidden">renomeando {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todoEdit">
          Save
          <span className="visuallyHidden">novo nome para {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="todo stackSmall">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todoLabel" htmlFor={props.id}>
          {props.name}
        </label>
      </div>

      <div className="btnGroup">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Editar <span className="visuallyHidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btnDanger"
          onClick={() => props.deleteTask(props.id)}
        >
          Deletar <span className="visuallyHidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  useEffect(()=>{
    if(!wasEditing && isEditing) editFieldRef.current.focus();
    if(wasEditing && !isEditing) editButtonRef.current.focus();
  }, [isEditing]);

  /**Now got two differents templates in 2 separate constants and only one will display */
  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}
