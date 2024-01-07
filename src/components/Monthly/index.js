import React from "react"
import { FC } from "react"

const Monthly = ({ month, year, onChangeDate, dateOnDisplay, currentDate }) => {
  let monthDays = [
    31,
    year % 4 == 0 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ]

  const firstDay = new Date(year, month, 1)
  const weekdayOfFirstDay = firstDay.getDay()

  const weekday_word = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]

  const NDaysAfter = (yyyymmdd, N) => {
    const year = parseInt(yyyymmdd.substring(0, 4))
    const month = parseInt(yyyymmdd.substring(4, 6))
    const day = parseInt(yyyymmdd.substring(6, 8))
    const time = new Date(year, month, day)
    const NDaysAfter = new Date(time.getTime() + N * 24 * 60 * 60 * 1000)
    return `${NDaysAfter.getFullYear()
      .toString()
      .padStart(4, "0")}${NDaysAfter.getMonth()
      .toString()
      .padStart(2, "0")}${NDaysAfter.getDate().toString().padStart(2, "0")}`
  }

  let displayDays = []
  let daysInMonthBefore = (weekdayOfFirstDay + 6) % 7

  //days in month before
  for (let i = daysInMonthBefore; i >= 1; i--) {
    displayDays.push(
      NDaysAfter(
        `${year.toString().padStart(2, "0")}${month
          .toString()
          .padStart(2, "0")}01`,
        -i
      )
    )
  }

  //days in current month and after
  for (let i = 0; i < 42 - daysInMonthBefore; i++) {
    displayDays.push(
      NDaysAfter(
        `${year.toString().padStart(2, "0")}${month
          .toString()
          .padStart(2, "0")}01`,
        i
      )
    )
  }

  //format into six columns
  let res = []
  for (let i = 0; i < 7; i++) {
    let row = []
    for (let j = 0; j < 6; j++) {
      row.push(displayDays[i + j * 7])
    }
    res.push(row)
  }

  const handleChangeDate = (idx) => {
    onChangeDate(idx)
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between w-full h-fit mb-3">
        {weekday_word.map((value) => (
          <div
            key={value}
            className="tracking-widest text-xs text-[#8e8e8e] font-mono"
          >
            {value}
          </div>
        ))}
      </div>
      <div className="flex w-full h-full justify-between">
        {res.map((col, i) => (
          <div
            key={i}
            className="flex flex-col w-fit h-auto justify-around items-center"
          >
            {col.map((value, j) => (
              <div key={j} onClick={() => handleChangeDate(value)}>
                <div
                  className={`flex justify-around items-center rounded-full w-[30px] h-[30px] font-mono text-xs px-2 py-2 hover:cursor-pointer hover:bg-[#76CDC2] hover:text-[#ffffff] duration-150 
                  ${
                    dateOnDisplay === value
                      ? "bg-[#76CDC2]"
                      : currentDate === value
                      ? "bg-[#c5eae5]"
                      : "bg-[#f5f5f5]"
                  }
                  ${
                    dateOnDisplay === value
                      ? "text-[#ffffff]"
                      : month === parseInt(value.substring(4, 6))
                      ? "text-[#919191]"
                      : "text-[#cbcbcb]"
                  } 
                  `}
                >
                  {parseInt(value.substring(6, 8))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Monthly
