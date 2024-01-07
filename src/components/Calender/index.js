import { useState, useEffect } from "react"
import Monthly from "../Monthly"
import Sidebar from "../Sidebar"
import ChangeMonth from "./ChangeMonth"
import React from "react"
import Task from "./Task"
import { listTodos } from "../../graphql/queries"
import {
  createTodo as createTodoMutation,
  deleteTodo as deleteTodoMutation,
  updateTodo as updateTodoMutation,
} from "../../graphql/mutations"
import { generateClient } from "aws-amplify/api"
import { getCurrentUser } from "aws-amplify/auth"

const client = generateClient()

const Calender = () => {
  const [tasks, setTasks] = useState([])

  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ]

  const weekday_word = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]

  const now = new Date()
  let currentWeekday = now.getDay()
  let currentDate = now.getDate()
  let currentMonth = now.getMonth()
  let currentYear = now.getUTCFullYear()

  const dayToID = (currentYear, currentMonth, currentDate) => {
    let yyyy = currentYear.toString().padStart(4, "0")
    let mm = currentMonth.toString().padStart(2, "0")
    let dd = currentDate.toString().padStart(2, "0")
    return yyyy + mm + dd
  }

  const currentDayID = dayToID(currentYear, currentMonth, currentDate) //yyyymmdd

  const [yearOnDisplay, setYearOnDisplay] = useState(currentYear)
  const [monthOnDisplay, setMonthOnDisplay] = useState(currentMonth)
  const [dateOnDisplay, setDateOnDisplay] = useState(currentDayID)

  useEffect(() => {
    fetchTodo()
  }, [])

  async function fetchTodo() {
    const user = await getCurrentUser()
    const apiData = await client.graphql({
      query: listTodos,
      variables: {
        filter: {
          user: { eq: user.userId },
        },
      },
    })
    const TodosFromAPI = apiData.data.listTodos.items
    setTasks(TodosFromAPI.sort((a, b) => a.customID < b.customID))
  }

  async function createTodo(text) {
    console.log(tasks)
    const newTask = new Task(
      0,
      text,
      false,
      `${yearOnDisplay.toString().padStart(4, "0")}${monthOnDisplay
        .toString()
        .padStart(2, "0")}${dateOnDisplay.toString().padStart(2, "0")}`,
      tasks.length === 0 ? 1 : tasks[0].customID + 1
    )

    setTasks([newTask, ...tasks])

    const user = await getCurrentUser()
    const apiData = await client.graphql({ query: listTodos })

    const currentTodos = apiData.data.listTodos.items.filter(
      (value) => value.user === user.userId
    )
    console.log(currentTodos)
    let newCustomID = 0
    for (let i = 0; i < currentTodos.length; i++) {
      newCustomID = Math.max(newCustomID, currentTodos[i].customID)
    }
    newCustomID++

    const data = {
      text: text,
      complete: false,
      yyyymmdd: `${yearOnDisplay.toString().padStart(4, "0")}${monthOnDisplay
        .toString()
        .padStart(2, "0")}${dateOnDisplay.toString().padStart(2, "0")}`,
      user: user.userId,
      customID: newCustomID,
    }
    await client.graphql({
      query: createTodoMutation,
      variables: { input: data },
    })
  }

  async function deleteTodo(id) {
    const newTasks = tasks.filter((todo) => todo.customID !== id)
    setTasks(newTasks)

    const user = await getCurrentUser()
    const apiData = await client.graphql({
      query: listTodos,
      variables: {
        filter: {
          user: { eq: user.userId },
          customID: { eq: id },
        },
      },
    })

    const todosToDelete = apiData.data.listTodos.items

    await Promise.all(
      todosToDelete.map(async (todo) => {
        try {
          await client.graphql({
            query: deleteTodoMutation,
            variables: {
              input: {
                id: todo.id,
              },
            },
          })
        } catch (error) {
          console.log("error with delete")
        }
      })
    )
  }

  async function completeTodo(id) {
    const newTasks = tasks.map((task) =>
      task.customID === id ? { ...task, complete: !task.complete } : task
    )
    setTasks(newTasks)

    const user = await getCurrentUser()
    const apiData = await client.graphql({
      query: listTodos,
      variables: {
        filter: {
          user: { eq: user.userId },
          customID: { eq: id },
        },
      },
    })

    const todosToComplete = apiData.data.listTodos.items

    await Promise.all(
      todosToComplete.map(async (todo) => {
        try {
          await client.graphql({
            query: updateTodoMutation,
            variables: {
              input: {
                id: todo.id,
                complete: !todo.complete,
              },
            },
          })
        } catch (error) {
          console.log("error with complete")
        }
      })
    )
  }

  const changeDate = (idx) => {
    setDateOnDisplay(idx)
  }

  const yyyymmddToDate = (yyyymmdd) => {
    const year = parseInt(yyyymmdd.substring(0, 4))
    const month = parseInt(yyyymmdd.substring(4, 6))
    const day = parseInt(yyyymmdd.substring(6, 8))
    const time = new Date(year, month, day)
    return time
  }

  const handleForward = () => {
    setMonthOnDisplay((monthOnDisplay + 1) % 12)
    if (monthOnDisplay == 11) {
      setYearOnDisplay(yearOnDisplay + 1)
    }
  }

  const handleBackward = () => {
    setMonthOnDisplay((monthOnDisplay + 11) % 12)
    if (monthOnDisplay === 0) {
      setYearOnDisplay(yearOnDisplay - 1)
    }
  }



  return (
    <div className="flex h-screen w-screen bg-[#f5f5f5]">
      <div className="px-20 py-20 h-full w-full min-h-[600px]">
        <div className="flex flex-col justify-between w-full h-full">
          <div className="flex flex-col font-montserrat">
            <div className="text-[#616161] text-3xl">{yearOnDisplay}</div>
            <div className="text-[#76CDC2] tracking-widest text-3xl mt-4">
              {months[monthOnDisplay]}
            </div>
          </div>
          <div className="flex flex-col h-full w-full mt-20 max-h-[850px] items-end">
            <ChangeMonth
              onForward={handleForward}
              onBackward={handleBackward}
            />
            <div className="h-full w-full mt-2">
              <Monthly
                month={monthOnDisplay}
                year={yearOnDisplay}
                onChangeDate={changeDate}
                dateOnDisplay={dateOnDisplay}
                currentDate={`${currentYear
                  .toString()
                  .padStart(4, "0")}${currentMonth
                  .toString()
                  .padStart(2, "0")}${currentDate.toString().padStart(2, "0")}`}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[1200px]">
        <Sidebar
          date={parseInt(dateOnDisplay.substring(6, 8))}
          weekday={
            weekday_word[(yyyymmddToDate(dateOnDisplay).getDay() + 6) % 7]
          }
          tasks={tasks.filter(
            (value) =>
              value.yyyymmdd ===
              `${yearOnDisplay.toString().padStart(4, "0")}${monthOnDisplay
                .toString()
                .padStart(2, "0")}${dateOnDisplay.toString().padStart(2, "0")}`
          )}
          onAdd={createTodo}
          onDelete={(id) => deleteTodo(id)}
          onComplete={completeTodo}
        />
      </div>
    </div>
  )
}

export default Calender
