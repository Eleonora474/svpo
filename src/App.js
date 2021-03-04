import React, { useState, useEffect } from 'react'

import sendAsync from './message-control/renderer'
import sql from './sql'
import './App.css'
import { getWeekNumber } from './utils'

const today =
  new Date().getFullYear() +
  '-' +
  (new Date().getMonth() + 1).toString().padStart(2, 0) +
  '-' +
  new Date().getDate().toString().padStart(2, 0)

function App() {
  const [date, setDate] = useState(today)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newOperationName, setNewOperationName] = useState('')
  const [perDate, setPerDate] = useState('perDay')
  const [isLoading, setIsLoading] = useState(true)
  const [operationList, setOperationList] = useState([])

  useEffect(() => {
    const init = async () => {
      try {
        await sendAsync(sql.createTable)

        const operations = await sendAsync(sql.select(date))
        setOperationList(operations)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
    init()
  }, [])

  useEffect(() => {
    const updateOp = async () => {
      if (perDate === 'perDay') {
        const operations = await sendAsync(sql.select(date))
        setOperationList(operations)
      } else if (perDate === 'perWeek') {
        const operations = await sendAsync(
          sql.selectByWeek(getWeekNumber(new Date(date)))
        )
        setOperationList(operations)
      } else if (perDate === 'perMonth') {
        const operations = await sendAsync(sql.select(date.slice(0, -3)))
        setOperationList(operations)
      }
    }
    updateOp()
  }, [perDate, date])

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setNewOperationName('')
    setIsModalOpen(false)
  }

  function saveOperation() {
    const createOp = async () => {
      try {
        const now = new Date()
        await sendAsync(
          sql.add({
            name: newOperationName,
            date,
            week: getWeekNumber(new Date(date)),
            time: `${now
              .getHours()
              .toString()
              .padStart(2, 0)}:${now
              .getMinutes()
              .toString()
              .padStart(2, 0)}:${now.getSeconds().toString().padStart(2, 0)}`,
          })
        )
        const operations = await sendAsync(sql.select(date))
        setOperationList(operations)
        setPerDate('perDay')
        closeModal()
      } catch (error) {
        console.error(error)
      }
    }
    createOp()
  }

  if (isLoading) {
    return <p>Загрузка...</p>
  }

  return (
    <div className="wrapper">
      <div className="sidebar ">
        <div className="">
          <input
            className="calendar "
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
          <select value={perDate} onChange={(e) => setPerDate(e.target.value)}>
            <option value={'perDay'}>За День</option>
            <option value={'perWeek'}>За Неделю</option>
            <option value={'perMonth'}>За Месяц</option>
          </select>
          <br />
        </div>
        <button className="submit btn" onClick={openModal}>
          <strong>Добавить</strong>
        </button>
      </div>

      <div className="content">
        <table className="table" align="center">
          <tr>
            <th>Номер</th>
            <th>Операция</th>
            <th>Время</th>
          </tr>
          {operationList.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.name}</td>
              <td>{o.time}</td>
            </tr>
          ))}
        </table>
      </div>

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <div className="modal-header">
              <h3>Добавить клиента и операцию</h3>
            </div>
            <div className="modal-body">
              <input
                className="input"
                type="text"
                onChange={(e) => setNewOperationName(e.target.value)}
                value={newOperationName}
              />
              <button className="btn create" onClick={saveOperation}>
                Создать
              </button>
              <button className="btn cancel" onClick={closeModal}>
                Отменить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
