import React, { useReducer, useState } from "react";
import { Sub } from "../types";
import { type } from "os";
import useNewFrom from "../Hooks/useNewSubForm";


interface FormProps {
  onNewSub: (newSub: Sub) => void
}

 

export default function Form({ onNewSub }: FormProps) {
  // const [valueInput, setValueInput] = useState<FormState["inputValue"]>(  INITIAL_STATE);
  
  const [valueInput,dispatch]= useNewFrom()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>  ) => {
    const {name,value}=e.target
    dispatch({
      type:"change_value",
      payload: { inputName: name,inputValue: value }
    }) 
  };
  const handleClear =()=>{
    dispatch({
      type:"clear"
    })
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNewSub(valueInput)
    handleClear()
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={valueInput.nick}
          type="text"
          name="nick"
          placeholder="nick"
        />
        <input
          onChange={handleChange}
          value={valueInput.subMonths}
          type="number"
          name="subMonths"
          placeholder="subMonths"
        />
        <input
          onChange={handleChange}
          value={valueInput.avatar}
          type="text"
          name="avatar"
          placeholder="avatar"
        />
        <textarea
          onChange={handleChange}
          value={valueInput.description}
          name="description"
          placeholder="description"
        />
        <button onClick={handleClear} type="button" >Clear form</button>

        <button type="submit" >Save new sub!</button>
      </form>
    </div>
  );
}
