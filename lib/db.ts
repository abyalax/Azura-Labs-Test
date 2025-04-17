import mysql from 'mysql2/promise';

const host = process.env.DB_HOST
const user = process.env.DB_USER
const database = process.env.DB_DATABASE

export const db = await mysql.createConnection({
  host,
  user,
  database
});
