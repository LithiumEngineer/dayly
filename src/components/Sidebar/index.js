import axios from "axios"
import { FC, useEffect } from "react"
import AddTask from "./AddTask"
import Todo from "./Todo"
import { Task } from "../Calender"
import React from "react"

const Sidebar = ({ date, weekday, tasks, onAdd, onDelete, onComplete }) => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://api.weatherapi.com/v1/current.json",
        {
          params: {
            key: "482426bbecef42ff81b02723240301", // Replace with your actual API key
            q: "Calgary",
          },
        }
      )

      const { data } = response
      console.log(data)
    } catch (error) {
      console.error("Error fetching weather data:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="h-full w-full bg-gradient-to-b from-[#76CDC2] to-[#a5e9e0]">
      <div className="text-[#ffffff] tracking-widest font-montserrat text-6xl w-fit mx-auto py-20">
        {weekday + " " + date}
      </div>
      <Todo
        tasks={tasks}
        onAdd={onAdd}
        onDelete={onDelete}
        onComplete={onComplete}
      />
      <div className="h-fit w-full">{/* <AddTask /> */}</div>
    </div>
  )
}

export default Sidebar
