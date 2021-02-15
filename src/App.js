import React, { useState } from 'react'

import sendAsync from './message-control/renderer'

import './App.css'

function App() {
  const [date, setDate] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newOperationName, setNewOperationName] = useState('')
  const [perDate, setPerDate] = useState('perDay')

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  function saveOperation() {
    // сохранить в БД
    setNewOperationName('')
    closeModal()
  }

  return (
    <div>
      <div>
        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
        <button onClick={openModal}>Добавить</button>
        <select value={perDate} onChange={(e) => setPerDate(e.target.value)}>
          <option value={'perDay'}>За День</option>
          <option value={'perWeek'}>За Неделю</option>
          <option value={'perMonth'}>За Месяц</option>
        </select>
      </div>

      <div>
        <table>
          <tr>
            <th>Номер</th>
            <th>Операция</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Операция 1</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Операция 2</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Операция 3</td>
          </tr>
        </table>
      </div>

      {isModalOpen && (
        <div>
          <div>
            <input
              type="text"
              onChange={(e) => setNewOperationName(e.target.value)}
              value={newOperationName}
            />
            <button onClick={closeModal}>Отменить</button>
            <button onClick={saveOperation}>Создать</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
