import { useReducer } from "react"; 
import { Sub } from "../types";


const INITIAL_STATE={
    nick: "",
      subMonths: 0,
      avatar: "",
      description: "",
  }
  

interface FormState {
    inputValue: Sub;
  }

type FormReducerAction={
    type:"change_value",
    payload:{
      inputName: string,
      inputValue:string
    }
  }|{
    type: "clear"
  }
  
const formReducer=(state:FormState["inputValue"] ,action: FormReducerAction )=>{
    switch (action.type) {
      case "change_value":
        const {inputName,inputValue}=action.payload
        return{
          ...state,
          [inputName]:inputValue 
        }
  
      case "clear":
        return INITIAL_STATE
        
    }
  }

  const useNewFrom=()=>{
    return useReducer(formReducer,INITIAL_STATE)
  }
  export default useNewFrom