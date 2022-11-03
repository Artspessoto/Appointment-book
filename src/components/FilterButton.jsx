import React from "react";

export default function FilterButton(props) {
  return (
    <button
      type="button"
      className="btn toggleBtn"
      aria-pressed={props.isPressed}
      onClick = { ()=> props.setFilter(props.name)}
    >
      {/* aria-pressed informa à tecnologia assistiva que o botão pode estar 
          em 2 estados(pressionado ou não) */}
      <span className="visuallyHidden">Mostrar </span>
      <span className="visuallyHidden">as tarefas </span>
      <span>{props.name}</span>
    </button>
  );
}
