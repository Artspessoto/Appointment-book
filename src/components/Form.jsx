import React, {useState} from "react";

/*useState() creates a piece of state for a component, and its only parameter determines the 
initial value of that state. It returns two things: the state, and a function that can be used
to update the state later.*/

export default function Form(props) {
  const [name, setName] = useState('');

  //function to capture the typed data
  function handleChange(e){
    setName(e.target.value);
  }

  //this function avoids default submit behavior of the form
  function handleSubmit(e) {
    e.preventDefault();
    props.addTask(name);
    //clear input with void string
    setName('');
  }
  return (
    <form onSubmit={handleSubmit}>
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
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Adicionar
      </button>
    </form>
  );
}
