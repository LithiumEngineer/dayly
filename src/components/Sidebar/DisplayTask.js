import { FC } from "react"
import { Task } from "../Calender"
import { AiOutlineDelete } from "react-icons/ai"
import React from "react"


const DisplayTask = ({
  tasks,
  onDelete,
  onComplete,
}) => {
  const handleDelete = (id) => {
    onDelete(id)
  }

  const handleComplete = (id) => {
    onComplete(id)
  }

  return (
    <div className="flex flex-col mx-5">
      {tasks.reverse().map((value) => (
        <div
          key={value.id}
          className="mt-1 bg-white relative flex items-center rounded-lg"
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-4">
            <div
              className={`border-solid border-[1px] border-gray-500 hover:cursor-pointer h-4 w-4 rounded-full ${
                value.complete ? "bg-[#76CDC2]" : "bg-[#f5f5f5]"
              }`}
              onClick={() => handleComplete(value.customID)}
            />
          </span>

          <div
            style={{
              scrollbarWidth: "thin",
            }}
            className={`ml-10 mr-10 border-solid border-[1px] border-white focus:border-[#76CDC2] focus:outline-none py-3 w-full text-sm rounded-md overflow-scroll scrollbar-thin ${
              value.complete ? "line-through text-gray-400" : "text-gray-500"
            }`}
          >
            {value.text}
          </div>

          <span className="absolute inset-y-0 right-0 flex items-center pr-4">
            <AiOutlineDelete
              className={`hover:cursor-pointer h-4 w-4 hover:text-red-600`}
              onClick={() => handleDelete(value.customID)}
            />
          </span>
        </div>
      ))}
    </div>
  )
}
export default DisplayTask
