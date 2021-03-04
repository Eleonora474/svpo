const createTable = `
CREATE TABLE IF NOT EXISTS Operations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name varchar(255) NOT NULL,
    date varchar(255) NOT NULL,
    week varchar(255) NOT NULL,
    time varchar(255) NOT NULL
);`

const select = (date) => `SELECT * FROM Operations WHERE date LIKE "${date}%"`
const selectByWeek = (week) =>
  `SELECT * FROM Operations WHERE week LIKE "${week}"`
const add = ({ name, date, week, time }) =>
  `INSERT INTO Operations (name, date, week, time) VALUES ("${name}", "${date}", "${week}", "${time}")`

const sql = {
  createTable,
  select,
  selectByWeek,
  add,
}
export default sql
