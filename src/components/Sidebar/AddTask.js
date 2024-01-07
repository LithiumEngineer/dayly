import React from "react"
import { FC, useState } from "react"
import { PiPlusLight } from "react-icons/pi"


const AddTask = ({ onAdd }) => {
  const [taskInput, setTaskInput] = useState("")
  const [hourInput, setHourInput] = useState("")
  const [minuteInput, setMinuteInput] = useState(0)

  const hours = Array.from({ length: 24 }, (_, i) => i)

  const handleSubmit = () => {
    if (taskInput != "") {
      onAdd(taskInput)
      setTaskInput("")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      handleSubmit()
    }
  }

  return (
    <div className="mx-5 relative flex items-center">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <PiPlusLight
          className="text-gray-400 hover:cursor-pointer h-5 w-5"
          onClick={handleSubmit}
        />
      </span>

      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a task, press Enter to save"
        className="pl-10 border-solid border-[1px] border-white focus:border-[#39635d] focus:outline-none py-3 w-full text-sm text-gray-500 rounded-lg"
      />
    </div>
  )
}

export default AddTask
