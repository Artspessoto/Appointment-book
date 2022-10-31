import React from "react";

export default function FilterButton(props){
    return(
        <button type="button" className="btn toggleBtn" aria-pressed="true">
          {/* aria-pressed informa à tecnologia assistiva que o botão pode estar 
          em 2 estados(pressionado ou não) */}
          <span className="visuallyHidden">Mostrar </span>
          <span>{props.name}</span>
          <span className="visuallyHidden"> as tarefas</span>
        </button>
    );
}