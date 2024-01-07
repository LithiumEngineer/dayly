import React from "react"
import { FC } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

const ChangeMonth = ({ onForward, onBackward }) => {
  return (
    <div className="flex h-fit w-fit">
      <div
        className="mr-5 border-solid border-[1px] border-[#76CDC2] rounded-md"
        onClick={onBackward}
      >
        <FaChevronLeft className="p-1 w-5 h-5 text-[#76CDC2] hover:cursor-pointer hover:bg-[#76CDC2] hover:text-white duration-100" />
      </div>

      <div
        className="border-solid border-[1px] border-[#76CDC2] rounded-md"
        onClick={onForward}
      >
        <FaChevronRight className="p-1 w-5 h-5 text-[#76CDC2] hover:cursor-pointer hover:bg-[#76CDC2] hover:text-white duration-100" />
      </div>
    </div>
  )
}

export default ChangeMonth
