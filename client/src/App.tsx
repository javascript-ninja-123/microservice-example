import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios"

const fetchData = async (url:string) => {
  try{
     const {data} = await axios.get(`http://localhost:${url}/todos`)
     return data
  }
  catch(err){
    throw err
  }
}

interface ITodo{
  description: string;
  id: string;
  title: string;
}


const GolangApp = () => {
  const [todoList, setList] = React.useState<ITodo[]>([])
  const fetchFromNodeJS = async () => {
    try{
      const data = await fetchData("6500")
      setList(data.todos)
    }
    catch(err){
      console.log(err)
    }
  }


  React.useEffect(() =>{
    fetchFromNodeJS()
  }, [])

  const render = React.useCallback(() => {
    return Array.isArray(todoList) && todoList.map(value => {
        return (
          <div key={value.id}>
            <h3>{value.title}</h3>
            <h3>{value.description}</h3>
          </div>
        )
      })
    
  }, [todoList])

  return (
    <div>
      {render()}
    </div>
  )
}
const NodeApp = () => {
  const [todoList, setList] = React.useState<ITodo[]>([])
  const fetchFromNodeJS = async () => {
    try{
      const data = await fetchData("4500")
      setList(data.todos.Items)
    }
    catch(err){
      console.log(err)
    }
  }


  React.useEffect(() =>{
    fetchFromNodeJS()
  }, [])

  const render = React.useCallback(() => {
    return Array.isArray(todoList) && todoList.map(value => {
        return (
          <div key={value.id}>
            <h3>{value.title}</h3>
            <h3>{value.description}</h3>
          </div>
        )
      })
    
  }, [todoList])

  return (
    <div>
      {render()}
    </div>
  )
}


const Sumbit = React.memo(() => {
  const [title, setTitle] = React.useState<string>("")
  const [description, setDescription] = React.useState<string>("")

  const onChange = React.useCallback((e) => {
    if(e.target.name === "title"){
      setTitle(e.target.value)
    }
    else{
      setDescription(e.target.value)
    }
  },[])

  const onClick = React.useCallback(async () => {
    try{
      await axios.post("http://localhost:4500/todos", {
        title,
        description
      })
      window.location.reload()
    }
    catch(err){
      console.log(err)
    }
  }, [title, description])
  
  return (
    <div>
      <input value={title} onChange={onChange} placeholder="title" name="title"/>
      <input value={description} onChange={onChange} placeholder="description" name="description"/>
      <button onClick={onClick}>Submit to my Node.js server</button>
    </div>
  )
})


function App() {
  return (
    <React.Fragment>
      <Sumbit/>
    <div className="App">
      <div className="node">
        <h1>node</h1>
        <NodeApp/>
      </div>
      <div className="golang">
        <h1>golang</h1>
        <GolangApp/>
      </div>
    </div>
    </React.Fragment>
  );
}

export default App;
