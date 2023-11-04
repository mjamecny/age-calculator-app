import { useState } from "react"
import { differenceInCalendarDays } from "date-fns"

export default function App() {
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")

  const [difYears, setDifYears] = useState("--")
  const [difMonths, setDifMonths] = useState("--")
  const [difDays, setDifDays] = useState("--")

  const [error, setError] = useState("")
  const [dayError, setDayError] = useState("")
  const [monthError, setMonthError] = useState("")
  const [yearError, setYearError] = useState("")

  const today = new Date()

  function handleSubmit(e) {
    e.preventDefault()

    setError("")
    setDayError("")
    setMonthError("")
    setYearError("")

    const parsedDay = parseInt(day, 10)
    const parsedMonth = parseInt(month, 10)
    const parsedYear = parseInt(year, 10)

    function validCheck(num, type) {
      if (type === "day") {
        if (isNaN(num)) {
          setDayError("The field is required")
          return
        }
        if (num < 1 || num > 31) {
          setDayError("Must be a valid day")
          return
        }

        return num
      }

      if (type === "month") {
        if (isNaN(num)) {
          setMonthError("The field is required")
          return
        }
        if (num < 1 || num > 12) {
          setMonthError("Must be a valid month")
          return
        }
        return num
      }

      if (type === "year") {
        if (isNaN(num)) {
          setYearError("The field is required")
          return
        }
        if (num > today.getFullYear()) {
          setYearError("Must be in the past")
          return
        }
        return num
      }
    }

    const validDay = validCheck(parsedDay, "day")
    const validMonth = validCheck(parsedMonth, "month")
    const validYear = validCheck(parsedYear, "year")

    if (!validDay || !validMonth || !validYear) {
      setDifDays("--")
      setDifMonths("--")
      setDifYears("--")
      return
    }

    const dateToCheck = new Date(`${validYear}-${validMonth}-${validDay}`)

    if (dateToCheck.getTime() > today.getTime()) {
      setYearError("Must be in the past")
      setDifDays("--")
      setDifMonths("--")
      setDifYears("--")
      return
    }

    if (dateToCheck.getDate() !== validDay) {
      setError("Must be a valid date")
      return
    }

    const selectedDate = new Date(`${validYear}-${validMonth}-${validDay}`)

    const differenceInDays = differenceInCalendarDays(today, selectedDate)

    const differenceInYears = Math.floor(differenceInDays / 365)
    const differenceInMonths = Math.floor((differenceInDays % 365) / 30)
    const differenceInRemainingDays = differenceInDays % 30

    setDifYears(differenceInYears)
    setDifMonths(differenceInMonths)
    setDifDays(differenceInRemainingDays)
  }

  return (
    <div className="container">
      <div className="app">
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-row">
            <label
              htmlFor="day"
              style={{ color: dayError || error ? "var(--light-red)" : "" }}
            >
              Day
            </label>
            <input
              type="text"
              id="day"
              placeholder="DD"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              style={{
                border: dayError || error ? "1px solid var(--light-red)" : "",
              }}
            />
            {dayError && <span>{dayError}</span>}
            {error && <span>{error}</span>}
          </div>
          <div className="input-row">
            <label
              htmlFor="month"
              style={{ color: monthError || error ? "var(--light-red)" : "" }}
            >
              Month
            </label>
            <input
              type="text"
              id="month"
              placeholder="MM"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              style={{
                border: monthError || error ? "1px solid var(--light-red)" : "",
              }}
            />
            {monthError && <span>{monthError}</span>}
          </div>
          <div className="input-row">
            <label
              htmlFor="year"
              style={{ color: yearError || error ? "var(--light-red)" : "" }}
            >
              Year
            </label>
            <input
              type="text"
              id="year"
              placeholder="YYYY"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              style={{
                border: yearError || error ? "1px solid var(--light-red)" : "",
              }}
            />
            {yearError && <span>{yearError}</span>}
          </div>
          <button className="btn">
            <img src="icon-arrow.svg" alt="arrow icon" />
          </button>
        </form>
        <div className="result">
          <p className="years">
            <span>{difYears}</span>years
          </p>
          <p className="months">
            <span>{difMonths}</span>months
          </p>
          <p className="days">
            <span>{difDays}</span>days
          </p>
        </div>
      </div>
    </div>
  )
}
