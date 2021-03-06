import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import Form from './components/Form'
import TodoList from './components/TodoList'

function App(){
  useEffect(() => {
    getLocalTodos()
  }, [])

  const [inputText, setInputText] = useState("")
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState("all")
  const [filteredTodos, setFilteredTodos] = useState([])

  useEffect(() => {
    filterHandler()
    saveLocalTodos()
  }, [todos, status])

  const filterHandler = () => {
    switch(status){
      case "completed":
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFilteredTodos(todos)
        break;
    }
  }

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const getLocalTodos = () => {
    if(localStorage.getItem("todos") === null){
      localStorage.setItem("todos", JSON.stringify([]))
    }
    const todosLocal = JSON.parse(localStorage.getItem("todos"))
    setTodos(todosLocal)
  }

  return (
    <div className="App">
      <header>
        <h1>Shodlik's Todo List</h1>
      </header>

      <Form 
        setInputText={setInputText} 
        inputText={inputText} 
        todos={todos} 
        setTodos={setTodos} 
        setStatus={setStatus}
      />

      <TodoList 
        todos={todos} 
        setTodos={setTodos} 
        filteredTodos={filteredTodos}
      />
    </div>
  )
}

export default App;
