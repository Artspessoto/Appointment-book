import React from "react";

export default function Form(props){
    return (
        <form action="">
        <h2 className="labelWrapper">
          <label htmlFor="newTodoInput" className="label__lg">
            O que precisa ser feito?
          </label>
        </h2>
        <input
          type="text"
          id="newTodoInput"
          className="input input__lg"
          name="text"
          autoComplete="off"
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Adicionar
        </button>
      </form>
    )
}
