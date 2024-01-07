import { FC, useState } from "react"
import AddTask from "./AddTask"
import DisplayTask from "./DisplayTask"
import { Task } from "../Calender"
import React from "react"

const Todo = ({ tasks, onAdd, onDelete, onComplete }) => {
  return (
    <div className="w-full h-full">
      <AddTask onAdd={onAdd} />
      <DisplayTask tasks={tasks} onDelete={onDelete} onComplete={onComplete} />
    </div>
  )
}

export default Todo
