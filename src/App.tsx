import { useEffect, useRef, useState } from "react";
import "./App.css";
import List from "./Components/List";
import Form from "./Components/Form";
import { Sub, SubsResponseFromApi } from "./types"


interface AppState {
  subs: Sub[];
  newSubsN: number;
}

function App() {
  const [subs, setSubs] = useState<AppState["subs"]>([]);
  const [newSubsN, setNewSubsN] = useState<AppState["newSubsN"]>(0);
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchSubs=(): Promise<SubsResponseFromApi> =>{
      return fetch("https://rickandmortyapi.com/api/character").then(response => response.json())
      .then(data => (data.results));
    }
    console.log(fetchSubs);
    
    const mapFromApiToSubs =(apiResponse:SubsResponseFromApi): Array<Sub>=>{
      return apiResponse.map(subFromApi =>{
        const{
          name:nick,
          id:subMonths,
          image:avatar,
          created:description,
        }= subFromApi

        return{
          nick,
          subMonths,
          avatar,
          description,
        }
      })
    }
    fetchSubs()
    .then(apiSubs=>{
      const subs= mapFromApiToSubs(apiSubs)
      console.log(subs);
      setSubs(subs)   
    })
  }, []);

  const handelNewSub=(newSub:Sub):void=>{
    setSubs(subs=>[...subs,newSub])
    setNewSubsN(n=>n+1)
  }

  return (
    <div className="App" ref={divRef}>
      <List subs={subs} />
      new subs: {newSubsN}
      <Form onNewSub={handelNewSub}/>
    </div>
  );
}

export default App;



// import React, { useEffect, useRef, useState } from "react";
// import "./App.css";
// import List from "./Components/List";
// import Form from "./Components/Form";
// import {Sub} from "./types"

// const INITIAL_STATE = [
//   {
//     nick: "dapelu",
//     subMonths: 3,
//     avatar: "https://i.pravatar.cc/150?i=dapelu",
//     description: "dapelu es un moderador ",
//   },
//   {
//     nick: "jeisson_pinzon",
//     subMonths: 2,
//     avatar: "https://i.pravatar.cc/150?i=otros",
//     // describe:"jeisson programador"
//   },
// ];

// interface AppState {
//   subs: Sub[];
//   newSubsN: number;
// }

// function App() {
//   const [subs, setSubs] = useState<AppState["subs"]>([]);
//   const [newSubsN, setNewSubsN] = useState<AppState["newSubsN"]>(0);
//   const divRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     setSubs(INITIAL_STATE);
//   }, []);

//   const handelNewSub=(newSub:Sub):void=>{
//     setSubs(subs=>[...subs,newSub])
//   }

//   return (
//     <div className="App" ref={divRef}>
//       <List subs={subs} />
//       <Form onNewSub={handelNewSub}/>
//     </div>
//   );
// }

// export default App;

